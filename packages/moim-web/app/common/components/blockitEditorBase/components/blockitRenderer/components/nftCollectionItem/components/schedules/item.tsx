import * as React from "react";
import styled from "styled-components";
import { MoimURL } from "common/helpers/url";
import Period from "./period";
import useRedirect from "common/hooks/useRedirect";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";
import { H8Bold } from "common/components/designSystem/typos";
import { useSingleLineStyle } from "common/components/designSystem/styles";

const ScheduleListItem = styled.div`
  min-height: ${px2rem(62)};
  margin-bottom: ${px2rem(8)};
  border-radius: ${px2rem(6)};
  background-color: ${props => props.theme.colorV2.colorSet.grey10};
  overflow: hidden;
  padding: ${px2rem(10)} ${px2rem(16)};
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    padding-bottom: ${px2rem(14)};
  }
  &:last-child {
    margin-bottom: 0;
  }
`;

const ScheduleListItemTitle = styled(H8Bold)`
  max-width: 100%;
  font-weight: ${props => props.theme.font.bold};
  color: ${props => props.theme.colorV2.colorSet.grey800};
  ${useSingleLineStyle}
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    margin-bottom: ${px2rem(7)};
  }
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    margin-bottom: ${px2rem(9)};
  }
`;

interface IProps {
  schedule: Moim.NFT.ISchedule;
}

const ScheduleItem: React.FC<IProps> = ({ schedule }: IProps) => {
  const redirect = useRedirect();

  const handleClickViewMore = React.useCallback(
    e => {
      e.stopPropagation();
      redirect(
        new MoimURL.NftScheduleShow({
          contractId: schedule.contractId,
          scheduleId: schedule.id,
        }).toString(),
      );
    },
    [redirect, schedule],
  );

  return (
    <ScheduleListItem onClick={handleClickViewMore}>
      <ScheduleListItemTitle>{schedule.name}</ScheduleListItemTitle>
      <Period
        mintingStartAt={schedule.mintingStartAt}
        mintingEndAt={schedule.mintingEndAt}
      />
    </ScheduleListItem>
  );
};

export default React.memo(ScheduleItem);
