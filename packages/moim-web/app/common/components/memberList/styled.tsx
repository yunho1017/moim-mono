import styled, { FlattenInterpolation } from "styled-components";
import { H8Bold } from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";

export const Section = styled.div``;

export const SectionHeader = styled(H8Bold)`
  padding: ${px2rem(11)} ${px2rem(16)};
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const SectionContents = styled.div``;

export const MemberItemWrapper = styled.div.attrs({ role: "button" })<{
  memberItemStyle?: FlattenInterpolation<any>;
}>`
  ${props => props.memberItemStyle}
`;
export const SubTitleWrapper = styled.div`
  display: flex;

  & > * + * {
    &::before {
      content: "･";
      display: inline;
      margin: 0 ${px2rem(4)};
    }
  }
`;
