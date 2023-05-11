import { B4Regular } from "common/components/designSystem/typos";
import { MEDIA_QUERY } from "common/constants/responsive";
import { px2rem } from "common/helpers/rem";
import styled, { css } from "styled-components";

export const ImageWrapper = styled.div`
  width: 100%;
  padding-top: 100%;
  position: relative;
`;
export const Image = styled.img<{ isGif: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  object-fit: contain;
  width: 100%;
  height: 100%;
  ${props =>
    !props.isGif
      ? css`
          filter: drop-shadow(
            0 ${px2rem(12)} ${px2rem(15)} rgba(0, 0, 0, 0.25)
          );
        `
      : undefined}
`;

export const ImageLoaderContainer = styled.div<{
  isDisplay: boolean;
}>`
  opacity: ${props => (props.isDisplay ? 1 : 0)};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Title = styled(B4Regular)`
  text-align: center;
  font-weight: ${props => props.theme.font.bold};
  span {
    word-break: break-word !important;
  }
`;

export const Wrapper = styled.div<{
  backgroundColor: string | null;
  textColor: string | null;
}>`
  width: 100%;
  border-radius: ${px2rem(12)};
  padding: ${px2rem(18)};
  display: flex;
  flex-direction: column;
  gap: ${px2rem(12)};
  align-items: center;

  transition: transform 0.2s ease-in-out;
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    &:hover {
      transform: translateY(${px2rem(-4)}) translateZ(0);
    }
  }
  ${props =>
    props.backgroundColor &&
    css`
      background-color: ${props.backgroundColor};
    `}
  ${props =>
    props.textColor &&
    css`
      & > ${Title} {
        color: ${props.textColor};
      }
    `}
`;
