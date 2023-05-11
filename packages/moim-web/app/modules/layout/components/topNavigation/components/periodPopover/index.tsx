import * as React from "react";
import moment from "moment";
import { FormattedMessage } from "react-intl";
import ReactResizeDetector from "react-resize-detector";
import ResponsiveMenu from "common/components/responsiveMenu";
import useCurrentGroup from "common/hooks/useCurrentGroup";
import { Wrapper, Label } from "./styled";
import Timer from "./timer";
import { useStoreState } from "app/store";
import { browserLocale } from "app/intl";

interface IProps extends React.ComponentProps<typeof ResponsiveMenu> {
  onClickMenuButton: () => void;
}

export default function PeriodPopover({ onClickMenuButton, ...props }: IProps) {
  const currentGroup = useCurrentGroup();
  const { defaultLocale } = useStoreState(storeState => ({
    defaultLocale: storeState.app.locale,
  }));
  const locale = browserLocale(defaultLocale ?? undefined);
  const [minHeight, setMinHeight] = React.useState<number | undefined>();
  const label = React.useMemo(() => {
    if (
      !currentGroup ||
      currentGroup.status_config?.type === "none" ||
      !currentGroup.period
    ) {
      return null;
    }

    const momentFormat = locale === "en" ? "ll" : "YYYY.MM.DD";
    switch (currentGroup.status) {
      case "ready":
        return (
          <Label>
            <span>
              <FormattedMessage id="activation_start_date" />
            </span>
            {currentGroup.period.startTime && (
              <span>
                {moment(currentGroup.period.startTime).format(momentFormat)}
              </span>
            )}
          </Label>
        );
      case "activated":
      case "terminated":
        return (
          <Label>
            <span>
              <FormattedMessage id="activation_end_date" />
            </span>
            {currentGroup.period.endTime && (
              <span>
                {moment(currentGroup.period.endTime).format(momentFormat)}
              </span>
            )}
          </Label>
        );
    }
  }, [currentGroup, locale]);

  const handleResize = React.useCallback((_width: number, height: number) => {
    setMinHeight(height);
  }, []);

  return (
    <ResponsiveMenu {...props} minHeight={minHeight}>
      <ReactResizeDetector handleHeight={true} onResize={handleResize}>
        <Wrapper>
          {label}
          {currentGroup &&
            !(
              currentGroup.status_config?.type === "withPeriod" &&
              currentGroup.status_config?.hideTimer
            ) && (
              <Timer
                period={currentGroup.period}
                status={currentGroup.status}
                statusConfig={currentGroup.status_config}
              />
            )}
        </Wrapper>
      </ReactResizeDetector>
    </ResponsiveMenu>
  );
}
