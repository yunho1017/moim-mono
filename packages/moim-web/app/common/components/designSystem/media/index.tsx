import * as React from "react";
import { FlattenInterpolation } from "styled-components";
import { IProps, useProps } from "./hooks";

import MediaPreviewComponent from "./preview";
import MediaCellComponent from "./cell";

export const MediaCell: React.FC<IProps> = props => {
  const {
    fileId,
    disableButtons,
    isSmallDeleteButton,
    fileTitle,
    fileType,
    mimeType,
    privateUrl,
    isUploading,
    isFailed,
    readonly,
    handleDelete,
    handleRetry,
    cellWrapperStyle,
    alwaysShowDeleteButton,
  } = useProps(props);

  return (
    <MediaCellComponent
      key={fileId}
      title={fileTitle}
      fileType={fileType}
      mimeType={mimeType}
      privateUrl={privateUrl}
      isUploading={isUploading}
      isFailed={isFailed}
      disableButtons={disableButtons}
      alwaysShowDeleteButton={alwaysShowDeleteButton}
      isSmallDeleteButton={isSmallDeleteButton}
      disableDeleteButton={readonly}
      wrapperStyle={cellWrapperStyle}
      onClickRetry={handleRetry}
      onClickDelete={handleDelete}
    />
  );
};

interface IPreviewProps extends IProps {
  disableFileTitle?: boolean;
  groupName?: string;
  previewWrapperStyle?: FlattenInterpolation<any>;
  previewContentWrapperStyle?: FlattenInterpolation<any>;
}

export const MediaPreview: React.FC<IPreviewProps> = props => {
  const {
    file,
    fileId,
    readonly,
    disableButtons,
    isSmallDeleteButton,
    fileTitle,
    fileOwner,
    fileType,
    mimeType,
    privateUrl,
    isUploading,
    isFailed,
    handleDelete,
    handleRetry,
    disableFileTitle,
    cellWrapperStyle,
    previewWrapperStyle,
    previewContentWrapperStyle,
    alwaysShowDeleteButton,
    groupName,
  } = useProps(props);
  const fallbackComponent = React.useMemo(
    () => (
      <MediaCellComponent
        key={fileId}
        title={fileTitle}
        fileType={fileType}
        mimeType={mimeType}
        privateUrl={privateUrl}
        isUploading={isUploading}
        isFailed={isFailed}
        disableButtons={disableButtons}
        alwaysShowDeleteButton={alwaysShowDeleteButton}
        isSmallDeleteButton={isSmallDeleteButton}
        disableDeleteButton={readonly}
        wrapperStyle={cellWrapperStyle}
        onClickRetry={handleRetry}
        onClickDelete={handleDelete}
      />
    ),
    [
      fileId,
      fileTitle,
      fileType,
      mimeType,
      privateUrl,
      isUploading,
      isFailed,
      disableButtons,
      alwaysShowDeleteButton,
      isSmallDeleteButton,
      readonly,
      cellWrapperStyle,
      handleRetry,
      handleDelete,
    ],
  );

  if (!file || !fileOwner) {
    return fallbackComponent;
  }

  return (
    <MediaPreviewComponent
      readonly={readonly}
      user={fileOwner}
      fileId={fileId}
      title={fileTitle}
      groupName={groupName}
      mimeType={mimeType}
      privateUrl={privateUrl}
      imagePreview={file.image_preview}
      imageUrls={file.image_urls}
      disableFileTitle={disableFileTitle}
      alwaysShowDeleteButton={alwaysShowDeleteButton}
      fallbackComponent={fallbackComponent}
      wrapperStyle={previewWrapperStyle}
      contentWrapperStyle={previewContentWrapperStyle}
      onClickDelete={handleDelete}
    />
  );
};
