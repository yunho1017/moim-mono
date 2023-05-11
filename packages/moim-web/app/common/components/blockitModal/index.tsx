import * as React from "react";
import { useStoreState, useActions } from "app/store";
import useIsMobile from "common/hooks/useIsMobile";
import {
  ActionCreators as ReferenceBlockActionCreators,
  doBlockAction,
} from "app/actions/referenceBlock";
// components
import BlockitRenderer from "common/components/blockitEditorBase/components/blockitRenderer";
import AppBarModalLayout from "common/components/modalLayout/appbar";
import {
  Title,
  CloseButton,
  ModalBody,
  AppBarHeaderStyle,
  Dialog,
  blockWrapperStyle,
  Content,
} from "./styled";

const BlockitModal = () => {
  const {
    open,
    title,
    blocks,
    isLoading,
    botId,
    onCloseBehavior,
  } = useStoreState(state => ({
    ...state.blockitModal,
  }));

  const { setContentRef, closeModal, doBlock } = useActions({
    setContentRef: ReferenceBlockActionCreators.setBlockitModalRef,
    closeModal: ReferenceBlockActionCreators.closeBlockitModal,
    doBlock: doBlockAction,
  });
  const refModalContent = React.useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const actionClose = React.useCallback(() => {
    if (onCloseBehavior && botId) {
      doBlock({
        botId,
        data: {
          ...onCloseBehavior,
        },
      });
    }
  }, [botId, doBlock, onCloseBehavior]);

  const handleClose = React.useCallback(() => {
    if (!isLoading) {
      actionClose();
      closeModal();
    }
  }, [actionClose, closeModal, isLoading]);

  const elements = React.useMemo(
    () =>
      blocks.map((block, idx) => (
        <BlockitRenderer
          key={`blockit_modal_${block.type}_${idx}`}
          block={block}
          wrapperStyle={block.type === "form" ? blockWrapperStyle : undefined}
        />
      )),
    [blocks],
  );

  const appBarLeft = React.useMemo(
    () => isMobile && <CloseButton onClick={handleClose} />,
    [isMobile, handleClose],
  );

  const appBarRight = React.useMemo(
    () => !isMobile && <CloseButton onClick={handleClose} />,
    [isMobile, handleClose],
  );
  const titleElement = React.useMemo(() => <Title>{title}</Title>, [title]);

  React.useLayoutEffect(() => {
    setContentRef(refModalContent?.current);
  }, [setContentRef, refModalContent.current]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <AppBarModalLayout
        title={titleElement}
        modalOpenStatus={open}
        leftElement={appBarLeft}
        actionButton={appBarRight}
        headerWrapperStyle={AppBarHeaderStyle}
        customContentWrapper={ModalBody}
      >
        <Content ref={refModalContent}>{elements}</Content>
      </AppBarModalLayout>
    </Dialog>
  );
};

export default BlockitModal;
