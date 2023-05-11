import styled, { css } from "styled-components";
import FallbackImageBase from "common/components/fallbackImage";
import { px2rem } from "common/helpers/rem";
import {
  B3RegularStyle,
  B4RegularStyle,
  H10BoldStyle,
} from "common/components/designSystem/typos";

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: fit-content;
  display: flex;
  align-items: flex-start;
  padding: ${px2rem(8)} 0;

  & + & {
    margin-top: ${px2rem(16)};
    ::before {
      content: "";
      position: absolute;
      top: -${px2rem(16)};
      left: 0;
      right: 0;
      width: 100%;
      height: 1px;
      margin: ${px2rem(8)} 0;
      background-color: ${props => props.theme.colorV2.colorSet.grey50};
    }
  }
`;

export const FallbackImage = styled(FallbackImageBase)`
  width: ${px2rem(72)};
  height: ${px2rem(72)};
`;

export const Image = styled.img`
  width: ${px2rem(72)};
  height: ${px2rem(72)};
  object-fit: cover;
`;

export const Information = styled.div`
  width: 100%;
  flex: 1;
  min-width: 0;
  height: fit-content;
  margin-left: ${px2rem(12)};
`;

export const Title = styled.div`
  padding: ${px2rem(2)} 0;
  color: ${props => props.theme.colorV2.colorSet.grey800};
  ${B3RegularStyle}
`;

export const Option = styled.div`
  padding: ${px2rem(2)} 0;
  color: ${props => props.theme.colorV2.colorSet.grey300};
  white-space: pre-line;
  word-break: keep-all;
  ${B4RegularStyle}
`;

export const Price = styled.div`
  padding: ${px2rem(2)} 0;
  color: ${props => props.theme.colorV2.colorSet.grey800};
  ${H10BoldStyle}
  font-weight: ${props => props.theme.font.bolder};
  display: flex;
  flex-wrap: wrap;
`;

export const ShippingFee = styled.div`
  padding: ${px2rem(2)} 0;
  color: ${props => props.theme.colorV2.colorSet.grey600};
  ${B4RegularStyle}
`;

export const Status = styled.div`
  padding: ${px2rem(2)} 0;
`;

export const Container = styled.div<{
  disabled: boolean;
}>`
  width: 100%;
  height: fit-content;
  margin: 0 ${px2rem(16)};
  display: flex;
  flex: 1;
  min-width: 0;

  ${props => {
    return (
      props.disabled &&
      css`
      ${Image},
      ${Option},
      ${Price},
      ${ShippingFee} {
        opacity: 0.4;
      }
  `
    );
  }}
`;
