import { PopoverOrigin } from "@material-ui/core/Popover";
import { AllActions } from "../actions";
import uniq from "lodash/uniq";
import { NotificationTypes } from "../actions/types";
import produce from "immer";
import { NotificationType } from "app/enums";

export interface INotificationState {
  allNotifications: Moim.IPaginatedListResponse<Moim.Id>;
  mentionNotifications: Moim.IPaginatedListResponse<Moim.Id>;
  isAllNotificationsLoading: boolean;
  isMentionNotificationLoading: boolean;
  notificationDialog: {
    open: boolean;
    anchorElement: React.RefObject<any> | null;
    anchorOrigin?: PopoverOrigin;
    transformOrigin?: PopoverOrigin;
  };
}

export const INITIAL_STATE: INotificationState = {
  allNotifications: {
    data: [],
    paging: {},
  },
  mentionNotifications: {
    data: [],
    paging: {},
  },
  isAllNotificationsLoading: true,
  isMentionNotificationLoading: true,

  notificationDialog: {
    open: false,
    anchorElement: null,
  },
};

export function reducer(
  state: INotificationState = INITIAL_STATE,
  action: AllActions,
) {
  return produce(state, draft => {
    switch (action.type) {
      case NotificationTypes.START_FETCHING_NOTIFICATIONS: {
        const { type } = action.payload;

        switch (type) {
          case NotificationType.ALL:
            draft.isAllNotificationsLoading = true;
            break;

          case NotificationType.MENTION:
            draft.isMentionNotificationLoading = true;
            break;
        }
        break;
      }

      case NotificationTypes.SUCCEED_FETCHING_NOTIFICATIONS: {
        const { type, notifications, fetchDirection } = action.payload;

        switch (type) {
          case NotificationType.ALL:
            draft.isAllNotificationsLoading = false;
            if (fetchDirection === "after") {
              draft.allNotifications.data = uniq([
                ...draft.allNotifications.data,
                ...notifications.data,
              ]);
            } else {
              draft.allNotifications.data = uniq([
                ...notifications.data,
                ...draft.allNotifications.data,
              ]);
            }
            draft.allNotifications.paging = notifications.paging;

            break;

          case NotificationType.MENTION:
            draft.isMentionNotificationLoading = false;
            if (fetchDirection === "after") {
              draft.mentionNotifications.data = uniq([
                ...draft.mentionNotifications.data,
                ...notifications.data,
              ]);
            } else {
              draft.mentionNotifications.data = uniq([
                ...notifications.data,
                ...draft.mentionNotifications.data,
              ]);
            }
            draft.mentionNotifications.paging = notifications.paging;

            break;
        }

        break;
      }

      case NotificationTypes.FAILED_FETCHING_NOTIFICATIONS: {
        const { type } = action.payload;

        switch (type) {
          case NotificationType.ALL:
            draft.isAllNotificationsLoading = false;
            break;

          case NotificationType.MENTION:
            draft.isMentionNotificationLoading = false;
            break;
        }
        break;
      }

      case NotificationTypes.OPEN_NOTIFICATIONS_DIALOG: {
        draft.notificationDialog.open = true;
        draft.notificationDialog.anchorElement = action.payload.anchorElement;
        draft.notificationDialog.anchorOrigin = action.payload.anchorOrigin;
        draft.notificationDialog.transformOrigin =
          action.payload.transformOrigin;

        break;
      }

      case NotificationTypes.CLOSE_NOTIFICATIONS_DIALOG: {
        draft.notificationDialog.open = false;
        draft.notificationDialog.anchorElement = null;
        draft.notificationDialog.anchorOrigin = undefined;
        draft.notificationDialog.transformOrigin = undefined;

        break;
      }

      default: {
        return state;
      }
    }
  });
}
