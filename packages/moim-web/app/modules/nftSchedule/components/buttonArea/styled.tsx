import styled from "styled-components";
import { rgba } from "polished";
import { px2rem } from "common/helpers/rem";
import {
  FlatButton,
  GhostGeneralButton,
} from "common/components/designSystem/buttons";

export const MintButton = styled(FlatButton).attrs({ size: "l" })<{
  disabled?: boolean;
}>`
  width: 100%;
`;

export const ApplyWhiteListButton = styled(GhostGeneralButton).attrs({
  size: "l",
})<{
  disabled?: boolean;
}>`
  width: 100%;
`;

export const BottomWrapper = styled.div`
  display: block;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: ${px2rem(68)};
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
  box-shadow: 0 ${px2rem(2)} ${px2rem(8)} 0
    ${props => rgba(props.theme.colorV2.colorSet.grey800, 0.2)};
  padding: ${px2rem(10)} ${px2rem(16)};
  z-index: ${props => props.theme.zIndexes.popover};
`;

export const Container = styled.div`
  display: flex;
  gap: ${px2rem(12)};
  & > div {
    width: 100%;
  }
`;
