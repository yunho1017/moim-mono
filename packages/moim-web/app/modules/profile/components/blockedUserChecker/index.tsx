import React from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import { B4Regular } from "common/components/designSystem/typos";

import { useStoreState } from "app/store";
import { blockedUserSelector } from "app/selectors/app";
import { px2rem } from "common/helpers/rem";

const Text = styled(B4Regular)`
  margin-top: ${px2rem(200)};
  text-align: center;
  color ${props => props.theme.colorV2.colorSet.grey300};
`;

interface IProps {
  userId: string;
}
export default function ProfileShowBlockedUserChecker({
  userId,
  children,
}: React.PropsWithChildren<IProps>) {
  const { blockedUser } = useStoreState(state => ({
    blockedUser: blockedUserSelector(state, userId),
  }));

  if (!blockedUser) {
    return <>{children}</>;
  }

  return (
    <Text>
      <FormattedMessage id="profile_show_blocked" />
    </Text>
  );
}
