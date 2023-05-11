import * as React from "react";
import debounce from "lodash/debounce";

import isEqual from "lodash/isEqual";
import { useIntl } from "react-intl";
// actions
import { clearPreLinkMeetingData } from "app/actions/meeting";
// helpers
import { IRefHandler } from "common/components/richEditor";
import isEmpty from "common/components/richEditor/helpers/isEmpty";
import { selectImgBlocks } from "../selectors";

// hooks
import { useActions, useStoreState } from "app/store";
import useIsMobile from "common/hooks/useIsMobile";
import usePrevious from "common/hooks/usePrevious";

import { ALL_IMAGE_MIME_REGEX } from "common/constants/mimeTypes";
import GroupInputTypes from "../type";
import useEmojiDialog from "./useEmojiDialog";

export function useProps(props: GroupInputTypes.IProps) {
  const { value, imageBlocks: propsImageBlocks, maxAttachmentCount } = props;
  const intl = useIntl();
  const isMobile = useIsMobile();
  const editorRef = React.useRef<IRefHandler>(null);
  const [files, setFiles] = React.useState<
    { fileId: Moim.Id; file: File; priority: number }[]
  >([]);
  const [imageFileIds, setImageFileIds] = React.useState<
    { id: Moim.Id; priority: number }[]
  >([]);
  const [imageBlocks, setImageBlocks] = React.useState<
    GroupInputTypes.FileStatusImageBlock[]
  >(propsImageBlocks ?? []);
  const [defaultContents, setDefaultContents] = React.useState<
    Moim.Blockit.Blocks[]
  >(value ?? []);
  const [currentCursorFormat, setCurrentCursorFormat] = React.useState<{
    [key: string]: boolean;
  }>({});
  const [editorContents, setContents] = React.useState<Moim.Blockit.Blocks[]>(
    value ?? [],
  );
  const reselectedImgBlocks = useStoreState(state =>
    selectImgBlocks(state, imageFileIds),
  );
  const preLinkMeeting = useStoreState(state => state.meeting.preLinkMeeting);
  const { dispatchClearPreLinkMeetingData } = useActions({
    dispatchClearPreLinkMeetingData: clearPreLinkMeetingData,
  });

  const imgBlocks = React.useMemo(
    () => [...(propsImageBlocks ?? []), ...reselectedImgBlocks],
    [propsImageBlocks, reselectedImgBlocks],
  );

  const hasFileContent = React.useMemo(() => {
    const isEmptyFile = files.length === 0;
    const isEmptyImageFile = imgBlocks.length === 0;

    return !isEmptyFile || !isEmptyImageFile;
  }, [files.length, imgBlocks.length]);

  const hasMeetingFileContent = React.useMemo(() => !!preLinkMeeting?.id, [
    preLinkMeeting?.id,
  ]);

  const isMaxUploaded = React.useMemo(() => {
    const totalFileCount = (files.length ?? 0) + (imgBlocks.length ?? 0);
    return totalFileCount >= (maxAttachmentCount ?? 1);
  }, [files.length, imgBlocks.length, maxAttachmentCount]);

  const emojiDialog = useEmojiDialog(editorRef);

  const hasContent = React.useMemo(() => {
    const { isEmptyText } = isEmpty(editorContents);
    return hasFileContent || !isEmptyText;
  }, [hasFileContent, editorContents]);

  return {
    ...props,
    preLinkMeeting,
    intl,
    isMobile,
    editorRef,
    hasFileContent,
    hasContent,
    hasMeetingFileContent,
    emojiDialog,
    isMaxUploaded,
    editorContents,
    files,
    setFiles,
    imageBlocks,
    setImageBlocks,
    imgBlocks,
    imageFileIds,
    setImageFileIds,
    currentCursorFormat,
    setCurrentCursorFormat,
    dispatchClearPreLinkMeetingData,
    defaultContents,
    setDefaultContents,
    setContents,
  };
}

export function useHandlers(props: ReturnType<typeof useProps>) {
  const {
    intl,
    editorRef,
    disableImageBlockUpload,
    imageBlocks,
    setImageBlocks,
    imageFileIds,
    setImageFileIds,
    hasContent,
    maxAttachmentCount = 1,
    files,
    setFiles,
    preLinkMeeting,
    setContents,
    dispatchClearPreLinkMeetingData,
    onEnter,
    onChange,
  } = props;

  const handleBlockChange = React.useCallback(
    (contents: Moim.Blockit.Blocks[]) => {
      const block = contents.filter(i => i.type !== "image");
      imageBlocks
        .filter(i => Boolean(i))
        .forEach(({ status: _, fileId: _v2, ...rest }) => {
          block.push(rest);
        });
      onChange?.(
        block,
        files.map(data => ({
          type: "file",
          files: [
            {
              id: data.fileId,
              title: data.file.name,
            },
          ],
        })),
      );
    },
    [files, imageBlocks, onChange],
  );

  const handleChange = React.useCallback(
    (contents: Moim.Blockit.Blocks[]) => {
      setContents(contents);
      handleBlockChange(contents);
    },
    [handleBlockChange, setContents],
  );

  const clear = React.useCallback(() => {
    const input = editorRef.current;
    if (input) {
      setFiles([]);
      setImageFileIds([]);
      setImageBlocks([]);
      dispatchClearPreLinkMeetingData();
      input.clear();
      requestAnimationFrame(() => {
        input.containerElement?.focus();
        input.containerElement?.scrollIntoView();
      });
    }
  }, [
    dispatchClearPreLinkMeetingData,
    editorRef,
    setFiles,
    setImageBlocks,
    setImageFileIds,
  ]);

  const passEnterCallback = () => {
    const input = editorRef.current;
    if (input) {
      const blocks = input.getContent();
      if (hasContent && onEnter) {
        const contents = blocks.filter(i => i.type !== "image");

        files.forEach(data => {
          contents.push({
            type: "file",
            files: [
              {
                id: data.fileId,
                title: data.file.name,
              },
            ],
          });
        });
        imageBlocks
          .filter(i => Boolean(i))
          .forEach(({ status: _, ...rest }) => {
            contents.push(rest);
          });

        onEnter(contents, preLinkMeeting);
      }
    }
  };

  const handleEnter = React.useCallback(
    debounce(() => {
      passEnterCallback();
    }, 300),
    [passEnterCallback],
  );

  const handleClickFileAttachment = React.useCallback(() => {
    if (files.length + 1 <= maxAttachmentCount) {
      editorRef.current?.addFiles();
    } else {
      alert(
        intl.formatMessage(
          { id: "input_field_file_maximum_number_toast_message" },
          { plain_count: maxAttachmentCount },
        ),
      );
    }
  }, [files, editorRef, intl, maxAttachmentCount]);

  const handleFileChange = React.useCallback(
    (fileId: Moim.Id, file: Moim.Upload.IUploadFileMeta) => {
      if (
        file.file.type.match(ALL_IMAGE_MIME_REGEX) &&
        !disableImageBlockUpload
      ) {
        setImageFileIds(state => {
          const arr = [
            ...state,
            {
              id: fileId,
              priority: imageFileIds.length + file.priority,
            },
          ];
          return arr.sort((x, y) => x.priority - y.priority);
        });
      } else {
        setFiles(state =>
          state.concat({
            fileId,
            file: file.file,
            priority: files.length + file.priority,
          }),
        );
      }
    },
    [
      disableImageBlockUpload,
      files.length,
      imageFileIds.length,
      setFiles,
      setImageFileIds,
    ],
  );

  return {
    clear,
    handleEnter,
    handleClickFileAttachment,
    handleFileChange,
    handleChange,
    handleBlockChange,
  };
}

export function useEffects(
  hookProps: ReturnType<typeof useProps>,
  hookHandlers: ReturnType<typeof useHandlers>,
) {
  const {
    fileBlocks,
    setFiles,
    imgBlocks,
    setImageBlocks,
    editorContents,
    imageBlocks,
  } = hookProps;
  const { handleBlockChange } = hookHandlers;

  const prevImgBlocks = usePrevious(imgBlocks) ?? [];

  React.useEffect(() => {
    if (imgBlocks.length > 0 && !isEqual(prevImgBlocks, imgBlocks)) {
      setImageBlocks(imgBlocks);
    }
  }, [imgBlocks, prevImgBlocks, setImageBlocks]);

  React.useEffect(() => {
    if (fileBlocks) {
      setFiles(
        fileBlocks.reduce<{ fileId: Moim.Id; file: File; priority: number }[]>(
          (fileTmp, block, index) => {
            if (block.type === "file") {
              fileTmp.push({
                fileId: block.files[0].id,
                file: new File([], block.files[0].title),
                priority: index,
              });
            }

            return fileTmp;
          },
          [],
        ),
      );
    }
  }, [fileBlocks]);

  React.useEffect(() => {
    handleBlockChange?.(editorContents);
  }, [imageBlocks]);
}
