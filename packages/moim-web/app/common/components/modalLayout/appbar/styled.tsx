import styled, { FlattenInterpolation } from "styled-components";
import { px2rem } from "common/helpers/rem";
import { APP_BAR_HEIGHT } from "app/modules/postShow/components/bottom/components/groupInput/constants";
import { useScrollStyle } from "common/components/designSystem/styles";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
`;

export const Header = styled.header<{
  overrideStyle?: FlattenInterpolation<any>;
}>`
  width: 100%;
  height: ${px2rem(APP_BAR_HEIGHT)};
  padding: 0 ${px2rem(16)};
  ${props => props.overrideStyle};
`;

export const Content = styled.div`
  position: relative;
  flex: 1;
  min-height: 0;
  width: 100%;
  height: 100%;
  ${useScrollStyle}
`;
