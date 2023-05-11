import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { B4Regular, B1Regular } from "common/components/designSystem/typos";
import {
  GhostButton as GhostButtonBase,
  FlatButton as FlatButtonBase,
} from "common/components/designSystem/buttons";

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 ${px2rem(16)};
`;

export const Icon = styled.div`
  margin-bottom: ${px2rem(6)};
  font-size: ${px2rem(80)};
`;

export const Title = styled(B1Regular)`
  margin-bottom: ${px2rem(4)};
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const Description = styled(B4Regular)`
  margin-bottom: ${px2rem(6)};
  color: ${props => props.theme.colorV2.colorSet.grey300};
`;

export const ButtonContainer = styled.div`
  padding: ${px2rem(16)} 0;

  > * + * {
    margin-left: ${px2rem(16)};
  }
`;

export const GhostButton = styled(GhostButtonBase).attrs({ size: "m" })``;
export const FlatButton = styled(FlatButtonBase).attrs({ size: "m" })``;
