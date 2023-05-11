import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { H4Bold } from "common/components/designSystem/typos";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: ${px2rem(1032)};
  padding-top: ${px2rem(40)};
  width: ${px2rem(700)};
  height: 100%;
  flex: 1;
  min-height: 0;
`;

export const Title = styled(H4Bold)`
  padding: ${px2rem(8)} ${px2rem(16)};
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  min-height: 0;
`;
