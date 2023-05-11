import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import NoRightIconBase from "@icon/48-no-right.svg";
import EmptyIconBase from "@icon/48-empty.svg";

export const Container = styled.div`
  padding: ${px2rem(80)} 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colorV2.colorSet.grey300};
`;

export const NoRightIcon = styled(NoRightIconBase).attrs({
  size: "l",
  touch: 48,
})``;

export const EmptyIcon = styled(EmptyIconBase).attrs({
  size: "l",
  touch: 48,
})``;
