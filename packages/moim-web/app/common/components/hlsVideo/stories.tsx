import * as React from "react";

const { storiesOf } = require("@storybook/react");
import HlsVideo from ".";
import { STORYBOOK_PREFIX } from "common/constants/storybook";

const VideoData = {
  duration: "PT9.265S",
  height: 852,
  id: "fnqvjknwr5",
  originalType: "video/mp4",
  poster:
    "https://media.vingle.net/videos/fnqvjknwr5/thumbnail/high/zqislsxewgud1da02wqni2j4i.jpg",
  sources: [
    {
      src: "https://media.vingle.net/videos/fnqvjknwr5/master.m3u8",
      type: "application/x-mpegurl",
    },
    {
      src: "https://media.vingle.net/videos/fnqvjknwr5/10.mp4",
      type: "video/mp4",
    },
  ],
  type: "video",
  width: 480,
};

storiesOf(`${STORYBOOK_PREFIX.COMMON_COMPONENTS}/HlsVideo`, module)
  .add(".m3u8", () => (
    <HlsVideo
      sources={VideoData.sources}
      height={VideoData.height}
      width={VideoData.width}
      poster={VideoData.poster}
    />
  ))
  .add(".mp4", () => (
    <HlsVideo
      sources={[VideoData.sources[1], VideoData.sources[0]]}
      height={VideoData.height}
      width={VideoData.width}
      poster={VideoData.poster}
    />
  ));
