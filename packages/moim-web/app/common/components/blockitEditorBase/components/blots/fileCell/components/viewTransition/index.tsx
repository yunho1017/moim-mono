import * as React from "react";
import { useStoreState } from "app/store";
import { MediaCell, MediaPreview } from "common/components/designSystem/media";
import {
  FileCellWrapperStyle,
  FilePreviewWrapperStyle,
  FilePreviewContentWrapperStyle,
  FilePreviewFullWidthContentWrapperStyle,
} from "../../styled";

interface IProps {
  fileId: Moim.Id;
  originalFile: File;
  readonly?: boolean;
  groupName?: string; // NOTE: for brochureImage grouping
  previewForceFullWidth?: boolean;
  onFileRetry(fileId: Moim.Id, file: File): void;
  onFileDelete(fileId: Moim.Id): void;
}

const ViewTransition: React.FC<IProps> = ({
  fileId,
  originalFile,
  readonly,
  groupName,
  previewForceFullWidth,
  onFileDelete,
  onFileRetry,
}) => {
  const file = useStoreState(state => state.entities.files[fileId]);

  const handleFileRetry = React.useCallback(() => {
    onFileRetry(fileId, originalFile);
  }, [fileId, onFileRetry, originalFile]);

  const previewStyle = React.useMemo(
    () =>
      previewForceFullWidth
        ? FilePreviewFullWidthContentWrapperStyle
        : FilePreviewContentWrapperStyle,
    [previewForceFullWidth],
  );

  const handleFileDelete = React.useCallback(
    (fileIdParam: Moim.Id) => {
      onFileDelete(fileIdParam);
    },
    [onFileDelete],
  );

  if (!file) {
    return null;
  }

  switch (file.status.name) {
    case "WAITING_FOR_UPLOAD":
    case "QUEUED":
    case "TRANSFERING":
    case "PROCESSING":
    case "FAILED": {
      // render file cell
      return (
        <MediaCell
          readonly={readonly}
          fileId={fileId}
          disableButtons={true}
          alwaysShowDeleteButton={!readonly}
          cellWrapperStyle={FileCellWrapperStyle}
          onClickDelete={handleFileDelete}
          onClickRetry={handleFileRetry}
        />
      );
    }
    case "AVAILABLE": {
      return (
        <MediaPreview
          groupName={groupName}
          fileId={fileId}
          readonly={readonly}
          disableButtons={!readonly}
          disableFileTitle={true}
          cellWrapperStyle={FileCellWrapperStyle}
          alwaysShowDeleteButton={!readonly}
          previewWrapperStyle={FilePreviewWrapperStyle}
          previewContentWrapperStyle={previewStyle}
          onClickDelete={handleFileDelete}
          onClickRetry={handleFileRetry}
        />
      );
    }
  }
};

export default React.memo(ViewTransition);
