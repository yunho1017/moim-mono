import * as React from "react";
import * as Url from "url";
// import components
import {
  EmbedContainer,
  LinkPreviewContainer,
  Contents,
  Header,
  Information,
  Title,
  Description,
  Image,
  Favicon,
  EmbedWrapper,
  DeleteButton,
  DeleteIcon,
} from "./styled";
import ShavedText from "common/components/shavedText";

interface IProps
  extends Omit<
    React.HTMLProps<HTMLAnchorElement | HTMLDivElement>,
    "ref" | "href" | "as"
  > {
  url: string;
  readOnly: boolean;
  favicon?: string;
  siteName?: string;
  title?: string;
  description?: string;
  image?: string;
  embed?: {
    html: string;
    url: string;
    width: number;
    height: number;
  };
  onDeleteClick?(): void;
}

const LinkPreview = (props: IProps) => {
  const {
    readOnly,
    favicon,
    url,
    title,
    description,
    siteName,
    image,
    embed,
    onDeleteClick,
    ...rest
  } = props;

  const handleDeleteClick: React.MouseEventHandler<HTMLDivElement> = React.useCallback(
    e => {
      e.preventDefault();
      e.stopPropagation();
      onDeleteClick?.();
    },
    [onDeleteClick],
  );

  const titleElement = React.useMemo(
    () =>
      title ? (
        <Title>
          <ShavedText value={title} line={2} />
        </Title>
      ) : null,
    // ${px2rem(28)} per line
    [title],
  );
  const descriptionElement = React.useMemo(
    () =>
      description ? (
        <Description>
          <ShavedText value={description} line={3} />
        </Description>
      ) : null,
    // 24px per line
    [description],
  );

  const urlElement = React.useMemo(() => {
    if (url) {
      const host = siteName || Url.parse(url).hostname;
      return (
        <Header>
          {favicon && <Favicon src={favicon} />}
          {host}
        </Header>
      );
    }
    return null;
  }, [favicon, siteName, url]);

  const imageElement = React.useMemo(
    () =>
      image && !embed ? (
        <Image style={{ backgroundImage: `url(${image})` }} />
      ) : null,
    [embed, image],
  );

  const embedElement = React.useMemo(
    () =>
      embed ? (
        <EmbedWrapper
          width={embed.width}
          height={embed.height}
          dangerouslySetInnerHTML={{ __html: embed.html }}
        />
      ) : null,
    [embed],
  );

  const deleteButtonElement = React.useMemo(
    () =>
      !readOnly && (
        <DeleteButton onClick={handleDeleteClick}>
          <DeleteIcon />
        </DeleteButton>
      ),
    [handleDeleteClick, readOnly],
  );

  const innerElement = React.useMemo(
    () => (
      <>
        {urlElement}
        <Contents>
          <Information>
            {titleElement}
            {descriptionElement}
          </Information>
          {imageElement}
        </Contents>
        {embedElement}
      </>
    ),
    [descriptionElement, embedElement, imageElement, titleElement, urlElement],
  );

  if (Boolean(embed)) {
    return (
      <EmbedContainer readonly={readOnly} {...rest}>
        {innerElement}
        {deleteButtonElement}
      </EmbedContainer>
    );
  }
  return (
    <LinkPreviewContainer
      readonly={readOnly}
      href={url}
      target="_blank"
      {...rest}
    >
      {innerElement}
      {deleteButtonElement}
    </LinkPreviewContainer>
  );
};

export default LinkPreview;
