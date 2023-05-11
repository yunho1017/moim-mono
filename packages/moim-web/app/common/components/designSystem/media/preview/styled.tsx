import styled, { css, FlattenInterpolation } from "styled-components";
import { px2rem } from "common/helpers/rem";
import { B4Regular } from "common/components/designSystem/typos";
import LoadingIconBase from "common/components/loading/icon";
import { useSingleLineStyle } from "../../styles";

const MEDIA_MAX_HEIGHT = 300;
export const Wrapper = styled.div<{
  overrideStyle?: FlattenInterpolation<any>;
}>`
  display: flex;
  flex-direction: column;
  position: relative;

  & > * + * {
    margin-top: ${px2rem(4)};
  }

  ${props => props.overrideStyle};
`;

export const ContentsWrapper = styled.div<{
  initialSize?: { width: number; height: number };
  overrideStyle?: FlattenInterpolation<any>;
}>`
  border-radius: ${px2rem(2)};
  overflow: hidden;
  position: relative;
  max-height: ${px2rem(MEDIA_MAX_HEIGHT)};

  min-width: ${px2rem(76)};
  min-height: ${px2rem(46)};
  ${props =>
    props.initialSize &&
    css`
      width: ${px2rem(props.initialSize.width)};
      height: ${px2rem(props.initialSize.height)};
    `};

  ${props =>
    props.initialSize &&
    props.initialSize.height > MEDIA_MAX_HEIGHT &&
    css`
      width: ${px2rem(
        (props.initialSize.width / props.initialSize.height) * MEDIA_MAX_HEIGHT,
      )};
    `};
  ${props => props.overrideStyle};
`;

export const FileName = styled(B4Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey300};
  ${useSingleLineStyle};
`;

export const BlurHashContainer = styled.div<{ width: number; height: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${props => px2rem(props.width)};
  height: ${props => px2rem(props.height)};
  z-index: ${props => props.theme.zIndexes.below};
`;

export const LoadingIconWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: ${props => props.theme.zIndexes.below};
`;

export const LoadingIcon = styled(LoadingIconBase).attrs(props => ({
  color: props.theme.colorV2.colorSet.white1000,
}))``;
