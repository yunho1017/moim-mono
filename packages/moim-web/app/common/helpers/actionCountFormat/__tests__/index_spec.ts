import actionCountFormat from "../";

describe("actionCountFormat()", () => {
  describe("when EN locale", () => {
    describe("test under 1000 value", () => {
      describe("when value is 555", () => {
        it("should be '555' string", () => {
          expect(actionCountFormat(555, "en")).toBe("555");
        });
      });
    });

    describe("test under 1000000 value", () => {
      describe("when value is 5000", () => {
        it("should be '5K' string", () => {
          expect(actionCountFormat(5000, "en")).toBe("5K");
        });
      });

      describe("test decimal 1 point should returned", () => {
        describe("when value is 5555", () => {
          it("should be '5.5K' string", () => {
            expect(actionCountFormat(5555, "en")).toBe("5.5K");
          });
        });
      });
    });

    describe("test under 1000000000 value", () => {
      describe("when value is 5000000", () => {
        it("should be '5M' string", () => {
          expect(actionCountFormat(5000000, "en")).toBe("5M");
        });
      });

      describe("test decimal 1 point should returned", () => {
        describe("when value is 5555555", () => {
          it("should be '5.5M' string", () => {
            expect(actionCountFormat(5555555, "en")).toBe("5.5M");
          });
        });
      });
    });

    describe("test over 1000000000 value", () => {
      describe("when value is 5000000000", () => {
        it("should be '5B' string", () => {
          expect(actionCountFormat(5000000000, "en")).toBe("5B");
        });
      });

      describe("test decimal 1 point should returned", () => {
        describe("when value is 5555555555", () => {
          it("should be '5.5B' string", () => {
            expect(actionCountFormat(5555555555, "en")).toBe("5.5B");
          });
        });
      });
    });
  });

  describe("when KO locale", () => {
    describe("when value is under Man", () => {
      it("should return same number", () => {
        expect(actionCountFormat(1232, "ko")).toBe("1232");
      });
    });

    describe("when value is into Man range", () => {
      describe("when give 30291", () => {
        it("should return 3만", () => {
          expect(actionCountFormat(30291, "ko")).toBe("3만");
        });
      });

      describe("when give 3222091", () => {
        it("should return 322.2만", () => {
          expect(actionCountFormat(3222091, "ko")).toBe("322.2만");
        });
      });
    });

    describe("when value is into Uck range", () => {
      describe("when give 209022391", () => {
        it("should return 2억", () => {
          expect(actionCountFormat(209022391, "ko")).toBe("2억");
        });
      });

      describe("when give 8999022391", () => {
        it("should return 89.9억", () => {
          expect(actionCountFormat(8999022391, "ko")).toBe("89.9억");
        });
      });

      describe("when give 782999022391", () => {
        it("should return 7829.9억", () => {
          expect(actionCountFormat(782999022391, "ko")).toBe("7829.9억");
        });
      });
    });

    describe("when value is into Jo range", () => {
      describe("when give 7829990223914", () => {
        it("should return 7조", () => {
          expect(actionCountFormat(7829990223914, "ko")).toBe("7.8조");
        });
      });
    });
  });
});
