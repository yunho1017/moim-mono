import * as React from "react";
import styled from "styled-components";
// icons
import MemberIcon from "@icon/18-member-g.svg";
// components
import ActionCount from "common/components/actionCount";
import { B4Regular } from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";

export const FollowerWrapper = styled.div`
  display: inline-flex;
  align-items: center;
`;
export const FollowerCount = styled(B4Regular)`
  margin-left: ${px2rem(4)};
  color: ${props => props.theme.colorV2.colorSet.grey300};

  .number {
    color: ${props => props.theme.colorV2.colorSet.grey800};
  }
`;

const Follower = ({
  followerCount,
  TBD,
}: {
  followerCount?: number;
  TBD: boolean;
}) =>
  TBD || !followerCount ? null : (
    <FollowerWrapper>
      <MemberIcon size="xs" />
      <FollowerCount>
        <span className="number">
          <ActionCount value={followerCount} />
        </span>{" "}
        Followers
      </FollowerCount>
    </FollowerWrapper>
  );

export default Follower;
