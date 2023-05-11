import * as React from "react";

const { storiesOf } = require("@storybook/react");
const {
  text: textKnob,
  boolean: booleanKnob,
} = require("@storybook/addon-knobs");
import { STORYBOOK_PREFIX } from "app/common/constants/storybook";
import { Comment, Message, Review, Question } from ".";
import { RAW } from "app/__mocks__";

storiesOf(`${STORYBOOK_PREFIX.COMMON_COMPONENTS}/Thread V2`, module).add(
  "Comment",
  () => {
    const title = textKnob("Title", "크로스오버 32UL980 HDR TY...");
    const desc = textKnob(
      "Description",
      "크로스오버 32UL980 HDR TYPE-C 4K PREMIUM AS 후기 공유 드립니다....",
    );

    return (
      <Comment
        engage={{
          type: "like",
          liked: false,
          likeCount: 100,
          threadId: "T1234",
        }}
        commentId="C1234"
        userId="U1234"
        avatar={{ src: RAW.IMAGE_ICON.data.url, title: "Vingle" }}
        title={booleanKnob("Title visible", true) ? title : undefined}
        createdAt={1576564981938}
        contents={[
          {
            type: "text",
            content: booleanKnob("Description visible", true)
              ? desc
              : undefined,
          },
        ]}
        editState={{
          isEditMode: false,
          onCancel: () => {},
          onEnter: () => {},
        }}
      />
    );
  },
);

storiesOf(`${STORYBOOK_PREFIX.COMMON_COMPONENTS}/Thread V2`, module).add(
  "Message",
  () => {
    const desc = textKnob(
      "Description",
      "크로스오버 32UL980 HDR TYPE-C 4K PREMIUM AS 후기 공유 드립니다....",
    );

    return (
      <>
        <Message
          mode="normal"
          messageId="M12345"
          userId="U1234"
          avatar={{ src: RAW.IMAGE_ICON.data.url, title: "Vingle" }}
          createdAt={1576564981938}
          contents={booleanKnob("Description visible", true) ? desc : undefined}
          hover={true}
          editState={{
            isEditMode: false,
            onCancel: () => {},
            onEnter: () => {},
          }}
        />
        <Message
          mode="normal"
          messageId="M12345"
          userId="U1234"
          contents={booleanKnob("Description visible", true) ? desc : undefined}
          editState={{
            isEditMode: false,
            onCancel: () => {},
            onEnter: () => {},
          }}
        />
      </>
    );
  },
);

storiesOf(`${STORYBOOK_PREFIX.COMMON_COMPONENTS}/Thread V2`, module).add(
  "Review",
  () => {
    const title = textKnob("Title", "아주 잘먹었습니다. ");

    return (
      <Review
        type="review"
        reviewId="R12345"
        userId="U1234"
        avatar={{ src: RAW.IMAGE_ICON.data.url, title: "Vingle" }}
        createdAt={1576564981938}
        title={booleanKnob("Title visible", true) ? title : undefined}
        contents={
          booleanKnob("Description visible", true)
            ? [
                {
                  type: "text",
                  content:
                    "주변이 지인이 여기 괸찮다고 해서 먹어봤는데 아주 잘먹었습니다. 얘들까주느라 별 로 먹진못했지만 얘들이 너무 잘먹어서 조만간 재주문을 해야겠어요. 그리고 내장은 라면끓일때 넣어서 먹었는데 국물이 기가막히더군요.",
                },
              ]
            : undefined
        }
        ratingValue={3.5}
        chips={[
          "손질 쉬움",
          "먹기 편함",
          "사진보다 사이즈큼",
          "XXXX",
          "AAAAA",
          "BBBB",
        ]}
        productOption={
          "1kg (손질전 무게, 2~4미) - 20,000원 (택포장비 5,000원 별도)"
        }
        engage={{
          type: "like",
          likeCount: 0,
          liked: false,
          threadId: "R12345",

          replyCount: 10,
          canReply: true,
          replyText: "reply",
          onReplyClick: () => {},
        }}
        hover={true}
        editState={{
          isEditMode: booleanKnob("Enable Edit Mode", false),
          onCancel: () => {},
          onEnter: () => {},
        }}
      />
    );
  },
);

storiesOf(`${STORYBOOK_PREFIX.COMMON_COMPONENTS}/Thread V2`, module).add(
  "Question",
  () => {
    const content = textKnob(
      "Content",
      "주변이 지인이 여기 괸찮다고 해서 먹어봤는데 아주 잘먹었습니다. 얘들까주느라 별 로 먹진못했지만 얘들이 너무 잘먹어서 조만간 재주문을 해야겠어요. 그리고 내장은 라면끓일때 넣어서 먹었는데 국물이 기가막히더군요.",
    );

    return (
      <Question
        type="question"
        questionId="R12345"
        userId="U1234"
        avatar={{ src: RAW.IMAGE_ICON.data.url, title: "Username" }}
        createdAt={1576564981938}
        title="Username"
        contents={[
          {
            type: "text",
            content,
          },
        ]}
        engage={{
          type: "updown",
          status: "upvote",
          upCount: 22,
          downCount: 5,
          threadId: "R12345",
          replyId: "RR1111",

          replyCount: 10,
          canReply: true,
          onReplyClick: () => {},
        }}
        hover={true}
        editState={{
          isEditMode: booleanKnob("Enable Edit Mode", false),
          onCancel: () => {},
          onEnter: () => {},
        }}
      />
    );
  },
);
