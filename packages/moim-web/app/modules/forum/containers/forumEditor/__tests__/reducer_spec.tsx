import { reducer, INITIAL_STATE } from "../reducer";
import { AllActions } from "app/actions";
import { ActionCreators } from "app/actions/forum";

const reduceState = (action: AllActions, state = INITIAL_STATE) =>
  reducer(state, action);

describe("ForumEditorContainer's page reducer", () => {
  describe("when given START_POSTING_THREAD action", () => {
    it("should isLoading to true", () => {
      const result = reduceState(ActionCreators.startPostingThread());

      expect(result.isLoading).toBeTruthy();
      expect(result.hasFailed).toBeFalsy();
      expect(result.isPosted).toBeFalsy();
    });
  });

  describe("when given FAILED_POSTING_THREAD action", () => {
    it("should hasFailed to true", () => {
      const result = reduceState(ActionCreators.failedPostingThread());

      expect(result.isLoading).toBeFalsy();
      expect(result.hasFailed).toBeTruthy();
      expect(result.isPosted).toBeFalsy();
    });
  });

  describe("when given SUCCEEDED_POSTING_THREAD action", () => {
    it("should isLoading to true", () => {
      const result = reduceState(
        ActionCreators.succeededPostingThread("F12354", "t1235"),
      );

      expect(result.isLoading).toBeFalsy();
      expect(result.hasFailed).toBeFalsy();
      expect(result.isPosted).toBeTruthy();
    });
  });
});
