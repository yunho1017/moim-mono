import { ActionCreators } from "../actions";
import { generateMockStore } from "app/__mocks__/mockStore";

describe("Image brochure actions", () => {
  let store: any;

  beforeEach(() => {
    store = generateMockStore();
    store.clearActions();
  });

  describe("when openImageBrochure", () => {
    it("should return OPEN_IMAGE_BROCHURE_DIALOG", () => {
      store.dispatch(ActionCreators.openImageBrochure("U1234"));
      const actions = store.getActions();
      expect(actions[0]).toEqual(ActionCreators.openImageBrochure("U1234"));
    });
  });

  describe("when closeImageBrochure", () => {
    it("should return CLOSE_IMAGE_BROCHURE_DIALOG", () => {
      store.dispatch(ActionCreators.closeImageBrochure());
      const actions = store.getActions();
      expect(actions[0]).toEqual(ActionCreators.closeImageBrochure());
    });
  });
});
