import * as React from "react";
import { FormattedMessage } from "react-intl";
import { PermissionDeniedFallbackType } from "app/enums";
import { NativeMemoryHistoryContext } from "app/modules/SecondaryHistory";
import { MoimURL } from "common/helpers/url";
import { ActionCreators } from "app/actions/secondaryView";
import useRedirect from "common/hooks/useRedirect";
import useGroupTexts from "common/hooks/useGroupTexts";
import useIsMobile from "common/hooks/useIsMobile";
import useCurrentUser from "common/hooks/useCurrentUser";
import { useActions } from "app/store";
import {
  useSecondaryViewOpenState,
  useNativeSecondaryView,
} from "common/hooks/useSecondaryView";
import { DefaultLayout } from "app/modules/secondaryView/native/layout";
import RoutedMoimTab, { IRoutedTab } from "common/components/tab/routed";

import UnsignedChecker from "common/components/unsiginedChecker";
import MyQuestsComponent from "./component";
import {
  ParallaxWrapper,
  ParallaxTitle,
  AppBarStickyWrapperStyle,
  RoutedTapContainerStyle,
  DefaultLayoutBodyStyle,
  LeftButtonWrapper,
  BackIcon,
  ViewAllButtonContainer,
  ViewAllTextButton,
} from "./styled";

export default function MyQuestContainer() {
  const isMobile = useIsMobile();
  const currentUser = useCurrentUser();
  const mainRedirect = useRedirect();
  const { redirect, close } = useNativeSecondaryView();
  const { nativeOpenFromProfile } = useSecondaryViewOpenState();
  const myQuestTexts = useGroupTexts("my_quest");
  const inActiveTexts = useGroupTexts("my_quest_ongoing");
  const achievedTexts = useGroupTexts("my_quest_finished");
  const viewAllTexts = useGroupTexts("my_quest_view_all");

  const { openFromProfile } = useActions({
    openFromProfile: ActionCreators.openNativeSecondaryViewFromProfile,
  });
  const history = React.useContext(NativeMemoryHistoryContext);

  const hasBackButton = React.useMemo(() => history && history?.index > 1, [
    history?.index,
  ]);

  const isFirstEntry = React.useMemo(
    () => history && history?.entries.length < 3,
    [history?.entries.length],
  );

  const handleBackButtonClick = React.useCallback(() => {
    if (!isMobile && currentUser) {
      redirect(new MoimURL.Members({ userId: currentUser?.id }).toString());
    }
  }, [isMobile, currentUser, redirect]);

  const disableViewAllButton = React.useMemo(
    () => !MoimURL.QuestList.isSame(location.pathname),
    [],
  );

  const handleClickViewAll = React.useCallback(() => {
    mainRedirect(new MoimURL.QuestList().toString());
    close();
  }, [mainRedirect, close]);

  const tabs: IRoutedTab[] = React.useMemo(
    () => [
      {
        key: "myquests-inactive",
        url: [MoimURL.MyQuestList, MoimURL.MyQuestListInActive],
        title: inActiveTexts?.singular ?? (
          <FormattedMessage id="my_quest_ongoing" />
        ),
        page: () => <MyQuestsComponent type="IN_PROGRESS" />,
        default: true,
      },
      {
        key: "myquests-achieved",
        url: MoimURL.MyQuestListAchieved,
        title: achievedTexts?.singular ?? (
          <FormattedMessage id="my_quest_finished" />
        ),
        page: () => <MyQuestsComponent type="ACHIEVED" />,
      },
    ],
    [achievedTexts, inActiveTexts],
  );

  React.useEffect(() => {
    if (isFirstEntry) openFromProfile(true);
  }, [isFirstEntry, openFromProfile]);

  return (
    <DefaultLayout
      appBar={{
        wrapperStickyStyle: AppBarStickyWrapperStyle,
        enableScrollParallax: true,
        parallaxWrapperComponent: ParallaxWrapper,
        titleContainerDisappearPosition: 20,
        parallaxDisappearPosition: 110,
        titleElement: myQuestTexts ? (
          <span>{myQuestTexts.singular}</span>
        ) : (
          <FormattedMessage id="my_quest" />
        ),
        expendScrollParallaxElement: (
          <ParallaxTitle>
            {myQuestTexts ? (
              <span>{myQuestTexts.singular}</span>
            ) : (
              <FormattedMessage id="my_shopping" />
            )}
          </ParallaxTitle>
        ),
        leftButton:
          !isMobile && hasBackButton && !nativeOpenFromProfile ? (
            <LeftButtonWrapper onClick={handleBackButtonClick}>
              <BackIcon />
            </LeftButtonWrapper>
          ) : (
            undefined
          ),
      }}
      bodyOverrideStyle={DefaultLayoutBodyStyle}
    >
      <UnsignedChecker fallbackType={PermissionDeniedFallbackType.SCREEN}>
        <RoutedMoimTab
          tabs={tabs}
          stickyData={{ topPosition: 45 }}
          routedTabContainerStyle={RoutedTapContainerStyle}
        />
      </UnsignedChecker>
      {disableViewAllButton ? (
        <ViewAllButtonContainer onClick={handleClickViewAll}>
          <ViewAllTextButton>
            {viewAllTexts ? (
              viewAllTexts.singular
            ) : (
              <FormattedMessage id="my_quest_view_all" />
            )}
          </ViewAllTextButton>
        </ViewAllButtonContainer>
      ) : null}
    </DefaultLayout>
  );
}
