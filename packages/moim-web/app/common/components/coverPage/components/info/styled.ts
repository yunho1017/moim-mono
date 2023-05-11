import styled from "styled-components";
import { B1Regular, H2Bold } from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";

export const Content = styled(B1Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey300};
`;

export const Wrapper = styled.div`
  padding: ${px2rem(15)} ${px2rem(16)};
`;

export const Name = styled(H2Bold)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
  margin-bottom: ${px2rem(2)};

  & > * + * {
    margin-left: ${px2rem(8)};
  }
`;
export const PeriodStatus = styled.span`
  & > * + * {
    &::before {
      content: "|";
      margin: 0 ${px2rem(4)};
    }
  }
`;
