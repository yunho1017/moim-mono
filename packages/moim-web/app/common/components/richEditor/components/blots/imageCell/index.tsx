import * as React from "react";
import Quill from "quill";
import { useIntl } from "react-intl";
import { createPortal } from "react-dom";
import { v4 } from "uuid";
import { useStoreState, useActions } from "app/store";
import useIsMobile from "common/hooks/useIsMobile";
import useRedirect from "common/hooks/useRedirect";
import { ActionCreators as ImageBrochureActionCreators } from "common/components/imageBrochure/actions";
import {
  ActionCreators as FileUploadActionCreators,
  getFileBatch as getFileBatchAction,
} from "app/actions/fileUpload";
// components
import LazyBlurHashImage from "common/components/lazyBlurHashImage";
import ImageHolderSkelton from "common/components/imageHolder/skeleton";
import {
  Container,
  DeleteButtonWrapper,
  DeleteButton,
  LinkButtonWrapper,
  LinkButton,
  ImageWrapperStyle,
} from "./styled";

const BlockEmbed = Quill.import("blots/block/embed");

const DATA_ID_KEY = "data-id";

const ImageCell = React.memo(
  React.forwardRef<
    { getData(): void },
    {
      readOnly: boolean;
      type: string;
      node: {
        id: string;
        imageData?: Moim.Blockit.IImageBlock; // NOTE: TEMPORARY VALUE
        fileData?: {
          fileId: Moim.Id;
          file?: File;
        };
        imageFileGroupName?: string;
        forceFullWidthFiles?: boolean;
        onFileRetry(fileId: Moim.Id, file: File): void;
        onFileDelete(payload: { fileId?: Moim.Id; UId?: Moim.Id }): void;
      };
    }
  >(({ readOnly, node }, ref) => {
    const { fileData, imageData, id, onFileDelete } = node;
    const [localFileBlobUrl, setBlobUrl] = React.useState<string | null>(null);
    const [localFileCanvas, setLocalFileCanvas] = React.useState<{
      width: number;
      height: number;
    }>({ width: 200, height: 200 });
    const redirect = useRedirect();
    const intl = useIntl();
    const [hasLink, setHasLinkStatus] = React.useState(
      Boolean(imageData?.imageHref),
    );
    const fileId = fileData?.fileId ?? imageData?.fileId;
    const isMobile = useIsMobile();
    const fileEntity = useStoreState(state =>
      fileId
        ? ((state.entities.files[fileId] as unknown) as Moim.Upload.IFileInfo)
        : undefined,
    );

    const { openImageBrochure, getFileBatch, deleteFile } = useActions({
      getFileBatch: getFileBatchAction,
      openImageBrochure: ImageBrochureActionCreators.openSrcImageBrochure,
      deleteFile: FileUploadActionCreators.deleteFile,
    });

    const processLocalFileBlobUrl = React.useCallback(() => {
      const localFile = fileData?.file;
      if (localFile) {
        const fReader = new FileReader();
        const tmpImage = new Image();

        fReader.addEventListener(
          "load",
          () => {
            tmpImage.src = fReader.result as string;
            setBlobUrl(fReader.result as string);
          },
          false,
        );
        tmpImage.addEventListener(
          "load",
          () => {
            setLocalFileCanvas({
              width: tmpImage.width,
              height: tmpImage.height,
            });
          },
          false,
        );
        fReader.readAsDataURL(localFile);
      }
    }, [fileData?.file]);

    const getData = React.useCallback(
      () => ({
        ...node,
        imageData: {
          fileId,
          ...imageData,
          ...fileEntity?.image_preview,
          ...fileEntity?.image_urls,
        },
      }),
      [fileEntity, node, fileId, imageData],
    );

    const handleClick = React.useCallback(
      e => {
        if (!readOnly) {
          e.preventDefault();
          return;
        }
        if (imageData?.imageHref) {
          redirect(imageData.imageHref);
        } else {
          const src = imageData?.src ?? fileEntity?.image_urls?.src ?? "";
          if (src) {
            e.currentTarget.dataset.brochureSelected = "true";
            openImageBrochure(src);
          }
        }
      },
      [fileEntity, redirect, imageData, openImageBrochure, readOnly],
    );

    const handleDeleteClick = React.useCallback(() => {
      if (fileId) {
        deleteFile(fileId);
        setTimeout(() => {
          onFileDelete({
            fileId,
            UId: id,
          });
        }, 300);
      } else {
        onFileDelete({
          UId: id,
        });
      }
    }, [deleteFile, fileId, id, onFileDelete]);

    const handleAddLink = React.useCallback(
      ev => {
        const oldLink = imageData?.imageHref;
        const link = prompt(
          intl.formatMessage({
            id: "link_input_field_dialog_link_input",
          }),
          oldLink,
        );
        let targetLink: string | null = oldLink ?? null;
        if (link) {
          targetLink =
            link.includes("https://") || link.includes("http://")
              ? link
              : `https://${link}`;
        }

        if (targetLink !== null) {
          const blot = Quill.find(ev.currentTarget.parentElement.parentElement);
          if (blot.data.imageData) {
            blot.data.imageData.imageHref = targetLink;
          } else if (blot.data.fileData) {
            blot.data.imageData = { imageHref: targetLink };
          }
        }
        setHasLinkStatus(Boolean(targetLink));
      },
      [imageData, intl],
    );

    React.useImperativeHandle(ref, () => ({
      getData,
    }));

    React.useEffect(() => {
      processLocalFileBlobUrl();
    }, []);

    React.useEffect(() => {
      if (!fileEntity && fileId) {
        getFileBatch([fileId]);
      }
    }, [fileEntity, fileId, getFileBatch]);

    if (!fileId && !fileEntity && !imageData) {
      return <div>Error to load Image.</div>;
    }

    if (
      !localFileBlobUrl &&
      !imageData &&
      (!fileEntity || !fileEntity.image_urls || !fileEntity.image_preview)
    ) {
      return (
        <Container>
          <ImageHolderSkelton />
          {!readOnly && (
            <DeleteButtonWrapper onClick={handleDeleteClick}>
              <DeleteButton />
            </DeleteButtonWrapper>
          )}
        </Container>
      );
    }
    return (
      <Container>
        <LazyBlurHashImage
          role={
            imageData?.src ?? fileEntity?.image_urls?.src ?? ""
              ? "button"
              : undefined
          }
          data-role={`brochure-thumbnail-${node.imageFileGroupName}`}
          data-file-id={fileId}
          src={
            imageData?.src ??
            fileEntity?.image_urls?.src ??
            localFileBlobUrl ??
            ""
          }
          fallBackSrc={
            imageData?.fallbackSrc ??
            fileEntity?.image_urls?.fallbackSrc ??
            imageData?.src ??
            fileEntity?.image_urls?.src
          }
          srcSet={imageData?.srcSet ?? fileEntity?.image_urls?.srcSet}
          sizes={!isMobile ? "780px" : undefined}
          blurHash={
            imageData?.blurHash ??
            fileEntity?.image_preview?.blurHash ??
            fileEntity?.image_preview?.blur_hash
          }
          width={
            imageData?.width ??
            fileEntity?.image_preview?.width ??
            localFileCanvas.width
          }
          height={
            imageData?.height ??
            fileEntity?.image_preview?.height ??
            localFileCanvas.height
          }
          overrideWrapperStyle={ImageWrapperStyle}
          onClick={handleClick}
        />
        {!readOnly && [
          <DeleteButtonWrapper onClick={handleDeleteClick}>
            <DeleteButton />
          </DeleteButtonWrapper>,
          Boolean(fileEntity?.image_urls) ||
          Boolean(fileEntity?.image_preview) ? (
            <LinkButtonWrapper
              role="button"
              key={`key_${imageData?.src ?? fileEntity?.image_urls?.src ?? ""}`}
              hasLink={hasLink}
              onClick={handleAddLink}
            >
              <LinkButton />
            </LinkButtonWrapper>
          ) : null,
        ]}
      </Container>
    );
  }),
);

export default class ImageCellBlot extends BlockEmbed {
  public static blotName = "imageCell";
  public static tagName = "figure";
  public static className = "ql-custom";
  public static ref = {};

  public static create(value: any) {
    const id = v4();
    const node = super.create(value);
    node.setAttribute(DATA_ID_KEY, id);
    node.setAttribute("contenteditable", false);

    ImageCellBlot.data = {
      ...value,
      id,
    };
    ImageCellBlot.refs = {
      ...ImageCellBlot.refs,
      [id]: React.createRef(),
    };

    return node;
  }

  public static value(domNode: Element) {
    const id = domNode.getAttribute(DATA_ID_KEY);
    if (id) {
      const ref = ImageCellBlot.refs[id];
      return ref?.current?.getData() ?? id;
    }
    return undefined;
  }

  public attach() {
    super.attach();
    this.id = this.domNode.getAttribute(DATA_ID_KEY);
    this.data = ImageCellBlot.data;
    this.scroll.emitter.emit("blot-mount", this);
  }

  public detach() {
    super.detach();
    this.scroll.emitter.emit("blot-unmount", this);
  }

  public renderPortal(id: string) {
    const { options } = Quill.find(this.scroll.domNode.parentNode);
    const ref = ImageCellBlot.refs[id];

    return createPortal(
      <ImageCell
        ref={ref}
        key={`image_cell_${id}`}
        type={ImageCellBlot.blotName}
        node={this.data}
        readOnly={options.readOnly}
      />,
      this.domNode,
    );
  }
}
