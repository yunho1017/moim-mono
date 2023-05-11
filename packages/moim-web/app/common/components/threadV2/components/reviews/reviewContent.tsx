import * as React from "react";
import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import {
  pB2RegularStyle,
  H9BoldStyle,
} from "common/components/designSystem/typos";
import { useSingleLineStyle } from "common/components/designSystem/styles";
import RichEditor from "common/components/richEditor";
import { IForwardRef } from "common/components/groupInput";
import MultiImage from "../../components/media/multiImage";
import { Spacer } from "common/components/designSystem/spacer";
import { EditModeThreadInput } from "../threadInput";

const Wrapper = styled.div`
  width: 100%;
  height: fit-content;
`;

const Title = styled.input`
  width: 100%;
  border: none;
  outline: none;
  background: none;
  color: ${props => props.theme.colorV2.colorSet.grey800};
  margin: ${px2rem(2)} 0;
  ${H9BoldStyle};
  ${useSingleLineStyle}

  ${props =>
    !props.readOnly &&
    css`
      padding: ${px2rem(4)} ${px2rem(16)};
      border-radius: ${px2rem(4)};
      background-color: ${props.theme.colorV2.colorSet.white1000};
      border: 1px solid ${props.theme.colorV2.colorSet.grey200};
    `};
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  margin: ${px2rem(2)} 0;

  .ql-container {
    color: ${props => props.theme.colorV2.colorSet.grey800};
    ${pB2RegularStyle}
    line-height: ${px2rem(24)};
  }

  .ql-editor {
    p {
      padding: 0 !important;
    }
  }
`;

interface IProps {
  title: string;
  editState: {
    isEditMode: boolean;
    onEnter: (
      title: string,
      contents: Moim.Blockit.Blocks[],
      preLinkMeeting: Moim.Meeting.IPreLinkedMeetingInfo | null,
    ) => void;
    onCancel: () => void;
  };
  id?: Moim.Id;
  contents?: Moim.Blockit.Blocks[];
}

const ReviewContent: React.FC<IProps> = ({
  id,
  title,
  contents,
  editState,
}) => {
  const inputRef = React.useRef<IForwardRef>(null);
  const [tmpTitle, setTmpTitle] = React.useState(title);
  const [tmpContent, setContent] = React.useState<Moim.Blockit.Blocks[]>([]);
  const [fileBlocks, setFileBlocks] = React.useState<Moim.Blockit.IFileBlock[]>(
    (contents?.filter(content => content.type === "file") ??
      []) as Moim.Blockit.IFileBlock[],
  );

  const textBlocks = React.useMemo(
    () => contents?.filter(content => content.type === "text") ?? [],
    [contents],
  );

  const initialFileBlocks = React.useMemo(
    () =>
      (contents?.filter(content => content.type === "file") ??
        []) as Moim.Blockit.IFileBlock[],
    [contents],
  );

  const initialImageBlocks = React.useMemo(
    () =>
      contents?.filter<Moim.Blockit.IImageBlock>(
        ((blk: Moim.Blockit.Blocks) => blk.type === "image") as any,
      ) ?? [],
    [contents],
  );

  const handleChangeTitle: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    e => {
      setTmpTitle(e.currentTarget.value);
    },
    [],
  );

  const handleEnter = React.useCallback(() => {
    editState.onEnter(
      tmpTitle,
      tmpContent.concat(fileBlocks).concat(fileBlocks),
      null,
    );
    inputRef.current?.groupInputClear();
  }, [editState, fileBlocks, tmpContent, tmpTitle]);

  const handleChangeContent = React.useCallback(
    (_content: Moim.Blockit.Blocks[], files: Moim.Blockit.IFileBlock[]) => {
      setContent(_content);
      setFileBlocks(files);
    },
    [],
  );

  const handleCancel = React.useCallback(() => {
    setTmpTitle(title);
    editState.onCancel();
  }, [editState, title]);

  const titleElement = React.useMemo(
    () =>
      title && (
        <Title
          type="text"
          readOnly={!editState.isEditMode}
          onChange={handleChangeTitle}
          value={tmpTitle}
        />
      ),
    [editState.isEditMode, handleChangeTitle, title, tmpTitle],
  );

  const contentElement = React.useMemo(() => {
    if (editState.isEditMode) {
      return (
        <EditModeThreadInput
          id={`${id}_edit_mode`}
          inputRef={inputRef}
          value={textBlocks}
          fileBlocks={initialFileBlocks}
          onChange={handleChangeContent}
          onEnter={handleEnter}
          onCancel={handleCancel}
          useSaveButton={false}
          useFileAttachButton={true}
        />
      );
    } else {
      if (textBlocks.length === 0) {
        return null;
      }
      return (
        <Content>
          <RichEditor
            id={id || "review-content"}
            readonly={true}
            contents={textBlocks}
          />
        </Content>
      );
    }
  }, [
    editState.isEditMode,
    handleCancel,
    handleChangeContent,
    handleEnter,
    id,
    initialFileBlocks,
    textBlocks,
  ]);

  return (
    <Wrapper>
      {titleElement}
      {initialImageBlocks.length > 0 && !Boolean(editState.isEditMode) && (
        <>
          <Spacer value={8} />
          <MultiImage
            parentId={id || "review-content"}
            images={initialImageBlocks.map(imgBlock => ({
              url: imgBlock.src,
              blurhash: imgBlock.blurHash,
              fallbackSrc: imgBlock.fallbackSrc,
              srcSet: imgBlock.srcSet,
            }))}
          />
          <Spacer value={8} />
        </>
      )}
      {contentElement}
    </Wrapper>
  );
};

export default ReviewContent;
