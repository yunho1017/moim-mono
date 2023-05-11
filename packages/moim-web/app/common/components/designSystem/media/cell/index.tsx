import * as React from "react";
import { FlattenInterpolation } from "styled-components";
import {
  Wrapper,
  LoadingSpinnerWrapper,
  Thumbnail,
  FileInfo,
  FileName,
  FileType,
  ButtonSection,
  DownloadButton,
  DownloadIconButton,
  RetryButton,
  DeleteButton,
  DeleteButtonWrapper,
  SmallDeleteButton,
  BigDeleteButton,
} from "./styled";
import ThumbnailIcon from "./components/thumbnailIcon";
import { LinearLoading } from "common/components/loading";
import useHover from "app/common/hooks/useHover";

interface IProps {
  title: string;
  fileType: string;
  mimeType: string;
  privateUrl: string;
  isUploading: boolean;
  isFailed: boolean;
  wrapperStyle?: FlattenInterpolation<any>;
  disableDeleteButton?: boolean;
  disableButtons?: boolean;
  isSmallDeleteButton?: boolean;
  alwaysShowDeleteButton?: boolean;
  onClickDelete: React.MouseEventHandler;
  onClickRetry(): void;
}

export default function MediaCellComponent({
  title,
  mimeType,
  fileType,
  privateUrl,
  isUploading,
  isFailed,
  disableButtons,
  isSmallDeleteButton,
  wrapperStyle,
  disableDeleteButton,
  alwaysShowDeleteButton,
  onClickRetry,
  onClickDelete,
}: IProps) {
  const enableOverlay = React.useMemo(() => isUploading || isFailed, [
    isUploading,
    isFailed,
  ]);

  const [hoverRef, isHovered] = useHover<HTMLDivElement>();
  const loadingElement = React.useMemo(
    () =>
      isUploading ? (
        <LoadingSpinnerWrapper>
          <LinearLoading />
        </LoadingSpinnerWrapper>
      ) : null,
    [isUploading],
  );

  const buttonElement = React.useMemo(() => {
    let buttons = [
      <DownloadButton
        key="download_button"
        resourceUrl={privateUrl}
        fileName={title}
      >
        <DownloadIconButton />
      </DownloadButton>,
    ];
    if (isUploading || disableButtons) {
      buttons = [];
    }
    if (isFailed) {
      buttons = [<RetryButton key="retry_button" onClick={onClickRetry} />];
      if (!disableDeleteButton) {
        buttons.push(
          <DeleteButton key="delete_button" onClick={onClickDelete} />,
        );
      }
    }
    return buttons;
  }, [
    privateUrl,
    title,
    isUploading,
    disableButtons,
    isFailed,
    onClickRetry,
    disableDeleteButton,
    onClickDelete,
  ]);

  const deleteButton = React.useMemo(() => {
    if (disableDeleteButton) {
      return null;
    }
    const element = isSmallDeleteButton ? (
      <SmallDeleteButton />
    ) : (
      <BigDeleteButton />
    );
    return (
      (alwaysShowDeleteButton || (isHovered && !isFailed)) && (
        <DeleteButtonWrapper
          isSmallDeleteButton={isSmallDeleteButton}
          onClick={onClickDelete}
        >
          {element}
        </DeleteButtonWrapper>
      )
    );
  }, [
    alwaysShowDeleteButton,
    disableDeleteButton,
    isSmallDeleteButton,
    onClickDelete,
    isHovered,
    isFailed,
  ]);

  return (
    <Wrapper
      ref={hoverRef}
      isDisabled={enableOverlay}
      overrideStyle={wrapperStyle}
    >
      {loadingElement}
      <Thumbnail>
        <ThumbnailIcon mimeType={mimeType} src={privateUrl} />
      </Thumbnail>
      <FileInfo>
        <FileName>{title}</FileName>
        <FileType>{fileType}</FileType>
      </FileInfo>
      <ButtonSection>{buttonElement}</ButtonSection>
      {deleteButton}
    </Wrapper>
  );
}
