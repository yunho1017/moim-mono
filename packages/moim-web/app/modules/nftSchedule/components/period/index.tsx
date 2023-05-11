import * as React from "react";
import moment from "moment";
import { FormattedMessage } from "react-intl";
import {
  SchedulePeriodStyle,
  ScheduleTimerText,
  UpcomingTimerWrapper,
} from "./styled";
import Timer from "app/modules/commerce/components/productShow/components/timer";
import { getScheduleStatus } from "common/helpers/nft";
import {
  TopChip,
  Content,
} from "common/components/blockitEditorBase/components/blockitRenderer/components/timer/styled";
import { TickDuration } from "common/components/blockitEditorBase/components/blockitRenderer/components/timer";

type IProps = Pick<Moim.NFT.IContract, "mintingStartAt" | "mintingEndAt">;

const Period: React.FC<IProps> = ({ mintingStartAt, mintingEndAt }: IProps) => {
  const scheduleStatus = getScheduleStatus(mintingStartAt, mintingEndAt);

  if (!mintingStartAt || !mintingEndAt) return null;

  switch (scheduleStatus) {
    case "TERMINATED": {
      return (
        <ScheduleTimerText>
          <FormattedMessage id={"timer_sale_ended"} />
        </ScheduleTimerText>
      );
    }
    case "UPCOMING": {
      const startMoment = moment(mintingStartAt).toString();
      return (
        <UpcomingTimerWrapper bgStyle="default" phase="running">
          <TopChip>
            <FormattedMessage id={"timer_mint_coming_soon"} />
          </TopChip>
          <Content>
            <TickDuration endDateTime={startMoment} />
          </Content>
        </UpcomingTimerWrapper>
      );
    }
    default: {
      return (
        <Timer
          size="normal"
          endDateTime={mintingEndAt}
          overrideStyle={SchedulePeriodStyle}
        />
      );
    }
  }
};

export default React.memo(Period);
