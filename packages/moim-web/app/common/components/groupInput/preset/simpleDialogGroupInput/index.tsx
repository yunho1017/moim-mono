import * as React from "react";
import isEqual from "lodash/isEqual";
import debounce from "lodash/debounce";
import { ThemeContext } from "styled-components";
import { FormattedMessage, useIntl } from "react-intl";
import isEmpty from "common/components/richEditor/helpers/isEmpty";
import { isiOS } from "common/helpers/browserDetect";
import useIsMobile from "common/hooks/useIsMobile";
import { useStoreState } from "app/store";
import useOpenState from "app/common/hooks/useOpenState";
import { fileListSelector } from "app/selectors/file";
import { CustomAppBarModalLayout } from "common/components/modalLayout";
import AppBar from "common/components/appBar";
import AlertDialog from "common/components/alertDialog";
import FreezeView from "common/components/freezeView";
import GroupInput, { IForwardRef } from "../..";
import {
  Wrapper,
  Inner,
  ButtonContainer,
  CancelButton,
  PostButton,
  Dialog,
  CloseButton,
} from "../commonDialogStyled";

interface IProps {
  id: Moim.Id;
  open: boolean;
  contents: Moim.Blockit.Blocks[];
  titleElement?: React.ReactNode;
  aboveInputElements?: React.ReactNode;
  cancelAlertMessage: string;
  postAlertMessage: string;
  uploadLoadingAlertMessage: string;
  onPost(
    contents: Moim.Blockit.Blocks[],
    files: Moim.Blockit.IFileBlock[],
  ): void;
  onCancel(): void;
  onClose(): void;
}

const SimpleDialogGroupInput: React.FC<IProps> = ({
  id,
  open,
  titleElement,
  aboveInputElements,
  contents,
  cancelAlertMessage,
  postAlertMessage,
  uploadLoadingAlertMessage,
  onPost,
  onClose,
  onCancel,
}) => {
  const refEditor = React.useRef<IForwardRef>(null);
  const intl = useIntl();
  const isMobile = useIsMobile();
  const [openCancelAlert, setOpenCancelAlert] = React.useState(false);
  const [openPostAlert, setOpenPostAlert] = React.useState(false);
  const theme = React.useContext(ThemeContext);
  const [tmpContents, setTmpContents] = React.useState<Moim.Blockit.Blocks[]>(
    contents,
  );
  const [tmpFiles, setTmpFiles] = React.useState<Moim.Blockit.IFileBlock[]>([]);

  const {
    isOpen: openUploadLoadingAlert,
    open: handleOpenUploadLoadingAlert,
    close: handleCloseUploadLoadingAlert,
  } = useOpenState();
  const { storeState } = useStoreState(s => ({ storeState: s }));

  const validToPost = React.useMemo(() => {
    if (tmpContents.length === 0) return false;
    const { isEmptyText } = isEmpty(tmpContents);
    const isEmptyFile = tmpContents.filter(i => i.type === "file").length === 0;
    return !isEqual(contents, tmpContents) && (!isEmptyFile || !isEmptyText);
  }, [contents, tmpContents]);

  const checkUploadDone = React.useCallback(() => {
    const ids = refEditor.current?.getUploadQueue();
    if (!ids) return true;
    const files = fileListSelector(storeState, ids);
    return !files
      .map(f => f?.status.name ?? "WAITING_FOR_UPLOAD")
      .some(statusName => statusName !== "AVAILABLE");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeState.entities.files, refEditor]);

  const handleOpenCancelAlert = React.useCallback(() => {
    setOpenCancelAlert(true);
  }, []);
  const handleCloseCancelAlert = React.useCallback(() => {
    setOpenCancelAlert(false);
  }, []);

  const handleOpenPostAlert = React.useCallback(() => {
    setOpenPostAlert(true);
  }, []);
  const handleClosePostAlert = React.useCallback(() => {
    setOpenPostAlert(false);
  }, []);

  const handleChange = React.useCallback(
    (_contents: Moim.Blockit.Blocks[], files: Moim.Blockit.IFileBlock[]) => {
      setTmpContents(_contents);
      setTmpFiles(files);
    },
    [],
  );

  const handleCancel = React.useCallback(() => {
    setTmpContents(contents);
    handleCloseCancelAlert();
    onCancel();
    onClose();
  }, [contents, handleCloseCancelAlert, onCancel, onClose]);

  const handleClickCancel = React.useCallback(() => {
    if (!isEqual(tmpContents, contents)) {
      handleOpenCancelAlert();
    } else {
      handleCancel();
    }
  }, [contents, handleCancel, handleOpenCancelAlert, tmpContents]);

  const debouncedPostAction = React.useCallback(
    debounce(
      (_contents: Moim.Blockit.Blocks[], _files: Moim.Blockit.IFileBlock[]) => {
        onPost(_contents, _files);
      },
      300,
    ),
    [],
  );

  const handlePost = React.useCallback(() => {
    const allUploadDone = checkUploadDone();
    if (!allUploadDone) {
      handleOpenUploadLoadingAlert();
      return;
    }
    debouncedPostAction(tmpContents, tmpFiles);
    setTmpContents([]);
    handleClosePostAlert();
    onClose();
  }, [
    checkUploadDone,
    debouncedPostAction,
    tmpContents,
    tmpFiles,
    handleClosePostAlert,
    onClose,
    handleOpenUploadLoadingAlert,
  ]);

  const handleClose = React.useCallback(() => {
    handleClickCancel();
  }, [handleClickCancel]);

  const cancelAlertButtons = React.useMemo(
    () => [
      {
        text: intl.formatMessage({ id: "cancel_button" }),
        textColor: theme.colorV2.colorSet.grey600,
        onClick: handleCloseCancelAlert,
      },
      { text: intl.formatMessage({ id: "ok_button" }), onClick: handleCancel },
    ],
    [
      handleCancel,
      handleCloseCancelAlert,
      intl,
      theme.colorV2.colorSet.grey600,
    ],
  );

  const postAlertButtons = React.useMemo(
    () => [
      {
        text: intl.formatMessage({ id: "cancel_button" }),
        textColor: theme.colorV2.colorSet.grey600,
        onClick: handleClosePostAlert,
      },
      { text: intl.formatMessage({ id: "ok_button" }), onClick: handlePost },
    ],
    [intl, theme.colorV2.colorSet.grey600, handleClosePostAlert, handlePost],
  );

  const uploadLoadingAlertButtons = React.useMemo(
    () => [
      {
        text: intl.formatMessage({ id: "ok_button" }),
        onClick: handleCloseUploadLoadingAlert,
      },
    ],
    [handleCloseUploadLoadingAlert, intl],
  );

  const appBar = React.useMemo(
    () => (
      <AppBar
        ignoreMobileTitleAlignment={true}
        leftButton={<CloseButton onClick={handleClose} />}
        titleElement={titleElement}
        titleAlignment="Center"
      />
    ),
    [handleClose, titleElement],
  );

  return (
    <>
      <Dialog open={open} fullScreen={isMobile} onClose={handleClose}>
        <CustomAppBarModalLayout appBar={appBar} hasAppBarBorder={false}>
          <FreezeView isFreeze={open} delayedFreeze={50}>
            <Wrapper>
              <Inner>
                {aboveInputElements}

                <GroupInput
                  ref={refEditor}
                  id={`simple_group_input_${id}`}
                  value={tmpContents}
                  autoFocus={!isiOS()}
                  useSaveButton={false}
                  useImageFileAttachButton={true}
                  maxAttachmentCount={50}
                  minInputLine={5}
                  onChange={handleChange}
                  onCancel={onCancel}
                  disableCreateMeeting={true}
                />
                <ButtonContainer>
                  <CancelButton onClick={handleClickCancel}>
                    <FormattedMessage id="cancel_button" />
                  </CancelButton>
                  <PostButton
                    disabled={!validToPost}
                    onClick={handleOpenPostAlert}
                  >
                    <FormattedMessage id="post_button" />
                  </PostButton>
                </ButtonContainer>
              </Inner>
            </Wrapper>
          </FreezeView>
        </CustomAppBarModalLayout>
      </Dialog>

      <AlertDialog
        open={openCancelAlert}
        content={cancelAlertMessage}
        rightButtons={cancelAlertButtons}
        onClose={handleCloseCancelAlert}
      />
      <AlertDialog
        open={openPostAlert}
        content={postAlertMessage}
        rightButtons={postAlertButtons}
        onClose={handleClosePostAlert}
      />

      <AlertDialog
        key="uploadLoadingAlert"
        open={openUploadLoadingAlert}
        content={uploadLoadingAlertMessage}
        rightButtons={uploadLoadingAlertButtons}
        onClose={handleCloseUploadLoadingAlert}
      />
    </>
  );
};

export default SimpleDialogGroupInput;
