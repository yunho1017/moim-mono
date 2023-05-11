import { createSelector, ParametricSelector, Selector } from "reselect";
import moment from "moment";
import { entitiesSelector } from ".";
import {
  conversationListDenormalizer,
  conversationDenormalizer,
  userListDenormalizer,
  messageListDenormalizer,
} from "app/models";
import { IAppState } from "app/rootReducer";
import { mergeArrayUniq } from "app/common/helpers/mergeWithArrayConcatUniq";

export const conversationsSelector = createSelector(
  entitiesSelector,
  state => state.conversation.conversations,
  (entities, conversations) =>
    conversationListDenormalizer(conversations, entities),
);

const MESSAGE_GROUPING_TIME_MS = 2 * 60 * 1000;

const isSameDate = (dates: number[]) => {
  const [date1, date2] = dates;

  return moment(date1).isSame(date2, "day");
};
const isBelongMessage = (
  group: Moim.Conversations.IMessageGroup,
  messages: Moim.Conversations.IMessage[],
) =>
  messages.every(
    message =>
      group.user.id === message.user.id &&
      Math.abs(message.created_at - group.created_at) <
        MESSAGE_GROUPING_TIME_MS,
  );

export const conversationSelector = createSelector(
  entitiesSelector,
  (_state: IAppState, channelId: string) => channelId,
  (entities, channelId: string): Moim.Conversations.IConversation | undefined =>
    conversationDenormalizer(channelId, entities),
);

export const conversationMembersSelector = createSelector(
  entitiesSelector,
  (state: IAppState, channelId: string) =>
    state.conversation.members[channelId],
  (entities, members) => userListDenormalizer(members, entities),
);

export const conversationMessageLengthSelector = createSelector(
  (state: IAppState, channelId: string) =>
    state.conversation.messages[channelId],
  messages => messages?.data.length ?? 0,
);

export const conversationMessagesSelector = createSelector(
  entitiesSelector,
  (state: IAppState, conversationId: string) =>
    state.conversation.messages[conversationId],
  (state: IAppState, conversationId: string) =>
    state.gRPC.newMessages[conversationId],
  (
    entities,
    messages = {
      data: [],
      paging: {},
    },
    receivedMessages = [],
  ): Moim.IPaginatedListResponse<Moim.Conversations.IMessageGroupList> => {
    const denormalizedMessages = messageListDenormalizer(
      {
        data: mergeArrayUniq(messages.data, receivedMessages) || [],
        paging: messages.paging,
      },
      entities,
    );

    return {
      paging: denormalizedMessages.paging,
      data: denormalizedMessages.data
        .sort((x, y) => x.created_at - y.created_at)
        .reduce<Moim.Conversations.IMessageGroup[]>((list, message) => {
          const targetMessageGroup = list[list.length - 1];

          if (
            targetMessageGroup &&
            isBelongMessage(targetMessageGroup, [message]) &&
            isSameDate([message.created_at, targetMessageGroup.created_at])
          ) {
            targetMessageGroup.messages.push(message);
          } else {
            list.push({
              created_at: message.created_at,
              user: message.user,
              messages: [message],
            });
          }

          return list;
        }, [])
        .reduce<Moim.Conversations.IMessageGroupList[]>((list, message) => {
          const targetMessageGroup = list[list.length - 1];
          if (
            targetMessageGroup &&
            isSameDate([message.created_at, targetMessageGroup.created_at])
          ) {
            targetMessageGroup.data.push(message);
          } else {
            list.push({
              created_at: message.created_at,
              data: [message],
            });
          }

          return list;
        }, []),
    };
  },
);
export const conversationLastMessageIdWithGRPCSelector = createSelector(
  (state: IAppState, conversationId: string) =>
    state.conversation.messages[conversationId],
  (state: IAppState, conversationId: string) =>
    state.gRPC.newMessages[conversationId],
  (messages, gRPCMessages): Moim.Id | null => {
    if (gRPCMessages && gRPCMessages.length > 0) {
      return gRPCMessages[gRPCMessages.length - 1];
    } else if (messages && messages.data.length > 0) {
      return messages.data[messages.data.length - 1];
    } else {
      return null;
    }
  },
);

export const conversationMembersLoadingSelector = (state: IAppState) =>
  Boolean(
    state.conversation.conversationMembersLoading[
      state.conversation.currentConversationId
    ],
  );

export const joinConversationLoadingSelector = (state: IAppState) =>
  Boolean(
    state.conversation.joinConversationLoading[
      state.conversation.currentConversationId
    ],
  );

export const getMessagesLoadingSelector = (state: IAppState) =>
  Boolean(
    state.conversation.getMessagesLoading[
      state.conversation.currentConversationId
    ],
  );

export const createMessagesLoadingSelector = (state: IAppState) =>
  Boolean(
    state.conversation.createMessageLoading[
      state.conversation.currentConversationId
    ],
  );

type IGetConversationByNameSelector = [
  Selector<IAppState, Moim.Entity.INormalizedData>,
  Selector<IAppState, Moim.IPaginatedListResponse<Moim.Id>>,
  ParametricSelector<IAppState, string, string>,
];

export const getConversationByNameSelector = createSelector(
  [
    entitiesSelector,
    (state: IAppState) => state.conversation.conversations,
    (_, name) => name,
  ] as IGetConversationByNameSelector,
  (entities, conversations, name) => {
    const channelList = conversationListDenormalizer(conversations, entities);
    return channelList.data.find(channel => channel.name === name);
  },
);
