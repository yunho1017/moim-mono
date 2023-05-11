import * as React from "react";
import * as qs from "query-string";
import { FormattedMessage } from "react-intl";
import { useStoreState, useActions } from "app/store";
import useOpenState from "common/hooks/useOpenState";
import Skeleton from "./components/skeleton";
import MobileStickyFooter from "./components/mobileStickyFooter";
import DQuestFormActionDialog from "./components/formActionDialog";
import DQuestMissionaryComponent, { ThemeType } from "./component";
import {
  fetchQuest,
  fetchHistory,
  postQuestJoin,
  postQuestMissionAction,
  postQuestAchieve,
} from "app/actions/dquest";
import { openDQuestCompleteDialog as openDQuestCompleteDialogAction } from "app/modules/dquest/containers/completeDialog/actions";
import AlertDialog from "common/components/alertDialog";
import { useHandleSignIn } from "common/hooks/useHandleSign";
import useCurrentUser from "common/hooks/useCurrentUser";
import useRedirect from "common/hooks/useRedirect";
import useNextAction from "common/hooks/useNextAction";
import useIsMobile from "common/hooks/useIsMobile";
import { searchMission } from "./utils";
import { MoimURL } from "common/helpers/url";
import { AnalyticsClass } from "common/helpers/analytics/analytics";
import { openSnackbar as openSnackbarAction } from "app/actions/snackbar";

const POLLING_RATE = 10000;

interface IProps {
  questId: Moim.Id;
  mainColor?: ThemeType;
  bottomStickyBGColor?: string;
}

// 전체 데이터 로딩 모습 추가 필요.
const DQuestMissionary: React.FC<IProps> = ({
  questId,
  mainColor = "black",
  bottomStickyBGColor,
}) => {
  const refPollingTimer = React.useRef<NodeJS.Timeout | null>(null);
  const isMobile = useIsMobile();
  const redirect = useRedirect();
  const { isOpen, open: openAlert, close: closeAlert } = useOpenState();
  const [formActionPayload, setFormActionPayload] = React.useState<
    | {
        missionId: Moim.Id;
        payload: Moim.DQuest.IMissionActionForm;
      }
    | undefined
  >(undefined);
  const {
    isOpen: isOpenFormAction,
    open: openFormAction,
    close: closeFormAction,
  } = useOpenState();
  const [alertMessage, setAlertMessage] = React.useState<React.ReactNode>(null);
  const [isLoading, setLoadStatus] = React.useState<boolean | undefined>(
    undefined,
  );
  const [isHistoryLoading, setHistoryLoadStatus] = React.useState<
    boolean | undefined
  >(undefined);
  const [isJoinLoading, setJoinLoadStatus] = React.useState<boolean>(false);
  const [isAchieveLoading, setAchieveLoadStatus] = React.useState<boolean>(
    false,
  );
  const currentUser = useCurrentUser();
  const nextAction = useNextAction();
  const quest = useStoreState(state => state.entities.dquest_quests[questId]);
  const history = useStoreState(
    state => state.entities.dquest_histories[questId],
  );
  const dispatchSignIn = useHandleSignIn();
  const {
    getQuest,
    getQuestHistory,
    getQuestJoin,
    getQuestMissionAction,
    getQuestAchieve,
    openDQuestCompleteDialog,
    openSnackbar,
  } = useActions({
    getQuest: fetchQuest,
    getQuestHistory: fetchHistory,
    getQuestJoin: postQuestJoin,
    getQuestMissionAction: postQuestMissionAction,
    getQuestAchieve: postQuestAchieve,
    openDQuestCompleteDialog: openDQuestCompleteDialogAction,
    openSnackbar: openSnackbarAction,
  });

  const pollingTask = React.useCallback(() => {
    getQuestHistory(questId);
  }, [getQuestHistory, questId]);

  const startPolling = React.useCallback(() => {
    if (refPollingTimer.current) {
      pollingTask();
    } else {
      refPollingTimer.current = setInterval(pollingTask, POLLING_RATE);
    }
  }, [pollingTask]);

  const redirectAction = React.useCallback(
    (targetUrl: string) => {
      const nl = new URL(targetUrl);
      if (nl.hostname === location.hostname) {
        const newQueryParams = new URL(location.href);
        newQueryParams.searchParams.delete("questId");
        const currentQuery = qs.parse(newQueryParams.search, {
          arrayFormat: "bracket",
        });
        Object.entries(currentQuery).forEach(([key, value]) => {
          nl.searchParams.append(key, value as string);
        });
      }

      redirect(nl.toString());
    },
    [redirect],
  );

  const fetchData = React.useCallback(async () => {
    setLoadStatus(true);
    setHistoryLoadStatus(true);

    try {
      await Promise.all([getQuest(questId), getQuestHistory(questId)]);
    } finally {
      setLoadStatus(false);
      setHistoryLoadStatus(false);
    }
  }, [getQuest, getQuestHistory, questId]);

  const promiseHistory = React.useCallback(async () => {
    setHistoryLoadStatus(true);
    try {
      await getQuestHistory(questId);
    } finally {
      setHistoryLoadStatus(false);
    }
  }, [getQuestHistory, questId]);

  const promiseQuestJoin = React.useCallback(async () => {
    setJoinLoadStatus(true);
    try {
      const response = await getQuestJoin(questId);
      await promiseHistory();

      if (response?.details.length) {
        setAlertMessage(response.details[0].message);
        openAlert();
      }
    } finally {
      setJoinLoadStatus(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getQuestJoin, promiseHistory, questId]);

  const promiseMissionAction = React.useCallback(
    async (missionId: Moim.Id, queryPayload?: Record<string, any>) => {
      setHistoryLoadStatus(true);
      try {
        const response = await getQuestMissionAction(
          questId,
          missionId,
          queryPayload,
        );

        if (response?.location) {
          nextAction.registerNextAction("write-post", {
            type: "go-to",
            payload: {
              url: location.href,
              withAlert: true,
            },
          });
          const url = new URL(response.location);
          if (MoimURL.BlockitEditor.isSame(url.pathname)) {
            if (isMobile) {
              const forumId = url.searchParams.get("channel");
              if (forumId) {
                redirectAction(
                  new URL(
                    new MoimURL.CreateForumThread({
                      forumId,
                    }).toString(),
                    location.origin,
                  ).toString(),
                );
              } else {
                redirectAction(
                  new URL(
                    new MoimURL.NotFound().toString(),
                    location.origin,
                  ).toString(),
                );
              }
            } else {
              redirectAction(response.location);
            }
          } else {
            redirectAction(response.location);
          }
        } else if (response?.notification) {
          switch (response.notification.type) {
            case "snackbar":
            case "toast": {
              openSnackbar({
                type: "error",
                text: response.notification.message,
                timeout: 5000,
              });
              break;
            }
            default: {
              openDQuestCompleteDialog({
                questId,
                ...response.notification,
                buttonText: response.notification.linkText,
                buttonLink: response.notification.link,
              });
              break;
            }
          }
        }

        promiseHistory();
      } finally {
        setHistoryLoadStatus(false);
      }
    },
    [
      getQuestMissionAction,
      isMobile,
      nextAction,
      openDQuestCompleteDialog,
      promiseHistory,
      questId,
      redirectAction,
    ],
  );

  const promiseAchieve = React.useCallback(async () => {
    setAchieveLoadStatus(true);
    try {
      const response = await getQuestAchieve(questId);
      await promiseHistory();
      if (response.location) {
        redirectAction(response.location);
      } else if (response.notification) {
        switch (response.notification.type) {
          case "snackbar":
          case "toast": {
            openSnackbar({
              type: "error",
              text: `${response.notification.title}\n${response.notification.message}`,
              timeout: 5000,
            });
            break;
          }
          default: {
            openDQuestCompleteDialog({
              questId,
              ...response.notification,
              buttonText: response.notification.linkText,
              buttonLink: response.notification.link,
            });
            break;
          }
        }
      }
    } finally {
      setAchieveLoadStatus(false);
    }
  }, [
    getQuestAchieve,
    openDQuestCompleteDialog,
    promiseHistory,
    questId,
    redirectAction,
  ]);

  const handleCloseFormAction = React.useCallback(() => {
    closeFormAction();
    setFormActionPayload(undefined);
  }, [closeFormAction]);

  const handleSubmitFormAction = React.useCallback(
    (_: Moim.Id, missionId: Moim.Id, answer: any) => {
      promiseMissionAction(missionId, { answer });
      handleCloseFormAction();
    },
    [handleCloseFormAction, promiseMissionAction],
  );

  const handleClickJoin = React.useCallback(() => {
    AnalyticsClass.getInstance().event({
      category: "quest",
      action: "quest_summary_start_quest",
      name: questId,
    });

    if (!currentUser) {
      dispatchSignIn();
      return;
    }
    promiseQuestJoin();
  }, [currentUser, dispatchSignIn, promiseQuestJoin, questId]);

  const handleClickVerifyAll = React.useCallback(() => {
    AnalyticsClass.getInstance().event({
      category: "quest",
      action: "quest_summary_mission_verify",
      name: questId,
    });
    promiseHistory();
    startPolling();
  }, [promiseHistory, questId, startPolling]);

  const doMissionFormAction = React.useCallback(
    (missionId: Moim.Id) => {
      const targetMission = searchMission(quest.mission, missionId);

      if (targetMission?.action?.form) {
        setFormActionPayload({
          missionId,
          payload: targetMission.action.form,
        });
        openFormAction();
      }
    },
    [openFormAction, quest.mission],
  );

  const doMissionEventAction = React.useCallback(
    (missionId: Moim.Id) => {
      promiseMissionAction(missionId);
      startPolling();
    },
    [promiseMissionAction, startPolling],
  );
  const isFormActionMission = React.useCallback(
    (missionId: Moim.Id) => {
      const targetMission = searchMission(quest.mission, missionId);
      if (targetMission && targetMission.action && targetMission.action.form) {
        return true;
      }
      return false;
    },
    [quest.mission],
  );

  const handleClickMission = React.useCallback(
    (missionId: Moim.Id) => {
      AnalyticsClass.getInstance().event({
        category: "quest",
        action: "quest_summary_mission_execute",
        name: `${questId}|${missionId}`,
      });

      if (!currentUser) {
        dispatchSignIn();
        return;
      }

      if (isFormActionMission(missionId)) {
        doMissionFormAction(missionId);
      } else {
        doMissionEventAction(missionId);
      }
    },
    [
      currentUser,
      dispatchSignIn,
      doMissionEventAction,
      doMissionFormAction,
      isFormActionMission,
      questId,
    ],
  );

  const handleClickAchieve = React.useCallback(() => {
    AnalyticsClass.getInstance().event({
      category: "quest",
      action: "quest_summary_achieve_quest",
      name: questId,
    });

    if (!currentUser) {
      dispatchSignIn();
      return;
    }
    promiseAchieve();
  }, [currentUser, dispatchSignIn, promiseAchieve, questId]);

  React.useEffect(() => {
    if (!quest && isLoading === undefined) {
      fetchData();
    }
  }, [questId]);

  React.useEffect(
    () => () => {
      if (refPollingTimer.current) {
        clearInterval(refPollingTimer.current);
      }
    },
    [questId],
  );

  if (!quest) {
    if (isLoading) {
      return <Skeleton selectedTheme={mainColor} />;
    }
    return null;
  }

  return (
    <>
      <DQuestMissionaryComponent
        isLoading={Boolean(isLoading)}
        isLoadingHistory={Boolean(isHistoryLoading)}
        isJoinLoading={isJoinLoading}
        isAchieveLoading={isAchieveLoading}
        quest={quest}
        history={history}
        selectedTheme={mainColor}
        onClickJoin={handleClickJoin}
        onClickVerifyAll={handleClickVerifyAll}
        onClickMission={handleClickMission}
        onClickAchieve={handleClickAchieve}
      />
      <MobileStickyFooter
        isLoadingHistory={Boolean(isHistoryLoading)}
        isJoinLoading={isJoinLoading}
        isAchieveLoading={isAchieveLoading}
        quest={quest}
        history={history}
        selectedTheme={mainColor}
        backgroundColor={bottomStickyBGColor}
        onClickJoin={handleClickJoin}
        onClickRefresh={handleClickVerifyAll}
        onClickAchieve={handleClickAchieve}
      />
      <AlertDialog
        open={isOpen}
        content={alertMessage}
        rightButtons={[
          {
            text: <FormattedMessage id="button_ok" />,
            onClick: closeAlert,
          },
        ]}
        onClose={closeAlert}
      />
      <DQuestFormActionDialog
        open={isOpenFormAction}
        questId={questId}
        missionId={formActionPayload?.missionId}
        form={formActionPayload?.payload}
        onSubmit={handleSubmitFormAction}
        onClose={handleCloseFormAction}
      />
    </>
  );
};

export default React.memo(DQuestMissionary);
