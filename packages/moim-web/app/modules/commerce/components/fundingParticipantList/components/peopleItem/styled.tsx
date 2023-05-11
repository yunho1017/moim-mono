import styled, { css } from "styled-components";
import { rgba } from "polished";
import { px2rem } from "common/helpers/rem";
import {
  B2Regular,
  H8Bold,
  B4RegularStyle,
  B3RegularStyle,
} from "common/components/designSystem/typos";

export const Wrapper = styled.div<{ isMine: boolean }>`
  width: 100%;
  height: fit-content;
  align-items: center;
  padding: ${px2rem(12)} ${px2rem(16)};
  transition: background-color 400ms ease-in-out;
  background-color: transparent;

  background-color: ${props =>
    props.isMine ? rgba(props.theme.colorV2.accent, 0.06) : "transparent"};
`;

export const UserInfo = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
`;

export const MessageContainer = styled.div`
  width: 100%;
  padding: ${px2rem(12)} 0 0;
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
`;

export const Center = styled.div`
  margin: 0 ${px2rem(8)};
  width: 100%;
  min-width: 1;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Right = styled.div`
  display: flex;
  width: fit-content;
  flex-direction: column;
  justify-content: center;

  ::after {
    content: "";
    display: block;
    width: 100%;
    height: ${px2rem(18)};
  }
`;

export const Username = styled(B2Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const ShaveTextWrapperStyle = css`
  background-color: transparent;
  padding: ${px2rem(4)} 0;
  color: ${props => props.theme.colorV2.colorSet.grey600};

  ${B3RegularStyle};
`;

export const OptionContainer = styled.div`
  margin-top: ${px2rem(2)};
  color: ${props => props.theme.colorV2.colorSet.grey300};
  ${B4RegularStyle}
`;

export const DonatePrice = styled(H8Bold)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
  font-weight: ${props => props.theme.font.bold};
`;
