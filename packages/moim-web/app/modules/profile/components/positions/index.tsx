import * as React from "react";
import { FormattedMessage } from "react-intl";
import { SectionTitle } from "../profileComponent/styledComponent";
import { H8Bold } from "common/components/designSystem/typos";
import { Wrapper, PositionContainer, PositionCell } from "./styledComponents";
import PositionChip from "common/components/chips/preset/positionChip";
import { SkeletonBox } from "common/components/skeleton";
import { PositionEmpty } from "../empty";

import { useNativeSecondaryView } from "app/common/hooks/useSecondaryView";
import { MoimURL } from "app/common/helpers/url";
import { px2rem } from "common/helpers/rem";
import { useStoreState } from "app/store";

const PositionItem: React.FC<{
  positionId: string;
  onClick: React.MouseEventHandler<HTMLSpanElement>;
}> = ({ positionId, onClick }) => {
  const position = useStoreState(state => state.entities.positions[positionId]);
  if (!position) {
    return null;
  }
  return (
    <PositionCell onClick={onClick}>
      <PositionChip
        id={position.id}
        name={position.name}
        size="medium"
        color={position.color}
        maxContentWidth={270}
        onClick={onClick}
      />
    </PositionCell>
  );
};
interface IProps {
  positions: Moim.Id[] | undefined;
}

const Positions: React.FC<IProps> = ({ positions }) => {
  const { redirect } = useNativeSecondaryView();

  const handleClickPosition: React.MouseEventHandler<HTMLSpanElement> = React.useCallback(
    e => {
      const positionId = e.currentTarget.dataset.positionId;
      if (positionId) {
        redirect(
          new MoimURL.PositionMembers({
            positionId,
          }).toString(),
        );
      }
    },
    [redirect],
  );

  const elements = React.useMemo(() => {
    if (positions !== undefined && positions?.length === 0) {
      return <PositionEmpty />;
    }

    if (
      positions === undefined ||
      positions?.every(position => position === undefined)
    ) {
      return (
        <>
          <PositionCell key={"position_skeleton_1"}>
            <SkeletonBox width={px2rem(59)} height={px2rem(21)} />
          </PositionCell>
          <PositionCell key={"position_skeleton_2"}>
            <SkeletonBox width={px2rem(145)} height={px2rem(21)} />
          </PositionCell>
          <PositionCell key={"position_skeleton_3"}>
            <SkeletonBox width={px2rem(72)} height={px2rem(21)} />
          </PositionCell>
        </>
      );
    }

    return positions
      ?.filter(item => Boolean(item))
      .map(position => (
        <PositionItem
          key={position}
          data-position-id={position}
          positionId={position}
          onClick={handleClickPosition}
        />
      ));
  }, [handleClickPosition, positions]);

  return (
    <>
      <SectionTitle>
        <H8Bold>
          <FormattedMessage id="profile_show/position_title" />
        </H8Bold>
      </SectionTitle>
      <Wrapper>
        <PositionContainer>{elements}</PositionContainer>
      </Wrapper>
    </>
  );
};

export default Positions;
