import * as React from "react";
const { storiesOf } = require("@storybook/react");
import { Provider } from "react-redux";
import { createMemoryHistory } from "history";

import { createAppStore } from "app/store";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
import { px2rem } from "common/helpers/rem";
import ImageBrochure from ".";
import BrochureImageThumbnail from "./components/brochureImageThumbnail";
import ZNDImage from "./components/zoomAndDragImage";

const store = createAppStore(createMemoryHistory());

storiesOf(`${STORYBOOK_PREFIX.COMMON_COMPONENTS}/ImageBrochure`, module)
  .add("Default", () => (
    <Provider store={store}>
      <BrochureImageThumbnail
        ownerId="U1234"
        fileId="F1234"
        src="https://www.w3schools.com/w3css/img_lights.jpg"
        width={`${px2rem(120)}`}
        height={`${px2rem(120)}`}
      />
      <BrochureImageThumbnail
        ownerId="U1235"
        fileId="F1234"
        src="https://www.w3schools.com/w3css/img_forest.jpg"
        width={`${px2rem(120)}`}
        height={`${px2rem(120)}`}
      />
      <BrochureImageThumbnail
        ownerId="U1236"
        fileId="F1234"
        src="https://www.w3schools.com/w3css/img_mountains.jpg"
        width={`${px2rem(120)}`}
        height={`${px2rem(120)}`}
      />
      <BrochureImageThumbnail
        ownerId="U1237"
        fileId="F1234"
        src="https://www.w3schools.com/w3css/img_nature.jpg"
        width={`${px2rem(120)}`}
        height={`${px2rem(120)}`}
      />
      <BrochureImageThumbnail
        ownerId="U1238"
        fileId="F1234"
        src="https://www.w3schools.com/w3css/img_fjords.jpg"
        width={`${px2rem(120)}`}
        height={`${px2rem(120)}`}
      />

      <ImageBrochure />
    </Provider>
  ))
  .add("Grouping", () => (
    <Provider store={store}>
      <div>
        <div>Section A images</div>
        <BrochureImageThumbnail
          ownerId="U1234"
          fileId="F1234"
          src="https://s0.vingle.net/images/maintenance_vingle_logo.svg"
          width={`${px2rem(200)}`}
          height={`${px2rem(120)}`}
          dataRole="sectionA"
        />
      </div>
      <div>
        <div>Section B images</div>
        <BrochureImageThumbnail
          ownerId="U1234"
          fileId="F1234"
          src="https://www.w3schools.com/w3css/img_lights.jpg"
          width={`${px2rem(120)}`}
          height={`${px2rem(120)}`}
          dataRole="sectionB"
        />
        <BrochureImageThumbnail
          ownerId="U1234"
          fileId="F1234"
          src="https://www.w3schools.com/w3css/img_forest.jpg"
          width={`${px2rem(120)}`}
          height={`${px2rem(120)}`}
          dataRole="sectionB"
        />
        <BrochureImageThumbnail
          ownerId="U1234"
          fileId="F1234"
          src="https://www.w3schools.com/w3css/img_mountains.jpg"
          width={`${px2rem(120)}`}
          height={`${px2rem(120)}`}
          dataRole="sectionB"
        />
        <BrochureImageThumbnail
          ownerId="U1234"
          fileId="F1234"
          src="https://www.w3schools.com/w3css/img_nature.jpg"
          width={`${px2rem(120)}`}
          height={`${px2rem(120)}`}
          dataRole="sectionB"
        />
        <BrochureImageThumbnail
          ownerId="U1234"
          fileId="F1234"
          src="https://www.w3schools.com/w3css/img_fjords.jpg"
          width={`${px2rem(120)}`}
          height={`${px2rem(120)}`}
          dataRole="sectionB"
        />
      </div>

      <ImageBrochure />
    </Provider>
  ));

storiesOf(
  `${STORYBOOK_PREFIX.COMMON_COMPONENTS}/ImageBrochure/Components`,
  module,
).add("Zoom&Drag image", () => (
  <div
    style={{
      width: "100vw",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <ZNDImage
      width={500}
      height={500}
      src="https://www.itl.cat/pngfile/big/4-48377_hd-nature-wallpapers-desktop-images-4k-cool-natural.jpg"
    />
  </div>
));
