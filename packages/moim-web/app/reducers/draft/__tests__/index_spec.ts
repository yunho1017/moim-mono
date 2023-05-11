import { INITIAL_STATE, reducer, IDraftState } from "..";
import { ForumDraftTypes } from "app/actions/types";

describe("Draft reducer", () => {
  let state: IDraftState;

  describe("when receive OPEN_DRAFT_LIST_MODAL", () => {
    it("should change modalOpen", () => {
      state = reducer(INITIAL_STATE, {
        type: ForumDraftTypes.OPEN_DRAFT_LIST_MODAL,
      });
      expect(state.modalOpen).toBeTruthy();
    });
  });

  describe("when receive CLOSE_DRAFT_LIST_MODAL", () => {
    it("should change modalOpen", () => {
      state = reducer(
        {
          ...INITIAL_STATE,
          modalOpen: true,
        },
        {
          type: ForumDraftTypes.CLOSE_DRAFT_LIST_MODAL,
        },
      );
      expect(state.modalOpen).toBeFalsy();
    });
  });

  describe("when receive START_SAVE_DRAFT", () => {
    it("should change isSaving, errorBy", () => {
      state = reducer(INITIAL_STATE, {
        type: ForumDraftTypes.START_SAVE_DRAFT,
      });
      expect(state.isSaving).toBeTruthy();
      expect(state.errorBy).toBeNull();
    });
  });

  describe("when receive START_UPDATE_DRAFT", () => {
    it("should change isSaving, errorBy", () => {
      state = reducer(INITIAL_STATE, {
        type: ForumDraftTypes.START_UPDATE_DRAFT,
      });
      expect(state.isSaving).toBeTruthy();
      expect(state.errorBy).toBeNull();
    });
  });

  describe("when receive FAILED_UPDATE_DRAFT", () => {
    it("should change isSaving, errorBy", () => {
      state = reducer(INITIAL_STATE, {
        type: ForumDraftTypes.FAILED_UPDATE_DRAFT,
      });
      expect(state.isSaving).toBeFalsy();
      expect(state.errorBy).toBe("update");
    });
  });

  describe("when receive FAILED_SAVE_DRAFT", () => {
    it("should change isSaving, errorBy", () => {
      state = reducer(INITIAL_STATE, {
        type: ForumDraftTypes.FAILED_SAVE_DRAFT,
      });
      expect(state.isSaving).toBeFalsy();
      expect(state.errorBy).toBe("save");
    });
  });

  describe("when receive SUCCEEDED_UPDATE_DRAFT", () => {
    it("should change isSaving", () => {
      state = reducer(INITIAL_STATE, {
        type: ForumDraftTypes.SUCCEEDED_UPDATE_DRAFT,
      });
      expect(state.isSaving).toBeFalsy();
    });
  });

  describe("when receive SUCCEEDED_SAVE_DRAFT", () => {
    it("should change isSaving, currentDraftId", () => {
      state = reducer(INITIAL_STATE, {
        type: ForumDraftTypes.SUCCEEDED_SAVE_DRAFT,
        payload: { draftId: "X123" },
      });
      expect(state.isSaving).toBeFalsy();
      expect(state.currentDraftId).toBe("X123");
    });
  });

  describe("when receive SET_CURRENT_DRAFT", () => {
    it("should change currentDraftId", () => {
      state = reducer(INITIAL_STATE, {
        type: ForumDraftTypes.SET_CURRENT_DRAFT,
        payload: { draftId: "X123" },
      });
      expect(state.currentDraftId).toBe("X123");
    });
  });

  describe("when receive START_DELETE_DRAFT", () => {
    it("should change deleteStateRecord", () => {
      state = reducer(INITIAL_STATE, {
        type: ForumDraftTypes.START_DELETE_DRAFT,
        payload: { draftId: "X123" },
      });
      expect(state.deleteStateRecord).toHaveProperty("X123");
      expect(state.deleteStateRecord.X123.loading).toBeTruthy();
      expect(state.deleteStateRecord.X123.failed).toBeFalsy();
    });
  });

  describe("when receive FAILED_DELETE_DRAFT", () => {
    it("should change deleteStateRecord", () => {
      state = reducer(INITIAL_STATE, {
        type: ForumDraftTypes.FAILED_DELETE_DRAFT,
        payload: { draftId: "X123" },
      });
      expect(state.deleteStateRecord).toHaveProperty("X123");
      expect(state.deleteStateRecord.X123.loading).toBeFalsy();
      expect(state.deleteStateRecord.X123.failed).toBeTruthy();
    });
  });

  describe("when receive SUCCEEDED_DELETE_DRAFT", () => {
    it("should change deleteStateRecord, drafts", () => {
      state = reducer(
        {
          ...INITIAL_STATE,
          drafts: {
            data: ["X123", "X456"],
            paging: {},
          },
        },
        {
          type: ForumDraftTypes.SUCCEEDED_DELETE_DRAFT,
          payload: { draftId: "X123" },
        },
      );
      expect(state.deleteStateRecord).not.toHaveProperty("X123");
      expect(state.drafts.data).not.toContain("X123");
      expect(state.drafts.data).toHaveLength(1);
    });
  });

  describe("when receive START_GET_DRAFT_LIST", () => {
    it("should change isListLoading, errorBy", () => {
      state = reducer(INITIAL_STATE, {
        type: ForumDraftTypes.START_GET_DRAFT_LIST,
      });
      expect(state.isListLoading).toBeTruthy();
      expect(state.errorBy).toBeNull();
    });
  });

  describe("when receive FAILED_GET_DRAFT_LIST", () => {
    it("should change isLoading, errorBy", () => {
      state = reducer(INITIAL_STATE, {
        type: ForumDraftTypes.FAILED_GET_DRAFT_LIST,
      });
      expect(state.isListLoading).toBeFalsy();
      expect(state.errorBy).toBe("load");
    });
  });

  describe("when receive SUCCEEDED_GET_DRAFT_LIST", () => {
    it("should change isLoading, drafts", () => {
      state = reducer(
        {
          ...INITIAL_STATE,
          drafts: {
            data: ["X123"],
            paging: { after: "P1" },
          },
        },
        {
          type: ForumDraftTypes.SUCCEEDED_GET_DRAFT_LIST,
          payload: {
            data: ["X456"],
            paging: {
              after: "P2",
            },
          },
        },
      );
      expect(state.isListLoading).toBeFalsy();
      expect(state.drafts.data).toHaveLength(2);
      expect(state.drafts.paging).toHaveProperty("after");
      expect(state.drafts.paging.after).toBe("P2");
    });
  });

  describe("when receive START_DELETE_ALL_DRAFT", () => {
    it("should change isDeleting, errorBy", () => {
      state = reducer(INITIAL_STATE, {
        type: ForumDraftTypes.START_DELETE_ALL_DRAFT,
      });
      expect(state.isDeleting).toBeTruthy();
      expect(state.errorBy).toBeNull();
    });
  });

  describe("when receive FAILED_DELETE_ALL_DRAFT", () => {
    it("should change isDeleting, errorBy", () => {
      state = reducer(INITIAL_STATE, {
        type: ForumDraftTypes.FAILED_DELETE_ALL_DRAFT,
      });
      expect(state.isDeleting).toBeFalsy();
      expect(state.errorBy).toBe("deleteAll");
    });
  });

  describe("when receive SUCCEEDED_DELETE_ALL_DRAFT", () => {
    it("should change isDeleting, errorBy", () => {
      state = reducer(
        {
          ...INITIAL_STATE,
          drafts: {
            data: ["X123"],
            paging: { after: "P1" },
          },
        },
        {
          type: ForumDraftTypes.SUCCEEDED_DELETE_ALL_DRAFT,
        },
      );
      expect(state.isDeleting).toBeFalsy();
      expect(state.drafts.data).toHaveLength(0);
    });
  });

  describe("when receive SUCCEEDED_GET_DRAFT_COUNT", () => {
    it("should change draftCount", () => {
      state = reducer(INITIAL_STATE, {
        type: ForumDraftTypes.SUCCEEDED_GET_DRAFT_COUNT,
        payload: { count: 10 },
      });

      expect(state.draftCount).toBe(10);
    });
  });
});
