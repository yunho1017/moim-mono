import * as React from "react";
import styled from "styled-components";

import { CommonBadge } from "common/components/alertBadge";

import { px2rem } from "common/helpers/rem";

const UnreadBadge = styled(CommonBadge)`
  margin: 0 ${px2rem(2)};
`;

export default function ChannelUnreadCount({ count }: { count: number }) {
  if (!count) {
    return null;
  } else if (count < 100) {
    return <UnreadBadge>{count}</UnreadBadge>;
  } else {
    return <UnreadBadge>99+</UnreadBadge>;
  }
  return null;
}
