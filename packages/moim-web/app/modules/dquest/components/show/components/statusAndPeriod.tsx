import * as React from "react";
import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import {
  StatusChip,
  PeriodChip,
} from "common/components/dquestPreview/components/chips";
import { SpacerVertical } from "common/components/designSystem/spacer";
import AccomplishedBadge from "./accomplished";
import { PaddedWrapper, ShareButton, ShareIcon } from "../styled";
import { useOpenSNSShareDialog } from "common/components/snsShareDialog/utils";
import useIsMobile from "common/hooks/useIsMobile";
import { MEDIA_QUERY } from "common/constants/responsive";

const Wrapper = styled.div`
  width: 100%;
  padding: ${px2rem(8)} 0;
  display: flex;
  align-items: center;

  .left,
  .right {
    display: flex;
    align-items: center;
  }

  .left {
    width: 100%;
    min-width: 0;
    flex: 1;
    gap: ${px2rem(4)};
  }

  .right {
    width: fit-content;
  }

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    height: ${px2rem(47)};
  }
`;

export const RightPositionContainer = styled.div`
  gap: ${px2rem(16)};
`;

interface IProps {
  isAccomplished: boolean;
  status?: Moim.DQuest.QUEST_DISPLAY_STATUS;
  startAt?: number;
  endAt?: number;
  viewerCount?: number;
}

const StatusAndPeriod: React.FC<IProps> = ({
  status = "ACTIVE",
  startAt,
  endAt,
  isAccomplished,
}) => {
  const isMobile = useIsMobile();
  const openShareDialog = useOpenSNSShareDialog(location.href);

  const periodElem = React.useMemo(() => {
    if (startAt && endAt) {
      return <PeriodChip startAt={startAt} endAt={endAt} />;
    }

    return null;
  }, [endAt, startAt]);

  return (
    <PaddedWrapper>
      <Wrapper>
        <div className="left">
          <StatusChip status={status} />
          {periodElem}
        </div>
        <SpacerVertical value={4} />

        <RightPositionContainer className="right">
          {/* NOTE: Temporary disabled feature. 어드민 설정값이 을 적용할때 재활성화 합니다. */}
          {/* {viewerCount ? <ViewerChip viewerCount={viewerCount} /> : null} */}
          {!isMobile ? (
            <ShareButton onClick={openShareDialog}>
              <ShareIcon />
            </ShareButton>
          ) : null}
        </RightPositionContainer>
      </Wrapper>
      <AccomplishedBadge isAccomplished={isAccomplished} />
    </PaddedWrapper>
  );
};

export default React.memo(StatusAndPeriod);
