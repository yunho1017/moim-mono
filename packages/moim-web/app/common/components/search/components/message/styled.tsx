import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import {
  H9BoldStyle,
  B2RegularStyle,
  B4RegularStyle,
} from "common/components/designSystem/typos";
import { useSingleLineStyle } from "common/components/designSystem/styles";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
`;

export const AvatarHolder = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

export const UserDataHolder = styled.div`
  width: 100%;
  flex: 1;
  min-width: 0;
  margin-left: ${px2rem(16)};
`;

export const UsernameContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Username = styled.div`
  min-width: 0;
  ${H9BoldStyle};
  ${useSingleLineStyle};
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;
export const TimeStamp = styled.div`
  white-space: nowrap;
  ${B4RegularStyle};
  color: ${props => props.theme.colorV2.colorSet.grey300};
  margin-left: ${px2rem(4)};
  padding: 1px 0;
`;

export const Message = styled.div`
  margin-top: ${px2rem(2)};
  .ql-editor {
    ${B2RegularStyle};
    color: ${props => props.theme.colorV2.colorSet.grey800};

    p {
      padding: 0 !important;
    }
  }
`;
