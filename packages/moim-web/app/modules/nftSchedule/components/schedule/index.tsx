import * as React from "react";
import { FormattedMessage } from "react-intl";
import { Spacer } from "common/components/designSystem/spacer";
import {
  ScheduleGridTemplate,
  ScheduleStartAt,
  ScheduleEndAt,
  ScheduleWrapper,
  ScheduleRange,
  ScheduleMaxAmount,
  // ScheduleTitle,
  ScheduleDetailDesc,
  ScheduleDetailTitle,
  BlockNumberDesc,
} from "./styled";
import { getScheduleDateByGMT } from "common/helpers/nft";

interface IProps {
  startAt: number;
  endAt: number;
  rangeStart: number;
  rangeEnd: number;
  maxAmountPerAddress: number;
  startBlockNumber: number;
  endBlockNumber: number;
}

const Schedule: React.FC<IProps> = ({
  startAt,
  endAt,
  rangeStart,
  rangeEnd,
  maxAmountPerAddress,
  startBlockNumber,
  endBlockNumber,
}: IProps) => (
  <ScheduleWrapper>
    <Spacer value={16} />
    <ScheduleGridTemplate>
      <ScheduleStartAt>
        <ScheduleDetailTitle>
          <FormattedMessage id="activation_mint_start_at" />
        </ScheduleDetailTitle>
        <ScheduleDetailDesc>{getScheduleDateByGMT(startAt)}</ScheduleDetailDesc>
        <Spacer value={8} />
        <BlockNumberDesc>
          <FormattedMessage id="block_number" />
          <span> #{startBlockNumber}</span>
        </BlockNumberDesc>
        <Spacer value={23} />
      </ScheduleStartAt>
      <ScheduleEndAt>
        <ScheduleDetailTitle>
          <FormattedMessage id="activation_mint_end_at" />
        </ScheduleDetailTitle>
        <ScheduleDetailDesc>{getScheduleDateByGMT(endAt)}</ScheduleDetailDesc>
        <Spacer value={8} />
        <BlockNumberDesc>
          <FormattedMessage id="block_number" />
          <span> #{endBlockNumber}</span>
        </BlockNumberDesc>
        <Spacer value={23} />
      </ScheduleEndAt>
      <ScheduleMaxAmount>
        <ScheduleDetailTitle>
          <FormattedMessage id="nft_collection_sale_schedule_show_info_section_max_count" />
        </ScheduleDetailTitle>
        <ScheduleDetailDesc oneLineText={true}>
          {maxAmountPerAddress}
        </ScheduleDetailDesc>
      </ScheduleMaxAmount>
      <ScheduleRange>
        <ScheduleDetailTitle>
          <FormattedMessage id="nft_collection_sale_schedule_show_info_section_token_range" />
        </ScheduleDetailTitle>
        <ScheduleDetailDesc oneLineText={true}>
          {rangeStart} ~ {rangeEnd}
        </ScheduleDetailDesc>
      </ScheduleRange>
    </ScheduleGridTemplate>
  </ScheduleWrapper>
);

export default React.memo(Schedule);
