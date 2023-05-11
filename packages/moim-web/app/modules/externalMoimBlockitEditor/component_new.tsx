import * as React from "react";
import styled from "styled-components";
import BlockitEditorComponent, {
  IRefHandler,
} from "app/modules/blockitEditor/component";

interface IProps {
  id: Moim.Id;
  initialBlocks: Moim.Blockit.Blocks[];
  onSendButton(content: Moim.Blockit.Blocks[]): void;
}

const EMPTY_ARRAY: any[] = [];
const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const BlockEditorComponent: React.FC<IProps> = ({
  id,
  initialBlocks,
  onSendButton,
}) => {
  const refEditor = React.useRef<IRefHandler>(null);
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const emptyFunction = React.useCallback(() => {}, []);
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const emptyDraftSaveFunction = React.useCallback(
    async (_: Moim.Blockit.Blocks[], _foo: string) => {},
    [],
  );

  const handleClickSave = React.useCallback(
    async (content: Moim.Blockit.Blocks[], _: string) => {
      onSendButton(content);
    },
    [onSendButton],
  );
  const handleClickClose = React.useCallback(() => {
    window.close();
  }, []);

  return (
    <Container>
      <BlockitEditorComponent
        id={id}
        ref={refEditor}
        isEditMode={false}
        isLoading={false}
        disableDraftButton={true}
        disableTitleInput={true}
        disableChannelSelect={true}
        disableProfile={true}
        contents={initialBlocks}
        draftCount={0}
        tagSets={EMPTY_ARRAY}
        selectedTagSetItemIds={EMPTY_ARRAY}
        onClickSave={handleClickSave}
        onClickClose={handleClickClose}
        onClickDraftDialog={emptyFunction}
        onClickSaveDraft={emptyDraftSaveFunction}
        onChangeSelectChannel={emptyFunction}
        onChangeTagItem={emptyFunction}
      />
    </Container>
  );
};

export default React.memo(BlockEditorComponent);
