import React from "react";
import produce from "immer";
import {
  AttachmentPreview,
  InnerAttachmentPreview,
  AttachmentCellWrapper,
  MeetingCellContainer,
  DeleteButton,
  ButtonWrapper,
} from "../styledComponent";
import { Media } from "common/components/designSystem";
import ImageUploadThumbnail from "common/components/imageUploadThumbnail";
import BlockitRender from "common/components/blockitEditorBase/components/blockitRenderer";

import {
  fileUpload as fileUploadAction,
  ActionCreators as fileUploadActionCreators,
} from "app/actions/fileUpload";
import { clearPreLinkMeetingData } from "app/actions/meeting";

import { useActions, useStoreState } from "app/store";
import useCancelToken from "common/hooks/useCancelToken";
import GroupInputTypes from "../type";

interface IProps {
  files: { fileId: Moim.Id; file: File }[];
  imageBlocks: GroupInputTypes.FileStatusImageBlock[];
  setFiles: React.Dispatch<
    React.SetStateAction<{ fileId: Moim.Id; file: File }[]>
  >;
  setImageBlocks: React.Dispatch<
    React.SetStateAction<GroupInputTypes.FileStatusImageBlock[]>
  >;
  setImageFileIds: React.Dispatch<React.SetStateAction<any[]>>;
}
const AttachmentElement: React.FC<IProps> = ({
  files,
  imageBlocks,
  setFiles,
  setImageBlocks,
  setImageFileIds,
}) => {
  const uploadCancelToken = useCancelToken();
  const { preLinkMeeting } = useStoreState(state => ({
    preLinkMeeting: state.meeting.preLinkMeeting,
  }));
  const {
    dispatchFileUpload,
    deleteFile,
    dispatchClearPreLinkMeetingData,
  } = useActions({
    dispatchFileUpload: fileUploadAction,
    deleteFile: fileUploadActionCreators.deleteFile,
    dispatchClearPreLinkMeetingData: clearPreLinkMeetingData,
  });

  const handleClickClearMeeting = React.useCallback(() => {
    dispatchClearPreLinkMeetingData();
  }, [dispatchClearPreLinkMeetingData]);

  const getFileIdListener = React.useCallback(
    (fileId: Moim.Id) => (newFileId: Moim.Id) => {
      setFiles(state =>
        produce(state, draft => {
          const index = draft.findIndex(data => data.fileId === fileId);
          draft[index].fileId = newFileId;
          return draft;
        }),
      );
    },
    [setFiles],
  );

  const handleFileRetryUpload = React.useCallback(
    async (fileId: Moim.Id) => {
      const fileData = files.find(data => data.fileId === fileId);
      if (fileData) {
        deleteFile(fileId);
        const filename = fileData.file.name;
        dispatchFileUpload(
          {
            title: filename,
            name: filename,
            file: fileData.file,
            cancelToken: uploadCancelToken.current.token,
          },
          getFileIdListener(fileId),
        );
      }
    },
    [
      files,
      deleteFile,
      dispatchFileUpload,
      uploadCancelToken,
      getFileIdListener,
    ],
  );

  const handleFileDeleteClick = React.useCallback(
    (fileId: Moim.Id) => {
      setFiles(state => state.filter(file => file.fileId !== fileId));
    },
    [setFiles],
  );

  const fileElement = React.useMemo(
    () =>
      files.map(file => (
        <AttachmentCellWrapper
          type="file"
          data-type="file"
          key={`attachment_file_${file.fileId}`}
        >
          <Media.MediaCell
            fileId={file.fileId}
            isSmallDeleteButton={true}
            disableButtons={true}
            alwaysShowDeleteButton={true}
            onClickRetry={handleFileRetryUpload}
            onClickDelete={handleFileDeleteClick}
          />
        </AttachmentCellWrapper>
      )),
    [files, handleFileRetryUpload, handleFileDeleteClick],
  );

  const handleImageFileDeleteClick = React.useCallback(
    (targetId: Moim.Id) => {
      const tmpImageBlock = imageBlocks[parseInt(targetId, 10)];
      setImageBlocks(base => base.filter((_, idx) => `${idx}` !== targetId));
      if (tmpImageBlock?.fileId) {
        setImageFileIds(base =>
          base.filter(({ id: _id }) => _id !== tmpImageBlock.fileId),
        );
      }
    },
    [imageBlocks, setImageBlocks, setImageFileIds],
  );

  const imageElement = React.useMemo(
    () =>
      imageBlocks.map((uploadData, idx) => (
        <AttachmentCellWrapper
          type="image"
          data-type="image"
          key={`attachment_image_file_${idx}`}
        >
          <ImageUploadThumbnail
            id={`${idx}`}
            payload={uploadData}
            isLoading={
              Boolean(uploadData?.src)
                ? false
                : uploadData?.status?.name !== "AVAILABLE"
            }
            onRemoveClick={handleImageFileDeleteClick}
          />
        </AttachmentCellWrapper>
      )),
    [imageBlocks, handleImageFileDeleteClick],
  );

  const meetingElement = React.useMemo(
    () =>
      preLinkMeeting ? (
        <AttachmentCellWrapper
          type="file"
          key={`attachment_meeting_${preLinkMeeting.id}`}
        >
          <MeetingCellContainer>
            <BlockitRender
              block={{
                type: "meeting",
                name: preLinkMeeting.name,
                meetingId: preLinkMeeting.id,
                previewAttendees: [],
                status: "open",
                attendeesCount: 0,
                blocks: [],
                margin: { top: 0, left: 0, right: 0, bottom: 0 },
              }}
            />
            <ButtonWrapper>
              <DeleteButton onClick={handleClickClearMeeting} />
            </ButtonWrapper>
          </MeetingCellContainer>
        </AttachmentCellWrapper>
      ) : null,
    [handleClickClearMeeting, preLinkMeeting],
  );

  if (fileElement.length > 0 || imageBlocks.length > 0 || meetingElement) {
    return (
      <AttachmentPreview>
        <InnerAttachmentPreview>
          {fileElement}
          {imageElement}
          {meetingElement}
        </InnerAttachmentPreview>
      </AttachmentPreview>
    );
  }
  return null;
};
export default React.memo(AttachmentElement);
