import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import {
  H9BoldStyle,
  B3RegularStyle,
  B4RegularStyle,
} from "common/components/designSystem/typos";
import { useSingleLineStyle } from "common/components/designSystem/styles";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
`;

export const Left = styled.div`
  flex: 1;
  width: 100%;
  min-width: 0;
`;
export const Right = styled.div`
  margin-left: ${px2rem(16)};
`;

export const Title = styled.div`
  margin-bottom: ${px2rem(2)};
  .ql-editor {
    ${H9BoldStyle};
    p {
      padding: 0 !important;
    }
    color: ${props => props.theme.colorV2.colorSet.grey800};
  }
`;
export const Content = styled.div`
  .ql-editor {
    ${B3RegularStyle};
    p {
      padding: 0 !important;
    }
    color: ${props => props.theme.colorV2.colorSet.grey800};
  }
`;

export const Thumbnail = styled.div`
  width: ${px2rem(100)};
  height: ${px2rem(60)};
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

export const StatContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${px2rem(4)};
  ${B4RegularStyle};
  color: ${props => props.theme.colorV2.colorSet.grey300};
`;

export const Username = styled.div`
  min-width: 0;
  ${useSingleLineStyle};
`;

export const TimeStamp = styled.div`
  white-space: nowrap;
  &::before {
    content: "･";
    display: inline;
    margin: 0 ${px2rem(4)};
  }
`;
