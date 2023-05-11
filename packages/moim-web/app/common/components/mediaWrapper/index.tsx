import * as React from "react";
import LazyLoad from "common/components/lazyLoad";
import useParentScrollElement from "common/hooks/useParentScrollElement";
import BlurhashCanvas from "common/components/blurHash";
import { px2rem } from "common/helpers/rem";
import { isBrowser } from "common/helpers/envChecker";
import { SkeletonBox } from "common/components/skeleton";
import { videoLoad, imageLoad } from "./helpers";
import { isiOS } from "common/helpers/browserDetect";
import {
  Wrapper,
  Media,
  SkeletonContainer,
  BlurHash as BlurHashStyle,
} from "./styledComponents";

const BlurHash = BlurHashStyle.withComponent(BlurhashCanvas);

interface IProps
  extends React.PropsWithChildren<{
      src: string;
      type: "image" | "video";
      width: number;
      height: number;
      srcSet?: string;
      sizes?: string;
      previewColor?: string;
      blurHash?: string;
      onSuccess?: VoidFunction;
    }>,
    React.HTMLAttributes<HTMLDivElement> {
  disableSkeleton?: boolean;
  disableMediaOpacity?: boolean;
}

function useMediaLazyTransition({
  type,
  src,
  srcSet,
  sizes,
  onSuccess,
}: IProps) {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const scrollElement = useParentScrollElement(wrapperRef);
  const [isVisible, setVisible] = React.useState(false);
  const [isLoaded, setLoaded] = React.useState(!isBrowser());
  const handleVisible = React.useCallback(async () => {
    if (isiOS()) {
      requestAnimationFrame(() => {
        setVisible(true);
        setLoaded(true);
      });
      if (onSuccess) {
        onSuccess();
      }
      return;
    }
    if (!isLoaded) {
      requestAnimationFrame(() => {
        setVisible(true);
      });
      try {
        switch (type) {
          case "image": {
            await imageLoad(src, srcSet, sizes);
            break;
          }
          case "video": {
            await videoLoad(src);
            break;
          }
        }
      } finally {
        requestAnimationFrame(() => {
          setLoaded(true);
        });
        if (onSuccess) {
          onSuccess();
        }
      }
    } else {
      if (onSuccess) {
        onSuccess();
      }
    }
  }, [isLoaded, onSuccess, src, srcSet, sizes, type]);
  return {
    wrapperRef,
    scrollElement,
    isLoaded,
    isVisible,
    handleVisible,
  };
}

function MediaLazyTransitionWrapper(props: IProps) {
  const {
    children,
    blurHash,
    previewColor,
    width,
    height,
    src,
    type,
    style,
    disableSkeleton,
    disableMediaOpacity,
    ...rest
  } = props;
  const {
    wrapperRef,
    scrollElement,
    isLoaded,
    isVisible,
    handleVisible,
  } = useMediaLazyTransition(props);
  return (
    <Wrapper ref={wrapperRef} style={style} {...rest}>
      <LazyLoad
        root={scrollElement}
        width={width}
        height={height}
        onVisible={handleVisible}
      >
        <Media
          transition={isVisible}
          disableMediaOpacity={disableMediaOpacity ?? false}
          mediaOpacity={Number(isLoaded)}
          style={{
            opacity: Number(isLoaded),
          }}
        >
          {children}
        </Media>
      </LazyLoad>
      {!isLoaded && !disableSkeleton && !blurHash && (
        <SkeletonContainer>
          <SkeletonBox width="100%" height={px2rem(height)} />
        </SkeletonContainer>
      )}
      {!isLoaded && (previewColor || blurHash) && (
        <SkeletonContainer>
          <BlurHash
            className="placeholder"
            hash={blurHash}
            width={width}
            height={height}
            style={{
              backgroundColor: previewColor,
            }}
          />
        </SkeletonContainer>
      )}
    </Wrapper>
  );
}

export default MediaLazyTransitionWrapper;
