import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import { GhostGeneralButton } from "common/components/designSystem/buttons";
import {
  H8Bold,
  B3Regular,
  B4RegularStyle,
} from "common/components/designSystem/typos";

export const Wrapper = styled.div`
  width: 100%;
  height: fit-content;

  & + & {
    margin-top: ${px2rem(12)};
  }
`;

export const CardFrame = styled.div`
  width: 100%;
  height: fit-content;
  border: 1px solid ${props => props.theme.colorV2.colorSet.grey50};
  border-radius: ${px2rem(4)};
  padding: ${px2rem(8)} 0;
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
`;

export const Header = styled.div`
  width: 100%;
  height: ${px2rem(42)};
  display: flex;
  align-items: center;
  padding: 0 ${px2rem(16)};
`;

export const TitleContainer = styled.div`
  flex: 1;
  min-width: 0;
  width: 100%;
  display: flex;
  align-items: center;
`;

export const Title = styled(H8Bold)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const DefaultAddressChipStyle = css`
  width: fit-content;
  height: ${px2rem(18)};
  padding: 1px ${px2rem(6)};
  background-color: ${props => props.theme.colorV2.colorSet.grey600};
  color: ${props => props.theme.colorV2.colorSet.white1000};
  margin-left: ${px2rem(4)};
  ${B4RegularStyle}
`;

export const ModifyButton = styled(GhostGeneralButton).attrs({ size: "s" })`
  width: fit-content;
  min-width: ${px2rem(64)};
`;

export const Body = styled.div`
  width: 100%;
  padding: 0 ${px2rem(16)};
`;

export const Address = styled(B3Regular)`
  width: 100%;
  padding: ${px2rem(4)} 0;
  color: ${props => props.theme.colorV2.colorSet.grey600};
  white-space: pre-line;
  word-break: keep-all;
`;

export const Phone = styled(B3Regular)`
  width: 100%;
  padding: ${px2rem(4)} 0;
  color: ${props => props.theme.colorV2.colorSet.grey600};
  white-space: pre-line;
  word-break: keep-all;
`;

export const Memo = styled(B3Regular)`
  width: 100%;
  padding: ${px2rem(4)} 0;
  color: ${props => props.theme.colorV2.colorSet.grey600};
  white-space: pre-line;
  word-break: keep-all;
`;
