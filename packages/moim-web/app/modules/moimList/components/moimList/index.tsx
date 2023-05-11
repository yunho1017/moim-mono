import * as React from "react";
import { FormattedMessage } from "react-intl";
import ReactResizeDetector from "react-resize-detector";
// helpers
import useIsMobile from "common/hooks/useIsMobile";
// components
import {
  Wrapper,
  ScrollSection,
  Content,
  MIN_CARD_WIDTH,
  CARD_GAP,
  EmptyWrapper,
  EmptyEmojiWrapper,
  EmptyGuideText,
  LargeDivider,
  HeaderWrapper,
  OptionsWrapper,
  LoadingWrapper,
} from "./styled";
import MoimCard from "common/components/moimCard";
import { DefaultLoader as Loader } from "common/components/loading";
import InfiniteScroller from "common/components/infiniteScroller";
import { ILabel } from "common/components/horizontalLabelList";
import Header from "../header";
import OptionFilter from "../optionFilter";
import RecommendMoims from "../recommend";

import { TopNaviPortalContainer } from "app/modules/layout/components/controller/topNaviPortal";
import { useVisibleMobileTopTab } from "app/modules/layout/components/controller/hooks";

interface IProps {
  tagName: string;
  displayTagSelector: boolean;
  isLoading: boolean;
  isRecommendMoimsLoading: boolean;
  tags: Moim.IPaginatedListResponse<Moim.Tag.IDenormalizedTag>;
  moimList: Moim.IPaginatedListResponse<Moim.Group.IGroup>;
  recommendMoims: Moim.IPaginatedListResponse<
    Moim.Group.INormalizedRecommendGroupSection
  >;
  sortOptions: Partial<Moim.Group.IGroupSortingOption>[];
  selectedLabels: ILabel[];
  onJoinClick(moimUrl: string, moimId: Moim.Id): void;
  handler(paging?: Moim.IPaging): void;
  onChangeSelectedTags(tags: ILabel[]): void;
  onChangeOption(option: Partial<Moim.Group.IGroupSortingOption>): void;
}

export default function MoimListComponent({
  tagName,
  isLoading,
  displayTagSelector,
  tags,
  moimList,
  recommendMoims,
  sortOptions,
  selectedLabels,
  handler,
  onJoinClick,
  onChangeSelectedTags,
  onChangeOption,
}: IProps) {
  const isMobile = useIsMobile();
  const visibleTopTabNavigation = useVisibleMobileTopTab();
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const [column, setColumn] = React.useState(1);

  const handleResize = React.useCallback((width: number) => {
    setColumn(Math.floor((width - CARD_GAP) / (MIN_CARD_WIDTH + CARD_GAP)));
  }, []);

  const handleLoadMoreMoimList = React.useCallback(() => {
    if (moimList.paging) {
      handler(moimList.paging);
    }
  }, [handler, moimList.paging]);

  const moimCardList = React.useMemo(
    () =>
      moimList.data
        .filter(item => Boolean(item))
        .map(moim => (
          <MoimCard
            key={moim.id}
            moimId={moim.id}
            url={moim.url}
            domain={moim.domain}
            banner={moim.banner}
            title={moim.name}
            isJoined={moim.joined}
            disableQuickJoin={true}
            memberCount={moim.users_count}
            profileImage={moim.icon}
            description={moim.description}
            tags={moim.tags}
            showNewBadge={moim.stat?.has_new_for_list}
            period={moim.period}
            status={moim.status}
            statusConfig={moim.status_config}
            onClickJoinButton={onJoinClick}
          />
        )),
    [moimList.data, onJoinClick],
  );

  const emptyElement = React.useMemo(
    () => (
      <EmptyWrapper>
        <EmptyEmojiWrapper>⛄️</EmptyEmojiWrapper>
        <EmptyGuideText>
          <FormattedMessage id="sub_moim_list/page_empty" />
        </EmptyGuideText>
      </EmptyWrapper>
    ),
    [],
  );
  const loadingElement = React.useMemo(
    () => (
      <LoadingWrapper>
        <Loader />
      </LoadingWrapper>
    ),
    [],
  );

  const header = React.useMemo(
    () => (
      <HeaderWrapper>
        <Header
          tagName={tagName}
          displayTagSelector={displayTagSelector}
          tags={tags}
          selectedLabels={selectedLabels}
          visibleTopTabNavigation={visibleTopTabNavigation}
          onJoinClick={onJoinClick}
          onChangeSelectedTags={onChangeSelectedTags}
        />
      </HeaderWrapper>
    ),
    [
      displayTagSelector,
      onChangeSelectedTags,
      onJoinClick,
      selectedLabels,
      tagName,
      tags,
      visibleTopTabNavigation,
    ],
  );

  const optionElement = React.useMemo(
    () =>
      displayTagSelector && (
        <OptionsWrapper>
          <div>
            <OptionFilter
              options={sortOptions}
              onChangeOption={onChangeOption}
            />
          </div>
        </OptionsWrapper>
      ),
    [displayTagSelector, onChangeOption, sortOptions],
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

  const recommendMoimsElement = React.useMemo(
    () =>
      recommendMoims.data
        .filter(section => section.childGroups.length > 0)
        .map(section => (
          <RecommendMoims
            title={section.name}
            totalCount={section.groupsCount}
            recommends={section.childGroups}
            onJoinClick={onJoinClick}
          />
        )),
    [onJoinClick, recommendMoims],
  );

  return (
    <ReactResizeDetector handleWidth={true} onResize={handleResize}>
      <Wrapper ref={wrapperRef}>
        {headerContainerElement}
        <ScrollSection>
          {recommendMoimsElement}
          {isMobile && !displayTagSelector && <LargeDivider />}
          {optionElement}
          {Boolean(moimList.data.length) ? (
            <InfiniteScroller
              loadMore={handleLoadMoreMoimList}
              isLoading={isLoading}
              loader={<Loader />}
              paging={moimList.paging}
              itemLength={moimList.data.length}
            >
              <Content column={column}>{moimCardList}</Content>
            </InfiniteScroller>
          ) : isLoading ? (
            loadingElement
          ) : (
            emptyElement
          )}
        </ScrollSection>
      </Wrapper>
    </ReactResizeDetector>
  );
}
