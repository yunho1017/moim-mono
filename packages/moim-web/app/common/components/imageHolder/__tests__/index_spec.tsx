import { mountWithIntlAndRouter } from "app/__tests__/intlEnzymeTestHelper";
import * as Enzyme from "enzyme";
import * as React from "react";
import ImageHolder from "..";
import { mockAllIsIntersecting } from "react-intersection-observer/test-utils";

describe("<ImageHolder />", () => {
  let wrapper: Enzyme.ReactWrapper<any>;

  const validateSrcInBackground = () => {
    it("should have src in background-image", () => {
      expect(wrapper.find("img").prop("src")).toBe("url://url.jpg");
    });
  };

  const validateBackgroundSize = (expectedSize: string) => {
    it("should render with backgroundSize", () => {
      expect(
        (wrapper.find("img").prop("style") as React.CSSProperties).objectFit,
      ).toBe(expectedSize);
    });
  };

  describe("when fit is crop-top", () => {
    beforeEach(() => {
      wrapper = mountWithIntlAndRouter(
        <ImageHolder fit="crop-top" src="url://url.jpg" />,
        { locale: "ko" },
      );
      mockAllIsIntersecting(true);
      wrapper.update();
    });

    afterEach(() => {
      mockAllIsIntersecting(false);
    });

    it("should have src in background-image", () => {
      expect(
        (wrapper
          .find("CompatibleImage > *")
          .at(0)
          .prop("style") as React.CSSProperties).backgroundImage,
      ).toBe(`url("url://url.jpg")`);
    });
  });

  describe("when object-fit is supported", () => {
    describe("when fit is cover", () => {
      beforeEach(() => {
        wrapper = mountWithIntlAndRouter(
          <ImageHolder fit="cover" src="url://url.jpg" />,
          { locale: "ko" },
        );
        mockAllIsIntersecting(true);
        wrapper.update();
      });

      afterEach(() => {
        mockAllIsIntersecting(false);
      });

      validateBackgroundSize("cover");
      validateSrcInBackground();
    });

    describe("when fit is fill", () => {
      beforeEach(() => {
        wrapper = mountWithIntlAndRouter(
          <ImageHolder fit="fill" src="url://url.jpg" />,
          { locale: "ko" },
        );
        mockAllIsIntersecting(true);
        wrapper.update();
      });

      afterEach(() => {
        mockAllIsIntersecting(false);
      });

      validateBackgroundSize("fill");
      validateSrcInBackground();
    });

    describe("when fit is undefined", () => {
      beforeEach(() => {
        wrapper = mountWithIntlAndRouter(<ImageHolder src="url://url.jpg" />, {
          locale: "ko",
        });
        mockAllIsIntersecting(true);
        wrapper.update();
      });

      afterEach(() => {
        mockAllIsIntersecting(false);
      });

      it("should render without backgroundSize", () => {
        expect(
          (wrapper.find("img").prop("style") as React.CSSProperties).objectFit,
        ).toBeUndefined();
      });

      validateSrcInBackground();
    });
  });
});
