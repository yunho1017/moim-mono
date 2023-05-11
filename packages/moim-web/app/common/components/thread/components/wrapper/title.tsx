// 주의: 무조건 Thread Component 내에서만 사용해야됨 (context 때문)
import React from "react";
import styled, { css } from "styled-components";
import { rgba } from "polished";
import { CommonBadge } from "common/components/alertBadge";
import { enWordKeepAllStyle } from "common/components/designSystem/styles";
import { B2RegularStyle } from "common/components/designSystem/typos";
import { Thread } from "app/typings";
import { px2rem } from "common/helpers/rem";

const MAX_DISPLAY_UNREAD_COUNT = 99;
interface IThreadTitleProps {
  isUnread?: boolean;
}

const ThreadTitle = styled.div<IThreadTitleProps>`
  width: 100%;
  display: flex;
  align-items: center;

  ${B2RegularStyle};
  ${enWordKeepAllStyle};
  color: ${props => rgba(props.theme.colorV2.colorSet.grey800, 0.8)};
  ${props =>
    props.isUnread &&
    css`
      font-weight: ${props.theme.font.bolder};
      color: ${props.theme.colorV2.colorSet.grey800};
    `}

  &> *+* {
    margin-left: ${px2rem(4)};
  }
`;

export const ThreadTitleWrapper = ({
  children,
  className,
  stat,
  prefix,
}: React.PropsWithChildren<{
  className?: string;
  stat?: Thread.IThreadItemStatProps;
  prefix?: React.ReactNode;
}>) => {
  const unreadCount = React.useMemo(() => {
    const count = stat?.count ?? 0;
    return count > MAX_DISPLAY_UNREAD_COUNT
      ? `${MAX_DISPLAY_UNREAD_COUNT}+`
      : count;
  }, [stat?.count]);

  return (
    <ThreadTitle className={className} isUnread={Boolean(stat?.isUnread)}>
      {prefix}
      {children}
      {unreadCount ? <CommonBadge>{unreadCount}</CommonBadge> : null}
    </ThreadTitle>
  );
};
