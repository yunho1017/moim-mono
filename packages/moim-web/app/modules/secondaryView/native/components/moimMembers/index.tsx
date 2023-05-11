import * as React from "react";
import { FormattedMessage } from "react-intl";
// helpers
import { MoimURL } from "common/helpers/url";
import { useNativeSecondaryView } from "common/hooks/useSecondaryView";
import useHook from "./useHook";
// components
import MemberList from "common/components/memberList";
import { BaseItemCell } from "common/components/itemCell";
import InfiniteScroller from "common/components/infiniteScroller";
import { DefaultLoader as Loader } from "common/components/loading";
import {
  Wrapper,
  Section,
  SectionHeader,
  HeaderText,
  PositionTitle,
  ArrowIcon,
  PositionIcon,
  PositionItemWrapper,
} from "./styled";
import { DefaultLayout } from "../../layout";

export default function MoimMembers() {
  const {
    appBarInfoData,
    members,
    getMemberLoading,
    positions,
    positionsPaging,
    positionsLoading,
    hasApplyablePosition,
    handleGetMembers,
    handleGetPositions,
    handlePositionLoadMore,
    openPositionApplyDialog,
  } = useHook();
  React.useEffect(() => {
    handleGetMembers();
    handleGetPositions();
  }, [handleGetMembers, handleGetPositions]);

  if (!members) {
    return null;
  }

  return (
    <DefaultLayout appBar={appBarInfoData}>
      <Wrapper>
        {Boolean(positions.length) && (
          <Section>
            <SectionHeader>
              <HeaderText>
                <FormattedMessage id="channel_information_show/position_title" />
              </HeaderText>
              {hasApplyablePosition && (
                <PositionIcon onClick={openPositionApplyDialog} />
              )}
            </SectionHeader>
            <InfiniteScroller
              useInitialScroll={true}
              paging={positionsPaging}
              isLoading={positionsLoading}
              itemLength={positions.length}
              loader={<Loader />}
              loadMore={handlePositionLoadMore}
            >
              {positions.map(position => (
                <PositionItem key={position.id} position={position} />
              ))}
            </InfiniteScroller>
          </Section>
        )}

        <MemberList
          members={members}
          isLoading={getMemberLoading}
          onGetMembers={handleGetMembers}
          subTitleShaveLine={1}
        />
      </Wrapper>
    </DefaultLayout>
  );
}

function PositionItem({ position }: { position: Moim.Position.IPosition }) {
  const { redirect } = useNativeSecondaryView();
  const handlePositionClick = React.useCallback(() => {
    redirect(
      new MoimURL.PositionMembers({
        positionId: position.id || "",
      }).toString(),
    );
  }, [position.id, redirect]);

  return (
    <PositionItemWrapper onClick={handlePositionClick}>
      <BaseItemCell
        size="s"
        title={
          <PositionTitle color={position.color}>
            {position.name} ({position.member_count})
          </PositionTitle>
        }
        rightElement={<ArrowIcon />}
      />
    </PositionItemWrapper>
  );
}
