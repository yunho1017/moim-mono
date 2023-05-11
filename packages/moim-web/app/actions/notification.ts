import { PopoverOrigin } from "@material-ui/core/Popover";
import { push } from "connected-react-router";
import { MentionData } from "@balmbees/moim-proto/build/js/client/notification_pb";
import { ThunkPromiseResult } from "app/store";
import { ActionCreators as AppActionCreators } from "./app";
import { showNotification } from "common/helpers/browserNotification";
import {
  parseServerSpecMention,
  displayMention,
} from "common/helpers/moimDown";
import { selectMentionWithEntities } from "common/components/richEditor/selector";
import { browserLocale } from "app/intl";
import { NotificationTypes } from "./types";
import { ActionUnion } from "./helpers";
import MoimDefaultAPI from "common/api";
import { notificationListNormalizer } from "app/models/notification";
import { loadEntities } from "./entity";
import { ItemIdTypes } from "app/enums";
import { ActionCreators as ForumActionCreators } from "app/actions/forum";
import tokenizer from "common/helpers/moimDown/tokenizer";

function createAction<T extends { type: NotificationTypes }>(d: T): T {
  return d;
}

export const ActionCreators = {
  startFetchingNotifications: (type: Moim.Enums.NotificationType) =>
    createAction({
      type: NotificationTypes.START_FETCHING_NOTIFICATIONS,
      payload: {
        type,
      },
    }),
  succeedFetchingNotifications: (
    type: Moim.Enums.NotificationType,
    notifications: Moim.IPaginatedListResponse<Moim.Id>,
    fetchDirection: "before" | "after" | null,
  ) =>
    createAction({
      type: NotificationTypes.SUCCEED_FETCHING_NOTIFICATIONS,
      payload: {
        type,
        notifications,
        fetchDirection,
      },
    }),
  failedFetchingNotifications: (type: Moim.Enums.NotificationType) =>
    createAction({
      type: NotificationTypes.FAILED_FETCHING_NOTIFICATIONS,
      payload: {
        type,
      },
    }),

  openNotificationsDialog: (payload: {
    anchorElement: React.RefObject<any> | null;
    anchorOrigin?: PopoverOrigin;
    transformOrigin?: PopoverOrigin;
  }) =>
    createAction({
      type: NotificationTypes.OPEN_NOTIFICATIONS_DIALOG,
      payload,
    }),

  closeNotificationsDialog: () =>
    createAction({
      type: NotificationTypes.CLOSE_NOTIFICATIONS_DIALOG,
    }),
};

export type Actions = ActionUnion<typeof ActionCreators>;

function parseRedirectTo(redirectTo: string, channelType?: Moim.Channel.Type) {
  switch (channelType) {
    case "forum":
      return redirectTo.split("#").join("/replies/");
    default:
      return redirectTo;
  }
}

export function showMentionNotification(
  mentions: MentionData.AsObject[],
): ThunkPromiseResult {
  return async (dispatch, getState) => {
    const state = getState();

    mentions.forEach(mention => {
      const locale = browserLocale(state.app.locale || undefined);
      const preview = mention.previewMap.find(map => map[0] === locale)?.[1];
      const groupName = mention.previewMap.find(
        map => map[0] === "groupName",
      )?.[1];
      const groupIcon = mention.previewMap.find(
        map => map[0] === "groupIcon",
      )?.[1];

      if (preview) {
        const mappedMentionData = selectMentionWithEntities(
          state.entities.users,
          parseServerSpecMention(preview),
        );
        const notificationBody = tokenizer(
          displayMention(preview, mappedMentionData),
        )
          .map(token => {
            switch (token.type) {
              case "mark":
              case "highlight":
              case "emoji":
              case "nativeEmoji":
              case "codeBlock":
              case "inlineCode":
              case "italic":
              case "bold":
              case "link":
              case "text": {
                return token.data.value;
              }

              case "mention": {
                return token.data.display;
              }
            }
          })
          .join("");

        const onClick = () => {
          if (mention.host !== `https://${location.host}`) {
            const win = window.open(
              `${mention.host}${parseRedirectTo(
                mention.uri,
                mention.channel?.type as Moim.Channel.Type,
              )}`,
              "_blank",
            );
            win?.focus();
          } else {
            dispatch(
              push(
                parseRedirectTo(
                  mention.uri,
                  mention.channel?.type as Moim.Channel.Type,
                ),
              ),
            );

            const threadId = [mention.itemid, mention.parentid].find(id =>
              id.startsWith(ItemIdTypes.THREAD),
            );
            if (threadId) {
              dispatch(ForumActionCreators.updateHighlightThreadId(threadId));
            }
          }
        };

        showNotification(groupName || "", {
          body: notificationBody,
          icon: groupIcon,
          link: mention.uri,
          vibrate: true,
          onClick,
        });
      }
    });
  };
}

export function getNotifications(
  ...params: Parameters<typeof MoimDefaultAPI.me.getNotifications>
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    try {
      dispatch(ActionCreators.startFetchingNotifications(params[0].type));
      const notifications = notificationListNormalizer(
        await apiSelector(getState(), dispatch).me.getNotifications(...params),
      );

      dispatch(loadEntities(notifications.entities));
      dispatch(
        ActionCreators.succeedFetchingNotifications(
          params[0].type,
          notifications.result,
          Boolean(params[0].after)
            ? "after"
            : Boolean(params[0].before)
            ? "before"
            : null,
        ),
      );
    } catch {
      dispatch(ActionCreators.failedFetchingNotifications(params[0].type));
    }
  };
}

export function doMute(): ThunkPromiseResult {
  return async dispatch => {
    dispatch(AppActionCreators.userMuteGlobalNotification());
  };
}
