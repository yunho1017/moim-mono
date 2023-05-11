import * as React from "react";
import { FormattedMessage } from "react-intl";
// hook
import useIsMobile from "common/hooks/useIsMobile";
// helper
import { getScheduleDateByGMT, getScheduleStatus } from "common/helpers/nft";
// components
import DDayComponent, { calculateDDay } from "common/components/period";
import { Spacer } from "common/components/designSystem/spacer";
import ShavedText from "common/components/shavedText";
import Chip from "common/components/chips";
// style
import {
  SchedulePeriodStyle,
  SchedulePeriod,
  SchedulePeriodWrapper,
} from "./styled";

type IProps = Pick<Moim.NFT.IContract, "mintingStartAt" | "mintingEndAt">;

const Period: React.FC<IProps> = ({ mintingStartAt, mintingEndAt }: IProps) => {
  const isMobile = useIsMobile();
  const scheduleStatus = getScheduleStatus(mintingStartAt, mintingEndAt);
  const dDayData = calculateDDay({
    startTime: mintingStartAt,
    endTime: mintingEndAt,
  });

  if (!mintingStartAt || !mintingEndAt) return null;

  if (scheduleStatus === "TERMINATED") {
    return (
      <Chip size="small" shape="rectangle" overrideStyle={SchedulePeriodStyle}>
        <FormattedMessage id={"timer_sale_ended"} />
      </Chip>
    );
  }

  if (isMobile) {
    return (
      <SchedulePeriodWrapper>
        <SchedulePeriod>
          <ShavedText
            value={
              <>
                {getScheduleDateByGMT(mintingStartAt)} ~
                {` ${getScheduleDateByGMT(mintingEndAt)}`}
              </>
            }
            line={2}
          />
        </SchedulePeriod>
        <Spacer value={10} />
        <Chip
          size="small"
          shape="rectangle"
          overrideStyle={SchedulePeriodStyle}
        >
          <DDayComponent dDay={dDayData} />
        </Chip>
      </SchedulePeriodWrapper>
    );
  }

  return (
    <SchedulePeriodWrapper>
      <Chip size="small" shape="rectangle" overrideStyle={SchedulePeriodStyle}>
        <DDayComponent dDay={dDayData} />
      </Chip>
      <SchedulePeriod>
        <ShavedText
          value={
            <>
              {getScheduleDateByGMT(mintingStartAt)} ~
              {` ${getScheduleDateByGMT(mintingEndAt)}`}
            </>
          }
          line={2}
        />
      </SchedulePeriod>
    </SchedulePeriodWrapper>
  );
};

export default React.memo(Period);
