import * as React from "react";
import ReactResizeDetector from "react-resize-detector";

import * as Styled from "./styled";
import CategoryItem from "./components/categoryItem";
import ChannelItem from "./components/channelItem";
import MoreButton from "./components/moreButton";

import { sentryDebugLog } from "common/helpers/errorLogger";
import { isBrowser } from "common/helpers/envChecker";
import useCurrentUser from "common/hooks/useCurrentUser";

const WHITE_LIST_USER_IDS = ["UWHLMMN6P", "USXTXLK92", "UHACI77OV"];

interface IProps {
  channelList: Moim.Channel.SimpleChannelType[];
  maxChannelVisibleFixedCount?: number;
  elementPaletteProps?: Moim.Theme.CommonElementThemePaletteProps;
  onClickChannelItem(channel: Moim.Channel.SimpleChannelType): void;
}

const MORE_BUTTON_WIDTH = 120;

function HorizontalChannelList({
  channelList,
  maxChannelVisibleFixedCount,
  elementPaletteProps,
  onClickChannelItem,
}: IProps) {
  const currentUser = useCurrentUser();
  const refChannelList = React.useRef<HTMLDivElement>(null);

  const [maxChannelVisibleCount, setMaxChannelVisibleCount] = React.useState<
    number | null
  >(null);

  const [wrapperWidth, setWrapperWidth] = React.useState<number | null>(null);
  const [innerResizedCount, setInnerResizedCount] = React.useState<number>(0);

  const visibleChannelList = React.useMemo(() => {
    const count = maxChannelVisibleFixedCount ?? maxChannelVisibleCount;

    if (count === null) {
      return channelList;
    }

    return [...channelList].splice(0, count);
  }, [channelList, maxChannelVisibleFixedCount, maxChannelVisibleCount]);

  const remainChannelList = React.useMemo(() => {
    const count = maxChannelVisibleFixedCount ?? maxChannelVisibleCount;

    if (count === null) {
      return [];
    }

    return [...channelList].splice(count, channelList.length);
  }, [channelList, maxChannelVisibleFixedCount, maxChannelVisibleCount]);

  const calculateVisibleChannelCount = React.useCallback(() => {
    requestAnimationFrame(() => {
      const wrapper = refChannelList.current;
      if (isBrowser() && wrapper && wrapperWidth !== null) {
        let index = 0;
        let accumulateChildWidth = 0;
        for (const node of Array.from(wrapper.children)) {
          const childrenNodeWidth = node.getBoundingClientRect().width;
          if (
            accumulateChildWidth + childrenNodeWidth <
            wrapperWidth - MORE_BUTTON_WIDTH
          ) {
            index++;
            accumulateChildWidth += childrenNodeWidth;
          } else {
            setMaxChannelVisibleCount(index);
            break;
          }
        }
      }
    });
  }, [refChannelList, wrapperWidth]);

  const handleResizeWrapper = React.useCallback(
    (width: number) => {
      if (
        maxChannelVisibleCount !== null &&
        wrapperWidth !== null &&
        width > wrapperWidth
      ) {
        setMaxChannelVisibleCount(maxChannelVisibleCount + 1);
      }
      setWrapperWidth(width);
    },
    [
      setMaxChannelVisibleCount,
      setWrapperWidth,
      maxChannelVisibleCount,
      wrapperWidth,
    ],
  );

  const handleResizeInner = React.useCallback(
    (width: number) => {
      if (width > 0 && innerResizedCount === 0) {
        calculateVisibleChannelCount();
        setInnerResizedCount(innerResizedCount + 1);
      }
    },
    [calculateVisibleChannelCount, setInnerResizedCount, innerResizedCount],
  );

  React.useLayoutEffect(() => {
    if (innerResizedCount > 0) {
      calculateVisibleChannelCount();
    }
  }, [wrapperWidth]);

  const channelListElement = React.useMemo(
    () =>
      visibleChannelList.map(channel => {
        if (channel.type === "category") {
          return (
            <CategoryItem
              key={channel.id}
              category={channel}
              elementPaletteProps={elementPaletteProps}
              onClickChannel={onClickChannelItem}
            />
          );
        }

        return (
          <ChannelItem
            key={channel.id}
            channel={channel}
            elementPaletteProps={elementPaletteProps}
            onClickChannel={onClickChannelItem}
          />
        );
      }),
    [visibleChannelList, onClickChannelItem, elementPaletteProps],
  );

  React.useLayoutEffect(() => {
    if (
      currentUser &&
      WHITE_LIST_USER_IDS.includes(currentUser.id) &&
      visibleChannelList.length &&
      visibleChannelList[0].id === "AGLUTYXWI" &&
      (visibleChannelList[0] as any).items.length === 0
    ) {
      sentryDebugLog(`>>> channelItem:${location.hostname}:${currentUser.id}`, {
        channelId: visibleChannelList[0].id,
        channelListRaw: JSON.stringify(channelList),
        items: (visibleChannelList[0] as any).items.map((i: any) => ({
          id: i?.id,
          name: i?.name,
        })),
      });
    }
  }, [currentUser, visibleChannelList, channelList]);

  return (
    <Styled.Wrapper>
      <ReactResizeDetector
        refreshMode="throttle"
        handleWidth={true}
        onResize={handleResizeWrapper}
      >
        <Styled.Inner>
          <ReactResizeDetector
            refreshMode="throttle"
            handleWidth={true}
            onResize={handleResizeInner}
          >
            <Styled.ChannelList ref={refChannelList}>
              {channelListElement}
              <MoreButton
                channelList={remainChannelList}
                elementPaletteProps={elementPaletteProps}
                onClickChannel={onClickChannelItem}
              />
            </Styled.ChannelList>
          </ReactResizeDetector>
        </Styled.Inner>
      </ReactResizeDetector>
    </Styled.Wrapper>
  );
}

export default React.memo(HorizontalChannelList);
