// javascript
import React from "react";

import useOpenState from "common/hooks/useOpenState";
import { useStoreState } from "app/store";
import { postTemplateDenormalizer } from "app/models";

interface IOpenValue {
  isOpen: boolean;
  close(): void;
  open(): void;
}

interface IDeleteContextValue {
  isOpen: boolean;
  id: string | undefined;
  close(): void;
  open(id: Moim.Id): void;
}

const AddChannelTagDialogContext = React.createContext<IOpenValue>({
  isOpen: false,
  close: () => {},
  open: () => {},
});

const DeleteChannelTagAlertContext = React.createContext<IDeleteContextValue>({
  isOpen: false,
  id: undefined,
  close: () => {},
  open: () => {},
});

const DeleteTemplateAlertContext = React.createContext<IDeleteContextValue>({
  isOpen: false,
  id: undefined,
  close: () => {},
  open: () => {},
});

const PostTemplateContext = React.createContext<{
  currentPostTemplate: Moim.Forum.IPostTemplate | null;
}>({ currentPostTemplate: null });

export default function PostTemplateContextProvider({
  children,
  currentPostTemplateId,
}: React.PropsWithChildren<{ currentPostTemplateId: Moim.Id | undefined }>) {
  const { currentPostTemplate } = useStoreState(state => ({
    currentPostTemplate: currentPostTemplateId
      ? postTemplateDenormalizer(currentPostTemplateId, state.entities)
      : null,
  }));

  const {
    isOpen: addChannelTagDialogIsOpen,
    open: addChannelTagDialogOpen,
    close: addChannelTagDialogClose,
  } = useOpenState(false);

  const {
    isOpen: deleteChannelTagIsOpen,
    open: deleteChannelTagOpenBase,
    close: deleteChannelTagCloseBase,
  } = useOpenState(false);
  const [deletedChannelTagId, setDeleteChannelTagId] = React.useState<
    Moim.Id | undefined
  >();
  const deleteChannelTagOpen = React.useCallback(
    (id: Moim.Id) => {
      deleteChannelTagOpenBase();
      setDeleteChannelTagId(id);
    },
    [setDeleteChannelTagId, deleteChannelTagOpenBase],
  );
  const deleteChannelTagClose = React.useCallback(() => {
    deleteChannelTagCloseBase();
    setDeleteChannelTagId(undefined);
  }, [setDeleteChannelTagId, deleteChannelTagCloseBase]);

  const {
    isOpen: deleteTempateAlertIsOpen,
    open: deleteTempateAlertOpenBase,
    close: deleteTempateAlertCloseBase,
  } = useOpenState(false);

  const [deletedTemplateId, setDeleteTemplateId] = React.useState<
    Moim.Id | undefined
  >();
  const deleteTempateAlertOpen = React.useCallback(
    (id: Moim.Id) => {
      deleteTempateAlertOpenBase();
      setDeleteTemplateId(id);
    },
    [setDeleteTemplateId, deleteTempateAlertOpenBase],
  );

  const deleteTempateAlertClose = React.useCallback(() => {
    deleteTempateAlertCloseBase();
    setDeleteTemplateId(undefined);
  }, [setDeleteTemplateId, deleteTempateAlertCloseBase]);

  return (
    <PostTemplateContext.Provider
      value={{
        currentPostTemplate,
      }}
    >
      <AddChannelTagDialogContext.Provider
        value={{
          isOpen: addChannelTagDialogIsOpen,
          open: addChannelTagDialogOpen,
          close: addChannelTagDialogClose,
        }}
      >
        <DeleteChannelTagAlertContext.Provider
          value={{
            isOpen: deleteChannelTagIsOpen,
            id: deletedChannelTagId,
            open: deleteChannelTagOpen,
            close: deleteChannelTagClose,
          }}
        >
          <DeleteTemplateAlertContext.Provider
            value={{
              isOpen: deleteTempateAlertIsOpen,
              id: deletedTemplateId,
              open: deleteTempateAlertOpen,
              close: deleteTempateAlertClose,
            }}
          >
            {children}
          </DeleteTemplateAlertContext.Provider>
        </DeleteChannelTagAlertContext.Provider>
      </AddChannelTagDialogContext.Provider>
    </PostTemplateContext.Provider>
  );
}

export {
  AddChannelTagDialogContext,
  DeleteChannelTagAlertContext,
  DeleteTemplateAlertContext,
  PostTemplateContext,
};
