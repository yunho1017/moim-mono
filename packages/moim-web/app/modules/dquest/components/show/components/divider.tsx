import styled from "styled-components";
import { DefaultDivider as BaseDivider } from "app/common/components/divider/styled";
import { px2rem } from "common/helpers/rem";

const Divider = styled(BaseDivider)`
  margin: ${px2rem(8)} 0;
`;

export default Divider;
