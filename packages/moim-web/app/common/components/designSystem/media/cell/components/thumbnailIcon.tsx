import * as React from "react";
import styled from "styled-components";
import {
  ALL_IMAGE_MIME_REGEX,
  ALL_VIDEO_MIME_REGEX,
} from "common/constants/mimeTypes";
import { px2rem } from "common/helpers/rem";

import AttachmentFileIcon from "@icon/attachment-file-b.svg";
import AttachmentImageIcon from "@icon/attachment-image-b.svg";
import AttachmentVideoIcon from "@icon/attachment-video-b.svg";

interface IProps {
  mimeType: string;
  src?: string;
}

const ImageElement = styled.img`
  width: ${px2rem(36)};
  height: ${px2rem(36)};
  border-radius: ${px2rem(4)};
  object-fit: cover;
`;

const ImageThumbnail = ({ src }: { src: string }) => {
  const [isFailed, setFailedStatus] = React.useState(false);
  const handleError = React.useCallback(() => {
    setFailedStatus(true);
  }, []);

  if (!isFailed) {
    return <ImageElement src={src} onError={handleError} />;
  } else {
    return <AttachmentImageIcon size="m" touch={48} />;
  }
};

const ThumbnailIcon: React.FC<IProps> = ({ mimeType, src }) => {
  if (mimeType.match(ALL_IMAGE_MIME_REGEX)) {
    return <ImageThumbnail src={src || ""} />;
  } else if (mimeType.match(ALL_VIDEO_MIME_REGEX)) {
    return <AttachmentVideoIcon size="m" touch={36} />;
  } else {
    return <AttachmentFileIcon size="m" touch={36} />;
  }
};

export default ThumbnailIcon;
