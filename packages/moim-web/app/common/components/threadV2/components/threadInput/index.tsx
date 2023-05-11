import * as React from "react";
import styled from "styled-components";
import GroupInput, { IForwardRef } from "common/components/groupInput";
import EditModeThreadInput from "./editMode";

export { EditModeThreadInput };
const Wrapper = styled.div``;

interface IProps {
  id: Moim.Id;
  groupId?: string;
  ref?: React.Ref<HTMLDivElement>;
  inputRef?: React.RefObject<IForwardRef>;
  placeholder?: string;
  autoFocus?: boolean;
  resizeDetectWidth?: boolean;
  resizeDetectHeight?: boolean;
  value?: Moim.Blockit.Blocks[];
  useSaveButton?: boolean;
  maxAttachmentCount?: number;
  useFileAttachButton?: boolean;
  useImageFileAttachButton?: boolean;
  disableMention?: boolean;
  disableMentionPortal?: boolean;
  disableCreateMeeting?: boolean;
  disableImageBlockUpload?: boolean;
  mentionPortalContainer?: HTMLElement | null;
  fileBlocks?: Moim.Blockit.IFileBlock[];
  imageBlocks?: Moim.Blockit.IImageBlock[];
  onEnter: (
    contents: Moim.Blockit.Blocks[],
    preLinkMeeting: Moim.Meeting.IPreLinkedMeetingInfo | null,
  ) => void;
  onChange?(
    contents: Moim.Blockit.Blocks[],
    files: Moim.Blockit.IFileBlock[],
  ): void;
  onResize?(width: number, height: number): void;
  onFocus?(): void;
  onCancel?(): void;
  onBlur?(): void;
}

const ThreadInput = React.forwardRef<HTMLDivElement, IProps>(
  (
    {
      id,
      groupId,
      placeholder,
      autoFocus,
      inputRef,
      value,
      resizeDetectWidth,
      resizeDetectHeight,
      mentionPortalContainer,
      maxAttachmentCount,
      useSaveButton,
      useFileAttachButton,
      useImageFileAttachButton,
      disableMention,
      disableMentionPortal,
      disableCreateMeeting,
      disableImageBlockUpload,
      fileBlocks,
      imageBlocks,
      onEnter: handleEnter,
      onChange,
      onResize,
      onFocus,
      onBlur,
      onCancel,
    },
    ref,
  ) => (
    <Wrapper ref={ref}>
      <GroupInput
        id={id}
        ref={inputRef}
        placeholder={placeholder}
        autoFocus={autoFocus}
        value={value}
        groupId={groupId}
        resizeDetectWidth={resizeDetectWidth}
        resizeDetectHeight={resizeDetectHeight}
        mentionPortalContainer={mentionPortalContainer}
        maxAttachmentCount={maxAttachmentCount}
        useSaveButton={useSaveButton}
        useFileAttachButton={useFileAttachButton}
        useImageFileAttachButton={useImageFileAttachButton}
        disableMention={disableMention}
        disableMentionPortal={disableMentionPortal}
        disableCreateMeeting={disableCreateMeeting}
        disableImageBlockUpload={disableImageBlockUpload}
        fileBlocks={fileBlocks}
        imageBlocks={imageBlocks}
        onEnter={handleEnter}
        onChange={onChange}
        onResize={onResize}
        onFocus={onFocus}
        onBlur={onBlur}
        onCancel={onCancel}
      />
    </Wrapper>
  ),
);

export default ThreadInput;
