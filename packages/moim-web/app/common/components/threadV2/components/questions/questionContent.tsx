import * as React from "react";
import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { EditModeThreadInput } from "../threadInput";
import RichEditor from "common/components/richEditor";
import { IForwardRef } from "common/components/groupInput";
import MultiImage from "../../components/media/multiImage";
import { Spacer } from "common/components/designSystem/spacer";
import {
  H9BoldStyle, // question
  B3RegularStyle, // answer
} from "common/components/designSystem/typos";

const Content = styled.div<{ type: "question" | "answer" }>`
  width: 100%;
  height: 100%;
  margin: ${px2rem(2)} 0;

  .ql-container {
    color: ${props => props.theme.colorV2.colorSet.grey800};
    ${props => (props.type === "question" ? H9BoldStyle : B3RegularStyle)}
    line-height: ${px2rem(24)};
  }

  .ql-editor {
    p {
      padding: 0 !important;
    }
  }
`;

interface IProps {
  type: "question" | "answer";
  contents: Moim.Blockit.Blocks[];
  editState: {
    isEditMode: boolean;
    onEnter: (
      contents: Moim.Blockit.Blocks[],
      preLinkMeeting: Moim.Meeting.IPreLinkedMeetingInfo | null,
    ) => void;
    onCancel: () => void;
  };
  id?: Moim.Id;
}

const QuestionContent: React.FC<IProps> = ({
  type,
  contents,
  editState,
  id,
}) => {
  const inputRef = React.useRef<IForwardRef>(null);
  const [tmpContent, setContent] = React.useState<Moim.Blockit.Blocks[]>([]);
  const [fileBlocks, setFileBlocks] = React.useState<Moim.Blockit.IFileBlock[]>(
    (contents?.filter(content => content.type === "file") ??
      []) as Moim.Blockit.IFileBlock[],
  );

  const textBlocks = React.useMemo(
    () => contents?.filter(content => content.type === "text") ?? [],
    [contents],
  );

  const initialImageBlocks = React.useMemo(
    () =>
      contents?.filter<Moim.Blockit.IImageBlock>(
        ((blk: Moim.Blockit.Blocks) => blk.type === "image") as any,
      ) ?? [],
    [contents],
  );

  const initialFileBlocks = React.useMemo(
    () =>
      (contents?.filter(content => content.type === "file") ??
        []) as Moim.Blockit.IFileBlock[],
    [contents],
  );

  const handleEnter = React.useCallback(() => {
    editState.onEnter(tmpContent.concat(fileBlocks), null);
    inputRef.current?.groupInputClear();
  }, [editState, fileBlocks, tmpContent]);

  const handleCancel = React.useCallback(() => {
    editState.onCancel();
  }, [editState]);

  const handleChange = React.useCallback(
    (_content: Moim.Blockit.Blocks[], files: Moim.Blockit.IFileBlock[]) => {
      setContent(_content);
      setFileBlocks(files);
    },
    [],
  );

  return (
    <>
      {initialImageBlocks.length > 0 && !Boolean(editState.isEditMode) && (
        <>
          <Spacer value={8} />
          <MultiImage
            parentId={id || "question-answer-content"}
            images={initialImageBlocks.map(imgBlock => ({
              fileId: imgBlock.fileId,
              url: imgBlock.src,
              blurhash: imgBlock.blurHash,
              fallbackSrc: imgBlock.fallbackSrc,
              srcSet: imgBlock.srcSet,
            }))}
          />
          <Spacer value={8} />
        </>
      )}
      <Content type={type}>
        {editState.isEditMode ? (
          <EditModeThreadInput
            id={`${id}_edit_mode`}
            inputRef={inputRef}
            value={textBlocks}
            fileBlocks={initialFileBlocks}
            imageBlocks={initialImageBlocks}
            onChange={handleChange}
            onEnter={handleEnter}
            onCancel={handleCancel}
            useSaveButton={false}
            useFileAttachButton={true}
            useImageFileAttachButton={true}
          />
        ) : (
          <RichEditor
            id={id || "question-answer-content"}
            readonly={true}
            contents={textBlocks}
          />
        )}
      </Content>
    </>
  );
};

export default QuestionContent;
