import { CancelToken } from "axios";
import { makeErrorFromCancelToken } from "common/helpers/mockingCancelToken";
import { RAW } from "app/__mocks__";

export default class ConversationAPI {
  public async getConversations(
    _request: Moim.Conversations.IListConversationsRequestQuery,
    cancelToken?: CancelToken,
  ): Promise<Moim.Conversations.IListConversationsResponseBody> {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }
    return {
      data: [RAW.NORMALIZED_CHANNEL],
      paging: {},
    };
  }

  public async createConversation(
    _request: Moim.Conversations.ICreateConversationRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Conversations.ICreateConversationResponseBody> {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }
    return {
      data: RAW.NORMALIZED_CHANNEL,
    };
  }

  public async getConversation(
    _request: Moim.Conversations.IConversationInformationRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Conversations.IConversationInformationResponseBody> {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }
    return {
      data: RAW.NORMALIZED_CHANNEL,
    };
  }

  public async getConversationMembers(
    _request: Moim.Conversations.IConversationMembersRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Conversations.IConversationMembersResponseBody> {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }
    return {
      data: [RAW.NORMALIZED_MEMBER],
      paging: {},
    };
  }

  public async joinConversation(
    _request: Moim.Conversations.IJoinConversationRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Conversations.IJoinConversationResponseBody> {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }
    return {
      data: RAW.NORMALIZED_CHANNEL,
    };
  }

  public async renameConversation(
    _request: Moim.Conversations.IRenameConversationRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Conversations.IRenameConversationResponseBody> {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }
    return {
      data: RAW.NORMALIZED_CHANNEL,
    };
  }

  public async editConversationTopic(
    _request: Moim.Conversations.IEditConversationTopicRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Conversations.IEditConversationTopicResponseBody> {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }
    return {
      data: RAW.NORMALIZED_CHANNEL,
    };
  }

  public async editConversationPurpose(
    _request: Moim.Conversations.IEditConversationPurposeRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Conversations.IEditConversationPurposeResponseBody> {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }
    return {
      data: RAW.NORMALIZED_CHANNEL,
    };
  }

  public async getConversationMessages(
    _request: Moim.Conversations.IConversationMessagesRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Conversations.IConversationMessagesResponseBody> {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }
    return {
      data: [RAW.NORMALIZED_MESSAGE],
      paging: {},
    };
  }

  public async createConversationMessage(
    _request: Moim.Conversations.ICreateConversationMessageRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Conversations.ICreateConversationMessageResponseBody> {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }
    return {
      data: RAW.NORMALIZED_MESSAGE,
    };
  }

  public async deleteConversationMessage(
    _request: {
      channel_id: Moim.Id;
      messageId: Moim.Id;
    },
    cancelToken?: CancelToken,
  ): Promise<Moim.ISuccessResponse> {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }
    return {
      success: true,
    };
  }
}
