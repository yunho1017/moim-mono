import { ActionUnion } from "app/actions/helpers";
import { ThunkPromiseResult, ThunkResult } from "app/store";
import MeetingAPI from "app/common/api/meeting";
import { ActionCreators as SnackBarActionCreators } from "app/actions/snackbar";
import { MeetingTypes } from "./types";
import { errorParseData } from "common/helpers/APIErrorParser";

function createAction<T extends { type: MeetingTypes }>(d: T): T {
  return d;
}

export const ActionCreators = {
  startCreateMeeting: () =>
    createAction({ type: MeetingTypes.START_CREATE_MEETING }),
  succeedCreateMeeting: (meetingId: Moim.Id, name: string) =>
    createAction({
      type: MeetingTypes.SUCCEED_CREATE_MEETING,
      payload: { meetingId, name },
    }),
  failedCreateMeeting: (errorObject: Moim.IErrorResponse | null) =>
    createAction({
      type: MeetingTypes.FAILED_CREATE_MEETING,
      payload: { errorObject },
    }),

  startFetchMeetingData: () =>
    createAction({ type: MeetingTypes.START_FETCH_MEETING_DATA }),
  succeedFetchMeetingData: () =>
    createAction({ type: MeetingTypes.SUCCEED_FETCH_MEETING_DATA }),
  failedFetchMeetingData: () =>
    createAction({ type: MeetingTypes.FAILED_FETCH_MEETING_DATA }),

  startChangeHost: () => createAction({ type: MeetingTypes.START_CHANGE_HOST }),
  succeedChangeHost: () =>
    createAction({ type: MeetingTypes.SUCCEED_CHANGE_HOST }),
  failedChangeHost: () =>
    createAction({ type: MeetingTypes.FAILED_CHANGE_HOST }),

  startChangeUserStatus: () =>
    createAction({ type: MeetingTypes.START_CHANGE_USER_STATUS }),
  succeedChangeUserStatus: (
    userId: Moim.Id,
    config: Moim.Meeting.IAttendeeInterfaceConfig,
  ) =>
    createAction({
      type: MeetingTypes.SUCCEED_CHANGE_USER_STATUS,
      payload: {
        userId,
        config,
      },
    }),
  failedChangeUserStatus: () =>
    createAction({ type: MeetingTypes.FAILED_CHANGE_USER_STATUS }),

  startChangeMeetingStatus: () =>
    createAction({ type: MeetingTypes.START_CHANGE_MEETING_STATUS }),
  succeedChangeMeetingStatus: (payload: {
    name?: string;
    config?: Partial<Moim.Meeting.IMeetingConfig>;
  }) =>
    createAction({
      type: MeetingTypes.SUCCEED_CHANGE_MEETING_STATUS,
      payload,
    }),
  failedChangeMeetingStatus: () =>
    createAction({ type: MeetingTypes.FAILED_CHANGE_MEETING_STATUS }),

  startJoinMeeting: () =>
    createAction({ type: MeetingTypes.START_JOIN_MEETING }),
  succeedJoinMeeting: (meetingData: Moim.Meeting.IAttendeeMeetingData) =>
    createAction({
      type: MeetingTypes.SUCCEED_JOIN_MEETING,
      payload: { meetingData },
    }),
  failedJoinMeeting: (errorObject: Moim.IErrorResponse | null) =>
    createAction({
      type: MeetingTypes.FAILED_JOIN_MEETING,
      payload: { errorObject },
    }),

  startEndMeeting: () => createAction({ type: MeetingTypes.START_END_MEETING }),
  succeedEndMeeting: () =>
    createAction({ type: MeetingTypes.SUCCEED_END_MEETING }),
  failedEndMeeting: () =>
    createAction({ type: MeetingTypes.FAILED_END_MEETING }),

  startLeaveMeeting: () =>
    createAction({ type: MeetingTypes.START_LEAVE_MEETING }),
  succeedLeaveMeeting: () =>
    createAction({ type: MeetingTypes.SUCCEED_LEAVE_MEETING }),
  failedLeaveMeeting: () =>
    createAction({ type: MeetingTypes.FAILED_LEAVE_MEETING }),

  startLinkMeeting: () =>
    createAction({ type: MeetingTypes.START_LINK_MEETING }),
  succeedLinkMeeting: (meetingId: Moim.Id, targetId: Moim.Id) =>
    createAction({
      type: MeetingTypes.SUCCEED_LINK_MEETING,
      payload: {
        meetingId,
        targetId,
      },
    }),
  failedLinkMeeting: (meetingId: Moim.Id, targetId: Moim.Id) =>
    createAction({
      type: MeetingTypes.FAILED_LINK_MEETING,
      payload: {
        meetingId,
        targetId,
      },
    }),
  clearLinkMeeting: () =>
    createAction({ type: MeetingTypes.CLEAR_LINK_MEETING }),

  hostCommandAttendeeStatus: (command: Moim.Meeting.ICommandData) =>
    createAction({
      type: MeetingTypes.HOST_COMMAND_STATUS,
      payload: { command },
    }),

  hostActioned: (payload: {
    attendeeId: Moim.Id;
    mic?: boolean;
    video?: boolean;
    chat?: boolean;
    attendeeIds?: Moim.Id[];
    muteAllMic?: boolean;
  }) => createAction({ type: MeetingTypes.HOST_ACTIONED, payload }),
};

export type Actions = ActionUnion<typeof ActionCreators>;

export function createMeeting(
  successMessage?: string,
  ...args: Parameters<typeof MeetingAPI.prototype.createMeeting>
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startCreateMeeting());
    try {
      const data = await apiSelector(
        getState(),
        dispatch,
      ).meeting.createMeeting(...args);
      if (successMessage) {
        dispatch(
          SnackBarActionCreators.openSnackbar({
            text: successMessage,
          }),
        );
      }
      dispatch(ActionCreators.succeedCreateMeeting(data.data.id, args[0]));
    } catch (err) {
      const errorObject = errorParseData(err);
      dispatch(
        SnackBarActionCreators.openSnackbar({
          text: errorObject?.message ?? "Error accrued!!",
          type: "error",
        }),
      );

      dispatch(ActionCreators.failedCreateMeeting(errorObject || null));
    }
  };
}

export function joinMeeting(
  ...args: Parameters<typeof MeetingAPI.prototype.joinMeeting>
): ThunkPromiseResult<Moim.Meeting.IAttendeeMeetingData | null> {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startJoinMeeting());
    try {
      const result = await apiSelector(
        getState(),
        dispatch,
      ).meeting.joinMeeting(...args);

      dispatch(ActionCreators.succeedJoinMeeting(result.data));
      return result.data;
    } catch (err) {
      const errorObject = errorParseData(err);
      dispatch(
        SnackBarActionCreators.openSnackbar({
          text: errorObject?.message ?? "Error accrued!!",
          type: "error",
        }),
      );
      dispatch(ActionCreators.failedJoinMeeting(errorObject || null));
      throw errorObject;
    }
  };
}

export function endMeeting(
  ...args: Parameters<typeof MeetingAPI.prototype.endMeeting>
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startEndMeeting());
    try {
      await apiSelector(getState(), dispatch).meeting.endMeeting(...args);
      dispatch(ActionCreators.succeedEndMeeting());
    } catch {
      dispatch(ActionCreators.failedEndMeeting());
    }
  };
}

export function leaveMeeting(
  ...args: Parameters<typeof MeetingAPI.prototype.leaveMeeting>
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startLeaveMeeting());
    try {
      await apiSelector(getState(), dispatch).meeting.leaveMeeting(...args);
      dispatch(ActionCreators.succeedLeaveMeeting());
    } catch {
      dispatch(ActionCreators.failedLeaveMeeting());
    }
  };
}

export function linkMeeting(
  ...args: Parameters<typeof MeetingAPI.prototype.linkToMeeting>
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    const [meetingId, , targetId] = args;
    dispatch(ActionCreators.startLinkMeeting());
    try {
      await apiSelector(getState(), dispatch).meeting.linkToMeeting(...args);
      dispatch(ActionCreators.succeedLinkMeeting(meetingId, targetId));
    } catch {
      dispatch(ActionCreators.failedLinkMeeting(meetingId, targetId));
    }
  };
}

export function clearPreLinkMeetingData(): ThunkResult {
  return dispatch => {
    dispatch(ActionCreators.clearLinkMeeting());
  };
}

export function changeMeetingHost(
  ...args: Parameters<typeof MeetingAPI.prototype.changeMeetingHost>
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startChangeHost());
    try {
      await apiSelector(getState(), dispatch).meeting.changeMeetingHost(
        ...args,
      );
      dispatch(ActionCreators.succeedChangeHost());
    } catch {
      dispatch(ActionCreators.failedChangeHost());
    }
  };
}

export function changeUserStatus(
  ...args: Parameters<typeof MeetingAPI.prototype.changeUserStatus>
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startChangeUserStatus());
    try {
      await apiSelector(getState(), dispatch).meeting.changeUserStatus(...args);
      dispatch(ActionCreators.succeedChangeUserStatus(args[1], args[2]));
    } catch {
      dispatch(ActionCreators.failedChangeUserStatus());
    }
  };
}

export function changeMeetingStatus(
  ...args: Parameters<typeof MeetingAPI.prototype.changeMeetingData>
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startChangeMeetingStatus());
    try {
      await apiSelector(getState(), dispatch).meeting.changeMeetingData(
        ...args,
      );
      dispatch(ActionCreators.succeedChangeMeetingStatus(args[1]));
    } catch {
      dispatch(ActionCreators.failedChangeMeetingStatus());
    }
  };
}
