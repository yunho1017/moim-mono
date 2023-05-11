import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { H8Bold } from "common/components/designSystem/typos";
import RightIconBase from "@icon/18-rightarrow-g.svg";

export const TitleSection = styled.div`
  width: 100%;
  padding: 0 ${px2rem(4)} 0 ${px2rem(16)};
  display: flex;
  align-items: center;
`;

export const Title = styled(H8Bold)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
  padding: ${px2rem(11)} 0;
  margin-right: ${px2rem(3)};
  flex: 1;
  min-width: 0;
`;

export const RightArrow = styled(RightIconBase).attrs(props => ({
  size: "xs",
  touch: 42,
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;
