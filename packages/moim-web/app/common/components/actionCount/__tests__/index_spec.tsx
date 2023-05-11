import * as Enzyme from "enzyme";
import * as React from "react";
import ActionCount from "../";

describe("<ActionCount /> Component", () => {
  let wrapper: Enzyme.ShallowWrapper;
  describe("When don't receive props", () => {
    beforeEach(() => {
      wrapper = Enzyme.shallow(<ActionCount />);
    });
    it("should render empty", () => {
      expect(wrapper.html()).toBe("");
    });
  });

  describe("When value is number", () => {
    beforeEach(() => {
      wrapper = Enzyme.shallow(<ActionCount value={5555} />);
    });
    it("should render 5.5K", () => {
      expect(wrapper.html()).toBe("5.5K");
    });
  });

  describe("When value is empty and defaultValue is setting", () => {
    beforeEach(() => {
      wrapper = Enzyme.shallow(<ActionCount value={0} defaultValue={"Foo"} />);
    });
    it("should render Foo", () => {
      expect(wrapper.html()).toBe("Foo");
    });
  });
});
