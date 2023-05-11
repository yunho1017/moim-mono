import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import {
  B1RegularStyle,
  B4RegularStyle,
} from "common/components/designSystem/typos";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: ${px2rem(4)} 0;
`;

export const AvatarHolder = styled.div`
  width: ${px2rem(48)};
  height: ${px2rem(48)};
`;
export const Right = styled.div`
  width: 100%;
  flex: 1;
  min-width: 0;
  margin-left: ${px2rem(12)};
  display: flex;
  align-items: center;
`;

export const MoimName = styled.div`
  margin-top: ${px2rem(2)};
  .ql-editor {
    p {
      padding: 0 !important;
    }
    ${B1RegularStyle};
    color: ${props => props.theme.colorV2.colorSet.grey800};
  }
`;
export const MoimDesc = styled.div`
  ${B4RegularStyle};
  color: ${props => props.theme.colorV2.colorSet.grey300};
`;
