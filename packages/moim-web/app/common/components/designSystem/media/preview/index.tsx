import * as React from "react";
import { FlattenInterpolation } from "styled-components";
import { Blurhash } from "react-blurhash";
import {
  Wrapper,
  ContentsWrapper,
  FileName,
  BlurHashContainer,
  LoadingIconWrapper,
  LoadingIcon,
} from "./styled";
import { BigDeleteButton, DeleteButtonWrapper } from "../cell/styled";
import RawHlsVideo from "common/components/hlsVideo";
import BrochureImageThumbnail from "common/components/imageBrochure/components/brochureImageThumbnail";
import useHover from "common/hooks/useHover";
import {
  ALL_IMAGE_MIME_REGEX,
  ALL_VIDEO_MIME_REGEX,
  ALL_AUDIO_MIME_REGEX,
} from "common/constants/mimeTypes";
import canPlay from "common/helpers/canPlay";
import ReactResizeDetector from "react-resize-detector";

interface IProps {
  user: Moim.User.INormalizedUser;
  fileId: Moim.Id;
  title: string;
  mimeType: string;
  privateUrl: string;
  fallbackComponent: React.ReactElement;
  imagePreview?: Moim.Blockit.ImageMetadata & { url?: string };
  imageUrls?: Moim.Blockit.ImageSrcProps;
  readonly?: boolean;
  disableFileTitle?: boolean;
  wrapperStyle?: FlattenInterpolation<any>;
  contentWrapperStyle?: FlattenInterpolation<any>;
  alwaysShowDeleteButton?: boolean;
  groupName?: string; // NOTE: for brochureImage grouping
  onClickDelete: React.MouseEventHandler;
}

export default function MediaPreviewComponent({
  user,
  fileId,
  title,
  mimeType,
  privateUrl,
  imagePreview,
  imageUrls,
  readonly,
  disableFileTitle = false,
  fallbackComponent,
  wrapperStyle,
  contentWrapperStyle,
  alwaysShowDeleteButton,
  groupName,
  onClickDelete,
}: IProps) {
  const [hoverRef, isHovered] = useHover<HTMLDivElement>();
  const [canPreview, setCanPreviewStatus] = React.useState(true);
  const [canPlayable, setPlayableStatus] = React.useState(true);
  const [loadDone, setLoadStatus] = React.useState(false);
  const [frameSize, setFrameSize] = React.useState<
    { width: number; height: number } | undefined
  >(
    imagePreview
      ? { width: imagePreview.width, height: imagePreview.height }
      : undefined,
  );
  const isImage = mimeType.match(ALL_IMAGE_MIME_REGEX);
  const isVideo = mimeType.match(ALL_VIDEO_MIME_REGEX);
  const isAudio = mimeType.match(ALL_AUDIO_MIME_REGEX);
  const ownerId = user.id;

  const handleError = React.useCallback(() => {
    if (isImage) setCanPreviewStatus(false);
    setLoadStatus(true);
  }, [isImage]);
  const handleLoadStart = React.useCallback(() => {
    setLoadStatus(false);
  }, []);
  const handleLoad = React.useCallback(() => {
    if (isImage) setCanPreviewStatus(true);
    setLoadStatus(true);
  }, [isImage]);

  const contents: React.ReactNode = React.useMemo(() => {
    if (isImage && canPreview) {
      return (
        <BrochureImageThumbnail
          role="button"
          loading="lazy"
          ownerId={ownerId}
          fileId={fileId}
          dataRole={groupName}
          src={privateUrl}
          disableClick={!readonly}
          onLoadStart={handleLoadStart}
          onLoad={handleLoad}
          onError={handleError}
        />
      );
    } else if ((isAudio || isVideo) && canPlayable) {
      return (
        <RawHlsVideo
          sources={[
            {
              src: privateUrl,
              type: mimeType,
            },
          ]}
          isAudio={Boolean(isAudio)}
          poster={imagePreview?.url ?? imageUrls?.src}
          width={imagePreview?.width}
          height={imagePreview?.height}
          controls={true}
          onLoadStart={handleLoadStart}
          onLoad={handleLoad}
          onError={handleError}
        />
      );
    } else {
      return null;
    }
  }, [
    canPlayable,
    canPreview,
    fileId,
    groupName,
    handleError,
    handleLoad,
    handleLoadStart,
    imagePreview,
    imageUrls,
    isAudio,
    isImage,
    isVideo,
    mimeType,
    ownerId,
    privateUrl,
    readonly,
  ]);

  const handleResize = React.useCallback(
    width => {
      if (imagePreview) {
        setFrameSize(
          resizeForFrame(width, imagePreview.width, imagePreview.height),
        );
      }
    },
    [imagePreview],
  );

  const deleteButton = React.useMemo(() => {
    if (!readonly && (alwaysShowDeleteButton || isHovered)) {
      return (
        <DeleteButtonWrapper onClick={onClickDelete}>
          <BigDeleteButton />
        </DeleteButtonWrapper>
      );
    }
    return null;
  }, [readonly, isHovered, alwaysShowDeleteButton, onClickDelete]);

  React.useEffect(() => {
    setPlayableStatus(Boolean(canPlay(mimeType)));
  }, [mimeType]);

  if (!contents) {
    return fallbackComponent;
  }
  return (
    <ReactResizeDetector handleWidth={true} onResize={handleResize}>
      <Wrapper ref={hoverRef} overrideStyle={wrapperStyle}>
        {!disableFileTitle && <FileName>{title}</FileName>}
        <ContentsWrapper
          initialSize={frameSize}
          overrideStyle={contentWrapperStyle}
        >
          {!loadDone && imagePreview?.blurHash && frameSize && (
            <BlurHashContainer
              width={frameSize.width}
              height={frameSize.height}
            >
              <Blurhash
                hash={imagePreview?.blurHash}
                width={frameSize.width}
                height={frameSize.height}
              />
            </BlurHashContainer>
          )}
          {!loadDone && !imagePreview?.blurHash && (
            <LoadingIconWrapper>
              <LoadingIcon />
            </LoadingIconWrapper>
          )}

          {contents}
          {deleteButton}
        </ContentsWrapper>
      </Wrapper>
    </ReactResizeDetector>
  );
}

function resizeForFrame(
  frameWidth: number,
  imageWidth: number,
  imageHeight: number,
) {
  const resizedWidth = imageWidth < frameWidth ? imageWidth : frameWidth;
  const resizedHeight = parseFloat(
    (resizedWidth * (imageHeight / imageWidth)).toFixed(2),
  );

  return {
    width: resizedWidth,
    height: resizedHeight,
  };
}
