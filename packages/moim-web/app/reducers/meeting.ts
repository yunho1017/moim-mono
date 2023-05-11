import produce from "immer";
import { AllActions } from "app/actions";
import { MeetingTypes } from "app/actions/types";
import { LOCATION_CHANGE } from "connected-react-router";

export const INITIAL_STATE: Moim.Meeting.IReduxState = {
  currentMeetingData: null,
  isLoading: false,
  hasFailed: false,
  error: null,
  preLinkMeeting: null,
  hostCommandConfig: {},
  hostActioned: {
    roster: {},
    muteAllMic: false,
  },
};

export function reducer(state = INITIAL_STATE, action: AllActions) {
  return produce(state, draft => {
    switch (action.type) {
      case MeetingTypes.START_LINK_MEETING:
      case MeetingTypes.START_CREATE_MEETING:
      case MeetingTypes.START_FETCH_MEETING_DATA: {
        draft.isLoading = true;
        draft.hasFailed = false;
        draft.error = null;
        break;
      }

      case MeetingTypes.START_JOIN_MEETING: {
        draft.isLoading = true;
        draft.hasFailed = false;
        draft.error = null;
        draft.currentMeetingData = null;
        break;
      }

      case MeetingTypes.SUCCEED_JOIN_MEETING: {
        draft.isLoading = false;
        draft.currentMeetingData = action.payload.meetingData;
        break;
      }

      case MeetingTypes.SUCCEED_CREATE_MEETING: {
        draft.preLinkMeeting = {
          id: action.payload.meetingId,
          name: action.payload.name,
        };
        break;
      }

      case LOCATION_CHANGE:
      case MeetingTypes.CLEAR_LINK_MEETING:
      case MeetingTypes.SUCCEED_LINK_MEETING: {
        draft.preLinkMeeting = null;
        draft.error = null;
        draft.isLoading = false;
        draft.hasFailed = false;
        break;
      }

      case MeetingTypes.FAILED_CREATE_MEETING:
      case MeetingTypes.FAILED_JOIN_MEETING: {
        draft.isLoading = false;
        draft.hasFailed = true;
        draft.error = action.payload.errorObject ?? { code: "UNKNOWN" };
        break;
      }

      case MeetingTypes.FAILED_LINK_MEETING:
      case MeetingTypes.FAILED_FETCH_MEETING_DATA: {
        draft.isLoading = false;
        draft.hasFailed = true;
        break;
      }

      case MeetingTypes.SUCCEED_CHANGE_MEETING_STATUS: {
        if (draft.currentMeetingData && action.payload.config) {
          draft.currentMeetingData.config = {
            ...draft.currentMeetingData.config,
            ...action.payload.config,
          };
          draft.currentMeetingData.meeting.config = {
            ...draft.currentMeetingData.meeting.config,
            ...action.payload.config,
          };
        }
        break;
      }

      case MeetingTypes.HOST_ACTIONED: {
        if (typeof action.payload.muteAllMic === "boolean") {
          draft.hostActioned.muteAllMic = action.payload.muteAllMic;

          if (action.payload.attendeeIds) {
            action.payload.attendeeIds.forEach((id: string) => {
              if (!draft.hostActioned.roster[id]) {
                draft.hostActioned.roster[id] = {
                  mic: false,
                  video: false,
                  chat: false,
                };
              }
            });
          }

          Object.keys(draft.hostActioned.roster).forEach(key => {
            if (typeof action.payload.muteAllMic === "boolean") {
              draft.hostActioned.roster[key].mic = action.payload.muteAllMic;
            }
          });
        }
        if (action.payload.attendeeId) {
          if (!draft.hostActioned.roster[action.payload.attendeeId]) {
            draft.hostActioned.roster[action.payload.attendeeId] = {
              mic: false,
              video: false,
              chat: false,
            };
          }

          if (typeof action.payload.mic === "boolean") {
            draft.hostActioned.roster[action.payload.attendeeId].mic =
              action.payload.mic;
          }
          if (typeof action.payload.video === "boolean") {
            draft.hostActioned.roster[action.payload.attendeeId].video =
              action.payload.video;
          }
          if (typeof action.payload.chat === "boolean") {
            draft.hostActioned.roster[action.payload.attendeeId].chat =
              action.payload.chat;
          }
        }
        break;
      }

      case MeetingTypes.HOST_COMMAND_STATUS: {
        if (draft.currentMeetingData) {
          switch (action.payload.command.type) {
            case "changeHost": {
              draft.currentMeetingData.meeting.host =
                action.payload.command.data.userId;
              break;
            }
            case "pinVideo": {
              draft.currentMeetingData.config.pinnedUsers = [
                action.payload.command.data.userId,
              ];
              draft.currentMeetingData.meeting.config.pinnedUsers = [
                action.payload.command.data.userId,
              ];
              break;
            }
            case "changeUser":
            case "changeMeeting": {
              if (typeof action.payload.command.data.enableChat === "boolean") {
                draft.currentMeetingData.config.enableChat =
                  action.payload.command.data.enableChat;
                draft.hostCommandConfig.enableChat =
                  action.payload.command.data.enableChat;
              }
              if (typeof action.payload.command.data.enableMic === "boolean") {
                draft.currentMeetingData.config.enableMic =
                  action.payload.command.data.enableMic;
                draft.hostCommandConfig.enableMic =
                  action.payload.command.data.enableMic;
              }
              if (
                typeof action.payload.command.data.enableVideo === "boolean"
              ) {
                draft.currentMeetingData.config.enableVideo =
                  action.payload.command.data.enableVideo;
                draft.hostCommandConfig.enableVideo =
                  action.payload.command.data.enableVideo;
              }
              break;
            }
          }
        }
        break;
      }
    }
  });
}
