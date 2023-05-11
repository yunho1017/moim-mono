import * as React from "react";
import { ThemeProvider } from "styled-components";
import { useIntl, FormattedMessage } from "react-intl";
import { RouteComponentProps } from "react-router-dom";
import NoSleep from "nosleep.js";
import * as queryString from "query-string";
import {
  Attendees,
  Chat,
  ControlBar,
  MeetingStatus,
  useMeetingStatus,
  useMeetingManager,
  darkTheme,
  MeetingProvider,
  UserActivityProvider,
  useContentShareState,
  LoggerProvider,
  useLocalVideo,
} from "amazon-chime-sdk-component-library-react";
import {
  MeetingSessionStatusCode,
  DataMessage,
  ConsoleLogger,
  LogLevel,
  EventName,
  EventAttributes,
  MeetingSessionConfiguration,
} from "amazon-chime-sdk-js";
import { debounce } from "lodash";
import { InView } from "react-intersection-observer";
import { useActions, useStoreState } from "app/store";
import useIsMobile from "common/hooks/useIsMobile";
import useCurrentUser from "common/hooks/useCurrentUser";
import useOpenState from "common/hooks/useOpenState";
import { useSnackbar } from "common/components/alertTemplates/alerts/globalSnackbar/useGlobalSnackbar";
import { isAndroid, isiOS, isMobileAgent } from "common/helpers/browserDetect";
import { Spacer } from "common/components/designSystem/spacer";
import {
  joinMeeting as joinMeetingAction,
  endMeeting as endMeetingAction,
  leaveMeeting as leaveMeetingAction,
  ActionCreators as MeetingActionCreators,
} from "app/actions/meeting";
import { FlatButton } from "common/components/designSystem/buttons";
import ControlBarButton from "./components/controlBarButton";
import AudioInputControl from "./components/AudioInputControl";
import VideoInputControl from "./components/VideoInputControl";
import AudioOutputControl from "./components/AudioOutputControl";
import ContentShareControl from "./components/ContentShareControl";
import MeetingRoster from "./components/roster";
import MeetingChat from "./components/chat";
import VideoTileGrid from "./components/videoGrid";
import Setting, { IRef } from "./components/setting";
import {
  RootContainer,
  StyledLayout,
  StyledContent,
  LeaveButton,
  GuideMessage,
} from "./styled";
import { DefaultLoader } from "common/components/loading";
import AlertDialog from "common/components/alertDialog";
import { exportLog, pushLog } from "common/helpers/logCollector";
import { sentryDebugLog } from "common/helpers/errorLogger";
import useRedirect from "common/hooks/useRedirect";
import BeforeUnLoad from "./components/beforeUnLoad";

import {
  useDeviceManager,
  DeviceManagerProvider,
} from "./components/providers/deviceManager";
import Disclaimer, { IRef as IRefDisclaimer } from "./components/disclaimer";

export const LIMIT_OF_MAX_VIDEO_CONNECTION = 100;
export const DATA_MESSAGE_CMD: string = "cmd";
export const DATA_MESSAGE_LIFETIME_MS: number = 3600_000;
export type JOIN_STATUS =
  | "fetch_meeting_info"
  | "init_device_setting"
  | "before_join"
  | "connecting"
  | "reconnecting"
  | "error"
  | "joined"
  | "ended";
export const DEFAULT_MEETING_CONFIG: Moim.Meeting.IMeetingConfig = {
  enableVideo: true,
  enableMic: true,
  enableChat: true,
};

export const getAttendee = async (
  chimeAttendeeId: string,
  externalUserId?: string,
) => {
  if (externalUserId) {
    const matched = externalUserId.match(/^[^#]+#(.+)$/);
    if (matched) {
      return {
        name: matched[1],
      };
    }
  }
  return {
    name: externalUserId || chimeAttendeeId,
  };
};

export const logger = new ConsoleLogger("SDK", LogLevel.INFO);

export const parsedMoimUserId = (externalUserId: string) => {
  const result = externalUserId.match("U:([^#-]+)");
  if (result) {
    return result[1];
  }
  return undefined;
};

const MeetingHome: React.FC<RouteComponentProps<Moim.IMatchParams>> = ({
  match,
}) => {
  const refClose = React.useRef<VoidFunction | null>(null);
  const refNoSleepInstance = React.useRef<NoSleep>(new NoSleep());
  const refDeviceSetting = React.useRef<IRef>(null);
  const refDisclaimer = React.useRef<IRefDisclaimer>(null);

  const redirect = useRedirect();
  const intl = useIntl();
  const isMobile = useIsMobile();
  const currentUser = useCurrentUser();
  const [userConfirmToLeave, setConfirmLeaveStatus] = React.useState(false);
  const [busyWaiting, setBusyWaiting] = React.useState<boolean | undefined>(
    true,
  );
  const [showRoster, setShowRosterStatus] = React.useState(false);
  const [showChat, setShowChatStatus] = React.useState(false);
  const [joinStatus, setJoinStatus] = React.useState<JOIN_STATUS>(
    "before_join",
  );
  const userId = React.useRef<string>("");
  const meeting = React.useRef<any>({});
  const meetingManager = useMeetingManager();
  const meetingStatus = useMeetingStatus();
  const { isLocalUserSharing } = useContentShareState();
  const isMobileDevice = React.useMemo(
    () => isMobileAgent() || isiOS() || isAndroid(),
    [],
  );
  const { isOpen, open: openAlert, close: closeAlert } = useOpenState();
  const { toggleVideo } = useLocalVideo();
  const deviceManager = useDeviceManager();

  const { open: openInfoAlert } = useSnackbar({
    type: "custom-meeting",
    timeout: 2000,
  });
  const { open: openAccruedAlert, close } = useSnackbar({
    type: "custom-meeting",
    timeout: null,
    rightIcon: {
      width: 30,
      height: 18,
      component: (
        <span style={{ color: "white" }}>
          <FormattedMessage id="button_ok" />
        </span>
      ),
      onClick: () => {
        refClose.current?.();
      },
    },
  });
  refClose.current = close;

  const {
    currentMeetingData,
    hasFailed,
    error,
    hostCommandConfig,
  } = useStoreState(state => ({
    ...state.meeting,
  }));
  const { joinMeeting, leaveMeeting, endMeeting, hostCommand } = useActions({
    joinMeeting: joinMeetingAction,
    endMeeting: endMeetingAction,
    leaveMeeting: leaveMeetingAction,
    hostCommand: MeetingActionCreators.hostCommandAttendeeStatus,
  });

  const config: Moim.Meeting.IMeetingConfig = React.useMemo(() => {
    if (currentMeetingData?.config) {
      return currentMeetingData.config;
    }
    return DEFAULT_MEETING_CONFIG;
  }, [currentMeetingData]);

  const sendSentryReport = React.useCallback(() => {
    const qs = queryString.parse(location.search);
    const logStack = exportLog("meeting");
    if (Boolean(qs.debug) && logStack.length) {
      sentryDebugLog(">> Meeting logger::", {
        currentUser: currentUser?.id,
        userName: currentUser?.name,
        logs: JSON.stringify(logStack),
      });
    }
  }, [currentUser?.id, currentUser?.name]);

  const leaveCallback = React.useCallback(
    sessionStatus => {
      const sessionStatusCode = sessionStatus.statusCode();
      pushLog("leaveCallback(): audioVideoDidStop", "meeting", {
        statusCode: sessionStatusCode,
      });

      switch (sessionStatusCode) {
        case MeetingSessionStatusCode.Left:
        case MeetingSessionStatusCode.MeetingEnded: {
          if (currentMeetingData) {
            leaveMeeting(currentMeetingData.meetingId);
          }
          break;
        }

        case MeetingSessionStatusCode.AudioJoinedFromAnotherDevice: {
          openAccruedAlert({
            text: intl.formatMessage({
              id: "toast_message_video_chat_joined_from_another_device",
            }),
          });
          pushLog(
            "leaveCallback(): audioVideoDidStop::AudioJoinedFromAnotherDevice",
            "meeting",
            {
              statusCode: sessionStatusCode,
            },
          );

          break;
        }
        case MeetingSessionStatusCode.ConnectionHealthReconnect: {
          pushLog(
            "leaveCallback(): audioVideoDidStop::ConnectionHealthReconnect",
            "meeting",
            {
              statusCode: sessionStatusCode,
            },
          );
          setJoinStatus("connecting");
          break;
        }
      }

      if (sessionStatusCode === MeetingSessionStatusCode.Left) {
        if (currentMeetingData) {
          leaveMeeting(currentMeetingData.meetingId);
        }
      } else {
        console.log(
          ">>>>>> Stopped with a session status code: ",
          sessionStatusCode,
        );
      }
    },
    [currentMeetingData, leaveMeeting],
  );

  const toggleRosterStatus = React.useCallback(() => {
    setShowRosterStatus(!showRoster);
  }, [showRoster]);
  const toggleChatStatus = React.useCallback(() => {
    setShowChatStatus(!showChat);
  }, [showChat]);

  const handleCloseRoster = React.useCallback(() => {
    setShowRosterStatus(false);
  }, []);

  const handleCloseChat = React.useCallback(() => {
    setShowChatStatus(false);
  }, []);

  const sessionAudioVideoObserver = React.useMemo(
    () => ({
      audioVideoDidStartConnecting: (isReconnecting: boolean) => {
        setJoinStatus(isReconnecting ? "reconnecting" : "connecting");
        if (isReconnecting) {
          openInfoAlert({
            text: intl.formatMessage({
              id: "toast_message_video_chat_reconnection_attempt",
            }),
          });
        }
        pushLog(
          ">>>> MeetingSession Observer::audioVideoDidStartConnecting",
          "meeting",
          {
            isReconnecting,
          },
        );
      },
      audioVideoDidStart: () => {
        openInfoAlert({
          text: intl.formatMessage({
            id: "toast_message_video_chat_successfully_joined",
          }),
        });
        pushLog(">>>> MeetingSession Observer::audioVideoDidStart", "meeting");

        if (deviceManager.selectedAudioInput) {
          meetingManager
            .startAudioInputDevice(deviceManager.selectedAudioInput)
            .then(() => {
              if (deviceManager.muteAudioInput) {
                meetingManager.meetingSession?.audioVideo.realtimeMuteLocalAudio();
              }
            });
        }
        if (deviceManager.selectedAudioOutput) {
          meetingManager.startAudioOutputDevice(
            deviceManager.selectedAudioOutput,
          );
        }
      },
      audioVideoDidStop: sessionStatus => {
        openAccruedAlert({
          text: intl.formatMessage({
            id: "toast_message_video_chat_meeting_ended",
          }),
        });
        pushLog(">>>> MeetingSession Observer::audioVideoDidStop", "meeting", {
          sessionStatus,
          statusCode: sessionStatus.statusCode(),
          isFailure: sessionStatus.isFailure(),
          isTerminal: sessionStatus.isTerminal(),
          isAudioConnectionFailure: sessionStatus.isAudioConnectionFailure(),
        });
      },
      videoTileDidUpdate: tileState => {
        pushLog(">>>> MeetingSession Observer::videoTileDidUpdate", "meeting", {
          tileState,
        });
      },
      videoAvailabilityDidChange: availability => {
        pushLog(
          ">>>> MeetingSession Observer::videoAvailabilityDidChange",
          "meeting",
          { availability },
        );
      },
      // connectionHealthDidChange: connectionHealthData => {
      //   pushLog(
      //     ">>>> MeetingSession Observer::connectionHealthDidChange",
      //     "meeting",
      //     {
      //       connectionHealthData,
      //       isConnectionStartRecent: connectionHealthData.isConnectionStartRecent(
      //         10000,
      //       ),
      //       isGoodSignalRecent: connectionHealthData.isGoodSignalRecent(10000),
      //       isWeakSignalRecent: connectionHealthData.isWeakSignalRecent(10000),
      //       isNoSignalRecent: connectionHealthData.isNoSignalRecent(10000),
      //     },
      //   );
      // },
      connectionDidBecomePoor: () => {
        openAccruedAlert({
          text: intl.formatMessage({
            id: "toast_message_video_chat_network_connection_become_poor",
          }),
        });
        pushLog(
          ">>>> MeetingSession Observer::connectionDidBecomePoor",
          "meeting",
        );
      },
      connectionDidSuggestStopVideo: () => {
        // 인터넷이 완전히 끊겼다고 가정하면, 여기에 케이스가 걸림.
        openAccruedAlert({
          text: intl.formatMessage({
            id: "toast_message_video_chat_network_connection_not_good",
          }),
        });
        pushLog(
          ">>>> MeetingSession Observer::connectionDidSuggestStopVideo",
          "meeting",
        );
      },
      connectionDidBecomeGood: () => {
        openAccruedAlert({
          text: intl.formatMessage({
            id: "toast_message_video_chat_network_connection_become_good",
          }),
        });
        pushLog(
          ">>>> MeetingSession Observer::connectionDidBecomeGood",
          "meeting",
        );
      },
      videoSendDidBecomeUnavailable: () => {
        openAccruedAlert({
          text:
            "CPU/네트워크 상태 불안정으로 판단:videoSendDidBecomeUnavailable",
        });
        pushLog(
          ">>>> MeetingSession Observer::videoSendDidBecomeUnavailable",
          "meeting",
        );
      },
    }),
    [
      deviceManager.muteAudioInput,
      deviceManager.selectedAudioInput,
      deviceManager.selectedAudioOutput,
      intl,
      meetingManager,
      openAccruedAlert,
      openInfoAlert,
    ],
  );

  const fatalErrorObserver = React.useCallback(
    (err: Error) => {
      openAccruedAlert({
        text: `FATAL Error: ${err.message}`,
      });
      pushLog(
        ">>>> MeetingSession realtime::realtimeSubscribeToFatalError",
        "meeting",
        { err },
      );
    },
    [openAccruedAlert],
  );

  const realtimeAttendeeIdPresence = React.useCallback(
    (
      attendeeId: string,
      present: boolean,
      externalUserId?: string,
      dropped?: boolean,
    ) => {
      console.log(
        ">>>>>> realtimeSubscribeToAttendeeIdPresence",
        attendeeId,
        present,
        externalUserId,
        dropped,
      );
    },
    [],
  );

  const meetingManagerObserver = React.useMemo(
    () => ({
      audioVideoDidStop: leaveCallback,
      remoteVideoSourcesDidChange: vSource => {
        console.log(">>>>> remoteVideoSourcesDidChange", vSource);
        console.log(
          ">>>> getRemoteVideoSources:",
          meetingManager.meetingSession?.audioVideo.getRemoteVideoSources(),
        );
      },
    }),
    [leaveCallback, meetingManager.meetingSession],
  );

  const pageExit = React.useCallback(() => {
    setTimeout(() => {
      if (isMobile) {
        window.close();
        history.back();
      } else {
        window.close();
        redirect("/");
      }
    }, 500);
  }, [redirect, isMobile]);

  const handleLeave = React.useCallback(() => {
    sendSentryReport();
    refNoSleepInstance.current.disable();
    refClose.current?.();
    refDisclaimer.current?.close();
    refDeviceSetting.current?.close();
    meetingManager.audioVideo?.stopAudioInput();
    meetingManager.audioVideo?.stopVideoInput();
    meetingManager.meetingSession?.audioVideo.removeObserver(
      sessionAudioVideoObserver,
    );
    meetingManager.audioVideo?.realtimeUnsubscribeToFatalError(
      fatalErrorObserver,
    );
    meetingManager.meetingSession?.audioVideo.realtimeUnsubscribeToAttendeeIdPresence(
      realtimeAttendeeIdPresence,
    );
    meetingManager.audioVideo?.removeObserver(meetingManagerObserver);

    if (currentUser && currentMeetingData?.meeting.host !== currentUser.id) {
      meetingManager.leave();
    }
  }, [
    currentMeetingData?.meeting.host,
    currentUser,
    fatalErrorObserver,
    meetingManager,
    meetingManagerObserver,
    realtimeAttendeeIdPresence,
    sendSentryReport,
    sessionAudioVideoObserver,
  ]);

  const handleLeaveClick = React.useCallback(() => {
    if (currentUser && currentMeetingData?.meeting.host === currentUser.id) {
      openAlert();
    } else {
      handleLeave();
      pageExit();
    }
  }, [
    currentMeetingData?.meeting.host,
    currentUser,
    handleLeave,
    openAlert,
    pageExit,
  ]);

  const receiveCommand = React.useCallback(
    (data: DataMessage) => {
      const command = JSON.parse(data.text());
      const matched = data.senderExternalUserId.match(/U:([^#-]+)/);
      if (!matched) {
        return;
      }
      const senderUserId = matched[0].replace("U:", "");

      // ignore command from other user
      if (meeting.current.host !== senderUserId) {
        return;
      }

      if (
        command.type === "changeUser" &&
        command.data.userId === userId.current
      ) {
        hostCommand(command);
        if (command.data.hasOwnProperty("setMic")) {
          if (!command.data.setMic) {
            meetingManager.audioVideo?.realtimeMuteLocalAudio();
          } else {
            // meetingManager.audioVideo?.realtimeUnmuteLocalAudio();
          }
        }
        if (command.data.hasOwnProperty("setVideo")) {
          if (!command.data.setVideo) {
            meetingManager.audioVideo?.stopLocalVideoTile();
          } else {
            // meetingManager.audioVideo?.startLocalVideoTile();
          }
        }

        if (command.data.enableMic !== null) {
          // console.log(
          //   ">>>>>>>>>>> receiveCommand:enableMic",
          //   command.data.enableMic,
          // );
        }
        if (command.data.enableVideo !== undefined) {
          // console.log(
          //   ">>>>>>>>>>> receiveCommand:enableVideo",
          //   command.data.enableVideo,
          // );
        }
        if (command.data.enableChat !== undefined) {
          // console.log(
          //   ">>>>>>>>>>> receiveCommand:enableChat",
          //   command.data.enableChat,
          // );
        }
      }
      if (command.type === "pinVideo") {
        hostCommand(command);
      }
      if (command.type === "changeHost") {
        hostCommand(command);
        meeting.current.host = command.data.userId;
      }
      if (command.type === "changeMeeting") {
        hostCommand(command);
        if (command.data.hasOwnProperty("setMic")) {
          if (!command.data.setMic) {
            meetingManager.audioVideo?.realtimeMuteLocalAudio();
          } else {
            // meetingManager.audioVideo?.realtimeUnmuteLocalAudio();
          }
        }
        if (command.data.hasOwnProperty("setVideo")) {
          if (!command.data.setVideo) {
            meetingManager.audioVideo?.stopLocalVideoTile();
          } else {
            // meetingManager.audioVideo?.startLocalVideoTile();
          }
        }
      }
    },
    [hostCommand, meetingManager.audioVideo],
  );

  const meetingStatusCallback = React.useCallback(
    (updatedMeetingStatus: MeetingStatus) => {
      console.log(">>>>>>> meetingStatus", updatedMeetingStatus);
      if (updatedMeetingStatus === MeetingStatus.Ended) {
        // TODO handle this
        console.log(">>>>>>> Meeting finished");
        openInfoAlert({ text: "미팅 상태:updatedMeetingStatus:: Ended" });
        handleLeave();
      } else if (
        updatedMeetingStatus === MeetingStatus.Succeeded &&
        meetingManager.audioVideo
      ) {
        meetingManager.audioVideo!.realtimeSubscribeToReceiveDataMessage(
          DATA_MESSAGE_CMD,
          receiveCommand,
        );
      } else if (
        updatedMeetingStatus === MeetingStatus.JoinedFromAnotherDevice
      ) {
        openAccruedAlert({
          text: intl.formatMessage({
            id: "toast_message_video_chat_joined_from_another_device",
          }),
        });
      } else {
        console.log(">>>>>>> meetingStatus updated", updatedMeetingStatus);
      }
    },
    [
      intl,
      handleLeave,
      meetingManager.audioVideo,
      openAccruedAlert,
      openInfoAlert,
      receiveCommand,
    ],
  );

  const meetingEventReceiver = React.useCallback(
    (name: EventName, attribute: EventAttributes) => {
      console.log(">>>>> subscribeToEventDidReceive", name, attribute);
      switch (name) {
        case "meetingStartRequested": {
          setJoinStatus("connecting");
          break;
        }
        case "attendeePresenceReceived":
        case "meetingReconnected":
        case "meetingStartSucceeded": {
          setJoinStatus("joined");
          break;
        }

        // case "audioInputFailed": {
        //   // 브라우저 권한을 안줬을때 즉시 케이스를 탐.
        //   meetingManager.audioVideo?.realtimeMuteLocalAudio();
        //   window.alert(
        //     intl.formatMessage({ id: "dialog_video_chat_allow_device" }),
        //   );
        //   handleLeave();
        //   break;
        // }
        // case "videoInputFailed": {
        //   // 브라우저 권한을 안줬을때 즉시 케이스를 탐.
        //   window.alert(
        //     intl.formatMessage({ id: "dialog_video_chat_allow_device" }),
        //   );
        //   handleLeave();
        //   break;
        // }
        case "sendingAudioFailed": {
          // 브라우저 권한을 안주고 미팅에 접속하고, 잠시후 장치에서 마이크를 보낼 수 없다고 알려줌.
          break;
        }
        case "signalingDropped":
        case "receivingAudioDropped": {
          break;
        }
        case "meetingFailed": {
          openAccruedAlert({
            text: "미팅실패::meetingFailed",
          });
          break;
        }
        case "meetingStartFailed": {
          openAccruedAlert({
            text: "미팅시작실패::meetingStartFailed",
          });
          break;
        }
      }
    },
    [openAccruedAlert],
  );

  const fetchMoimMeetingData = React.useCallback(
    async (meetingId: Moim.Id) => {
      setJoinStatus("fetch_meeting_info");
      refNoSleepInstance.current.enable();
      try {
        pushLog("pre-fetch meeting", "meeting", { meetingId });
        const result = await joinMeeting(meetingId);
        userId.current = result?.userId ?? "";
        meeting.current = result?.meeting ?? {};
        pushLog("done-fetch meeting", "meeting", {
          meetingId,
          userId: userId.current,
          meeting: meeting.current,
        });
        setJoinStatus("init_device_setting");
      } catch (err) {
        pushLog("failed-fetch meeting", "meeting", { meetingId });
        if ((err as any).code === "MEETING_ENDED") {
          setJoinStatus("ended");
        } else {
          setJoinStatus("error");
        }
      }
    },
    [joinMeeting],
  );

  const join = React.useCallback(
    async (meetingId: Moim.Id) => {
      setJoinStatus("before_join");
      meetingManager.getAttendee = getAttendee;
      meetingManager.subscribeToMeetingStatus(meetingStatusCallback);
      meetingManager.subscribeToEventDidReceive(meetingEventReceiver);

      try {
        if (currentMeetingData) {
          const meetingSessionConfiguration = new MeetingSessionConfiguration(
            currentMeetingData.meeting.chimeData,
            currentMeetingData.chimeData,
          );
          pushLog("pre-join meeting", "meeting", {
            meetingId,
            meetingSessionConfiguration,
          });
          await meetingManager.join(meetingSessionConfiguration);
          await meetingManager.start();
          pushLog("done-join meeting", "meeting", { meetingId });

          meetingManager.meetingSession?.audioVideo.addObserver(
            sessionAudioVideoObserver,
          );
          meetingManager.audioVideo?.realtimeSubscribeToFatalError(
            fatalErrorObserver,
          );
          meetingManager.meetingSession?.audioVideo.realtimeSubscribeToAttendeeIdPresence(
            realtimeAttendeeIdPresence,
          );
          meetingManager.audioVideo?.addObserver(meetingManagerObserver);
        } else {
          pushLog("failed-fetch meeting no-chime data", "meeting", {
            meetingId,
          });
          setJoinStatus("error");
        }
      } catch (err) {
        pushLog("failed-fetch meeting", "meeting", { meetingId });
        if ((err as any).code === "MEETING_ENDED") {
          setJoinStatus("ended");
        } else {
          setJoinStatus("error");
        }
      }
    },
    [
      meetingManager,
      meetingStatusCallback,
      meetingEventReceiver,
      currentMeetingData,
      sessionAudioVideoObserver,
      fatalErrorObserver,
      realtimeAttendeeIdPresence,
      meetingManagerObserver,
    ],
  );

  const errorElement = React.useMemo(() => {
    if (!error) {
      return "Error accrued!";
    }
    switch (error.code) {
      case "MEETING_ENDED": {
        return "Error, can access to meeting.\nBecause this meeting has been ended.";
      }
      default: {
        return "Error accrued!";
      }
    }
  }, [error]);

  const handleClickReJoin = React.useCallback(
    debounce(() => {
      if (match.params.meetingId) {
        join(match.params.meetingId);
      }
    }, 500),
    [join],
  );

  const promiseLeave = React.useCallback(async () => {
    try {
      if (match.params.meetingId) {
        await endMeeting(match.params.meetingId);
        await meetingManager.leave();
      }
    } finally {
      closeAlert();
      handleLeave();
      setTimeout(() => {
        pageExit();
      }, 500);
    }
  }, [
    closeAlert,
    endMeeting,
    handleLeave,
    match.params.meetingId,
    meetingManager,
    pageExit,
  ]);

  const handleConfirmLeave = React.useCallback(() => {
    setConfirmLeaveStatus(true);
    promiseLeave();
  }, [promiseLeave]);

  const handleJoinClick = React.useCallback(() => {
    if (match.params.meetingId) {
      if (!deviceManager.isDeniedPermission) {
        refDisclaimer.current?.close();
        join(match.params.meetingId);
      } else {
        deviceManager.showDevicePermissionAlert();
      }
    }
  }, [deviceManager, join, match.params.meetingId]);

  const handleInitialVideoStatus = React.useCallback(
    (inview: boolean) => {
      if (inview && deviceManager.selectedVideo && !deviceManager.muteVideo) {
        meetingManager
          .startVideoInputDevice(deviceManager.selectedVideo)
          .then(() => {
            requestAnimationFrame(() => {
              toggleVideo();
            });
          });
      }
    },
    [
      deviceManager.muteVideo,
      deviceManager.selectedVideo,
      meetingManager,
      toggleVideo,
    ],
  );

  const innerContent = React.useMemo(() => {
    if (
      meetingStatus !== MeetingStatus.Loading &&
      (meetingStatus === MeetingStatus.Failed ||
        joinStatus === "error" ||
        hasFailed)
    ) {
      return (
        <GuideMessage>
          {errorElement}
          <Spacer value={12} />
          <FlatButton
            size="m"
            waiting={joinStatus === "connecting"}
            disabled={joinStatus === "connecting"}
            onClick={handleClickReJoin}
          >
            Reconnect
          </FlatButton>
        </GuideMessage>
      );
    } else if (joinStatus === "init_device_setting") {
      return (
        <GuideMessage>
          Device setting...
          <DefaultLoader />
        </GuideMessage>
      );
    } else if (joinStatus !== "joined") {
      return (
        <GuideMessage>
          Joining the meeting...
          <DefaultLoader />
        </GuideMessage>
      );
    }

    return (
      <StyledContent>
        <VideoTileGrid
          selfAttendId={currentMeetingData?.chimeData.AttendeeId}
        />
        <InView
          threshold={1}
          triggerOnce={true}
          onChange={handleInitialVideoStatus}
        >
          <div></div>
        </InView>
        <ControlBar
          className="controls-menu"
          layout="undocked-horizontal"
          showLabels={true}
        >
          <div className="inner">
            <AudioInputControl config={config} hostConfig={hostCommandConfig} />
            <VideoInputControl config={config} hostConfig={hostCommandConfig} />
            {!isMobileDevice && (
              <ContentShareControl
                label={intl.formatMessage({
                  id: isLocalUserSharing
                    ? "video_chat/screen/button_share_content_off"
                    : "video_chat/screen/button_share_content_on",
                })}
              />
            )}
            <AudioOutputControl
              label={intl.formatMessage({
                id: "video_chat/screen/button_speaker",
              })}
            />
            <ControlBarButton
              icon={<Attendees />}
              onClick={toggleRosterStatus}
              label={intl.formatMessage({
                id: "video_chat/screen/button_participants",
              })}
            />
            <ControlBarButton
              icon={<Chat />}
              onClick={toggleChatStatus}
              label={intl.formatMessage({
                id: "video_chat/screen/button_chat",
              })}
            />
            <div data-testid="control-bar-item">
              <LeaveButton onClick={handleLeaveClick}>
                <FormattedMessage id="video_chat/screen/button_leave" />
              </LeaveButton>
            </div>
          </div>
        </ControlBar>
      </StyledContent>
    );
  }, [
    config,
    currentMeetingData?.chimeData.AttendeeId,
    errorElement,
    handleClickReJoin,
    handleInitialVideoStatus,
    handleLeaveClick,
    hasFailed,
    hostCommandConfig,
    intl,
    isLocalUserSharing,
    isMobileDevice,
    joinStatus,
    meetingStatus,
    toggleChatStatus,
    toggleRosterStatus,
  ]);

  React.useEffect(() => {
    if (match.params.meetingId) {
      fetchMoimMeetingData(match.params.meetingId);
    }
    return () => {
      refClose.current?.();
      handleLeave();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (joinStatus === "init_device_setting") {
      refDisclaimer.current?.open();
    }
  }, [deviceManager.isLoading, joinStatus]);

  React.useLayoutEffect(() => {
    if (busyWaiting === false && !currentUser) {
      handleLeave();
    }
  }, [currentUser, handleLeave, busyWaiting]);

  React.useLayoutEffect(() => {
    if (
      joinStatus === "ended" ||
      (meetingStatus !== MeetingStatus.Loading &&
        (meetingStatus === MeetingStatus.Ended ||
          joinStatus === "error" ||
          hasFailed))
    ) {
      setTimeout(() => {
        handleLeave();
      }, 3000);
    }
  }, [handleLeave, hasFailed, joinStatus, meetingStatus]);

  React.useLayoutEffect(() => {
    const waitTask = setTimeout(() => {
      setBusyWaiting(false);
    }, 5000);

    return () => {
      window.clearTimeout(waitTask);
      setBusyWaiting(undefined);
    };
  }, []);

  React.useEffect(() => {
    const qs = queryString.parse(location.search);
    if (Boolean(qs.debug)) {
      return () => {
        sendSentryReport();
      };
    }
  }, [sendSentryReport]);

  if (meetingStatus === MeetingStatus.Ended || joinStatus === "ended") {
    return <GuideMessage>Meeting finished</GuideMessage>;
  }

  return (
    <>
      <BeforeUnLoad enable={!userConfirmToLeave} />
      <StyledLayout showRoster={showRoster} showChat={showChat}>
        {innerContent}

        {showRoster ? (
          <MeetingRoster onCloseRoster={handleCloseRoster} />
        ) : null}

        {match.params.meetingId && (
          <MeetingChat
            open={showChat}
            meetingId={match.params.meetingId}
            config={config}
            onCloseChat={handleCloseChat}
          />
        )}
        <Setting ref={refDeviceSetting} onSave={handleJoinClick} />
        <Disclaimer
          ref={refDisclaimer}
          meetingName={currentMeetingData?.meeting.name ?? "-Untitled-"}
          onClickJoin={handleJoinClick}
          onClickExit={handleLeaveClick}
        />

        <AlertDialog
          open={isOpen}
          onClose={closeAlert}
          title={<FormattedMessage id="dialog_video_chat_host_leave_title" />}
          content={<FormattedMessage id="dialog_video_chat_host_leave_body" />}
          rightButtons={[
            {
              text: <FormattedMessage id="button_cancel" />,
              onClick: closeAlert,
            },
            {
              text: <FormattedMessage id="button_ok" />,
              onClick: handleConfirmLeave,
            },
          ]}
        />
      </StyledLayout>
    </>
  );
};

export default (props: RouteComponentProps<Moim.IMatchParams>) => (
  <ThemeProvider theme={darkTheme as any}>
    <LoggerProvider logger={logger}>
      <MeetingProvider>
        <DeviceManagerProvider>
          <RootContainer>
            <UserActivityProvider>
              <MeetingHome {...props} />
            </UserActivityProvider>
          </RootContainer>
        </DeviceManagerProvider>
      </MeetingProvider>
    </LoggerProvider>
  </ThemeProvider>
);
