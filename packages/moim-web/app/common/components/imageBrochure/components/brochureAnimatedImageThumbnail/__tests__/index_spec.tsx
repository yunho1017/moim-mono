jest.mock("video.js", () => jest.fn());

import * as React from "react";
import * as Enzyme from "enzyme";
import BrochureAnimatedImageThumbnail from "..";
import { mountWithIntlAndRouterAndStore } from "app/__tests__/intlEnzymeTestHelper";

const FAKE_POSTER = "https://s0.vingle.net/fake_image.jpg";
const FAKE_SOURCES = [
  {
    type: "application/x-mpegurl",
    src: "https://s0.vingle.net/fake_hls.m3u8",
  },
  {
    type: "video/mp4",
    src: "https://s0.vingle.net/fake_mp4.mp4",
  },
];

describe.skip("<BrochureAnimatedImageThumbnail />", () => {
  let wrapper: Enzyme.ReactWrapper<any, any>;

  beforeEach(() => {
    wrapper = mountWithIntlAndRouterAndStore(
      <BrochureAnimatedImageThumbnail
        ownerId="U1234"
        fileId="F1234"
        sources={FAKE_SOURCES}
        poster={FAKE_POSTER}
        autoPlay={true}
        fluid={true}
        muted={true}
        loop={true}
      />,
      {
        locale: "ko",
      },
    );
  });

  it("should contain data-role", () => {
    expect(wrapper.find("video").props()).toHaveProperty("data-role");
    expect(wrapper.find("video").prop("data-role")).toContain(
      "brochure-thumbnail",
    );
  });
});
