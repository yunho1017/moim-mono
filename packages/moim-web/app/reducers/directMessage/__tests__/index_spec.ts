import { reducer, INITIAL_STATE, IDirectMessageState } from "../";
import { DirectMessageTypes } from "app/actions/types";

describe("directMessage reducer", () => {
  let state: IDirectMessageState;
  describe("GET_DIRECT_MESSAGES", () => {
    describe("when receive START_GET_DIRECT_MESSAGES", () => {
      beforeEach(() => {
        state = reducer(INITIAL_STATE, {
          type: DirectMessageTypes.START_GET_DIRECT_MESSAGES,
        });
      });
      it("should getDirectMessagesLoading set true", () => {
        expect(state.getDirectMessagesLoading).toBe(true);
      });
    });
    describe("when receive SUCCEED_GET_DIRECT_MESSAGES", () => {
      describe("when directMessages data is empty", () => {
        beforeEach(() => {
          state = reducer(
            {
              ...INITIAL_STATE,
              getDirectMessagesLoading: true,
            },
            {
              type: DirectMessageTypes.SUCCEEDED_GET_DIRECT_MESSAGES,
              payload: {
                directMessages: {
                  data: ["C1234"],
                  paging: {},
                },
              },
            },
          );
        });
        it("should getDirectMessagesLoading set false", () => {
          expect(state.getDirectMessagesLoading).toBe(false);
        });
        it("should directMessages is payload.directMessages", () => {
          expect(state.directMessages).toEqual({
            data: ["C1234"],
            paging: {},
          });
        });
      });
      describe("when directMessages is not empty", () => {
        beforeEach(() => {
          state = reducer(
            {
              ...INITIAL_STATE,
              getDirectMessagesLoading: true,
              directMessages: {
                data: ["C1234"],
                paging: {},
              },
            },
            {
              type: DirectMessageTypes.SUCCEEDED_GET_DIRECT_MESSAGES,
              payload: {
                directMessages: {
                  data: ["C2345"],
                  paging: { after: "A1234" },
                },
              },
            },
          );
        });
        it("should data added from payload", () => {
          expect(state.directMessages).toEqual({
            data: ["C2345"],
            paging: { after: "A1234" },
          });
        });
      });
    });

    describe("GET_DIRECT_MESSAGE", () => {
      describe("when receive SUCCEED_GET_DIRECT_MESSAGE", () => {
        beforeEach(() => {
          state = reducer(
            {
              ...INITIAL_STATE,
              directMessages: { data: ["test"], paging: {} },
            },
            {
              type: DirectMessageTypes.SUCCEEDED_GET_DIRECT_MESSAGES,
              payload: {
                directMessages: {
                  data: ["C1234"],
                  paging: {},
                },
              },
            },
          );

          it("should concat directMessage to directMessages ", () => {
            expect(state.directMessages).toEqual({
              data: ["test", "C1234"],
              paging: {},
            });
          });
        });
      });
    });

    describe("when receive FAILED_GET_DIRECT_MESSAGES", () => {
      beforeEach(() => {
        state = reducer(
          {
            ...INITIAL_STATE,
            getDirectMessagesLoading: true,
          },
          {
            type: DirectMessageTypes.FAILED_GET_DIRECT_MESSAGES,
          },
        );
      });
      it("should getDirectMessagesLoading set false", () => {
        expect(state.getDirectMessagesLoading).toBe(false);
      });
    });
  });
  describe("CREATE_DIRECT_MESSAGE", () => {
    describe("START_CREATE_DIRECT_MESSAGE", () => {
      beforeEach(() => {
        state = reducer(INITIAL_STATE, {
          type: DirectMessageTypes.START_CREATE_DIRECT_MESSAGE,
        });
      });
      it("should set createDirectMessageLoading true", () => {
        expect(state.createDirectMessageLoading).toBe(true);
      });
    });
    describe("SUCCEED_CREATE_DIRECT_MESSAGE", () => {
      beforeEach(() => {
        state = reducer(
          {
            ...INITIAL_STATE,
            createDirectMessageLoading: true,
            directMessages: {
              data: ["C1234"],
              paging: {},
            },
          },
          {
            type: DirectMessageTypes.SUCCEEDED_CREATE_DIRECT_MESSAGE,
            payload: {
              directMessage: {
                data: "C2345",
              },
            },
          },
        );
      });
      it("should set createDirectMessageLoading false", () => {
        expect(state.createDirectMessageLoading).toBe(false);
      });
      it("should add directMessage data from payload", () => {
        expect(state.directMessages).toEqual({
          data: ["C1234", "C2345"],
          paging: {},
        });
      });
    });
    describe("FAILED_CREATE_DIRECT_MESSAGE", () => {
      beforeEach(() => {
        state = reducer(
          {
            ...INITIAL_STATE,
            createDirectMessageLoading: true,
          },
          {
            type: DirectMessageTypes.FAILED_CREATE_DIRECT_MESSAGE,
          },
        );
      });
      it("should set createDirectMessageLoading false", () => {
        expect(state.createDirectMessageLoading).toBe(false);
      });
    });
  });
});
