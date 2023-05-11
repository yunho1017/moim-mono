import * as React from "react";
import { FlattenInterpolation } from "styled-components";
import { useStoreState, useActions } from "app/store";
import { ActionCreators as FileUploadActionCreators } from "app/actions/fileUpload";

export interface IProps {
  fileId: Moim.Id;
  readonly?: boolean;
  disableButtons?: boolean;
  isSmallDeleteButton?: boolean;
  alwaysShowDeleteButton?: boolean;
  cellWrapperStyle?: FlattenInterpolation<any>;
  onClickRetry?(fileId: Moim.Id): void;
  onClickDelete?(fileId: Moim.Id, e: React.MouseEvent<HTMLElement>): void;
}

export function useProps<T extends IProps>(props: T) {
  const { fileId, onClickRetry, onClickDelete } = props;
  const { file, fileOwner } = useStoreState(state => {
    const fileEntity = (state.entities.files[
      fileId
    ] as unknown) as Moim.Upload.IFileInfo;
    return {
      file: fileEntity,
      fileOwner: fileEntity ? state.entities.users[fileEntity.user] : undefined,
    };
  });
  const { deleteFile } = useActions({
    deleteFile: FileUploadActionCreators.deleteFile,
  });

  const fileTitle = React.useMemo(() => file?.title || "", [file]);
  const fileType = React.useMemo(
    () => (file?.hasOwnProperty("filetype") ? file.filetype : ""),
    [file],
  );
  const mimeType = React.useMemo(
    () => (file?.hasOwnProperty("mimetype") ? file.mimetype : ""),
    [file],
  );
  const privateUrl = React.useMemo(
    () => (file?.hasOwnProperty("url_private") ? file.url_private : ""),
    [file],
  );

  const { isUploading, isFailed } = React.useMemo(() => {
    let stateUploading = false;
    let stateFailed = false;
    const status = file?.status.name || "";
    switch (status) {
      case "WAITING_FOR_UPLOAD":
      case "TRANSFERING":
      case "QUEUED":
      case "PROCESSING": {
        stateUploading = true;
        stateFailed = false;
        break;
      }
      case "AVAILABLE": {
        stateUploading = false;
        stateFailed = false;
        break;
      }
      case "FAILED": {
        stateUploading = false;
        stateFailed = true;
        break;
      }
      default: {
        break;
      }
    }

    return {
      isUploading: stateUploading,
      isFailed: stateFailed,
    };
  }, [file]);

  const handleDelete: React.MouseEventHandler<HTMLElement> = React.useCallback(
    e => {
      onClickDelete?.(fileId, e);
      deleteFile(fileId);
    },
    [deleteFile, fileId, onClickDelete],
  );

  const handleRetry = React.useCallback(() => {
    onClickRetry?.(fileId);
  }, [fileId, onClickRetry]);

  return {
    ...props,
    file,
    fileTitle,
    fileOwner,
    fileType,
    mimeType,
    privateUrl,
    isUploading,
    isFailed,
    handleDelete,
    handleRetry,
  };
}
