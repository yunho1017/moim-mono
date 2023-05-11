import * as React from "react";
import * as Enzyme from "enzyme";
import { mockAllIsIntersecting } from "react-intersection-observer/test-utils";
import HlsVideo from "..";
import { mountWithIntlAndRouter } from "app/__tests__/intlEnzymeTestHelper";

jest.mock("common/components/mediaWrapper/helpers");
jest.mock("video.js", () => jest.fn());

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

describe.skip("<HlsVideo />", () => {
  let wrapper: Enzyme.ReactWrapper<any>;
  let videojs: any;
  describe("when there is no width and height", () => {
    beforeEach(async () => {
      videojs = (await import("video.js")).default;
      videojs.mockClear();
      wrapper = mountWithIntlAndRouter(
        <HlsVideo poster={FAKE_POSTER} sources={FAKE_SOURCES} />,
        { locale: "ko" },
      );
      mockAllIsIntersecting(true);
      wrapper.update();
    });

    afterEach(() => {
      mockAllIsIntersecting(false);
    });

    it("should render with two source", () => {
      expect(wrapper.find("source").length).toEqual(2);
    });

    it("should give a priority to hls", () => {
      expect(
        wrapper
          .find("source")
          .at(0)
          .prop("type"),
      ).toEqual("application/x-mpegurl");
    });
  });

  describe("when there are width and height", () => {
    beforeEach(async () => {
      videojs = (await import("video.js")).default;
      videojs.mockClear();
      wrapper = mountWithIntlAndRouter(
        <HlsVideo
          poster={FAKE_POSTER}
          sources={FAKE_SOURCES}
          height={300}
          width={200}
        />,
        { locale: "ko" },
      );
      mockAllIsIntersecting(true);
      wrapper.update();
    });

    afterEach(() => {
      mockAllIsIntersecting(false);
    });

    it("should use a aspect ratio based on height and width", () => {
      expect((videojs as jest.Mock).mock.calls[0][1].aspectRatio).toEqual(
        "200:300",
      );
    });
  });
});
