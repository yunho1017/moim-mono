import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import * as base64 from "js-base64";
import * as qs from "query-string";
import { DefaultLoader } from "common/components/loading";
import { CustomBackdrop, Description, Title, Dialog } from "./styled";
import { useActions, useStoreState } from "app/store";
import useCurrentGroup from "common/hooks/useCurrentGroup";
import useCurrentUser from "common/hooks/useCurrentUser";
import { useStoreSecondaryView } from "common/hooks/useSecondaryView";
import { useHandleSignIn } from "common/hooks/useHandleSign";
import {
  ActionCreators as CommerceActionCreators,
  CALC_403_CODE,
  cartItemCheck,
} from "app/actions/commerce";
import { ActionCreators as SnackBarActionCreators } from "app/actions/snackbar";
import { refreshTokenAction } from "common/helpers/tokenRefreshManager";
import selectHubMoimId from "common/helpers/selectHubMoimId";
import {
  flattenCartSellerItem,
  groupingByDeliveryOption,
} from "../carts/helpers";
import AlertDialog from "common/components/alertDialog";
import { getMoimTokenToCookie } from "common/helpers/authentication";
import { MoimURL } from "common/helpers/url";
import {
  setPaymentRedirectLastSeen,
  setPaymentRedirectRequest,
} from "./helpers";
import { AnalyticsClass } from "common/helpers/analytics/analytics";
import { isProd } from "common/helpers/envChecker";
import { PRODUCTION_CHECKOUT_URL, STAGING_CHECKOUT_URL } from "./constants";
import ExceedCoinAmountAlertDialog, {
  IRefHandler,
} from "./components/exceedCoinAmountAlertDialog";

interface ICheckoutQueryParameter {
  // canToken: string;    // NOTE: deprecated soon?
  groupId: string;
  moimToken: string;
  next: "/checkout/v2";
  state?: string;
  callbackUrl: string;
  callbackContinueUrl: string; // url-encode
  completeUrl?: string;
  theme?: string; // {primary: "#XXXXXX", secondary: "#XXXXXX"} url encoding으로
  sellerId: string;
  items: string; // stringify + url-encode
  usedCoins?: string; // stringify + url-encode
  profile?: string; // base64
  privacyUrl: string;
  isFromCart: boolean;
  analytics?: string; // { amplitude?: string; "google-analytics"?: string; } stringify + url-encode
  couponIds?: string[];
  platform: "app" | "web";
  credit?: number;
}
let refreshRequested = false;

const CheckoutRedirectLoadingDialog: React.FC = ({}) => {
  const refExceedCoinAmountAlertDialog = React.useRef<IRefHandler>(null);
  const [invalidAlertMessage, setInvalidAlertMessage] = React.useState<
    string | undefined
  >(undefined);

  const currentGroup = useCurrentGroup();
  const currentUser = useCurrentUser();
  const storeSecondaryPanelPath = useStoreSecondaryView();
  const intl = useIntl();

  const dispatchSignIn = useHandleSignIn();
  const { open, payload, hubGroupId, parentGroup } = useStoreState(state => {
    const parentId = selectHubMoimId(state);
    return {
      open: state.commercePage.checkoutRedirectDialog.open,
      payload: state.commercePage.checkoutRedirectDialog.payload,
      hubGroupId: parentId,
      parentGroup: parentId ? state.entities.groups[parentId] : undefined,
    };
  });
  const {
    close,
    openSnackbar,
    dispatchCartItemCheck,
    dispatchRefreshToken,
  } = useActions({
    close: CommerceActionCreators.closeCheckoutRedirectLoadingDialog,
    openSnackbar: SnackBarActionCreators.openSnackbar,
    dispatchCartItemCheck: cartItemCheck,

    dispatchRefreshToken: refreshTokenAction,
  });

  const handleCloseErrorMessageDialog = React.useCallback(() => {
    setInvalidAlertMessage(undefined);
  }, []);

  const checkValidToCheckout = React.useCallback(
    async (items: Moim.Commerce.IGroupedByDeliveryOptionCartSellerItem[]) => {
      if (currentGroup && currentGroup.seller_id) {
        const result = await dispatchCartItemCheck(
          currentGroup.seller_id,
          items,
        );
        if (typeof result === "string") {
          if (result === CALC_403_CODE.INVALID_HOLDER) {
            setInvalidAlertMessage?.(
              intl.formatMessage({
                id: "dialog_funding_purchase_no_rights_body",
              }),
            );

            return false;
          }
          if (result === CALC_403_CODE.INVALID_LIMITATION) {
            setInvalidAlertMessage?.(
              intl.formatMessage({
                id: "dialog_funding_purchase_no_rights_body",
              }),
            );

            return false;
          }
          return;
        } else if (
          result?.totalAdditionalFees?.some(
            fee => fee.errorCode === "EXCEED_AMOUNT",
          )
        ) {
          refExceedCoinAmountAlertDialog.current?.open?.(
            result?.totalAdditionalFees.filter(
              fee => fee.errorCode === "EXCEED_AMOUNT",
            ),
          );
          return false;
        }

        return true;
      }
    },
    [currentGroup, dispatchCartItemCheck, intl, refExceedCoinAmountAlertDialog],
  );

  const handleRedirect = React.useCallback(async () => {
    if (
      !currentUser ||
      !payload ||
      !(await checkValidToCheckout(groupingByDeliveryOption(payload.items))) ||
      payload.items.length === 0
    ) {
      close();
      if (!currentUser) {
        dispatchSignIn();
      }
      if (!payload || payload.items.length === 0) {
        openSnackbar({
          text: intl.formatMessage({ id: "cart/error_no_item" }),
        });
      }
    } else {
      setTimeout(async () => {
        if (currentGroup && currentGroup.seller_id && hubGroupId) {
          const canPassToken = getMoimTokenToCookie(hubGroupId);
          let moimToken = canPassToken?.access_token ?? null;

          if (canPassToken && !refreshRequested) {
            refreshRequested = true;
            moimToken = (await dispatchRefreshToken()) ?? null;
          }

          if (moimToken) {
            refreshRequested = false;
            const params: ICheckoutQueryParameter = {
              groupId: currentGroup.id,
              moimToken,
              next: "/checkout/v2",
              callbackUrl: encodeURIComponent(
                location.origin + new MoimURL.CommercePaymentsList().toString(),
              ),
              callbackContinueUrl: encodeURIComponent(location.origin),
              completeUrl: encodeURIComponent(
                `${
                  location.origin
                }${new MoimURL.CommerceCheckoutComplete().toString()}`,
              ),
              sellerId: currentGroup.seller_id,
              items: encodeURIComponent(
                JSON.stringify(
                  flattenCartSellerItem(payload.items).map(item => ({
                    ...item,
                    items: item.items.map(x => ({
                      productId: x.productId,
                      productVariantId: x.productVariantId,
                      quantity: x.quantity,
                    })),
                  })),
                ),
              ),
              state: encodeURIComponent(
                JSON.stringify({ redirect_from: "payments" }),
              ),
              profile: currentUser
                ? base64.encode(
                    JSON.stringify({
                      id: currentUser.hubUserId,
                      childUserId: currentUser.id,
                      name: currentUser.name,
                      phone: currentUser.phoneNumber,
                      email: currentUser.email,
                      avatar: currentUser.avatar_url,
                    }),
                  )
                : undefined,
              isFromCart: payload.isFromCart,
              privacyUrl: encodeURIComponent(
                (parentGroup ? parentGroup.url : location.origin) +
                  new MoimURL.AboutPolicy().toString(),
              ),
              couponIds: payload.userCoupons,
              platform: "web",
              usedCoins: encodeURIComponent(JSON.stringify(payload.usedCoins)),
              // NOTE: 여기는 아직 어떻게 하는게 좋을지 결정을 못해서..
              // 우선 주석으로 남겨둠...
              // analytics:
              //   currentGroup.analytics &&
              //   Boolean(Object.keys(currentGroup.analytics).length)
              //     ? encodeURIComponent(
              //         JSON.stringify({
              //           amplitude: currentGroup.analytics.amplitude,
              //           "google-analytics": currentGroup.analytics.google,
              //           tagManager: currentGroup.analytics.tagManager,
              //         }),
              //       )
              //     : undefined,
            };

            const stringifiedQuery = qs.stringify(params, {
              arrayFormat: "bracket",
            });
            const newUrl = `${
              isProd() ? PRODUCTION_CHECKOUT_URL : STAGING_CHECKOUT_URL
            }/entry?${stringifiedQuery}`;

            setPaymentRedirectRequest(true);
            setPaymentRedirectLastSeen();
            storeSecondaryPanelPath();

            const instance = AnalyticsClass.getInstance();
            location.href = instance.decorateLink(newUrl);
          }
        }
        close();
      }, 1000);
    }
  }, [
    checkValidToCheckout,
    close,
    currentGroup,
    currentUser,
    dispatchRefreshToken,
    dispatchSignIn,
    hubGroupId,
    intl,
    openSnackbar,
    parentGroup,
    payload,
    storeSecondaryPanelPath,
  ]);

  React.useLayoutEffect(() => {
    if (open) {
      handleRedirect();
    }
  }, [open]);

  return (
    <>
      <Dialog
        open={open}
        BackdropComponent={CustomBackdrop}
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
        onClose={close}
      >
        <Title>
          <FormattedMessage id="move_to_checkout_dialog_title" />
        </Title>
        <Description>
          <FormattedMessage id="move_to_checkout_dialog_body" />
        </Description>
        <DefaultLoader />
      </Dialog>

      <AlertDialog
        open={Boolean(invalidAlertMessage)}
        content={invalidAlertMessage}
        rightButtons={[
          {
            text: intl.formatMessage({ id: "ok_button" }),
            onClick: handleCloseErrorMessageDialog,
          },
        ]}
        onClose={handleCloseErrorMessageDialog}
      />
      <ExceedCoinAmountAlertDialog ref={refExceedCoinAmountAlertDialog} />
    </>
  );
};

export default CheckoutRedirectLoadingDialog;
