import * as React from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import { useStoreState } from "app/store";
import useOpenState from "app/common/hooks/useOpenState";
import { fileListSelector } from "app/selectors/file";
import AlertDialog from "common/components/alertDialog";
import { px2rem } from "common/helpers/rem";
import {
  GhostGeneralButton,
  FlatButton,
} from "common/components/designSystem/buttons";
import ThreadInput from ".";

const Wrapper = styled.div`
  width: 100%;
`;
const BottomButtonWrapper = styled.div`
  width: 100%;
  margin-top: ${px2rem(8)};

  & > * + * {
    margin-left: ${px2rem(8)};
  }
`;

interface IProps extends React.ComponentProps<typeof ThreadInput> {
  onCancel(): void;
}

export default function EditModeThreadInput({
  id,
  ref,
  inputRef,
  placeholder,
  resizeDetectWidth,
  resizeDetectHeight,
  value,
  useFileAttachButton,
  useImageFileAttachButton,
  useSaveButton,
  fileBlocks,
  imageBlocks,
  onChange,
  onEnter,
  onResize,
  onFocus,
  onBlur,
  onCancel,
}: IProps) {
  const {
    isOpen: openUploadLoadingAlert,
    open: handleOpenUploadLoadingAlert,
    close: handleCloseUploadLoadingAlert,
  } = useOpenState();
  const { storeState } = useStoreState(s => ({ storeState: s }));

  const checkUploadDone = React.useCallback(() => {
    const ids = inputRef?.current?.getUploadQueue();
    if (!ids) return true;
    const files = fileListSelector(storeState, ids);
    return !files
      .map(f => f?.status.name ?? "WAITING_FOR_UPLOAD")
      .some(statusName => statusName !== "AVAILABLE");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeState.entities.files, inputRef]);

  const handleClickEnterButton = React.useCallback(() => {
    if (!checkUploadDone()) {
      handleOpenUploadLoadingAlert();
      return;
    }
    const content = inputRef?.current?.getContent();
    if (content) {
      onEnter(content, null);
      inputRef?.current?.groupInputClear();
    }
  }, [checkUploadDone, handleOpenUploadLoadingAlert, inputRef, onEnter]);

  const uploadLoadingAlertButtons = React.useMemo(
    () => [
      {
        text: <FormattedMessage id="ok_button" />,
        onClick: handleCloseUploadLoadingAlert,
      },
    ],
    [handleCloseUploadLoadingAlert],
  );

  return (
    <>
      <Wrapper>
        <ThreadInput
          id={id}
          ref={ref}
          inputRef={inputRef}
          placeholder={placeholder}
          resizeDetectWidth={resizeDetectWidth}
          resizeDetectHeight={resizeDetectHeight}
          value={value}
          fileBlocks={fileBlocks}
          imageBlocks={imageBlocks}
          maxAttachmentCount={50}
          useSaveButton={useSaveButton}
          useFileAttachButton={useFileAttachButton}
          useImageFileAttachButton={useImageFileAttachButton}
          onChange={onChange}
          onEnter={onEnter}
          onResize={onResize}
          onFocus={onFocus}
          onBlur={onBlur}
          onCancel={onCancel}
        />
        <BottomButtonWrapper>
          <GhostGeneralButton size="s" onClick={onCancel}>
            <FormattedMessage id="cancel_button" />
          </GhostGeneralButton>
          <FlatButton size="s" onClick={handleClickEnterButton}>
            <FormattedMessage id="save_changes_button" />
          </FlatButton>
        </BottomButtonWrapper>
      </Wrapper>

      <AlertDialog
        key="uploadLoadingAlert"
        open={openUploadLoadingAlert}
        content={
          <FormattedMessage id="thread_v2_input_upload_working_alert_body" />
        }
        rightButtons={uploadLoadingAlertButtons}
        onClose={handleCloseUploadLoadingAlert}
      />
    </>
  );
}
