jest.unmock("../");

import * as React from "react";
import * as Enzyme from "enzyme";

import MediaUploadInput, { MediaUploadTypes, MEDIA_RESPONSE_ACCEPTS } from "..";
import { mountWithIntl } from "app/__tests__/intlEnzymeTestHelper";

function mount(denyTypes: MediaUploadTypes[] = []) {
  return mountWithIntl(
    <MediaUploadInput onChange={jest.fn()} denyTypes={denyTypes} />,
    { locale: "ko" },
  );
}

function getFileTypesWithoutDeny(denyTypes: MediaUploadTypes[]) {
  return Array.from(MEDIA_RESPONSE_ACCEPTS)
    .filter(([key]) => !denyTypes.includes(key))
    .reduce<string[]>((result, [, values]) => result.concat(values), []);
}

describe("<MediaUploadInput />", () => {
  let denyTypes: MediaUploadTypes[];
  let input: Enzyme.ReactWrapper<any>;
  describe("denyType is empty", () => {
    beforeEach(() => {
      denyTypes = [];
      input = mount(denyTypes);
    });
    it("should render accept all", () => {
      expect(input.find("input").prop("accept")).toEqual(
        getFileTypesWithoutDeny(denyTypes).join(","),
      );
    });
  });

  describe("denyType is video", () => {
    beforeEach(() => {
      denyTypes = ["video"];
      input = mount(denyTypes);
    });
    it("should render accept image,gif", () => {
      expect(input.find("input").prop("accept")).toEqual(
        getFileTypesWithoutDeny(denyTypes).join(","),
      );
    });
  });

  describe("denyType is gif", () => {
    beforeEach(() => {
      denyTypes = ["animated-image"];
      input = mount(denyTypes);
    });
    it("should render accept image,video", () => {
      expect(input.find("input").prop("accept")).toEqual(
        getFileTypesWithoutDeny(denyTypes).join(","),
      );
    });
  });

  describe("denyType is image", () => {
    beforeEach(() => {
      denyTypes = ["image"];
      input = mount(denyTypes);
    });
    it("should render accept video,gif", () => {
      expect(input.find("input").prop("accept")).toEqual(
        getFileTypesWithoutDeny(denyTypes).join(","),
      );
    });
  });

  describe("denyType is gif,video", () => {
    beforeEach(() => {
      denyTypes = ["animated-image", "video"];
      input = mount(denyTypes);
    });
    it("should render accept image", () => {
      expect(input.find("input").prop("accept")).toEqual(
        getFileTypesWithoutDeny(denyTypes).join(","),
      );
    });
  });

  describe("denyType is all", () => {
    beforeEach(() => {
      denyTypes = ["image", "animated-image", "video", "application"];
      input = mount(denyTypes);
    });
    it("should render input disabled true", () => {
      expect(input.find("input").prop("disabled")).toBeTruthy();
    });
  });
});
