import * as React from "react";
import { FormattedMessage } from "react-intl";
import DDayComponent, { calculateDDay } from "common/components/period";
import Chip from "common/components/chips";
import {
  SchedulePeriodStyle,
  SchedulePeriod,
  SchedulePeriodWrapper,
} from "./styled";
import { getScheduleDateByGMT, getScheduleStatus } from "common/helpers/nft";
import ShavedText from "common/components/shavedText";
import useIsMobile from "common/hooks/useIsMobile";
import { Spacer } from "common/components/designSystem/spacer";

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
      <Chip size="medium" shape="rectangle" overrideStyle={SchedulePeriodStyle}>
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
          size="medium"
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
      <Chip size="medium" shape="rectangle" overrideStyle={SchedulePeriodStyle}>
        <DDayComponent dDay={dDayData} />
      </Chip>
    </SchedulePeriodWrapper>
  );
};

export default React.memo(Period);
