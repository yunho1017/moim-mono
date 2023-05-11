import * as React from "react";
import { Wrapper, Emoji, Title, Description } from "./styled";
import { FormattedMessage } from "react-intl";
import { NotificationType } from "app/enums";

export default function Empty({ type }: { type: Moim.Enums.NotificationType }) {
  const titleId =
    type === NotificationType.ALL
      ? "notifications/tab_all/empty_title"
      : "notifications/tab_mentions/empty";
  const descriptionId =
    type === NotificationType.ALL
      ? "notifications/tab_all/empty_body"
      : "notifications/tab_mentions/empty_body";
  return (
    <Wrapper>
      <Emoji>🔔</Emoji>
      <Title>
        <FormattedMessage id={titleId} />
      </Title>
      <Description>
        <FormattedMessage id={descriptionId} />
      </Description>
    </Wrapper>
  );
}
