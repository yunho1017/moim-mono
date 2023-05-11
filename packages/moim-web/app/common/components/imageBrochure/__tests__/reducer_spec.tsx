import { reducer, INITIAL_STATE } from "../reducer";
import { AllActions } from "app/actions";
import { ActionCreators } from "../actions";

function reduceState(action: AllActions, state = INITIAL_STATE) {
  return reducer(state, action);
}

describe("Image brochure reducer", () => {
  let mockAction;
  describe("when receive OPEN_IMAGE_BROCHURE_DIALOG", () => {
    it("should change isImageBrochureOpen to true", () => {
      mockAction = ActionCreators.openImageBrochure("U1234");
      const mockNewState = reduceState(mockAction);

      expect(mockNewState.isOpen).toBeTruthy();
      expect(mockNewState.currentAssetOwnerId).toBe("U1234");
    });
  });

  describe("when receive CLOSE_IMAGE_BROCHURE_DIALOG", () => {
    it("should change isImageBrochureOpen to true", () => {
      mockAction = ActionCreators.closeImageBrochure();
      const mockNewState = reduceState(mockAction, {
        isOpen: true,
        currentAssetOwnerId: "U1234",
        initialSrc: "",
      });

      expect(mockNewState.isOpen).toBeFalsy();
      expect(mockNewState.currentAssetOwnerId).toBe("");
    });
  });
});
