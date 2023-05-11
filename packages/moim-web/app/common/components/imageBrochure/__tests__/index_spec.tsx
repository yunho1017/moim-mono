import * as React from "react";
import * as Enzyme from "enzyme";

import { initialState as appInitialState } from "app/rootReducer";

import ImageBrochure from "..";
import { mountWithIntlAndRouterAndStore } from "app/__tests__/intlEnzymeTestHelper";

describe("<ImageBrochure />", () => {
  const mockedAppState = {
    ...appInitialState,
    imageBrochure: {
      ...appInitialState.imageBrochure,
      isOpen: true,
    },
  };
  let wrapper: Enzyme.ReactWrapper<any, any>;
  beforeEach(() => {
    wrapper = mountWithIntlAndRouterAndStore(<ImageBrochure />, {
      locale: "ko",
      initialState: mockedAppState,
    });
  });

  it("should render header's properly", () => {
    expect(wrapper.find("Header").find("AppBar")).toHaveLength(1);
  });

  it("should render contentWrapper's content properly", () => {
    expect(wrapper.find("ContentWrapper")).toHaveLength(1);
  });
});
