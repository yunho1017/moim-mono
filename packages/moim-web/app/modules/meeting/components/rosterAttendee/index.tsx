import * as React from "react";
import {
  useAttendeeStatus,
  useRosterState,
  useMeetingManager,
  useLocalVideo,
  useToggleLocalMute,
  useRemoteVideoTileState,
} from "amazon-chime-sdk-component-library-react";
import { useIntl } from "react-intl";
import {
  ActionCreators as MeetingActionCreator,
  changeMeetingHost as changeMeetingHostAction,
  changeUserStatus as changeUserStatusAction,
  changeMeetingStatus as changeMeetingStatusAction,
} from "app/actions/meeting";
import useCurrentUser from "common/hooks/useCurrentUser";
import { useActions, useStoreState } from "app/store";
import {
  LIMIT_OF_MAX_VIDEO_CONNECTION,
  DATA_MESSAGE_CMD,
  DATA_MESSAGE_LIFETIME_MS,
  DEFAULT_MEETING_CONFIG,
} from "../..";
import MicrophoneActivity from "../microphoneActivity";
import RosterCell from "../rosterCell";
import { useSnackbar } from "common/components/alertTemplates/alerts/globalSnackbar/useGlobalSnackbar";

export interface RosterAttendeeProps
  extends Omit<
    React.ComponentProps<typeof RosterCell>,
    "name" | "isHost" | "isMine"
  > {
  /** The ID of a Chime meeting attendee. */
  attendeeId: Moim.Id;
  externalUserId: Moim.Id;
  amIHost: boolean;
}

export const RosterAttendee: React.FC<RosterAttendeeProps> = ({
  attendeeId,
  externalUserId,
  amIHost,
  ...rest
}) => {
  const [actionLoading, setActionLoadStatus] = React.useState(false);
  const currentUser = useCurrentUser();
  const intl = useIntl();
  const { tiles: remoteVideoTiles } = useRemoteVideoTileState();
  const { toggleVideo, isVideoEnabled } = useLocalVideo();
  const { toggleMute } = useToggleLocalMute();
  const { meetingId, config, hostConfig, hostAction } = useStoreState(
    state => ({
      meetingId: state.meeting.currentMeetingData?.meetingId,
      config:
        state.meeting.currentMeetingData?.meeting.config ??
        DEFAULT_MEETING_CONFIG,
      hostConfig: state.meeting.hostCommandConfig,
      hostAction: state.meeting.hostActioned.roster[attendeeId] ?? {
        mic: state.meeting.hostActioned.muteAllMic,
        video: false,
        chat: false,
      },
    }),
  );
  const { muted, videoEnabled, sharingContent } = useAttendeeStatus(attendeeId);
  const { roster } = useRosterState();
  const meetingManager = useMeetingManager();
  const attendeeName = roster[attendeeId]?.name || "";

  const { open: openPinSuccessSnackBar } = useSnackbar({
    type: "success",
    text: intl.formatMessage({ id: "toast_message_pin_video_global_success" }),
  });
  const { open: openUnPinSuccessSnackBar } = useSnackbar({
    text: intl.formatMessage({
      id: "toast_message_unpin_video_global_success",
    }),
  });
  const { open: openNeedVideoOnSnackBar } = useSnackbar({
    text: intl.formatMessage({ id: "toast_message_pin_video_need_camera_on" }),
  });
  const { open: openGeneralPinErrorSnackBar } = useSnackbar({
    text: intl.formatMessage({ id: "toast_message_pin_video_global_failure" }),
  });
  const { open: openLimitOfVideoConnection } = useSnackbar({
    text: intl.formatMessage({ id: "toast_message_limit_of_video_connection" }),
  });

  const parsedMoimUserId = React.useMemo(() => {
    const result = externalUserId.match("U:([^#-]+)");
    if (result) {
      return result[1];
    }
    return undefined;
  }, [externalUserId]);
  const isPinned = React.useMemo(
    () =>
      Boolean(
        parsedMoimUserId && config.pinnedUsers?.includes(parsedMoimUserId),
      ),
    [config.pinnedUsers, parsedMoimUserId],
  );

  const {
    changeMeetingHost,
    changeUserStatus,
    changeHostAction,
    changeMeetingStatus,
  } = useActions({
    changeMeetingHost: changeMeetingHostAction,
    changeUserStatus: changeUserStatusAction,
    changeHostAction: MeetingActionCreator.hostActioned,
    changeMeetingStatus: changeMeetingStatusAction,
  });

  const mine = React.useMemo(() => {
    if (!parsedMoimUserId || !currentUser) {
      return false;
    }
    return parsedMoimUserId === currentUser.id;
  }, [currentUser, parsedMoimUserId]);

  const sendCommand = React.useCallback(
    (data: Moim.Meeting.ICommandData) => {
      if (meetingManager.audioVideo) {
        meetingManager.audioVideo!.realtimeSendDataMessage(
          DATA_MESSAGE_CMD,
          JSON.stringify(data),
          DATA_MESSAGE_LIFETIME_MS,
        );
      }
    },
    [meetingManager.audioVideo],
  );

  const changeUser = React.useCallback(
    (iConfig: Moim.Meeting.IAttendeeInterfaceConfig) => {
      if (!actionLoading && meetingId && parsedMoimUserId) {
        setActionLoadStatus(true);
        changeUserStatus(meetingId, parsedMoimUserId, iConfig).finally(() => {
          setActionLoadStatus(false);
        });
      }
    },
    [changeUserStatus, actionLoading, parsedMoimUserId, meetingId],
  );

  const changeHost = React.useCallback(() => {
    if (!actionLoading && meetingId && parsedMoimUserId) {
      setActionLoadStatus(true);
      changeMeetingHost(meetingId, parsedMoimUserId).finally(() => {
        setActionLoadStatus(false);
      });
    }
  }, [changeMeetingHost, parsedMoimUserId, actionLoading, meetingId]);

  const changePinVideo = React.useCallback(() => {
    if (!actionLoading && meetingId && parsedMoimUserId) {
      setActionLoadStatus(true);
      changeMeetingStatus(meetingId, {
        config: {
          pinnedUsers: isPinned ? [] : [parsedMoimUserId],
        },
      })
        .then(() => {
          if (isPinned) {
            openUnPinSuccessSnackBar();
          } else {
            openPinSuccessSnackBar();
          }
        })
        .catch(() => {
          openGeneralPinErrorSnackBar();
        })
        .finally(() => {
          setActionLoadStatus(false);
        });
    }
  }, [
    actionLoading,
    meetingId,
    parsedMoimUserId,
    changeMeetingStatus,
    isPinned,
    openUnPinSuccessSnackBar,
    openPinSuccessSnackBar,
    openGeneralPinErrorSnackBar,
  ]);

  const toggleMic = React.useCallback(() => {
    if (amIHost && mine) {
      toggleMute();
      return;
    }
    if (amIHost && parsedMoimUserId) {
      sendCommand({
        type: "changeUser",
        data: {
          userId: parsedMoimUserId,
          enableMic: hostAction.mic,
          setMic: hostAction.mic,
        },
      });
      changeUser({
        enableMic: !hostAction.mic,
      });

      changeHostAction({
        attendeeId,
        mic: !hostAction.mic,
      });
    }
  }, [
    attendeeId,
    mine,
    amIHost,
    parsedMoimUserId,
    toggleMute,
    sendCommand,
    hostAction.mic,
    changeUser,
    changeHostAction,
  ]);

  const toggleCamera = React.useCallback(() => {
    if (amIHost && mine) {
      if (
        !isVideoEnabled &&
        remoteVideoTiles.length === LIMIT_OF_MAX_VIDEO_CONNECTION
      ) {
        openLimitOfVideoConnection();
        return;
      }
      toggleVideo();
      return;
    }
    if (amIHost && parsedMoimUserId) {
      sendCommand({
        type: "changeUser",
        data: {
          userId: parsedMoimUserId,
          enableVideo: hostAction.video,
          setVideo: hostAction.video,
        },
      });
      changeUser({
        enableVideo: !hostAction.video,
      });

      changeHostAction({
        attendeeId,
        video: !hostAction.video,
      });
    }
  }, [
    amIHost,
    mine,
    parsedMoimUserId,
    isVideoEnabled,
    remoteVideoTiles.length,
    toggleVideo,
    openLimitOfVideoConnection,
    sendCommand,
    hostAction.video,
    changeUser,
    changeHostAction,
    attendeeId,
  ]);

  const pinThisVideo = React.useCallback(() => {
    if (!videoEnabled && !isPinned) {
      openNeedVideoOnSnackBar();
      return;
    }

    if (parsedMoimUserId) {
      sendCommand({
        type: "pinVideo",
        data: {
          userId: isPinned ? "" : parsedMoimUserId,
        },
      });
      changePinVideo();
    }
  }, [
    videoEnabled,
    isPinned,
    parsedMoimUserId,
    openNeedVideoOnSnackBar,
    sendCommand,
    changePinVideo,
  ]);

  const makeHost = React.useCallback(() => {
    if (parsedMoimUserId) {
      sendCommand({
        type: "changeHost",
        data: {
          userId: parsedMoimUserId,
        },
      });
      changeHost();
    }
  }, [parsedMoimUserId, changeHost, sendCommand]);

  const menuTexts = React.useMemo(
    () => ({
      toggleMic: intl.formatMessage({
        id: hostAction.mic
          ? "video_chat_screen_participants_list_more_enable_mic"
          : "video_chat_screen_participants_list_more_disable_mic",
      }),
      toggleVideo: intl.formatMessage({
        id: hostAction.video
          ? "video_chat_screen_participants_list_more_enable_video"
          : "video_chat_screen_participants_list_more_disable_video",
      }),
      pinVideo: intl.formatMessage({
        id: "video_chat_screen_participants_list_more_pin_video_global",
      }),
      makeHost: "Make host",
    }),
    [hostAction.mic, hostAction.video, intl],
  );

  const hostMuted = React.useMemo(() => {
    if (mine) {
      if (typeof hostConfig.enableMic === "boolean") {
        return hostConfig.enableMic === false;
      }
      return config.enableMic === false;
    }
    if (amIHost) {
      return hostAction.mic;
    }
    return false;
  }, [amIHost, config.enableMic, hostAction.mic, hostConfig.enableMic, mine]);

  const hostDisabledVideo = React.useMemo(() => {
    if (mine) {
      if (typeof hostConfig.enableVideo === "boolean") {
        return hostConfig.enableVideo === false;
      }
      return config.enableVideo === false;
    }
    if (amIHost) {
      return hostAction.video;
    }
    return false;
  }, [
    amIHost,
    config.enableVideo,
    hostAction.video,
    hostConfig.enableVideo,
    mine,
  ]);

  return (
    <RosterCell
      isHost={amIHost}
      isMine={mine}
      name={attendeeName}
      muted={muted}
      videoEnabled={videoEnabled}
      hostDisabledVideo={hostDisabledVideo}
      sharingContent={sharingContent}
      microphone={
        <MicrophoneActivity attendeeId={attendeeId} hostMuted={hostMuted} />
      }
      menuTexts={menuTexts}
      onClickMenuToggleMic={toggleMic}
      onClickMenuToggleVideo={toggleCamera}
      onClickMenuMakeHost={makeHost}
      onClickMenuPinVideo={pinThisVideo}
      {...rest}
    />
  );
};

export default RosterAttendee;
