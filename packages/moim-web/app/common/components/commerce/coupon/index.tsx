import * as React from "react";
import { useIntl, FormattedMessage } from "react-intl";
import debounce from "lodash/debounce";
import moment from "moment-timezone";
import ReactCardFlip from "react-card-flip";
import { InView } from "react-intersection-observer";
import { MoimURL } from "common/helpers/url";
import useRedirect from "common/hooks/useRedirect";
import useBlinkBehavior from "common/hooks/useBlinkBehavior";
import CurrencyFormatter from "common/components/currencyFormatter";

import {
  Wrapper,
  CouponFrame,
  InnerContainer,
  Inner,
  MoreInformation,
  MoreInfoLabel,
  InfoIcon,
  CloseIcon,
  Head,
  TitlePrice,
  DDayContainer,
  CouponChip,
  ConditionLabel,
  Bottom,
  AffectLabel,
  ErrorLabel,
  FullExpiredAtLabel,
  NoticeTitle,
  NoticeContent,
  AffectedThingLink,
  CheckMark,
  AffectedThing,
  DownloadIcon,
  LoadingWrapper,
  DownloadCheckIcon,
  DownloadedIconWrapper,
  DownloadIconWrapper,
  CircleLoading,
} from "./styled";

export type CouponComponentStatusType = Moim.Commerce.CouponStatus | "disable";
export type CLICK_DOWNLOAD_EVENT_STATUS =
  | "download"
  | "alreadyDownload"
  | "downloadExpired"
  | "downloadScheduled";
export type CLICK_DOWNLOAD_EVENT = (
  id: Moim.Id,
  status: CLICK_DOWNLOAD_EVENT_STATUS,
) => void;

interface IProps {
  className?: string;
  checked?: boolean;
  currency: string;
  coupon: Moim.Commerce.ICoupon;
  status: CouponComponentStatusType;
  expiredAt: number;
  downloadStatus?: CouponComponentStatusType;
  isLoadingDownloadButton?: boolean;
  enableAt?: number;
  disableScroll?: boolean;
  errorReason?: string;
  download?: {
    isDownloaded: boolean;
  };
  hasFocus?: boolean;
  enableScrollIntoView?: boolean;
  highlightColor?: string;
  onClickDownload?: CLICK_DOWNLOAD_EVENT;
  onClick?(): void;
}

const CommerceCoupon: React.FC<IProps> = ({
  checked,
  currency,
  coupon,
  status,
  enableAt,
  expiredAt,
  downloadStatus,
  className,
  disableScroll,
  errorReason,
  isLoadingDownloadButton,
  download,
  hasFocus,
  enableScrollIntoView,
  highlightColor,
  onClick,
  onClickDownload,
}) => {
  const refThis = React.useRef<HTMLDivElement>(null);
  const redirect = useRedirect();
  const { status: focused, onSetAction: setOnFocus } = useBlinkBehavior({
    resolveTime: 1000,
  });
  const intl = useIntl();
  const [isFlipped, setFlipStatus] = React.useState(false);

  const handleClickMore: React.MouseEventHandler<HTMLDivElement> = React.useCallback(
    e => {
      e.stopPropagation();
      e.preventDefault();
      setFlipStatus(!isFlipped);
    },
    [isFlipped],
  );

  const expiredAtDDay = React.useMemo(() => {
    if (expiredAt) {
      return moment().diff(expiredAt, "days");
    }
    return null;
  }, [expiredAt]);

  const enableAtDDay = React.useMemo(() => {
    if (enableAt) {
      return moment().diff(enableAt, "days");
    }
    return null;
  }, [enableAt]);

  const inActiveStatus = React.useMemo(() => {
    const isCouponActive = status === "active";
    const isDownloadActive = downloadStatus === "active";

    if (download) {
      return isCouponActive && isDownloadActive;
    }
    return isCouponActive;
  }, [download, downloadStatus, status]);

  const expiredDateTime = React.useMemo(() => {
    const format = intl.formatMessage({
      id: "datetime_format_full_time_without_second_year_2digit",
    });
    if (status === "scheduled" && enableAt) {
      return `${moment(enableAt).format(format)} ~ ${moment(expiredAt).format(
        format,
      )}`;
    }
    return intl.formatMessage(
      { id: "valid_until" },
      { expires: moment(expiredAt).format(format) },
    );
  }, [status, expiredAt, enableAt, intl]);

  const chipContent = React.useMemo(() => {
    switch (status) {
      case "used": {
        return <FormattedMessage id="my_shopping_coupon_status_used" />;
      }
      case "expired": {
        return <FormattedMessage id="my_shopping_coupon_status_expired" />;
      }
      case "deleted": {
        return <FormattedMessage id="my_shopping_coupon_status_deleted" />;
      }
      default:
        if (enableAtDDay !== null && enableAtDDay < 0) {
          return (
            <FormattedMessage
              id="my_shopping_coupon_days_left_to_be_available"
              values={{ days_left: Math.abs(enableAtDDay) }}
            />
          );
        }

        if (expiredAtDDay !== null && expiredAtDDay <= 0) {
          return `D - ${Math.abs(expiredAtDDay)}`;
        }

        if (status === "active") {
          return <FormattedMessage id="my_shopping_coupon_status_active" />;
        }
    }
  }, [status, enableAtDDay, expiredAtDDay]);

  const couponConditionDescription = React.useMemo(() => {
    if (coupon.condition?.minPurchaseAmount && coupon.benefit.maxAmount) {
      return intl.formatMessage(
        { id: "my_shopping_coupon_condition_over_and_max" },
        {
          min_price_text: (
            <CurrencyFormatter
              currency={currency}
              value={coupon.condition.minPurchaseAmount}
            />
          ),

          max_price_text: (
            <CurrencyFormatter
              currency={currency}
              value={coupon.benefit.maxAmount}
            />
          ),
        },
      );
    }

    if (coupon.condition?.minPurchaseAmount !== undefined) {
      return intl.formatMessage(
        { id: "my_shopping_coupon_condition_over" },
        {
          min: (
            <CurrencyFormatter
              currency={currency}
              value={coupon.condition.minPurchaseAmount}
            />
          ),
        },
      );
    }

    if (coupon.benefit.maxAmount) {
      return intl.formatMessage(
        { id: "my_shopping_coupon_condition_max" },
        {
          price_text: (
            <CurrencyFormatter
              currency={currency}
              value={coupon.benefit.maxAmount}
            />
          ),
        },
      );
    }

    return null;
  }, [coupon.benefit.maxAmount, coupon.condition, currency, intl]);

  const handleDebouncedDownloadClick = React.useCallback(
    debounce((_status: "download" | "alreadyDownload") => {
      let managedStatus: CLICK_DOWNLOAD_EVENT_STATUS = _status;
      switch (downloadStatus) {
        case "expired": {
          managedStatus = "downloadExpired";
          break;
        }
        case "scheduled": {
          managedStatus = "downloadScheduled";
          break;
        }
      }
      onClickDownload?.(coupon.id, managedStatus);
    }, 300),
    [coupon.id, downloadStatus, onClickDownload],
  );

  const handleClickDownload: React.MouseEventHandler<HTMLElement> = React.useCallback(
    e => {
      e.preventDefault();
      e.stopPropagation();
      handleDebouncedDownloadClick("download");
    },
    [handleDebouncedDownloadClick],
  );

  const handleClickDownloaded: React.MouseEventHandler<HTMLElement> = React.useCallback(
    e => {
      e.preventDefault();
      e.stopPropagation();
      handleDebouncedDownloadClick("alreadyDownload");
    },
    [handleDebouncedDownloadClick],
  );

  const hasClickHandler = Boolean(onClick);

  const appliedThings = React.useMemo(
    () =>
      coupon.targets?.map(target => {
        if (hasClickHandler) {
          return <AffectedThing>{target.label}</AffectedThing>;
        }
        let url = "";
        switch (target.type) {
          case "seller": {
            url = new MoimURL.CommerceSellers({
              id: target.id,
              section: "products",
            }).toString();
            break;
          }

          case "product": {
            url = new MoimURL.CommerceProductShow({
              id: target.id,
            }).toString();
            break;
          }

          case "product_set": {
            url = new MoimURL.CommerceProductSets({
              id: target.id,
              section: "products",
            }).toString();
            break;
          }

          case "category": {
            url = new MoimURL.CommerceCategories({
              id: target.id,
              section: "products",
            }).toString();
            break;
          }
        }
        return (
          <AffectedThingLink
            onClick={() => {
              redirect(url);
            }}
          >
            {target.label}
          </AffectedThingLink>
        );
      }) ?? "",
    [coupon.targets, redirect, hasClickHandler],
  );

  const downloadButtonElement = React.useMemo(() => {
    if (!download?.isDownloaded) {
      if (isLoadingDownloadButton) {
        return (
          <LoadingWrapper>
            <CircleLoading />
          </LoadingWrapper>
        );
      }
      return (
        <DownloadIconWrapper
          role="button"
          inactive={!inActiveStatus}
          onClick={handleClickDownload}
        >
          <DownloadIcon />
        </DownloadIconWrapper>
      );
    } else {
      return (
        <DownloadedIconWrapper
          role="button"
          inactive={!inActiveStatus}
          onClick={handleClickDownloaded}
        >
          <DownloadCheckIcon />
        </DownloadedIconWrapper>
      );
    }
  }, [
    inActiveStatus,
    download,
    isLoadingDownloadButton,
    handleClickDownload,
    handleClickDownloaded,
  ]);

  const handleBodyClick: React.MouseEventHandler<HTMLElement> = React.useCallback(
    e => {
      e.preventDefault();
      e.stopPropagation();

      if (onClick) {
        onClick();
      } else if (onClickDownload) {
        if (!download?.isDownloaded) {
          handleDebouncedDownloadClick("download");
        } else {
          handleDebouncedDownloadClick("alreadyDownload");
        }
      }
    },
    [
      onClick,
      onClickDownload,
      download?.isDownloaded,
      handleDebouncedDownloadClick,
    ],
  );

  const handleInViewChange = React.useCallback((inView: boolean) => {
    if (hasFocus && inView) {
      setOnFocus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useLayoutEffect(() => {
    if (hasFocus && enableScrollIntoView) {
      refThis.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [hasFocus]);

  return (
    <InView
      threshold={1}
      triggerOnce={true}
      skip={!hasFocus}
      onChange={handleInViewChange}
    >
      <ReactCardFlip
        isFlipped={isFlipped}
        flipDirection="horizontal"
        cardZIndex="0"
        containerStyle={{
          willChange: "transform, transform-style, transition",
        }}
      >
        <Wrapper
          key={`coupon_frame_front_${coupon.id}`}
          ref={refThis}
          onClick={handleBodyClick}
          className={className}
          role="button"
        >
          <CouponFrame
            hasFocus={focused}
            selected={checked}
            highlightColor={highlightColor}
          >
            <InnerContainer>
              <Inner enableScroll={!isFlipped && !disableScroll}>
                <Head>
                  <TitlePrice inactive={!inActiveStatus}>
                    {coupon.benefit.type === "rate" ? (
                      <span>{coupon.benefit.value}%</span>
                    ) : (
                      <CurrencyFormatter
                        currency={currency}
                        value={coupon.benefit.value}
                      />
                    )}
                    {checked && <CheckMark />}
                  </TitlePrice>
                  {Boolean(download) ? (
                    downloadButtonElement
                  ) : (
                    <DDayContainer>
                      <CouponChip shape="round" size="small" status={status}>
                        {chipContent}
                      </CouponChip>
                    </DDayContainer>
                  )}
                </Head>
                <ConditionLabel inactive={!inActiveStatus}>
                  {coupon.name}
                </ConditionLabel>
                <Bottom>
                  <AffectLabel>{couponConditionDescription}</AffectLabel>
                  {errorReason && <ErrorLabel>{errorReason}</ErrorLabel>}
                  <FullExpiredAtLabel>{expiredDateTime}</FullExpiredAtLabel>
                </Bottom>
                <MoreInformation onClick={handleClickMore}>
                  <MoreInfoLabel>
                    <FormattedMessage id="my_shopping_coupon_applicable_products" />
                  </MoreInfoLabel>
                  <InfoIcon />
                </MoreInformation>
              </Inner>
            </InnerContainer>
          </CouponFrame>
        </Wrapper>

        <Wrapper key={`coupon_frame_back_${coupon.id}`}>
          <CouponFrame>
            <InnerContainer>
              <Inner enableScroll={isFlipped}>
                <NoticeTitle>
                  <FormattedMessage id="my_shopping_coupon_applicable_products" />
                </NoticeTitle>
                <NoticeContent>{appliedThings}</NoticeContent>

                <MoreInformation onClick={handleClickMore}>
                  <CloseIcon />
                </MoreInformation>
              </Inner>
            </InnerContainer>
          </CouponFrame>
        </Wrapper>
      </ReactCardFlip>
    </InView>
  );
};

export default React.memo(CommerceCoupon);
