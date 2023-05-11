import styled from "styled-components";
import { B4Regular } from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";
import { ChipShape } from "common/components/chips";

export const Tag = styled(B4Regular)<{ shape: ChipShape }>`
  padding: ${px2rem(1)} ${px2rem(4)};
  min-width: 0;
  border-radius: ${props => (props.shape === "round" ? px2rem(10) : px2rem(2))};
  background-color: ${props => props.theme.colorV2.colorSet.grey50};
`;

export const Wrapper = styled.div`
  display:flex;
  flex-wrap:wrap;
  margin-top: ${px2rem(8)};

  ${Tag} + ${Tag} {
    margin-left:${px2rem(4)}
  }
`;
