import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import {
  H9BoldStyle,
  B4RegularStyle,
  pB2RegularStyle,
} from "common/components/designSystem/typos";
import { useSingleLineStyle } from "common/components/designSystem/styles";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const ParentPost = styled.div`
  width: 100%;
  padding-bottom: ${px2rem(8)};
  border-bottom: 1px solid ${props => props.theme.colorV2.colorSet.grey50};
`;

export const CommentContainer = styled.div`
  width: 100%;
  display: flex;
  padding-top: ${px2rem(8)};
`;

export const Title = styled.div`
  .ql-editor {
    ${H9BoldStyle};
    p {
      padding: 0 !important;
    }
    color: ${props => props.theme.colorV2.colorSet.grey800};
  }
`;

export const EngageContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${px2rem(4)};
  margin-left: -${px2rem(4)};
  ${B4RegularStyle};
  color: ${props => props.theme.colorV2.colorSet.grey300};
`;
export const CommentCountWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: ${px2rem(8)};
`;

export const ParentUsername = styled.div`
  min-width: 0;
  ${useSingleLineStyle};
`;

export const ParentTimeStamp = styled.div`
  white-space: nowrap;

  &::before {
    content: "･";
    display: inline;
    margin: 0 ${px2rem(4)};
  }
`;

export const StatContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${px2rem(4)};
  ${B4RegularStyle};
  color: ${props => props.theme.colorV2.colorSet.grey300};
`;

export const EngageStateWrapper = styled.div``;

export const AvatarHolder = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: ${px2rem(6)};
  padding-left: 0;
`;

export const UserDataHolder = styled.div`
  width: 100%;
  flex: 1;
  min-width: 0;
  margin-left: ${px2rem(10)};
`;

export const UsernameContainer = styled.div`
  display: flex;
  align-items: baseline;
`;

export const Username = styled.div`
  min-width: 0;
  ${useSingleLineStyle};
  ${H9BoldStyle};
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const TimeStamp = styled.div`
  white-space: nowrap;
  ${B4RegularStyle};
  color: ${props => props.theme.colorV2.colorSet.grey300};
  margin-left: ${px2rem(4)};
`;

export const Content = styled.div`
  margin: ${px2rem(2)} 0;

  .ql-editor {
    p {
      padding: 0 !important;
    }
    ${pB2RegularStyle};
    color: ${props => props.theme.colorV2.colorSet.grey800};
  }
`;
