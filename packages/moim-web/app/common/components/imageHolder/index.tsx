import * as React from "react";
import ReactResizeDetector from "react-resize-detector";
import * as EnvChecker from "common/helpers/envChecker";
import { px2rem } from "common/helpers/rem";
import MediaLazyTransitionWrapper from "../mediaWrapper";
import Skeleton from "./skeleton";
import {
  CropTop,
  ObjectFit,
  Wrapper,
  Container,
  FloatingContainer,
} from "./styledComponents";

type Fit = "initial" | "cover" | "contain" | "fill" | "crop-top";

interface IInternalProps
  extends React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  src: string;
  fallbackSrc?: string;
  fit?: Fit;
  fullWidth?: boolean;
}

export interface IProps extends IInternalProps {
  previewColor?: string;
  blurHash?: string;
}

const CompatibleImage = ({ src, style, fit, ref, ...rest }: IInternalProps) => {
  if (fit === "crop-top") {
    return (
      <CropTop
        style={{
          ...style,
          backgroundImage: `url("${src}")`,
        }}
      />
    );
  }
  if (
    (EnvChecker.isBrowser() || EnvChecker.isTest()) &&
    !("object-fit" in document.body.style)
  ) {
    const cropMapper = fit === "fill" ? "100% 100%" : fit;

    return (
      <ObjectFit
        style={{
          ...style,
          backgroundSize: cropMapper,
          backgroundImage: `url("${src}")`,
        }}
      />
    );
  } else {
    return (
      <img
        alt=""
        ref={ref}
        src={src}
        style={{
          ...style,
          objectFit: fit,
        }}
        {...rest}
      />
    );
  }
};

const ImageHolder: React.FC<IProps> = props => {
  const {
    width = "100%",
    height = "100%",
    previewColor,
    blurHash,
    src,
    fullWidth,
  } = props;
  const [frameWidth, setFrameWidth] = React.useState<number | undefined>(
    undefined,
  );
  const [status, setState] = React.useState<
    "loadStart" | "loadSuccess" | "loadFailed"
  >("loadStart");

  const handleLoadDone = React.useCallback(() => {
    setState("loadSuccess");
  }, []);
  const handleLoadFail = React.useCallback(() => {
    setState("loadFailed");
  }, []);

  const adjustWidth = React.useMemo(
    () => (frameWidth ? (frameWidth < width ? frameWidth : width) : width),
    [frameWidth, width],
  );

  const renderImage = React.useMemo(() => {
    const {
      height: _height,
      width: _width,
      previewColor: _previewColor,
      blurHash: _blurHash,
      style: restStyle,
      fallbackSrc,
      src: _src,
      ...rest
    } = props;
    return (
      <CompatibleImage
        width="100%"
        height="auto"
        src={status === "loadFailed" ? fallbackSrc ?? "" : src}
        style={restStyle}
        loading="lazy"
        onLoad={handleLoadDone}
        onError={handleLoadFail}
        {...rest}
      />
    );
  }, [handleLoadDone, handleLoadFail, props, src, status]);

  const wrapperStyle = React.useMemo(
    () => ({
      width: fullWidth
        ? "100%"
        : typeof adjustWidth === "string"
        ? adjustWidth
        : px2rem(adjustWidth),
    }),
    [adjustWidth, fullWidth],
  );

  const content = React.useMemo(() => {
    const inner = (
      <MediaLazyTransitionWrapper
        src={src}
        type="image"
        width={frameWidth ?? 0}
        height={typeof height === "string" ? 0 : height}
        blurHash={blurHash}
        previewColor={previewColor}
        disableSkeleton={true}
      >
        {renderImage}
      </MediaLazyTransitionWrapper>
    );
    if (status === "loadStart") {
      return <FloatingContainer>{inner}</FloatingContainer>;
    }

    return inner;
  }, [blurHash, frameWidth, height, previewColor, renderImage, src, status]);

  const handleResize = React.useCallback(w => {
    setFrameWidth(w);
  }, []);

  if (typeof width !== "number" || typeof height !== "number") {
    return renderImage;
  }

  return (
    <ReactResizeDetector handleWidth={true} onResize={handleResize}>
      <Wrapper style={wrapperStyle}>
        <Container>
          {status === "loadStart" && (
            <Skeleton
              blurHash={blurHash}
              width={frameWidth ?? 0}
              height={frameWidth ? frameWidth * (height / width) : height}
            />
          )}
          {content}
        </Container>
      </Wrapper>
    </ReactResizeDetector>
  );
};

export default React.memo(ImageHolder);
