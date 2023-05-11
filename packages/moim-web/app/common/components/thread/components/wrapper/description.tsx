// 주의: 무조건 Thread Component 내에서만 사용해야됨 (context 때문)
import React from "react";
// import { isEqual } from "lodash";
import styled, { css } from "styled-components";
import { enWordKeepAllStyle } from "common/components/designSystem/styles";
import { B3RegularStyle } from "common/components/designSystem/typos";
import {
  displayMention,
  parseServerSpecMention,
} from "common/helpers/moimDown";
import { useStoreState } from "app/store";
import { NativeEmojiSafeText } from "common/components/designSystem/texts";
import { selectMentionWithEntities } from "common/components/richEditor/selector";
import { displayNotificationBodyWithStyleSelector } from "app/modules/notifications/components/notificationItem/helper";

const ThreadDescription = styled.div<{
  isUnread?: boolean;
}>`
  ${B3RegularStyle};
  ${enWordKeepAllStyle};

  color: ${props => props.theme.colorV2.colorSet.grey600};
  ${props =>
    props.isUnread &&
    css`
      font-weight: ${props.theme.font.medium} !important;
    `}
`;

const HiddenArea = styled.div`
  position: fixed;
  top: -99999;
  left: -99999;
  visibility: hidden;
`;

export const ThreadDescriptionWrapper = ({
  children,
  className,
  isUnread,
  description,
  descriptionPlain,
}: {
  className?: string;
  isUnread?: boolean;
  description?: string;
  descriptionPlain?: string;
  children: (value: React.ReactNode) => React.ReactElement<HTMLElement>;
}) => {
  return (
    <ThreadDescription className={className} isUnread={isUnread}>
      {children(
        descriptionPlain ?? <UNSAFE_Description description={description} />,
      )}
    </ThreadDescription>
  );
};

const UNSAFE_Description = ({ description }: { description?: string }) => {
  const [text, setText] = React.useState("");
  const { descriptionElement } = useStoreState(state => ({
    descriptionElement: description
      ? displayNotificationBodyWithStyleSelector(state, description)
      : undefined,
  }));
  const refDesc = React.useRef<HTMLDivElement>(null);
  React.useLayoutEffect(() => {
    if (refDesc.current) {
      setText(refDesc.current.textContent ?? "");
    }
  }, []);

  return (
    <>
      {text}
      <HiddenArea ref={refDesc}>{descriptionElement}</HiddenArea>
    </>
  );
};

// TBD 필요하면 사용
export const useDescriptionWithMention = (description?: string) => {
  const { mappedMentionData } = useStoreState(state => ({
    mappedMentionData: selectMentionWithEntities(
      state.entities.users,
      parseServerSpecMention(description || ""),
    ),
    descriptionElement: description
      ? displayNotificationBodyWithStyleSelector(state, description)
      : undefined,
  }));
  const descriptionEl = React.useMemo(() => {
    if (description) {
      const notificationBody = displayMention(description, mappedMentionData);

      return <NativeEmojiSafeText value={notificationBody} />;
    }
  }, [description, mappedMentionData]);

  return descriptionEl;
};
