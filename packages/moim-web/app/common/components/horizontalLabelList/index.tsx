import * as React from "react";
import throttle from "lodash/throttle";
import { FlattenInterpolation } from "styled-components";
import anime from "animejs";

import MoimLabel, {
  IRefHandler as IMoimChipRefHandler,
} from "common/components/chips/preset/moimChip";
import TagSetLabel, {
  IRefHandler as ITagSetChipRefHandler,
} from "common/components/chips/preset/tagSetChip";
import { ChipSize } from "common/components/chips";
import IsMobileViewport, {
  IRefHandler as IIsMobileHandler,
} from "common/components/isMobileViewport";
import {
  Section,
  Dim,
  Wrapper,
  LabelList,
  LabelListGradient,
  LeftArrowButton,
  RightArrowButton,
  ExpandButton,
  MoreIcon,
  CloseIcon,
  SelectAlertBadge,
} from "./styledComponents";
import FreezeView from "../freezeView";

const scrollAnimationDuration = 500;

export interface ILabel {
  id: Moim.Id;
  text: string;
  priority: number;
  [key: string]: any;
}

interface IProps {
  labels: ILabel[];
  selectedLabels: ILabel[];
  labelType?: "moim" | "tagSet";
  labelSize?: ChipSize;
  selectedCount?: number;
  sectionStyle?: FlattenInterpolation<any>;
  listWrapperStyle?: FlattenInterpolation<any>;
  disableExpand?: boolean;
  disableDim?: boolean;
  disableMoreButton?: boolean;
  disableSelectCount?: boolean;
  onMoreClick?(): void;
  onLabelClick(label: ILabel, e: React.MouseEvent<HTMLElement>): void;
}

interface IState {
  isFolded: boolean;
  isFirst: boolean;
  isLast: boolean;
  hasExpandButton: boolean;
}

export default class HorizontalLabelList extends React.PureComponent<
  IProps,
  IState
> {
  public state: IState = {
    isFolded: true,
    isFirst: false,
    isLast: false,
    hasExpandButton: false,
  };

  private readonly labelListRef = React.createRef<HTMLDivElement>();
  private readonly selectedLabelRef = React.createRef<
    IMoimChipRefHandler | ITagSetChipRefHandler
  >();
  private readonly refIsMobile = React.createRef<IIsMobileHandler>();

  private readonly handleScrollEvent = throttle(() => {
    requestAnimationFrame(() => {
      const node = this.labelListRef.current;
      if (node) {
        this.setState({
          isFirst: node.scrollLeft <= 0,
          isLast: node.scrollLeft >= node.scrollWidth - node.clientWidth,
        });
      }
    });
  }, 150);

  private readonly labelScrollWithAnime = throttle(
    (direction: "left" | "right") => {
      requestAnimationFrame(() => {
        const node = this.labelListRef.current;

        if (node) {
          const scrollTo =
            node.scrollLeft +
            (direction === "left"
              ? -Math.floor(node.clientWidth / 2)
              : Math.floor(node.clientWidth / 2));

          anime({
            targets: node,
            scrollLeft: scrollTo,
            round: 1,
            easing: "easeInSine",
            duration: scrollAnimationDuration,
          });
        }
      });
    },
    scrollAnimationDuration,
  );

  public componentDidMount() {
    this.setLayoutState(true);
  }

  public componentDidUpdate(prevProps: IProps) {
    const isChangeSelectedLabel =
      this.props.selectedLabels !== prevProps.selectedLabels ||
      this.props.selectedLabels.length !== prevProps.selectedLabels.length;

    this.setLayoutState(isChangeSelectedLabel);
  }

  public render() {
    const {
      labels,
      labelType,
      labelSize = "large",
      sectionStyle,
      listWrapperStyle,
      selectedCount,
      disableDim,
      disableSelectCount,
    } = this.props;
    const { isFirst, isLast, isFolded, hasExpandButton } = this.state;
    const LabelElement = labelType === "tagSet" ? TagSetLabel : MoimLabel;
    const isMobile = Boolean(this.refIsMobile.current?.isMobile);
    const flattenSelectedLabels = this.getFlattenSelectedLabels();
    const enableAlertBadge =
      !disableSelectCount &&
      (Boolean(selectedCount) || flattenSelectedLabels.length > 0);
    const selectedLabelBadgeCount =
      selectedCount !== undefined
        ? selectedCount > 99
          ? "99+"
          : selectedCount
        : flattenSelectedLabels.length > 99
        ? "99+"
        : flattenSelectedLabels.length.toString();

    return (
      <FreezeView isFreeze={!isFolded}>
        <Section expanded={!isFolded} overrideStyle={sectionStyle}>
          <IsMobileViewport ref={this.refIsMobile} />

          <Dim
            enable={!disableDim && !isFolded}
            onClick={this.handleExpandButtonClick}
          />
          <Wrapper expanded={!isFolded} overrideStyle={listWrapperStyle}>
            <LabelListGradient position="left" disable={isFirst || !isFolded} />
            <LeftArrowButton
              disable={isFirst || !isFolded || isMobile}
              onClick={this.handlePreviousLabelButtonClick}
            />

            <LabelList
              ref={this.labelListRef}
              onScroll={this.handleScrollEvent}
            >
              {labels.map(label => (
                <LabelElement
                  key={label.id}
                  size={labelSize}
                  label={label}
                  expanded={!isFolded}
                  onClick={this.handleLabelClick}
                  selected={flattenSelectedLabels.includes(label.id)}
                />
              ))}
            </LabelList>
            <LabelListGradient position="right" disable={isLast || !isFolded} />

            {hasExpandButton ? (
              <ExpandButton
                isExpanded={!isFolded}
                onClick={this.handleExpandButtonClick}
              >
                {isFolded ? (
                  <>
                    <MoreIcon />
                    {enableAlertBadge && (
                      <SelectAlertBadge>
                        {selectedLabelBadgeCount}
                      </SelectAlertBadge>
                    )}
                  </>
                ) : (
                  <CloseIcon />
                )}
              </ExpandButton>
            ) : null}
            <RightArrowButton
              disable={isLast || !isFolded || isMobile}
              hasMoreButton={hasExpandButton}
              labelType={labelType}
              onClick={this.handleNextLabelButtonClick}
            />
          </Wrapper>
        </Section>
      </FreezeView>
    );
  }

  private setLayoutState(isChangeSelectedLabel: boolean) {
    const { disableMoreButton } = this.props;
    const node = this.labelListRef.current;

    if (!node) {
      return;
    }

    requestAnimationFrame(() => {
      const hasExpandButton =
        this.state.isFolded && !disableMoreButton
          ? node.clientWidth < node.scrollWidth
          : this.state.hasExpandButton;

      this.setState(
        {
          hasExpandButton,
          isFirst: node.scrollLeft <= 0,
          isLast: node.scrollLeft >= node.scrollWidth - node.clientWidth,
        },
        () => {
          if (isChangeSelectedLabel) {
            this.scrollToSelectedLabel();
          }
        },
      );
    });
  }

  private readonly handlePreviousLabelButtonClick = () => {
    this.labelScrollWithAnime("left");
  };

  private readonly handleNextLabelButtonClick = () => {
    this.labelScrollWithAnime("right");
  };

  private readonly handleExpandButtonClick = () => {
    const { disableExpand, onMoreClick } = this.props;
    if (!disableExpand) {
      this.setState({
        isFolded: !this.state.isFolded,
      });
    }

    onMoreClick?.();
  };

  private scrollToSelectedLabel() {
    const selectedLabel = this.selectedLabelRef.current;

    if (!selectedLabel) {
      return;
    }

    this.scrollTo(selectedLabel.getLeftOffset());
  }

  private scrollTo(labelOffsetLeft: number) {
    const labelListContainer = this.labelListRef.current;

    if (!labelListContainer) {
      return;
    }

    const { width: listWidth } = labelListContainer.getBoundingClientRect();
    let scrollTargetOffset = labelOffsetLeft - listWidth / 3;
    scrollTargetOffset = scrollTargetOffset >= 0 ? scrollTargetOffset : 0;

    requestAnimationFrame(() => {
      labelListContainer.scrollTo(scrollTargetOffset, 0);
    });
  }

  private readonly getFlattenSelectedLabels = () =>
    this.props.selectedLabels.map(label => label.id);

  private readonly handleLabelClick = (
    label: ILabel,
    e: React.MouseEvent<HTMLElement>,
  ) => {
    this.props.onLabelClick(label, e);
  };
}
