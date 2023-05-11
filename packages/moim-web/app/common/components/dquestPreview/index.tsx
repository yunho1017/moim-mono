import * as React from "react";
import { useStoreState } from "app/store";
import { useCurrentUserLocale } from "common/hooks/useGroupTexts";
import Skeleton from "./skeleton";
import Header from "./components/header";
import Footer from "./components/footer";
import ProgressFooter from "./components/footer/progres";
import CTAButton from "./components/footer/CTAButton";
import {
  Wrapper,
  CompleteEngIcon,
  CompleteKrIcon,
  CompleteBadgeContainer,
  Veil,
} from "./styled";

export const DEFAULT_ITEM_STYLE: Moim.Blockit.IDquestGroupItemStyle = {
  isShowOutcomeRow: true,
  isShowPeriodRow: true,
  isShowProgressRow: true,
};

interface IComponentProps {
  quest: Moim.DQuest.INormalizedQuest;
  itemStyleConfig?: Moim.Blockit.IDquestGroupItemStyle;
  history?: Moim.DQuest.IHistory;
  onClick(fromCTA?: boolean): void;
}

export const DQuestPreviewComponent: React.FC<IComponentProps> = React.memo(
  ({ quest, itemStyleConfig, history, onClick }) => {
    const currentLocale = useCurrentUserLocale();

    const isAccomplished = React.useMemo(() => {
      if (!history) {
        return false;
      }
      if (history.reJoinable) {
        return false;
      }

      return (
        (history.status === "ACHIEVED_NOT_REWARDED" ||
          history.status === "ACHIEVED") &&
        history.progress === history.progressTotal
      );
    }, [history]);

    const handleRootClick = React.useCallback(() => {
      onClick();
    }, [onClick]);

    const handleCTAClick = React.useCallback(
      e => {
        e.stopPropagation();
        e.preventDefault();
        onClick(true);
      },
      [onClick],
    );

    return (
      <Wrapper
        role="button"
        inactive={quest.displayStatus === "CLOSED"}
        accomplished={isAccomplished}
        onClick={handleRootClick}
      >
        <Header
          title={quest.title}
          description={quest.description ?? ""}
          showCoverImage={quest.preview.showCoverImage}
          backgroundColor={quest.backgroundColor}
          coverImageUrls={quest.preview.coverImageUrls}
          coverImageUrls_web={quest.preview.coverImageUrls_web}
          backgroundImageUrls={quest.preview.backgroundImageUrls}
          backgroundImageUrls_web={quest.preview.backgroundImageUrls_web}
        />

        <Footer
          questId={quest.id}
          status={quest.displayStatus}
          startAt={quest.startAt}
          endAt={quest.endAt}
          outcomes={quest.outcomes}
          showOutcome={
            itemStyleConfig?.isShowOutcomeRow ?? quest.preview.showOutcome
          }
          showPeriod={itemStyleConfig?.isShowPeriodRow}
          viewerCount={quest.viewerCount}
        />

        <ProgressFooter
          isReJoinableQuest={history?.reJoinable}
          showProgress={
            itemStyleConfig?.isShowProgressRow ?? quest.preview.showProgress
          }
          progress={history?.progress}
          max={history?.progressTotal ?? quest.progressTotal}
        />

        <CTAButton
          textColor={quest.preview.detailButtonTextColor}
          bgColor={quest.preview.detailButtonBackgroundColor}
          onClick={handleCTAClick}
        />
        {isAccomplished ? <Veil /> : null}

        {isAccomplished ? (
          <CompleteBadgeContainer>
            {currentLocale === "ko" ? <CompleteKrIcon /> : <CompleteEngIcon />}
          </CompleteBadgeContainer>
        ) : null}
      </Wrapper>
    );
  },
);

interface IProps {
  questId: Moim.Id;
  disableHide?: boolean;
  itemStyleConfig?: Moim.Blockit.IDquestGroupItemStyle;
  onClick?(questId: Moim.Id): void;
}

const DQuestPreview: React.FC<IProps> = ({
  questId,
  itemStyleConfig,
  onClick,
}) => {
  const quest = useStoreState(state => state.entities.dquest_quests[questId]);
  const history = useStoreState(
    state => state.entities.dquest_histories[questId],
  );

  const handleClick = React.useCallback(() => {
    onClick?.(questId);
  }, [onClick, questId]);

  return (
    <DQuestPreviewComponent
      quest={quest}
      itemStyleConfig={itemStyleConfig}
      history={history}
      onClick={handleClick}
    />
  );
};

export const DQuestPreviewWithSkeleton: React.FC<IProps> = ({
  questId,
  disableHide,
  itemStyleConfig,
  onClick,
}) => {
  const quest = useStoreState(state => state.entities.dquest_quests[questId]);
  const history = useStoreState(
    state => state.entities.dquest_histories[questId],
  );

  const handleClick = React.useCallback(
    (_fromCTA?: boolean) => {
      onClick?.(questId);
    },
    [onClick, questId],
  );

  if (!quest) {
    return <Skeleton itemStyleConfig={itemStyleConfig} />;
  }

  if (!disableHide && quest.hide) {
    return null;
  }

  return (
    <DQuestPreviewComponent
      quest={quest}
      itemStyleConfig={itemStyleConfig}
      history={history}
      onClick={handleClick}
    />
  );
};

export default React.memo(DQuestPreview);
