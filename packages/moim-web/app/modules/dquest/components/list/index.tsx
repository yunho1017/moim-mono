import * as React from "react";
import useIsMobile from "common/hooks/useIsMobile";
import useOpenDQuestShowModal from "app/modules/dquest/containers/show/hooks/useOpenDQuestShowModal";
import { useVisibleMobileTopTab } from "app/modules/layout/components/controller/hooks";
import useSideNavigationPanel from "common/hooks/useSideNavigationPanel";
import useVisibleExpandSideNavigationButton from "common/hooks/useVisibleExpandSideNavigationButton";
import useGroupTexts from "common/hooks/useGroupTexts";
import InfiniteScroller from "common/components/infiniteScroller/new";
import DQuestPreview from "common/components/dquestPreview";
import PageUpdater from "common/components/pageUpdater";
import { TopNaviPortalContainer } from "app/modules/layout/components/controller/topNaviPortal";
import AppBar from "common/components/appBar";
import { NativeEmojiSafeText } from "common/components/designSystem/texts";
import {
  Wrapper,
  LoadWrapper,
  Loading,
  ListContainer,
  MobileList,
  DesktopList,
  QuestContainer,
  Header,
  Title,
  SmallDivider,
  LargeDivider,
  LeftButtonWrapper,
  MenuIcon,
  AppBarWrapperStyle,
} from "./styled";

interface IProps {
  isLoading: boolean;
  questIds: Moim.Id[];
  paging: Moim.IPaging;
  onLoadMore(): void;
}

const DQuestListComponent: React.FC<IProps> = ({
  isLoading,
  questIds,
  paging,
  onLoadMore,
}) => {
  const isMobile = useIsMobile();
  const visibleTopTabNavigation = useVisibleMobileTopTab();
  const { expandSideNavigation } = useSideNavigationPanel();
  const openDQuestShowModal = useOpenDQuestShowModal();
  const visibleExpandSideNavigationButton = useVisibleExpandSideNavigationButton();
  const pageTitle = useGroupTexts("quest_list_title");

  const leftElement = React.useMemo(
    () =>
      visibleExpandSideNavigationButton ? (
        <LeftButtonWrapper>
          <MenuIcon onClick={expandSideNavigation} />
        </LeftButtonWrapper>
      ) : null,
    [expandSideNavigation, visibleExpandSideNavigationButton],
  );

  const header = React.useMemo(
    () => (
      <Header>
        {!visibleTopTabNavigation && (
          <AppBar
            titleElement={
              <Title>
                <NativeEmojiSafeText value={pageTitle?.singular ?? ""} />
              </Title>
            }
            titleAlignment="Left"
            wrapperStyle={AppBarWrapperStyle}
            leftButton={leftElement}
          />
        )}
        {isMobile && (
          <>
            <SmallDivider />
            <LargeDivider />
          </>
        )}
      </Header>
    ),
    [visibleTopTabNavigation, isMobile, pageTitle, leftElement],
  );

  const headerContainerElement = React.useMemo(
    () =>
      isMobile && !visibleTopTabNavigation ? (
        <TopNaviPortalContainer>{header}</TopNaviPortalContainer>
      ) : (
        header
      ),
    [header, isMobile, visibleTopTabNavigation],
  );

  const handleQuestClick = React.useCallback(
    (id: Moim.Id) => {
      openDQuestShowModal(id);
    },
    [openDQuestShowModal],
  );

  const questElements = React.useMemo(
    () =>
      questIds.map((id, idx) => (
        <QuestContainer key={`quest-preview-${id}-${idx}`}>
          <DQuestPreview questId={id} onClick={handleQuestClick} />
        </QuestContainer>
      )),
    [handleQuestClick, questIds],
  );

  return (
    <>
      <PageUpdater title={pageTitle?.singular} />
      <Wrapper>
        {headerContainerElement}
        <ListContainer>
          <InfiniteScroller
            isLoading={isLoading}
            itemLength={questIds.length}
            threshold={500}
            paging={paging}
            loader={
              <LoadWrapper>
                <Loading />
              </LoadWrapper>
            }
            loadMore={onLoadMore}
          >
            {isMobile ? (
              <MobileList>{questElements}</MobileList>
            ) : (
              <DesktopList minWidth={320}>{questElements}</DesktopList>
            )}
          </InfiniteScroller>
        </ListContainer>
      </Wrapper>
    </>
  );
};

export default React.memo(DQuestListComponent);
