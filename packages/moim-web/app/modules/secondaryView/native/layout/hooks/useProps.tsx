import * as React from "react";
import useIsMobile from "common/hooks/useIsMobile";
import {
  useNativeSecondaryView,
  useSecondaryViewOpenState,
} from "common/hooks/useSecondaryView";
import { useVisibleTopNavigation } from "app/modules/layout/components/controller/hooks";
import { IProps } from "..";
import {
  AppBarLeftButtonWrapper,
  AppBarRightButtonWrapper,
  CloseButton,
  BackIconButton,
} from "../../../styled";
import { TopBannerContext } from "common/components/topBanner/context";
import { NativeMemoryHistoryContext } from "app/modules/SecondaryHistory";
// helper
import { MoimURL } from "common/helpers/url";

export type IHookProps = ReturnType<typeof useProps>;

export function useProps(props: IProps) {
  const { appBar, renderCloseButton } = props;
  const { leftButton, rightButton, ...appBarRestProps } = appBar;
  const refWrapper = React.useRef<HTMLDivElement>(null);
  const [appBarTopPosition, setAppBarTopPosition] = React.useState(0);
  const isMobile = useIsMobile();
  const { close, goBack } = useNativeSecondaryView();
  const visibleTopNavigation = useVisibleTopNavigation();
  const [topBannerContext] = React.useContext(TopBannerContext);
  const history = React.useContext(NativeMemoryHistoryContext);
  const locationPathname = history ? history.location.pathname : "";
  const { nativeOpenFromProfile } = useSecondaryViewOpenState();

  const hasBackButton = React.useMemo(() => {
    const isProfilePage = Boolean(MoimURL.Members.match(locationPathname));
    const isPositionDetailPage = Boolean(
      MoimURL.PositionMembers.match(locationPathname),
    );
    const isMembersPage = Boolean(
      MoimURL.MoimMembers.matchExact(locationPathname)?.isExact,
    );
    const isCommercePage = Boolean(MoimURL.myShopping.match(locationPathname));
    const isMyQuestPage = Boolean(MoimURL.MyQuestList.match(locationPathname));

    const isFirstEntry = history ? history.entries.length < 3 : false;

    return (
      !isFirstEntry &&
      !isPositionDetailPage &&
      !isMembersPage &&
      !isProfilePage &&
      !isCommercePage &&
      !isMyQuestPage &&
      !nativeOpenFromProfile
    );
  }, [history, nativeOpenFromProfile]);

  const closeButtonElement = React.useMemo(
    () =>
      renderCloseButton?.(close) ?? (
        <CloseButton size="s" touch={24} onClick={close} />
      ),
    [close, renderCloseButton],
  );

  const backButtonElement = React.useMemo(
    () =>
      hasBackButton && <BackIconButton size="s" touch={24} onClick={goBack} />,
    [goBack, hasBackButton],
  );

  const defaultLeftElement = React.useMemo(
    () => (isMobile ? closeButtonElement : backButtonElement),
    [isMobile, closeButtonElement, backButtonElement],
  );

  const defaultRightElement = React.useMemo(
    () => !isMobile && closeButtonElement,
    [isMobile, closeButtonElement],
  );

  const leftButtonElement = React.useMemo(
    () =>
      (defaultLeftElement || leftButton) && (
        <AppBarLeftButtonWrapper>
          {[defaultLeftElement, leftButton]}
        </AppBarLeftButtonWrapper>
      ),
    [defaultLeftElement, leftButton],
  );

  const rightButtonElement = React.useMemo(
    () =>
      (rightButton || defaultRightElement) && (
        <AppBarRightButtonWrapper>
          {[rightButton, defaultRightElement]}
        </AppBarRightButtonWrapper>
      ),
    [defaultRightElement, rightButton],
  );

  React.useLayoutEffect(() => {
    requestAnimationFrame(() => {
      if (refWrapper.current) {
        if (!isMobile) {
          setAppBarTopPosition(
            refWrapper.current.getBoundingClientRect().y -
              document.documentElement.getBoundingClientRect().y,
          );
        }
      }
    });
  }, [
    refWrapper.current,
    visibleTopNavigation,
    topBannerContext.currentVisibleState,
    isMobile,
  ]);

  return {
    ...props,
    refWrapper,
    appBarTopPosition,
    appBarRestProps,
    leftElement: leftButtonElement,
    rightElement: rightButtonElement,
  };
}
