import * as React from "react";
import isEqual from "lodash/isEqual";
import debounce from "lodash/debounce";
import { FormattedMessage, useIntl } from "react-intl";
import { ThemeContext } from "styled-components";
import { CustomAppBarModalLayout } from "common/components/modalLayout";
import AppBar from "common/components/appBar";
import AlertDialog from "common/components/alertDialog";
import FreezeView from "common/components/freezeView";
import GroupInput, { IForwardRef } from "../..";
import RequiredMark from "common/components/requiredMark";
import {
  CancelButton,
  PostButton,
  Dialog,
  CloseButton,
} from "../commonDialogStyled";
import {
  Rating,
  Wrapper,
  Inner,
  ButtonContainer,
  SelectProductContainer,
  Title,
  RatingWrapper,
  RatingValueLabel,
} from "./styled";
import { Spacer } from "common/components/designSystem/spacer";
import SelectedProduct from "./components/selectedProduct";
import ReviewReward from "./components/reviewReward";

import { useStoreState } from "app/store";
import useIsMobile from "app/common/hooks/useIsMobile";
import useOpenState from "app/common/hooks/useOpenState";
import { fileListSelector } from "app/selectors/file";
import isEmpty from "common/components/richEditor/helpers/isEmpty";

interface IProps {
  mode?: "new" | "edit";
  id: Moim.Id;
  open: boolean;
  meta: Moim.Forum.IProductReviewThreadMeta | undefined;
  contents: Moim.Blockit.Blocks[];
  disableRate?: boolean;
  titleElement?: React.ReactNode;
  rate?: number;
  cancelAlertMessage: string;
  postAlertMessage: string;
  uploadLoadingAlertMessage: string;
  onPost(
    contents: Moim.Blockit.Blocks[],
    files: Moim.Blockit.IFileBlock[],
    rate: number
  ): void;
  onCancel(): void;
  onClose(): void;
}

const ReviewDialogGroupInput: React.FC<IProps> = ({
  open,
  meta,
  disableRate,
  titleElement,
  contents,
  cancelAlertMessage,
  postAlertMessage,
  uploadLoadingAlertMessage,
  rate,
  onPost,
  onClose,
  onCancel,
}) => {
  const refEditor = React.useRef<IForwardRef>(null);
  const intl = useIntl();
  const isMobile = useIsMobile();
  const theme = React.useContext(ThemeContext);
  const [openCancelAlert, setOpenCancelAlert] = React.useState(false);
  const [openPostAlert, setOpenPostAlert] = React.useState(false);
  const [rating, setRating] = React.useState<number>(rate ?? 0);
  const [hoverRating, setHoverRating] = React.useState<number | null>(null);
  const [tmpContents, setTmpContents] = React.useState<Moim.Blockit.Blocks[]>(
    contents
  );
  const [tmpFiles, setTmpFiles] = React.useState<Moim.Blockit.IFileBlock[]>([]);
  const {
    isOpen: openUploadLoadingAlert,
    open: handleOpenUploadLoadingAlert,
    close: handleCloseUploadLoadingAlert,
  } = useOpenState();
  const { storeState } = useStoreState((s) => ({ storeState: s }));

  const isEmptyContent = React.useMemo(() => {
    const { isEmptyText } = isEmpty(tmpContents);
    return isEmptyText;
  }, [tmpContents]);

  const validToPost = React.useMemo(() => {
    if (disableRate) {
      return !isEmptyContent;
    } else {
      return rating > 0 && !isEmptyContent;
    }
  }, [disableRate, isEmptyContent, rating]);

  const checkUploadDone = React.useCallback(() => {
    const ids = refEditor.current?.getUploadQueue();
    if (!ids) return true;
    const files = fileListSelector(storeState, ids);
    return !files
      .filter((f) => Boolean(f))
      .map((f) => f?.status.name ?? "WAITING_FOR_UPLOAD")
      .some((statusName) => statusName !== "AVAILABLE");
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
    []
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

  const handlePost = React.useCallback(
    debounce(() => {
      const allUploadDone = checkUploadDone();
      if (!allUploadDone) {
        handleClosePostAlert();
        handleOpenUploadLoadingAlert();
        return;
      }
      onPost(tmpContents, tmpFiles, rating);
      setTmpContents([]);
      handleClosePostAlert();
      onClose();
    }, 300),
    [
      checkUploadDone,
      handleOpenUploadLoadingAlert,
      handleClosePostAlert,
      onClose,
      onPost,
      rating,
      tmpContents,
      tmpFiles,
    ]
  );

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
    [handleCancel, handleCloseCancelAlert, theme, intl]
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
    [handlePost, handleClosePostAlert, theme, intl]
  );

  const uploadLoadingAlertButtons = React.useMemo(
    () => [
      {
        text: intl.formatMessage({ id: "ok_button" }),
        onClick: handleCloseUploadLoadingAlert,
      },
    ],
    [handleCloseUploadLoadingAlert, intl]
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
    [handleClose, titleElement]
  );

  const handleChangeRating = React.useCallback(
    (_: React.ChangeEvent, newValue: number | null) => {
      setRating(newValue ?? 0);
      setHoverRating(null);
    },
    []
  );

  const handleChangeActiveRating = React.useCallback(
    (_: React.ChangeEvent, newValue: number) => {
      setHoverRating(newValue > -1 ? newValue : null);
    },
    []
  );

  return (
    <>
      <Dialog
        key="reviewCreateDialog"
        open={open}
        fullScreen={isMobile}
        onClose={handleClose}
      >
        <CustomAppBarModalLayout appBar={appBar} hasAppBarBorder={false}>
          <FreezeView isFreeze={open} delayedFreeze={50}>
            <Wrapper data-scroll-lock-scrollable>
              {meta?.purchaseItemSnap && (
                <SelectProductContainer>
                  <SelectedProduct
                    productId={meta.purchaseItemSnap.productId}
                    productName={meta.purchaseItemSnap.productName}
                    image={meta.purchaseItemSnap.productImage?.mobile}
                  />
                </SelectProductContainer>
              )}
              {!disableRate ? (
                <>
                  <Title>
                    <FormattedMessage id="write_review_rate_title" />
                    <RequiredMark />
                  </Title>
                  <RatingWrapper>
                    <Rating
                      precision={1}
                      readOnly={false}
                      value={rating}
                      size="large"
                      onChange={handleChangeRating}
                      onChangeActive={handleChangeActiveRating}
                    />
                  </RatingWrapper>
                  <RatingValueLabel>
                    {hoverRating ?? rating} / 5
                  </RatingValueLabel>
                </>
              ) : null}

              <Spacer value={16} />

              <Title>
                <FormattedMessage id="write_review_editor_title" />
                <RequiredMark />
              </Title>

              <ReviewReward />

              <Spacer value={12} />

              <Inner>
                <GroupInput
                  ref={refEditor}
                  id="createReviewDialog"
                  placeholder={intl.formatMessage({
                    id: "write_review_editor_placeholder",
                  })}
                  value={tmpContents}
                  maxAttachmentCount={50}
                  minInputLine={3}
                  autoFocus={false}
                  useSaveButton={false}
                  useImageFileAttachButton={true}
                  onChange={handleChange}
                  onCancel={onCancel}
                  disableCreateMeeting={true}
                />
              </Inner>

              <ButtonContainer>
                <CancelButton onClick={handleClickCancel}>
                  <FormattedMessage id="button_cancel" />
                </CancelButton>
                <PostButton
                  disabled={!validToPost}
                  onClick={handleOpenPostAlert}
                >
                  <FormattedMessage id="button_save" />
                </PostButton>
              </ButtonContainer>
            </Wrapper>
          </FreezeView>
        </CustomAppBarModalLayout>
      </Dialog>

      <AlertDialog
        key="cancelAlert"
        open={openCancelAlert}
        content={cancelAlertMessage}
        rightButtons={cancelAlertButtons}
        onClose={handleCloseCancelAlert}
      />
      <AlertDialog
        key="postAlert"
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

export default ReviewDialogGroupInput;
