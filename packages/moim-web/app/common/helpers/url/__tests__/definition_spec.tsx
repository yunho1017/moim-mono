import createURLDefinition from "../createDefinition";
import { GROUP_APP_SCHEMA } from "common/constants/hosts";

describe("createURLDefinition", () => {
  const Def = createURLDefinition<{ interest: string }>(
    "/interests/:interest",
    "/interests/mock/app/:interest",
  );
  describe("createURLDefinition.pattern", () => {
    it("should pattern value is public static value", () => {
      expect(Def.pattern).toBe("/interests/:interest");
    });
  });

  describe("createURLDefinition.isSame", () => {
    it("should argument path will be true", () => {
      expect(Def.isSame("/interests/BTS")).toBeTruthy();
    });

    it("should argument path will be false", () => {
      expect(Def.isSame("/question/12345")).toBeFalsy();
    });
  });

  describe("createURLDefinition.prototype.toString", () => {
    describe(".toString without parameter", () => {
      it("should path alright", () => {
        expect(new Def({ interest: "아이즈원" }).toString()).toBe(
          `/interests/${encodeURIComponent("아이즈원")}`,
        );
      });
    });

    describe(".toString with parameter", () => {
      it("should path alright with given hostname", () => {
        expect(new Def({ interest: "아이즈원" }).toString("moim.co")).toBe(
          `https://moim.co/interests/${encodeURIComponent("아이즈원")}`,
        );
      });
    });
  });

  describe("createURLDefinition.prototype.toLocation", () => {
    it("should locationDescription alright", () => {
      expect(
        new Def({ interest: "레드벨벳" }).toLocation({ query: { m: "1234" } }),
      ).toEqual({
        pathname: "/interests/레드벨벳",
        search: "?m=1234",
        state: { modal: false },
        hash: "",
      });
    });
  });

  describe("createURLDefinition.prototype.toSchema", () => {
    it("should prefix is vingle schema", () => {
      expect(new Def({ interest: "아이즈원" }).toSchema()).toBe(
        `${GROUP_APP_SCHEMA}interests/mock/app/${encodeURIComponent(
          "아이즈원",
        )}`,
      );
    });
  });
});
