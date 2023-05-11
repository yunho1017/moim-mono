import * as React from "react";
import { isEqual } from "lodash";

import { FormattedMessage } from "react-intl";
import { useLocation } from "react-router";
import { DefaultLayout } from "app/modules/secondaryView/native/layout";
import useIsMobile from "common/hooks/useIsMobile";
import useCancelToken from "common/hooks/useCancelToken";
import { useActions, useStoreState } from "app/store";
import { paymentSelector } from "app/selectors/commerce";
import UnsignedChecker from "common/components/unsiginedChecker";
import { PermissionDeniedFallbackType } from "app/enums";
import { useNativeSecondaryView } from "common/hooks/useSecondaryView";
import useGroupTexts from "common/hooks/useGroupTexts";
import {
  ActionCreators as CommerceActionCreators,
  getPayment as getPaymentAction,
} from "app/actions/commerce";
import { MoimURL } from "common/helpers/url";
import ReviewCreateDialog from "../reviewCreateDialog";
import CancelPaymentDialog from "../paymentCancelDialog";
import PaymentDetailComponent from "./component";
import {
  AppBarTitleWrapper,
  AppBarStickyWrapperStyle,
  LeftButtonWrapper,
  BackIcon,
} from "./styled";

interface IProps {
  id: string;
}

export default function PaymentDetail({ id }: IProps) {
  const isMobile = useIsMobile();
  const cancelToken = useCancelToken();
  const { redirect } = useNativeSecondaryView();
  const titleTexts = useGroupTexts("my_shopping_orders_details_title");
  const { key } = useLocation();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const paymentEntity = useStoreState(
    state => paymentSelector(state, id),
    isEqual,
  );
  const currentUserId = useStoreState(state => state.app.currentUserId);
  const { dispatchGetPayment, openPaymentCancelDialog } = useActions({
    dispatchGetPayment: getPaymentAction,
    openPaymentCancelDialog: CommerceActionCreators.openCancelPaymentDialog,
  });

  const handleBackButtonClick = React.useCallback(() => {
    redirect(new MoimURL.CommercePaymentsList().toString());
  }, [redirect]);

  const getPayment = React.useCallback(async () => {
    if (id) {
      try {
        setIsLoading(true);
        dispatchGetPayment(id, cancelToken.current.token);
      } finally {
        setIsLoading(false);
      }
    }
  }, [cancelToken, dispatchGetPayment, id]);

  const renderBackButton = React.useCallback(
    () => (
      <LeftButtonWrapper onClick={handleBackButtonClick}>
        <BackIcon />
      </LeftButtonWrapper>
    ),
    [handleBackButtonClick],
  );

  const handleAfterCancelSubmitAction = React.useCallback(() => {
    getPayment();
  }, [getPayment]);

  const handleClickPaymentCancel = React.useCallback(() => {
    if (paymentEntity) {
      openPaymentCancelDialog({
        type: "payment",
        targetPaymentId: paymentEntity.id,
        targetPurchaseItemIds: [],
        paymentMethodType: paymentEntity.payMethod,
        paymentStatus: paymentEntity.status,
      });
    }
  }, [openPaymentCancelDialog, paymentEntity]);

  React.useEffect(() => {
    if (id && currentUserId) {
      getPayment();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, key]);

  return (
    <>
      <DefaultLayout
        appBar={{
          wrapperStickyStyle: AppBarStickyWrapperStyle,
          titleElement: (
            <AppBarTitleWrapper>
              {titleTexts ? (
                titleTexts.singular
              ) : (
                <FormattedMessage id="my_shopping/purchase_details/page_title" />
              )}
            </AppBarTitleWrapper>
          ),
          titleAlignment: "Center",
          leftButton: !isMobile && (
            <LeftButtonWrapper onClick={handleBackButtonClick}>
              <BackIcon />
            </LeftButtonWrapper>
          ),
          enableScrollParallax: true,
          alwaysShowAppBarTitle: true,
        }}
        renderCloseButton={isMobile ? renderBackButton : undefined}
      >
        <UnsignedChecker fallbackType={PermissionDeniedFallbackType.SCREEN}>
          <PaymentDetailComponent
            payment={paymentEntity}
            isLoading={isLoading}
            onClickPaymentCancel={handleClickPaymentCancel}
          />
        </UnsignedChecker>
      </DefaultLayout>

      <ReviewCreateDialog />
      <CancelPaymentDialog
        onAfterCancelSubmitAction={handleAfterCancelSubmitAction}
      />
    </>
  );
}
