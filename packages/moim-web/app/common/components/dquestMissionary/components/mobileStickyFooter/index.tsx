import * as React from "react";
import { FormattedMessage } from "react-intl";
import useIsMobile from "common/hooks/useIsMobile";
import useCurrentUser from "common/hooks/useCurrentUser";
import { shaveWalletAddress } from "common/helpers/nft";
import { ThemeType } from "../../component";
import { UserProfilePreview } from "../../styled";
import {
  RootWrapper,
  Container,
  HintWrapper,
  Buttons,
  RegularButton,
  RetryIcon,
  RetryButton,
  Progress,
} from "./styled";

interface IProps {
  selectedTheme: ThemeType;
  isJoinLoading: boolean;
  isLoadingHistory: boolean;
  isAchieveLoading: boolean;
  quest: Moim.DQuest.INormalizedQuest;
  history?: Moim.DQuest.IHistory;
  backgroundColor?: string;
  onClickJoin(): void;
  onClickRefresh(): void;
  onClickAchieve(): void;
}

const MobileStickyFooter: React.FC<IProps> = ({
  isJoinLoading,
  isLoadingHistory,
  isAchieveLoading,
  selectedTheme,
  quest,
  history,
  backgroundColor,
  onClickJoin,
  onClickRefresh,
  onClickAchieve,
}) => {
  const currentUser = useCurrentUser();
  const isMobile = useIsMobile();

  const web3UserName = React.useMemo(() => {
    if (currentUser) {
      return `${currentUser.name}${
        currentUser.metamask
          ? `(${shaveWalletAddress(currentUser.metamask)})`
          : ""
      }`;
    }
    return "Hey fren";
  }, [currentUser]);

  const phase = React.useMemo(() => {
    if (!history) {
      return "before";
    } else {
      switch (history.status) {
        case "IN_PROGRESS":
          return "in_progress";
        case "ACHIEVED_NOT_REWARDED":
          return "not_rewarded";
        case "ACHIEVED":
          return "done";
      }
    }
  }, [history]);

  const hintMessage = React.useMemo(() => {
    switch (phase) {
      case "before":
        return (
          <FormattedMessage
            id="quest_progress_caption_before_start"
            values={{ user_name_address: web3UserName }}
          />
        );
      case "in_progress":
        return (
          <FormattedMessage
            id="quest_progress_caption_in_progress"
            values={{ user_name_address: web3UserName }}
          />
        );
      case "not_rewarded":
        return (
          <FormattedMessage
            id="quest_progress_caption_before_achieve"
            values={{ user_name_address: web3UserName }}
          />
        );
      case "done":
        return (
          <FormattedMessage
            id="quest_progress_caption_achieved"
            values={{ user_name_address: web3UserName }}
          />
        );
    }
  }, [phase, web3UserName]);

  const renderButtons = React.useMemo(() => {
    switch (phase) {
      case "before": {
        if (quest.displayStatus === "ACTIVE" && quest.joinType === "EXPLICIT") {
          return (
            <RegularButton
              selectedTheme={selectedTheme}
              disabled={isJoinLoading}
              waiting={isJoinLoading}
              onClick={onClickJoin}
            >
              {quest.joinTitle ?? (
                <FormattedMessage id="button_quest_start_default" />
              )}
            </RegularButton>
          );
        }
        return null;
      }
      case "in_progress": {
        if (
          quest.achieveType === "EXPLICIT" &&
          quest.displayStatus === "ACTIVE"
        ) {
          return [
            <RegularButton selectedTheme={selectedTheme} disabled={true}>
              {quest.achieveTitle ?? (
                <FormattedMessage id="button_quest_achieve_default" />
              )}
            </RegularButton>,
            <RetryButton
              selectedTheme={selectedTheme}
              disabled={isLoadingHistory}
              waiting={isLoadingHistory}
              onClick={onClickRefresh}
            >
              <RetryIcon selectedTheme={selectedTheme} />
            </RetryButton>,
          ];
        }
        return null;
      }
      case "not_rewarded": {
        if (
          quest.achieveType === "EXPLICIT" &&
          quest.displayStatus === "ACTIVE"
        ) {
          return (
            <RegularButton
              selectedTheme={selectedTheme}
              disabled={isAchieveLoading}
              waiting={isAchieveLoading}
              onClick={onClickAchieve}
            >
              {quest.achieveTitle ?? (
                <FormattedMessage id="button_quest_achieve_default" />
              )}
            </RegularButton>
          );
        }
        return null;
      }
      case "done": {
        if (
          !history?.reJoinable &&
          quest.achieveType === "EXPLICIT" &&
          quest.displayStatus === "ACTIVE"
        ) {
          return (
            <RegularButton selectedTheme={selectedTheme} disabled={true}>
              {quest.rewardedTitle ?? (
                <FormattedMessage id="button_quest_achieved_default" />
              )}
            </RegularButton>
          );
        }
        return null;
      }
    }
  }, [
    phase,
    quest.displayStatus,
    quest.joinType,
    quest.joinTitle,
    quest.achieveType,
    quest.achieveTitle,
    quest.rewardedTitle,
    selectedTheme,
    isJoinLoading,
    onClickJoin,
    isLoadingHistory,
    onClickRefresh,
    isAchieveLoading,
    onClickAchieve,
    history?.reJoinable,
  ]);

  if (!isMobile || renderButtons === null) {
    return null;
  }

  return (
    <RootWrapper backgroundColor={backgroundColor}>
      {phase !== "before" || history?.reJoinable ? (
        <Progress
          value={
            history
              ? Math.round(
                  ((history?.reJoinable ? 0 : history.progress) /
                    history.progressTotal) *
                    100,
                )
              : 0
          }
        />
      ) : null}

      <Container>
        <HintWrapper selectedTheme={selectedTheme}>
          <UserProfilePreview
            selectedTheme={selectedTheme}
            src={currentUser?.avatar_url}
          />
          {hintMessage}
        </HintWrapper>
        <Buttons>{renderButtons}</Buttons>
      </Container>
    </RootWrapper>
  );
};

export default MobileStickyFooter;
