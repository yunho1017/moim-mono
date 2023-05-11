import * as React from "react";
import * as Enzyme from "enzyme";
import BrochureImageThumbnail from "..";
import { mountWithIntlAndStore } from "app/__tests__/intlEnzymeTestHelper";
import { mockAllIsIntersecting } from "react-intersection-observer/test-utils";

describe("<BrochureThumbnail />", () => {
  let wrapper: Enzyme.ReactWrapper<any, any>;

  beforeEach(() => {
    wrapper = mountWithIntlAndStore(
      <BrochureImageThumbnail
        ownerId="U1234"
        fileId="F1234"
        src="https://s0.vingle.net/images/vingle_og.jpg"
      />,
      {
        locale: "ko",
      },
    );
    mockAllIsIntersecting(true);
    wrapper.update();
  });

  afterEach(() => {
    mockAllIsIntersecting(false);
  });

  it("should contain data-role", () => {
    expect(wrapper.find("img").props()).toHaveProperty("data-role");
    expect(wrapper.find("img").prop("data-role")).toContain(
      "brochure-thumbnail",
    );
  });
});
