import * as React from "react";
import RichEditor from "common/components/richEditor";
import { IForwardRef } from "common/components/groupInput";
import { Wrapper, Contents, Bubble } from "./styled";
import { EditModeThreadInput } from "../threadInput";

interface IProps {
  id?: Moim.Id;
  isReply?: boolean;
  editState: {
    isEditMode: boolean;
    onEnter: (
      contents: Moim.Blockit.Blocks[],
      preLinkMeeting: Moim.Meeting.IPreLinkedMeetingInfo | null,
    ) => void;
    onCancel: () => void;
  };
  contents?: Moim.Blockit.Blocks[];
}

function TextBodyComponent({ id, isReply, editState, contents }: IProps) {
  const inputRef = React.useRef<IForwardRef>(null);
  const [tmpContent, setContent] = React.useState<Moim.Blockit.Blocks[]>([]);
  const [fileBlocks, setFileBlocks] = React.useState<Moim.Blockit.IFileBlock[]>(
    (contents?.filter(content => content.type === "file") ??
      []) as Moim.Blockit.IFileBlock[],
  );

  const initialFileBlocks = React.useMemo(
    () =>
      (contents?.filter(content => content.type === "file") ??
        []) as Moim.Blockit.IFileBlock[],
    [contents],
  );
  const initialImageBlocks = React.useMemo(
    () =>
      (contents?.filter(content => content.type === "image") ??
        []) as Moim.Blockit.IImageBlock[],
    [contents],
  );

  const handleEnter = React.useCallback(() => {
    editState.onEnter(tmpContent.concat(fileBlocks), null);
    inputRef.current?.groupInputClear();
  }, [editState, fileBlocks, tmpContent]);

  const handleChange = React.useCallback(
    (_content: Moim.Blockit.Blocks[], files: Moim.Blockit.IFileBlock[]) => {
      setContent(_content);
      setFileBlocks(files);
    },
    [],
  );

  const contentsElement = React.useMemo(() => {
    const textBlocks =
      contents?.filter(content => content.type === "text") ?? [];
    return editState.isEditMode ? (
      <EditModeThreadInput
        id={`${id}_edit_mode`}
        inputRef={inputRef}
        value={textBlocks}
        fileBlocks={initialFileBlocks}
        imageBlocks={initialImageBlocks}
        onChange={handleChange}
        onEnter={handleEnter}
        onCancel={editState.onCancel}
        useSaveButton={false}
        useFileAttachButton={true}
        useImageFileAttachButton={true}
      />
    ) : (
      <RichEditor
        id={id || "thread-body"}
        readonly={true}
        contents={textBlocks}
      />
    );
  }, [
    contents,
    editState.isEditMode,
    editState.onCancel,
    handleChange,
    handleEnter,
    id,
    initialFileBlocks,
    initialImageBlocks,
  ]);

  return <Contents isReply={isReply}>{contentsElement}</Contents>;
}

export const TextBody = React.memo(TextBodyComponent);

interface ITextBubbleProps {
  id: Moim.Id;
  isSimpleMode: boolean;
  editState: {
    isEditMode: boolean;
    onEnter: (contents: Moim.Blockit.Blocks[]) => void;
    onCancel: () => void;
  };
  isReply?: boolean;
  isLoading?: boolean;
  reverse?: boolean;
  isError?: boolean;
  contents?: Moim.Blockit.Blocks[];
}

export function TextBodyBubble({
  id,
  isSimpleMode,
  isReply,
  editState,
  contents,
  reverse,
}: ITextBubbleProps) {
  const textContents = React.useMemo(() => contents ?? [], [contents]);

  if (!textContents || !textContents.length) {
    return null;
  }

  return (
    <Wrapper editMode={Boolean(editState.isEditMode)}>
      <Bubble
        isSimpleMode={isSimpleMode}
        editMode={Boolean(editState.isEditMode)}
        reverse={reverse}
      >
        <TextBody
          id={id}
          isReply={isReply}
          editState={editState}
          contents={contents}
        />
      </Bubble>
    </Wrapper>
  );
}
