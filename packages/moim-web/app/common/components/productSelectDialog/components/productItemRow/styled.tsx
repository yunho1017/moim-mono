import styled, { css } from "styled-components";
import FallbackImage from "common/components/fallbackImage";
import { px2rem } from "common/helpers/rem";
import {
  B2RegularStyle,
  B4RegularStyle,
} from "common/components/designSystem/typos";
import { useSingleLineStyle } from "common/components/designSystem/styles";

export const Left = styled.div`
  width: ${px2rem(36)};
  height: ${px2rem(36)};
`;

export const Body = styled.div`
  width: 100%;
  height: 100%;
  min-width: 0;
  flex: 1;
  margin-right: ${px2rem(24)};
  margin-left: ${px2rem(12)};
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
export const Right = styled.div`
  width: ${px2rem(24)};
  height: ${px2rem(24)};
`;

export const Wrapper = styled.div<{ selected: boolean }>`
  width: 100%;
  height: ${px2rem(64)};
  display: flex;
  align-items: center;
  padding: ${px2rem(12)} ${px2rem(16)};
  cursor: pointer;
  position: relative;

  ::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transition: background-color 300ms ease-in;
  }

  ${props =>
    props.selected
      ? css`
          ::before {
            background-color: ${props.theme.colorV2.colorSet.grey50};
          }
        `
      : css`
          :hover {
            ::before {
              background-color: ${props.theme.colorV2.colorSet.grey10};
            }
          }
        `}
`;

export const Title = styled.div`
  color: ${props => props.theme.colorV2.colorSet.grey800};
  ${useSingleLineStyle}
  ${B2RegularStyle}
`;
export const Description = styled.div`
  color: ${props => props.theme.colorV2.colorSet.grey300};
  margin-top: ${px2rem(2)};
  ${useSingleLineStyle}
  ${B4RegularStyle}
`;

export const FallbackImageWrapper = styled.div`
  width: 100%;
  padding-top: 100%;
  position: relative;
`;

export const ImageFallback = styled(FallbackImage)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const ProductPrimaryImageStyle = css`
  transition: transform 400ms ease-in-out;
  object-fit: cover;
`;
