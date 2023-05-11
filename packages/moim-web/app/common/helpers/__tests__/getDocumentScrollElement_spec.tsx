/**
 * @jest-environment jsdom
 */
import getDocumentScrollElement from "../getDocumentScrollElement";

describe("getDocumentScrollElement()", () => {
  beforeEach(() => {
    jest.useFakeTimers();

    (jest.spyOn(
      window,
      "requestAnimationFrame",
    ) as any).mockImplementation((cb: any) => cb());
  });

  afterEach(() => {
    (window.requestAnimationFrame as any).mockRestore();
    jest.clearAllTimers();
  });

  describe("when element is null", () => {
    it("Scroll Element should be null", () => {
      expect(getDocumentScrollElement(null)).toBe(document.documentElement);
    });
  });

  describe("when element has not parent scrollable", () => {
    it("Scroll Element should be scroll element", () => {
      const parent1 = document.createElement("div");
      parent1.id = "parent1";
      const parent2 = document.createElement("div");
      parent2.id = "parent2";
      const parent3 = document.createElement("div");
      parent3.id = "parent3";
      const element = document.createElement("div");
      element.id = "element";
      parent1.appendChild(parent2);
      parent2.appendChild(parent3);
      parent3.appendChild(element);
      expect(getDocumentScrollElement(element)).toBe(document.documentElement);
    });
  });

  describe("when element parent scrollable", () => {
    it("Scroll Element should be scroll element", () => {
      const parent1 = document.createElement("div");
      parent1.id = "parent1";
      const parent2 = document.createElement("div");
      parent2.id = "parent2";
      parent2.style.overflowY = "scroll";
      const parent3 = document.createElement("div");
      parent3.id = "parent3";
      const element = document.createElement("div");
      element.id = "element";
      parent1.appendChild(parent2);
      parent2.appendChild(parent3);
      parent3.appendChild(element);
      const parentScrollElement = getDocumentScrollElement(
        element,
      ) as HTMLElement;
      expect(parentScrollElement.id).toBe("parent2");
    });
  });
});
