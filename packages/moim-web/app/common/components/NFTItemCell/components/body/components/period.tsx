import * as React from "react";
import DDayComponent, { calculateDDay } from "common/components/period";
import {
  NFTItemCellPeriodWrapper,
  NFTItemCellPeriod,
  TimeIcon,
} from "./styled";
import { getScheduleStatus } from "common/helpers/nft";
import { FormattedMessage } from "react-intl";

type IProps = Pick<Moim.NFT.IContract, "mintingStartAt" | "mintingEndAt">;

const Period: React.FC<IProps> = ({ mintingStartAt, mintingEndAt }: IProps) => {
  const dDayData = React.useMemo(() => {
    return calculateDDay({
      startTime: mintingStartAt,
      endTime: mintingEndAt,
    });
  }, [mintingEndAt, mintingStartAt]);

  const scheduleStatus = React.useMemo(
    () => getScheduleStatus(mintingStartAt, mintingEndAt),
    [mintingEndAt, mintingStartAt],
  );

  if (!mintingStartAt || !mintingEndAt) return null;

  return (
    <NFTItemCellPeriodWrapper>
      <TimeIcon />
      <NFTItemCellPeriod>
        {scheduleStatus === "TERMINATED" ? (
          <FormattedMessage id={"timer_terminated"} />
        ) : (
          <DDayComponent dDay={dDayData} />
        )}
      </NFTItemCellPeriod>
    </NFTItemCellPeriodWrapper>
  );
};

export default React.memo(Period);
