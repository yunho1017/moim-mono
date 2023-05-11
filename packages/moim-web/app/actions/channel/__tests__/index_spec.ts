jest.mock("common/api/channel");

import { generateMockStore, IThunkMockState } from "app/__mocks__/mockStore";
import { ActionCreators, getChannels, deleteChannel } from "../";
import { ActionCreators as EntityActionCreators } from "../../entity";
import {
  makeCancelTokenWithResponse,
  MOCK_ERROR,
} from "common/helpers/mockingCancelToken";
import { NORMALIZED } from "app/__mocks__";
import { ChannelTypes } from "app/actions/types";

describe("channel actions", () => {
  let store: IThunkMockState;

  beforeEach(() => {
    store = generateMockStore();
    store.clearActions();
  });

  describe("getChannels()", () => {
    describe("when succeed", () => {
      it("should dispatch action (START_GET_USERS, ADD_ENTITY, SUCCEEDED_FETCHING_CHANNEL_LIST)", async () => {
        await store.dispatch(getChannels({}));
        const [
          startAction,
          addEntityAction,
          succeedAction,
        ] = store.getActions();
        expect(startAction).toMatchObject(
          ActionCreators.startFetchingChannels(),
        );
        expect(addEntityAction).toMatchObject(
          EntityActionCreators.addEntity(NORMALIZED.SIMPLE_CHANNELS.entities),
        );
        expect(succeedAction).toMatchObject(
          ActionCreators.succeedFetchingChannels({
            channels: NORMALIZED.SIMPLE_CHANNELS.result,
          }),
        );
      });
    });

    describe("when failed", () => {
      it("should dispatch action (START_FETCHING_CHANNEL_LIST, FAILED_FETCHING_CHANNEL_LIST)", async () => {
        await store.dispatch(
          getChannels({}, makeCancelTokenWithResponse(500, MOCK_ERROR)),
        );
        const [startGetUsersAction, failedGetUsersAction] = store.getActions();
        expect(startGetUsersAction).toMatchObject(
          ActionCreators.startFetchingChannels(),
        );
        expect(failedGetUsersAction).toMatchObject(
          ActionCreators.failedFetchingChannels({}),
        );
      });
    });
  });

  describe("deleteChannel()", () => {
    describe("when succeed", () => {
      it("should dispatch action (START_DELETE_CHANNEL,  SUCCEEDED_DELETE_CHANNEL ACTION)", async () => {
        await store.dispatch(
          deleteChannel({ channelId: "C123" }, { succeed: "", failed: "" }),
        );
        const [startAction, succeedAction] = store.getActions();
        expect(startAction).toMatchObject(ActionCreators.startDeleteChannel());

        expect(succeedAction.type).toEqual(
          ChannelTypes.SUCCEEDED_DELETE_CHANNEL,
        );
      });
    });

    describe("when failed", () => {
      it("should dispatch action (START_DELETE_CHANNEL, FAILED_DELETE_CHANNEL)", async () => {
        await store.dispatch(
          deleteChannel(
            { channelId: "C123" },
            { succeed: "", failed: "" },
            makeCancelTokenWithResponse(500, MOCK_ERROR),
          ),
        );
        const [startGetUsersAction, failedGetUsersAction] = store.getActions();
        expect(startGetUsersAction).toMatchObject(
          ActionCreators.startDeleteChannel(),
        );
        expect(failedGetUsersAction).toMatchObject(
          ActionCreators.failedDeleteChannel({}),
        );
      });
    });
  });
});
