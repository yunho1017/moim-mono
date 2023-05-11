import * as React from "react";
import shortid from "shortid";
import moment from "moment";
import { useIntl } from "react-intl";
import Coupon, {
  CLICK_DOWNLOAD_EVENT,
  CouponComponentStatusType,
} from "common/components/commerce/coupon";
import AlertDialog from "common/components/alertDialog";
import useOpenState from "common/hooks/useOpenState";
import { useHandleSignIn } from "common/hooks/useHandleSign";
import { useStoreState } from "app/store";
import { checkCurrentDateStatus } from "./utils";
import { IButton } from "common/components/modalLayout/alert/types";
import { errorParseData } from "common/helpers/APIErrorParser";
import { useNativeSecondaryView } from "common/hooks/useSecondaryView";
import { MoimURL } from "app/common/helpers/url";
import { PostShowContext } from "app/modules/postShow/context";

import { CouponSkeleton } from "./styled";

interface IProps {
  isLoading: boolean;
  coupon?: Moim.Commerce.ICoupons;
  onClickDownload(id: Moim.Id): Promise<Moim.Commerce.ICoupons>;
}

const CouponItem: React.FC<IProps> = ({
  isLoading,
  coupon,
  onClickDownload,
}) => {
  const intl = useIntl();
  const { redirect } = useNativeSecondaryView();
  const postShowContext = React.useContext(PostShowContext);
  const dispatchSignIn = useHandleSignIn();
  const hasCurrentUser = useStoreState(state =>
    Boolean(state.app.currentUserId),
  );
  const [isDownloadLoading, setLoadStatus] = React.useState(false);
  const [alertContext, setAlertContext] = React.useState<{
    title?: string;
    body: string;
    buttons: IButton[];
  }>({
    body: "",
    buttons: [],
  });
  const [hasFocus, setFocus] = React.useState(false);
  const { isOpen: isOpenAlert, open: handleAlertOpen, close } = useOpenState();

  const handleAlertClose = React.useCallback(() => {
    setFocus(false);
    close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpenCouponList = React.useCallback(
    (id?: Moim.Id) => {
      handleAlertClose();
      if (postShowContext && postShowContext.isModalShow) {
        postShowContext.onBack();
      }
      if (typeof id === "string") {
        redirect(new MoimURL.CommerceMyBenefitCouponsFocus({ id }).toString());
      } else {
        redirect(new MoimURL.CommerceMyBenefitCoupons().toString());
      }
    },
    [postShowContext?.isModalShow, postShowContext?.onBack],
  );

  const handleClickDownloadButton: CLICK_DOWNLOAD_EVENT = React.useCallback(
    (id, status) => {
      if (!hasCurrentUser) {
        dispatchSignIn();
        return;
      }

      const dateFormat = intl.formatMessage({
        id: "datetime_format_full_time_without_second_year_2digit",
      });
      if (status === "download") {
        setLoadStatus(true);
        onClickDownload(id)
          .then(downloadCoupon => {
            setAlertContext({
              title: intl.formatMessage({
                id: "toast_message_coupon_download_success_title",
              }),
              body: intl.formatMessage(
                {
                  id:
                    downloadCoupon?.status === "active"
                      ? "toast_message_coupon_download_success_now_available"
                      : "toast_message_coupon_download_success_unavailable_yet",
                },
                {
                  date_time: coupon?.startAt
                    ? moment(coupon.startAt).format(dateFormat)
                    : "Null",
                },
              ),
              buttons: [
                {
                  text: intl.formatMessage({ id: "button_close" }),
                  onClick: handleAlertClose,
                },
                {
                  text: intl.formatMessage({
                    id: "button_go_my_coupon_list",
                  }),
                  onClick: () => handleOpenCouponList(downloadCoupon.id),
                },
              ],
            });
            handleAlertOpen();
            setFocus(true);
          })
          .catch(err => {
            let errorTextKey = "";
            const error = errorParseData(err);
            if (
              error?.code === "TOAST_MESSAGE_COUPON_DOWNLOAD_PERIOD_EXPIRED"
            ) {
              errorTextKey = "toast_message_coupon_download_period_expired";
            } else if (
              error?.code === "TOAST_MESSAGE_COUPON_NOT_YET_IN_DOWNLOAD_PERIOD"
            ) {
              errorTextKey = "toast_message_coupon_not_yet_in_download_period";
            } else if (
              error?.code === "TOAST_MESSAGE_MAX_COUPON_DOWNLOAD_COUNT_EXCEEDED"
            ) {
              errorTextKey = "toast_message_max_coupon_download_count_exceeded";
            } else {
              errorTextKey = "toast_message_coupon_download_unavailable_body";
            }

            setAlertContext({
              body: intl.formatMessage(
                { id: errorTextKey },
                {
                  date_time: coupon?.downloadConfig?.period.start
                    ? moment(coupon.downloadConfig.period.start).format(
                        dateFormat,
                      )
                    : "Null",
                },
              ),
              buttons: [
                {
                  text: intl.formatMessage({ id: "button_close" }),
                  onClick: handleAlertClose,
                },
              ],
            });
            handleAlertOpen();
          })
          .finally(() => {
            setLoadStatus(false);
          });
      } else if (status === "alreadyDownload") {
        setAlertContext({
          body: intl.formatMessage({
            id: "toast_message_coupon_already_downloaded_body",
          }),
          buttons: [
            {
              text: intl.formatMessage({ id: "button_close" }),
              onClick: handleAlertClose,
            },
            {
              text: intl.formatMessage({ id: "button_go_my_coupon_list" }),
              onClick: handleOpenCouponList,
            },
          ],
        });
        handleAlertOpen();
      } else if (status === "downloadExpired") {
        setAlertContext({
          body: intl.formatMessage({
            id: "toast_message_coupon_download_period_expired",
          }),
          buttons: [
            {
              text: intl.formatMessage({ id: "button_close" }),
              onClick: handleAlertClose,
            },
          ],
        });
        handleAlertOpen();
      } else if (status === "downloadScheduled") {
        setAlertContext({
          body: intl.formatMessage({
            id: "toast_message_coupon_not_yet_in_download_period",
          }),
          buttons: [
            {
              text: intl.formatMessage({ id: "button_close" }),
              onClick: handleAlertClose,
            },
          ],
        });
        handleAlertOpen();
      }
    },
    [
      dispatchSignIn,
      hasCurrentUser,
      intl,
      onClickDownload,
      coupon,
      handleAlertClose,
      handleOpenCouponList,
      handleAlertOpen,
    ],
  );

  return (
    <React.Fragment key={`downloadable_coupon_${shortid()}`}>
      {isLoading || coupon === undefined ? (
        <CouponSkeleton />
      ) : coupon ? (
        <CouponElement
          isDownloadLoading={isDownloadLoading}
          hasFocus={hasFocus}
          coupon={coupon}
          onClickDownloadButton={handleClickDownloadButton}
        />
      ) : null}
      <AlertDialog
        open={isOpenAlert}
        title={alertContext.title}
        content={alertContext.body}
        rightButtons={alertContext.buttons}
        onClose={handleAlertClose}
      />
    </React.Fragment>
  );
};

const CouponElement: React.FC<{
  isDownloadLoading: boolean;
  hasFocus: boolean;
  coupon: Moim.Commerce.ICoupons;
  onClickDownloadButton: CLICK_DOWNLOAD_EVENT;
}> = React.memo(
  ({ isDownloadLoading, hasFocus, coupon, onClickDownloadButton }) => {
    const downloadStatus:
      | CouponComponentStatusType
      | undefined = React.useMemo(() => {
      if (!coupon.downloadConfig) {
        return undefined;
      }

      switch (
        checkCurrentDateStatus(
          coupon.downloadConfig.period.start ?? -1,
          coupon.downloadConfig.period.end ?? -1,
        )
      ) {
        case "before":
          return "scheduled";
        case "after":
          return "expired";
        case "during":
          return "active";
      }
    }, [coupon.downloadConfig]);

    return (
      <Coupon
        currency={coupon.currency}
        coupon={coupon}
        isLoadingDownloadButton={isDownloadLoading}
        status={coupon.status}
        downloadStatus={downloadStatus}
        download={
          Boolean(coupon.downloadConfig)
            ? {
                isDownloaded: Boolean(coupon.isDownloaded),
              }
            : undefined
        }
        hasFocus={hasFocus}
        expiredAt={coupon.endAt}
        onClickDownload={onClickDownloadButton}
      />
    );
  },
);

export default React.memo(CouponItem);
