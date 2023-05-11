import * as React from "react";
import { FlattenInterpolation } from "styled-components";
// components
import { SkeletonBox } from "common/components/skeleton";
import { ImageWrapper, ImgContainer, LoaderContainer } from "./styled";

import useIsMobile from "common/hooks/useIsMobile";

// const BLUR_HASH_PERFORMANCE_LIMIT = 500;

export const useListItemImageScale = (): Moim.ImageScaleType | undefined => {
  const isMobile = useIsMobile();

  return React.useMemo(() => {
    if (isMobile) {
      return "sm";
    }
    return "md";
  }, [isMobile]);
};
interface IProps
  extends React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  fallBackSrc?: string;
  blurHash?: string;
  width: number;
  height: number;
  overrideWrapperStyle?: FlattenInterpolation<any>;
  overrideIMGStyle?: FlattenInterpolation<any>;
}

const LazyBlurHashImage: React.FC<IProps> = ({
  src,
  blurHash,
  fallBackSrc,
  width,
  height,
  overrideWrapperStyle,
  overrideIMGStyle,
  ...restImgProps
}) => {
  const [isError, setErrorStatus] = React.useState(false);
  const [isLoaded, setLoadStatus] = React.useState(false);
  // const adjustSize = React.useMemo(
  //   () => ({
  //     width:
  //       width > BLUR_HASH_PERFORMANCE_LIMIT
  //         ? BLUR_HASH_PERFORMANCE_LIMIT
  //         : width ?? 300,
  //     height:
  //       height > BLUR_HASH_PERFORMANCE_LIMIT
  //         ? BLUR_HASH_PERFORMANCE_LIMIT
  //         : height ?? 300,
  //   }),
  //   [width, height],
  // );

  const isGif = React.useMemo(
    () => Boolean(src && src.toLowerCase().match(".gif")),
    [src],
  );

  const handleLoad = React.useCallback(
    e => {
      setLoadStatus(true);
      restImgProps.onLoad?.(e);
    },
    [restImgProps.onLoad],
  );

  const handleError = React.useCallback(
    e => {
      setErrorStatus(true);
      restImgProps.onError?.(e);
    },
    [restImgProps.onError],
  );

  const imageElement = React.useMemo(() => {
    const {
      ref: _v0,
      srcSet,
      onLoad: _v1,
      onError: v2,
      sizes: _v3,
      ...rest
    } = restImgProps;
    return (
      <ImgContainer
        isDisplay={true}
        src={isError ? fallBackSrc ?? src : src}
        srcSet={isError || isGif ? undefined : srcSet}
        width="100%"
        height="100%"
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
        overrideStyle={overrideIMGStyle}
        {...rest}
      />
    );
  }, [
    isGif,
    fallBackSrc,
    handleError,
    handleLoad,
    isError,
    overrideIMGStyle,
    restImgProps,
    src,
  ]);

  return (
    <ImageWrapper
      width={width}
      height={height}
      overrideStyle={overrideWrapperStyle}
    >
      {imageElement}

      <LoaderContainer
        className="loader"
        isDisplay={!isLoaded}
        overrideStyle={overrideIMGStyle}
      >
        {/* {blurHash ? (
          <Blurhash
            hash={blurHash}
            width={adjustSize.width}
            height={adjustSize.height}
          />
        ) : (
          )} */}
        <SkeletonBox width="100%" height="100%" />
      </LoaderContainer>
    </ImageWrapper>
  );
};

export default LazyBlurHashImage;
