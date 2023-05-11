import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { H8Bold } from "common/components/designSystem/typos";
import { Description } from "../template";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const GroupName = styled(H8Bold)`
  margin-top: ${px2rem(19)};
  text-align: center;
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const OverrideDescription = styled(Description)`
  margin: ${px2rem(11)} 0 ${px2rem(4)};
  text-align: center;
`;
