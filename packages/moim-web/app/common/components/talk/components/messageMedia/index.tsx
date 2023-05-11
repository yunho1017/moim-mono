import * as React from "react";

import BrochureAnimatedImageThumbnail from "common/components/imageBrochure/components/brochureAnimatedImageThumbnail";
import BrochureImageThumbnail from "common/components/imageBrochure/components/brochureImageThumbnail";
import getMediaRatioWidthAndHeight from "common/helpers/getMediaRatioWidthAndHeight";

const MAX_WIDTH = 292;
const MAX_HEIGHT = 320;

interface IProps {
  talkKey: string;
  ownerId: Moim.Id;
  fileId: Moim.Id;
  resource: any; // @TODO: Change to right source
}

const Media = ({ ownerId, resource, talkKey, fileId }: IProps) => {
  if (
    !resource ||
    (resource.type !== "image" && resource.type !== "animated-image")
  ) {
    return null;
  }

  const media = resource.data;
  const {
    width: ratioWidth,
    height: ratioHeight,
  } = getMediaRatioWidthAndHeight({
    ratio: Math.floor(media.width / media.height),
    width: media.width,
    height: media.height,
    maxWidth: MAX_WIDTH,
    maxHeight: MAX_HEIGHT,
  });

  if (resource.type === "image") {
    return (
      <BrochureImageThumbnail
        ownerId={ownerId}
        fileId={fileId}
        dataRole={`${talkKey}-image`}
        src={resource.data.url}
        width={ratioWidth}
        height={ratioHeight}
      />
    );
  }
  if (resource.type === "animated-image") {
    const style = {
      width: ratioWidth,
    };

    return (
      <BrochureAnimatedImageThumbnail
        ownerId={ownerId}
        fileId={fileId}
        dataRole={`${talkKey}-animated-image`}
        style={style}
        width={ratioWidth}
        height={ratioHeight}
        sources={resource.data.sources}
        poster={resource.data.poster}
        autoPlay={true}
        fluid={true}
        muted={true}
        loop={true}
      />
    );
  }

  return null;
};

export default React.memo(Media);
