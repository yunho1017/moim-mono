import * as React from "react";
import { FormattedMessage } from "react-intl";
import Progress from "./components/progressBar";
import MissionGroup from "./components/missionGroup";
import useIsMobile from "common/hooks/useIsMobile";
import useCurrentUser from "common/hooks/useCurrentUser";
import { shaveWalletAddress } from "common/helpers/nft";
import {
  Container,
  HeadProgressContainer,
  Head,
  Body,
  VerifyAllButton,
  Mid,
  Bottom,
  RetryIcon,
  BlockVeil,
  LockIcon,
  RegularButton,
  HeadCaption,
  UserProfilePreview,
} from "./styled";

export type ThemeType = "black" | "white";

interface IProps {
  isLoading: boolean;
  isLoadingHistory: boolean;
  isJoinLoading: boolean;
  isAchieveLoading: boolean;
  quest: Moim.DQuest.INormalizedQuest;
  history?: Moim.DQuest.IHistory;
  selectedTheme?: ThemeType;
  onClickJoin(): void;
  onClickVerifyAll(): void;
  onClickMission(missionId: Moim.Id): void;
  onClickAchieve(): void;
}

// history 갱신에 대한 로딩 모습 추가 필요.
const DQuestMissionaryComponent: React.FC<IProps> = ({
  isLoadingHistory,
  isJoinLoading,
  isAchieveLoading,
  quest,
  history,
  selectedTheme = "black",
  onClickJoin,
  onClickVerifyAll,
  onClickMission,
  onClickAchieve,
}) => {
  const currentUser = useCurrentUser();
  const isMobile = useIsMobile();
  const isReJoinable = history?.reJoinable;

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

  const canPlayQuest = React.useMemo(() => {
    if (quest.displayStatus === "ACTIVE") {
      if (quest.joinType === "EXPLICIT") {
        return Boolean(history);
      }
      return true;
    }
    return false;
  }, [history, quest.displayStatus, quest.joinType]);

  const headContent = React.useMemo(() => {
    if (
      quest.joinType === "EXPLICIT" &&
      quest.displayStatus === "ACTIVE" &&
      !history
    ) {
      if (isMobile) {
        return null;
      }
      return (
        <Head>
          <HeadCaption selectedTheme={selectedTheme}>
            <UserProfilePreview
              selectedTheme={selectedTheme}
              src={currentUser?.avatar_url}
            />
            <FormattedMessage
              id="quest_progress_caption_before_start"
              values={{ user_name_address: web3UserName }}
            />
          </HeadCaption>
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
        </Head>
      );
    }

    if (!history) return null;

    if (history.reJoinable) {
      return (
        <Head>
          <HeadCaption selectedTheme={selectedTheme}>
            <UserProfilePreview
              selectedTheme={selectedTheme}
              src={currentUser?.avatar_url}
            />
            <FormattedMessage
              id="quest_progress_caption_in_progress"
              values={{ user_name_address: web3UserName }}
            />
          </HeadCaption>
          <Progress
            isReJoinable={isReJoinable}
            value={0}
            max={history.progressTotal}
            selectedTheme={selectedTheme}
          />
        </Head>
      );
    } else {
      if (
        quest.achieveType === "EXPLICIT" &&
        quest.displayStatus === "ACTIVE"
      ) {
        if (history.status === "ACHIEVED_NOT_REWARDED") {
          if (isMobile) {
            return (
              <Head>
                <HeadCaption selectedTheme={selectedTheme}>
                  <UserProfilePreview
                    selectedTheme={selectedTheme}
                    src={currentUser?.avatar_url}
                  />
                  <FormattedMessage
                    id="quest_progress_caption_before_achieve"
                    values={{ user_name_address: web3UserName }}
                  />
                </HeadCaption>
                <Progress
                  isReJoinable={isReJoinable}
                  value={history.progress}
                  max={history.progressTotal}
                  selectedTheme={selectedTheme}
                />
              </Head>
            );
          } else {
            return (
              <>
                <Head>
                  <HeadCaption selectedTheme={selectedTheme}>
                    <UserProfilePreview
                      selectedTheme={selectedTheme}
                      src={currentUser?.avatar_url}
                    />
                    <FormattedMessage
                      id="quest_progress_caption_before_achieve"
                      values={{ user_name_address: web3UserName }}
                    />
                  </HeadCaption>
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
                </Head>
                <HeadProgressContainer>
                  <Progress
                    isReJoinable={isReJoinable}
                    value={history.progress}
                    max={history.progressTotal}
                    selectedTheme={selectedTheme}
                  />
                </HeadProgressContainer>
              </>
            );
          }
        } else if (history.status === "ACHIEVED") {
          if (isMobile) {
            return (
              <Head>
                <HeadCaption selectedTheme={selectedTheme}>
                  <UserProfilePreview
                    selectedTheme={selectedTheme}
                    src={currentUser?.avatar_url}
                  />
                  <FormattedMessage
                    id="quest_progress_caption_achieved"
                    values={{ user_name_address: web3UserName }}
                  />
                </HeadCaption>
                <Progress
                  isReJoinable={isReJoinable}
                  value={history.progress}
                  max={history.progressTotal}
                  selectedTheme={selectedTheme}
                />
              </Head>
            );
          }
          return (
            <Head>
              <HeadCaption selectedTheme={selectedTheme}>
                <UserProfilePreview
                  selectedTheme={selectedTheme}
                  src={currentUser?.avatar_url}
                />
                <FormattedMessage
                  id="quest_progress_caption_achieved"
                  values={{ user_name_address: web3UserName }}
                />
              </HeadCaption>
              <RegularButton selectedTheme={selectedTheme} disabled={true}>
                {quest.rewardedTitle ?? (
                  <FormattedMessage id="button_quest_achieved_default" />
                )}
              </RegularButton>
            </Head>
          );
        }
      }

      return (
        <Head>
          <HeadCaption selectedTheme={selectedTheme}>
            <UserProfilePreview
              selectedTheme={selectedTheme}
              src={currentUser?.avatar_url}
            />
            <FormattedMessage
              id="quest_progress_caption_in_progress"
              values={{ user_name_address: web3UserName }}
            />
          </HeadCaption>
          <Progress
            isReJoinable={isReJoinable}
            value={history.progress}
            max={history.progressTotal}
            selectedTheme={selectedTheme}
          />
        </Head>
      );
    }
  }, [
    isReJoinable,
    quest.joinType,
    quest.displayStatus,
    quest.joinTitle,
    quest.achieveType,
    quest.achieveTitle,
    quest.rewardedTitle,
    history,
    isMobile,
    selectedTheme,
    currentUser,
    web3UserName,
    isJoinLoading,
    onClickJoin,
    isAchieveLoading,
    onClickAchieve,
  ]);

  return (
    <Container>
      {headContent ? headContent : undefined}

      <Body canPlayQuest={canPlayQuest} selectedTheme={selectedTheme}>
        <div className="container">
          <Mid>
            <MissionGroup
              isLoading={isLoadingHistory}
              missions={quest.mission}
              history={history}
              selectedTheme={selectedTheme}
              onClickMission={onClickMission}
            />
          </Mid>
          <Bottom selectedTheme={selectedTheme}>
            <VerifyAllButton
              isLoading={isLoadingHistory}
              selectedTheme={selectedTheme}
              disabled={isLoadingHistory}
              onClick={onClickVerifyAll}
            >
              <FormattedMessage id="button_quest_verify_all" />
              <RetryIcon selectedTheme={selectedTheme} />
            </VerifyAllButton>
          </Bottom>
          <BlockVeil>
            <LockIcon />
          </BlockVeil>
        </div>
      </Body>
    </Container>
  );
};

export default DQuestMissionaryComponent;
