// 주석처리된 항목은 잠시 disable 된 상태입니다

export const enum RIGHT_HOLDER_TYPE {
  "ANYONE" = "ANYONE",
  "MEMBERS" = "MEMBERS",
  "LIMITED" = "LIMITED",
}

export interface IInfo {
  key: Moim.Permission.PermissionType;
  textKey: string;
  descriptionKey: string;
  defaultRightHolder: RIGHT_HOLDER_TYPE;
  availableRightHolder: RIGHT_HOLDER_TYPE[];
  limited?: Moim.Id[];
}

export const CHANNEL_RIGHTS_TEXT_KEY: {
  COMMON: {
    [key: string]: IInfo;
  };
  FORUM: {
    [key: string]: IInfo;
  };
  CONVERSATION: {
    [key: string]: IInfo;
  };
} = {
  COMMON: {
    ACCESS: {
      key: "ACCESS",
      textKey: "channel_settings/rights/channel_access",
      descriptionKey: "channel_settings/rights/channel_access_guide",
      defaultRightHolder: RIGHT_HOLDER_TYPE.ANYONE,
      availableRightHolder: [
        RIGHT_HOLDER_TYPE.ANYONE,
        RIGHT_HOLDER_TYPE.MEMBERS,
        RIGHT_HOLDER_TYPE.LIMITED,
      ],
    }, // 채널 리스트에 표시
  },
  FORUM: {
    READ_POST: {
      key: "READ_POST",
      textKey: "channel_settings/rights/read_post",
      descriptionKey: "channel_settings/rights/read_post_guide",
      defaultRightHolder: RIGHT_HOLDER_TYPE.ANYONE,
      availableRightHolder: [
        RIGHT_HOLDER_TYPE.ANYONE,
        RIGHT_HOLDER_TYPE.MEMBERS,
        RIGHT_HOLDER_TYPE.LIMITED,
      ],
    }, // 포스트 읽기
    READ_POST_LIST: {
      key: "READ_POST_LIST",
      textKey: "channel_settings/rights/read_post_list",
      descriptionKey: "channel_settings/rights/read_post_list_guide",
      defaultRightHolder: RIGHT_HOLDER_TYPE.ANYONE,
      availableRightHolder: [
        RIGHT_HOLDER_TYPE.ANYONE,
        RIGHT_HOLDER_TYPE.MEMBERS,
        RIGHT_HOLDER_TYPE.LIMITED,
      ],
    }, // 포스트 리스트 표시
    READ_COMMENT: {
      key: "READ_COMMENT",
      textKey: "channel_settings/rights/read_comment",
      descriptionKey: "channel_settings/rights/read_comment_guide",
      defaultRightHolder: RIGHT_HOLDER_TYPE.ANYONE,
      availableRightHolder: [
        RIGHT_HOLDER_TYPE.ANYONE,
        RIGHT_HOLDER_TYPE.MEMBERS,
        RIGHT_HOLDER_TYPE.LIMITED,
      ],
    }, // 코멘트 리스트 표시

    WRITE_COMMENT: {
      key: "WRITE_COMMENT",
      textKey: "channel_settings/rights/write_comment",
      descriptionKey: "channel_settings/rights/write_comment_guide",
      defaultRightHolder: RIGHT_HOLDER_TYPE.MEMBERS,
      availableRightHolder: [
        RIGHT_HOLDER_TYPE.MEMBERS,
        RIGHT_HOLDER_TYPE.LIMITED,
      ],
    }, // 코멘트 작성
    WRITE_POST: {
      key: "WRITE_POST",
      textKey: "channel_settings/rights/write_post",
      descriptionKey: "channel_settings/rights/write_post_guide",
      defaultRightHolder: RIGHT_HOLDER_TYPE.MEMBERS,
      availableRightHolder: [
        RIGHT_HOLDER_TYPE.MEMBERS,
        RIGHT_HOLDER_TYPE.LIMITED,
      ],
    }, // 포스트 작성
    POST_VOTE: {
      key: "POST_VOTE",
      textKey: "channel_settings/rights/like_dislike_post",
      descriptionKey: "channel_settings/rights/like_dislike_post_guide",
      defaultRightHolder: RIGHT_HOLDER_TYPE.MEMBERS,
      availableRightHolder: [
        RIGHT_HOLDER_TYPE.MEMBERS,
        RIGHT_HOLDER_TYPE.LIMITED,
      ],
    }, // 좋아요 버튼 입력

    COMMENT_VOTE: {
      key: "COMMENT_VOTE",
      textKey: "channel_settings/rights/like_dislike_comment",
      descriptionKey: "channel_settings/rights/like_dislike_comment_guide",
      defaultRightHolder: RIGHT_HOLDER_TYPE.MEMBERS,
      availableRightHolder: [
        RIGHT_HOLDER_TYPE.MEMBERS,
        RIGHT_HOLDER_TYPE.LIMITED,
      ],
    }, // 코멘트에 좋아요 버튼 입력

    // 채널 수정 권한
    // MANAGE_CHANNEL: {
    //   key: "MANAGE_CHANNEL",
    //   textKey: "",
    //   descriptionKey: "",
    // },

    COPY_POST: {
      key: "COPY_POST",
      textKey: "channel_settings/rights/copy_post",
      descriptionKey: "channel_settings/rights/copy_post_guide",
      defaultRightHolder: RIGHT_HOLDER_TYPE.ANYONE,
      availableRightHolder: [
        RIGHT_HOLDER_TYPE.ANYONE,
        RIGHT_HOLDER_TYPE.MEMBERS,
        RIGHT_HOLDER_TYPE.LIMITED,
      ],
    }, // 글 복사

    MANAGE_POST: {
      key: "MANAGE_POST",
      textKey: "channel_settings/rights/edit_post",
      descriptionKey: "channel_settings/rights/edit_post_guide",
      defaultRightHolder: RIGHT_HOLDER_TYPE.MEMBERS,
      availableRightHolder: [
        RIGHT_HOLDER_TYPE.MEMBERS,
        RIGHT_HOLDER_TYPE.LIMITED,
      ],
    }, // 포스트 수정

    DELETE_POST: {
      key: "DELETE_POST",
      textKey: "channel_settings/rights/delete_post",
      descriptionKey: "channel_settings/rights/delete_post_guide",
      defaultRightHolder: RIGHT_HOLDER_TYPE.LIMITED,
      availableRightHolder: [
        RIGHT_HOLDER_TYPE.MEMBERS,
        RIGHT_HOLDER_TYPE.LIMITED,
      ],
    }, // 포스트 삭제
    // DELETE_COMMENT: {
    //   key: "DELETE_COMMENT",
    //   textKey: "channel_settings/rights/delete_comment",
    //   descriptionKey: "channel_settings/rights/delete_comment_guide",
    //   defaultRightHolder: RIGHT_HOLDER_TYPE.ANYONE,
    // }, // 코멘트 삭제
  },

  CONVERSATION: {
    READ_MESSAGE: {
      key: "READ_MESSAGE",
      textKey: "channel_settings/rights/read_messages",
      descriptionKey: "channel_settings/rights/read_messages_guide",
      defaultRightHolder: RIGHT_HOLDER_TYPE.ANYONE,
      availableRightHolder: [
        RIGHT_HOLDER_TYPE.ANYONE,
        RIGHT_HOLDER_TYPE.MEMBERS,
        RIGHT_HOLDER_TYPE.LIMITED,
      ],
    }, // 메세지 읽기
    SEND_MESSAGE: {
      key: "SEND_MESSAGE",
      textKey: "channel_settings/rights/send_messages",
      descriptionKey: "channel_settings/rights/send_messages_guide",
      defaultRightHolder: RIGHT_HOLDER_TYPE.MEMBERS,
      availableRightHolder: [
        RIGHT_HOLDER_TYPE.MEMBERS,
        RIGHT_HOLDER_TYPE.LIMITED,
      ],
    }, // 메세지 보내기

    // 채널 수정 권한
    // disabled
    // MANAGE_CHANNEL: {
    //   key: "MANAGE_CHANNEL",
    //   textKey: "",
    //   descriptionKey: "",
    // },

    // MANAGE_MESSAGE: {
    //   key: "MANAGE_MESSAGE",
    //   textKey: "",
    //   descriptionKey: "",
    // }, // 메세지 수정
    // DELETE_MESSAGE: {
    //   key: "DELETE_MESSAGE",
    //   textKey: "channel_settings/rights/delete_messages",
    //   descriptionKey: "channel_settings/rights/delete_messages_guide",
    //   defaultRightHolder: RIGHT_HOLDER_TYPE.LIMITED,
    //   limited: [],
    // }, // 메세지 삭제
  },
};

export const VISIBLE_AUTHOR_INPUT_KEYS: Moim.Permission.PermissionType[] = [
  "READ_POST",
  "DELETE_POST",
  "MANAGE_POST",
  "DELETE_COMMENT",
  "DELETE_MESSAGE",
  "MANAGE_MESSAGE",
];
