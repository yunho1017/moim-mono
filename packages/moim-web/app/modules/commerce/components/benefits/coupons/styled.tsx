import styled from "styled-components";
import {
  pB2RegularStyle,
  B4RegularStyle,
  H8BoldStyle,
} from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";
import { FlatGeneralButton } from "common/components/designSystem/buttons";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const EmptyWrapper = styled.div`
  width: 100%;
  height: 100%;

  padding: ${px2rem(80)} ${px2rem(16)};
  color: ${props => props.theme.colorV2.colorSet.grey300};
  text-align: center;
  ${pB2RegularStyle}
`;

export const HeadContainer = styled.div`
  width: 100%;
  padding: 0 ${px2rem(12)};
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
`;

export const RedeemInputContainer = styled.div`
  display: flex;
  align-items: center;
  border-top: 1px solid ${props => props.theme.colorV2.colorSet.grey50};
  padding: ${px2rem(16)};
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
`;

export const InputWrapper = styled.div`
  flex: 1;
  min-width: 0;
  width: 100%;
  margin-right: ${px2rem(16)};
`;
export const RegisterButton = styled(FlatGeneralButton).attrs({ size: "m" })`
  width: fit-content;
  min-width: ${px2rem(80)};
  height:: ${px2rem(40)};
`;

export const ListContainer = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  min-height: 0;
  padding: ${px2rem(16)};
  background-color: ${props => props.theme.colorV2.colorSet.grey10};
`;

export const BottomContainer = styled.div`
  width: 100%;
  height: fit-content;
  padding: ${px2rem(16)};
`;

export const BottomTitle = styled.div`
  width: 100%;
  padding: ${px2rem(6)} 0;
  color: ${props => props.theme.colorV2.colorSet.grey800};
  ${H8BoldStyle}
`;

export const BottomDescription = styled.div`
  width: 100%;
  padding: ${px2rem(2)} 0;
  white-space: pre-line;
  color: ${props => props.theme.colorV2.colorSet.grey300};
  ${B4RegularStyle}
`;

export const CouponWrapper = styled.div`
  & + & {
    margin-top: ${px2rem(12)};
  }
`;
