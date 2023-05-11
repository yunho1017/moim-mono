import * as React from "react";
import moment from "moment";
import { FormattedMessage } from "react-intl";
import CollapsibleBox from "common/components/collapsibleBox";
import { PaletteDivider } from "common/components/divider";
import Timer from "./components/timer";
import {
  Header,
  boxWrapperStyle,
  boxHeaderWrapperStyle,
  boxBodyWrapperStyle,
  Wrapper,
  ArrowIcon,
  DisableSchedulerWrapper,
} from "./styled";

import { useStoreState } from "app/store";
import { browserLocale } from "app/intl";

interface IProps {
  status: Moim.Group.GroupPeriodType;
  period?: Moim.Group.IGroupPeriod;
  statusConfig?: Moim.IMoimStatusConfig;
}

function Period({ status, period, statusConfig }: IProps) {
  const { defaultLocale } = useStoreState(storeState => ({
    defaultLocale: storeState.app.locale,
  }));
  const locale = browserLocale(defaultLocale ?? undefined);
  const [timerOpenStatus, setTimerOpenStatus] = React.useState(false);

  const handleTimerOpen = React.useCallback(() => {
    setTimerOpenStatus(true);
  }, []);

  const handleTimerClose = React.useCallback(() => {
    setTimerOpenStatus(false);
  }, []);

  const label = React.useMemo(() => {
    if (!period || statusConfig?.type === "none") {
      return null;
    }

    const momentFormat = locale === "en" ? "ll" : "YYYY.MM.DD";
    switch (status) {
      case "ready":
        return (
          <Header>
            <span>
              <FormattedMessage id="activation_start_date" />
            </span>
            {period.startTime && (
              <span>{moment(period.startTime).format(momentFormat)}</span>
            )}
          </Header>
        );
      case "activated":
      case "terminated":
        return (
          <Header>
            <span>
              <FormattedMessage id="activation_end_date" />
            </span>
            {period.endTime && (
              <span>{moment(period.endTime).format(momentFormat)}</span>
            )}
          </Header>
        );
    }
  }, [status, period, statusConfig, locale]);

  if (!statusConfig || statusConfig?.type === "none") {
    return null;
  }

  return (
    <Wrapper>
      <PaletteDivider
        elementPaletteProps={{
          type: "sideArea",
          key: "menuText",
        }}
      />
      {statusConfig.type === "withPeriod" ? (
        <CollapsibleBox
          open={timerOpenStatus}
          title={label}
          onOpen={handleTimerOpen}
          onClose={handleTimerClose}
          icon={<ArrowIcon />}
          boxWrapperStyle={boxWrapperStyle}
          headerWrapperStyle={boxHeaderWrapperStyle}
          bodyWrapperStyle={boxBodyWrapperStyle}
          disableHeadClick={statusConfig.hideTimer}
          disableRightButtonClick={statusConfig.hideTimer}
        >
          <Timer status={status} period={period} statusConfig={statusConfig} />
        </CollapsibleBox>
      ) : (
        <DisableSchedulerWrapper>
          <Timer status={status} period={period} statusConfig={statusConfig} />
        </DisableSchedulerWrapper>
      )}
    </Wrapper>
  );
}

export default Period;
