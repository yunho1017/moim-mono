import * as React from "react";
import anime from "animejs";
import { useHistory } from "react-router-dom";
import throttle from "lodash/throttle";
import { FlattenInterpolation } from "styled-components";
// hooks
import useIsMobile from "common/hooks/useIsMobile";
import useOpenState from "common/hooks/useOpenState";
// components
import FreezeView from "common/components/freezeView";
import { TagList } from "./components/tagSet";
// style
import {
  Section,
  Wrapper,
  LabelList,
  LabelListGradient,
  LeftArrowButton,
  RightArrowButton,
  ExpandButtonWrapper,
} from "./styled";
import {
  FilterButtonWrapper,
  FilterButton,
  FilterIcon,
  TagsCount,
} from "./components/tagSet/styled";

import { TopBannerContext } from "../topBanner/context";

const scrollAnimationDuration = 500;

export interface ITextKeyLabelsTagset {
  tagSet: { textKey: string };
  tags: Record<string, { textKey: string }>;
}

interface IProps {
  tags: Record<string, string[]>;
  selectedTags: Record<string, string[]>;
  textKeyLabelsByTagset?: Record<string, ITextKeyLabelsTagset>;
  labelType?: "moim" | "tagSet";
  sectionStyle?: FlattenInterpolation<any>;
  listWrapperStyle?: FlattenInterpolation<any>;
  disableMoreButton?: boolean;
  disableFilterButton?: boolean;
  onChangeHanlder?(): void;
  onChangeSelectedTags?(data: Record<string, string[]>): void;
}

interface IState {
  isFolded: boolean;
  isFirst: boolean;
  isLast: boolean;
  hasExpandButton: boolean;
}

export const HorizontalTagList: React.FC<IProps> = ({
  tags,
  selectedTags,
  textKeyLabelsByTagset,
  labelType,
  sectionStyle,
  listWrapperStyle,
  disableMoreButton,
  disableFilterButton,
  onChangeHanlder,
}) => {
  const isMobile = useIsMobile();
  const history = useHistory();

  const { isOpen, open, close } = useOpenState(false);

  const labelListRef = React.useRef<HTMLDivElement>(null);
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  const [state, setState] = React.useState<IState>({
    isFolded: true,
    isFirst: true,
    isLast: false,
    hasExpandButton: true,
  });

  const [topBannerContext] = React.useContext(TopBannerContext);

  const selectedAllTagsCount: number = React.useMemo(
    () =>
      Object.values(selectedTags).reduce((prev, curr) => prev + curr.length, 0),
    [selectedTags],
  );

  const handleAddSearchParams = React.useCallback(
    (data: Record<string, string[]>) => {
      history.replace({
        pathname: location.pathname,
        search: Object.keys(data).length
          ? `filter=${JSON.stringify(data)}`
          : undefined,
      });
    },
    [history],
  );

  const handleApply = React.useCallback(
    (selectedItems: Record<Moim.Id, string[]>) => {
      handleAddSearchParams({ ...selectedItems });
      onChangeHanlder?.();
    },
    [handleAddSearchParams, onChangeHanlder],
  );

  const handleClickTags = React.useCallback(
    (checked: boolean, checkboxElement: HTMLInputElement) => {
      const tagSetKey = checkboxElement.name.split(":")[0];
      const { [tagSetKey]: currentTags, ...rest } = selectedTags;
      if (checked) {
        handleAddSearchParams({
          ...rest,
          [tagSetKey]: [...(currentTags ?? []), checkboxElement.name],
        });
      } else {
        const filteredTagSet =
          currentTags?.filter(tag => tag !== checkboxElement.name) ?? [];
        handleAddSearchParams(
          filteredTagSet.length
            ? {
                ...rest,
                [tagSetKey]: filteredTagSet,
              }
            : {
                ...rest,
              },
        );
      }
      onChangeHanlder?.();
    },
    [handleAddSearchParams, onChangeHanlder, selectedTags],
  );

  const handleSelectAllByTagSet = React.useCallback(
    (tagSetKey?: string) => {
      if (!tagSetKey) return;
      handleAddSearchParams({
        ...selectedTags,
        [tagSetKey]: tags[tagSetKey].map(item => `${tagSetKey}:${item}`),
      });
      onChangeHanlder?.();
    },
    [handleAddSearchParams, onChangeHanlder, selectedTags, tags],
  );

  const handleDeselectAllByTagSet = React.useCallback(
    (tagSetKey?: string) => {
      if (!tagSetKey) return;
      const { [tagSetKey]: currentTags, ...rest } = selectedTags;
      handleAddSearchParams({
        ...rest,
      });
      onChangeHanlder?.();
    },
    [handleAddSearchParams, onChangeHanlder, selectedTags],
  );

  const labelScrollWithAnime = React.useCallback(
    throttle((direction: "left" | "right") => {
      requestAnimationFrame(() => {
        const node = labelListRef.current;

        if (node) {
          if (node) {
            const scrollLeftTo =
              node.scrollLeft +
              (direction === "left"
                ? -Math.floor(node.clientWidth / 2)
                : Math.floor(node.clientWidth / 2));

            anime({
              targets: node,
              scrollLeft: scrollLeftTo,
              round: 1,
              easing: "easeInSine",
              duration: scrollAnimationDuration,
            });
          }
        }
      });
    }, scrollAnimationDuration),
    [labelListRef.current],
  );

  const handlePreviousLabelButtonClick = React.useCallback(() => {
    labelScrollWithAnime("left");
  }, [labelScrollWithAnime]);

  const handleNextLabelButtonClick = React.useCallback(() => {
    labelScrollWithAnime("right");
  }, [labelScrollWithAnime]);

  const setLayoutState = React.useCallback(() => {
    const node = labelListRef.current;
    const wrapper = wrapperRef.current;

    if (!node || !wrapper) {
      return;
    }

    requestAnimationFrame(() => {
      const hasExpandButton =
        state.isFolded && !disableMoreButton
          ? node.clientWidth < node.scrollWidth ||
            wrapper.clientWidth < node.clientWidth
          : state.hasExpandButton;

      setState(prevState => ({
        ...prevState,
        hasExpandButton,
        isFirst: node.scrollLeft <= 0,
        isLast: node.scrollLeft >= node.scrollWidth - node.clientWidth,
      }));
    });
  }, [disableMoreButton, state.hasExpandButton, state.isFolded]);

  const handleScrollEvent = React.useCallback(
    throttle(() => {
      requestAnimationFrame(() => {
        const node = labelListRef.current;
        if (node) {
          setState(prevState => ({
            ...prevState,
            isFirst: node.scrollLeft <= 0,
            isLast: node.scrollLeft >= node.scrollWidth - node.clientWidth,
          }));
        }
      });
    }, 150),
    [labelListRef.current],
  );

  React.useEffect(() => {
    setLayoutState();
  }, [setLayoutState, tags, selectedTags]);

  return (
    <FreezeView isFreeze={!state.isFolded}>
      <Section
        overrideStyle={sectionStyle}
        isTopBannerOpen={topBannerContext.isOpen}
      >
        <Wrapper ref={wrapperRef} overrideStyle={listWrapperStyle}>
          <LabelListGradient
            position="left"
            disable={
              Boolean(disableFilterButton) || state.isFirst || !state.isFolded
            }
          />
          <LeftArrowButton
            disabled={
              Boolean(disableFilterButton) ||
              state.isFirst ||
              !state.isFolded ||
              isMobile
            }
            onClick={handlePreviousLabelButtonClick}
          />
          <LabelList
            ref={labelListRef}
            onScroll={handleScrollEvent}
            isOverflowVisible={!state.hasExpandButton}
          >
            <TagList
              tags={tags}
              selectedTags={selectedTags}
              textKeyLabelsByTagset={textKeyLabelsByTagset}
              selectedAllTagsCount={selectedAllTagsCount}
              hasFilterButton={!state.hasExpandButton && !disableFilterButton}
              isOpenDialog={isOpen}
              openDialog={open}
              closeDialog={close}
              onSelectTag={handleClickTags}
              onSelectAllByTagSet={handleSelectAllByTagSet}
              onDeselectAllByTagSet={handleDeselectAllByTagSet}
              onApply={handleApply}
            />
          </LabelList>
          <LabelListGradient
            position="right"
            disable={
              Boolean(disableFilterButton) || state.isLast || !state.isFolded
            }
          />
          {state.hasExpandButton && !disableFilterButton ? (
            <ExpandButtonWrapper>
              <FilterButtonWrapper>
                <FilterButton onClick={open}>
                  <FilterIcon />
                </FilterButton>
                {selectedAllTagsCount ? (
                  <TagsCount>{selectedAllTagsCount}</TagsCount>
                ) : null}
              </FilterButtonWrapper>
            </ExpandButtonWrapper>
          ) : null}
          <RightArrowButton
            disabled={Boolean(disableFilterButton) || state.isLast || isMobile}
            hasMoreButton={state.hasExpandButton}
            labelType={labelType}
            onClick={handleNextLabelButtonClick}
          />
        </Wrapper>
      </Section>
    </FreezeView>
  );
};
