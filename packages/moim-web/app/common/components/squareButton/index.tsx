import styled from "styled-components";
import { px2rem } from "common/helpers/rem";

const SquareButton = styled.button`
  display: inline-block;
  width: ${px2rem(80)};
  height: ${px2rem(32)};
  border-radius: ${px2rem(4)};
  margin-left: ${px2rem(6)};
  font-size: ${px2rem(14)};
`;

export default SquareButton;
