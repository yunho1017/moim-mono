import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { H8Bold } from "common/components/designSystem/typos";
import UserProfileImage from "common/components/userProfileImage";

export const Wrapper = styled.div`
  z-index: ${props => props.theme.zIndexes.default};
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
`;

export const InnerWrapper = styled.div`
  display: flex;
  align-items: center;
  height: ${px2rem(96)};
  padding: 0 ${px2rem(32)};
  background-color: ${props => props.theme.colorV2.colorSet.grey10};
  padding: 0 ${px2rem(24)};
`;

export const User = styled.div`
  display: flex;
  min-width: 0;
`;

export const UserImage = styled(UserProfileImage)`
  margin-right: ${px2rem(8)};
  flex-shrink: 0;
`;

export const UserName = styled(H8Bold)`
  margin-right: ${px2rem(8)};
  flex-shrink: 0;
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;
export const PositionChipWrapper = styled.div`
  min-width: 0;
  margin-top: ${px2rem(4)};
  align-self: flex-start;
  flex-shrink: 1;
`;
