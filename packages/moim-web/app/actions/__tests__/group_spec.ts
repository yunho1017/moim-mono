jest.mock("common/api/group");

import {
  makeCancelTokenWithResponse,
  MOCK_ERROR,
} from "common/helpers/mockingCancelToken";
import { generateMockStore, IThunkMockState } from "app/__mocks__/mockStore";
import {
  getMoimTheme,
  renameMoim,
  setMoimDescription,
  updateMoimIcon,
  getMoimCover,
} from "../group";
import { EntityTypes, GroupTypes } from "../types";

describe("Group Action", () => {
  let store: IThunkMockState;

  beforeEach(() => {
    store = generateMockStore();
    store.clearActions();
  });

  describe("renameMoim()", () => {
    const id = "G1234";
    const name = "Vingle";

    describe("when succeed", () => {
      it("should dispatch START_RENAME_MOIM, ADD_ENTITY, SUCCEED_RENAME_MOIM action", async () => {
        await store.dispatch(
          renameMoim({
            id,
            name,
          }),
        );

        const [
          startRenameMoim,
          addEntity,
          succeedRenameMoim,
        ] = store.getActions();

        expect(startRenameMoim).toMatchObject({
          type: GroupTypes.START_RENAME_MOIM,
        });

        expect(addEntity).toMatchObject({
          type: EntityTypes.ADD_ENTITY,
        });

        expect(succeedRenameMoim).toMatchObject({
          type: GroupTypes.SUCCEED_RENAME_MOIM,
        });
      });
    });

    describe("when failed", () => {
      it("should dispatch START_RENAME_MOIM, FAILED_RENAME_MOIM action", async () => {
        await store.dispatch(
          renameMoim(
            {
              id,
              name,
            },
            makeCancelTokenWithResponse(500, MOCK_ERROR),
          ),
        );

        const [startRenameMoim, failedRenameMoim] = store.getActions();

        expect(startRenameMoim).toMatchObject({
          type: GroupTypes.START_RENAME_MOIM,
        });

        expect(failedRenameMoim).toEqual({
          type: GroupTypes.FAILED_RENAME_MOIM,
          payload: {
            id,
            error: MOCK_ERROR,
          },
        });
      });
    });
  });

  describe("setMoimDescription()", () => {
    const id = "G1234";
    const description = "Hello !!";

    describe("when succeed", () => {
      it("should dispatch START_SET_DESCRIPTION_MOIM, ADD_ENTITY, SUCCEED_SET_DESCRIPTION_MOIM action", async () => {
        await store.dispatch(
          setMoimDescription({
            id,
            description,
          }),
        );

        const [
          startSetDescriptionMoim,
          addEntity,
          succeedSetDescriptionMoim,
        ] = store.getActions();

        expect(startSetDescriptionMoim).toMatchObject({
          type: GroupTypes.START_SET_DESCRIPTION_MOIM,
        });

        expect(addEntity).toMatchObject({
          type: EntityTypes.ADD_ENTITY,
        });

        expect(succeedSetDescriptionMoim).toMatchObject({
          type: GroupTypes.SUCCEED_SET_DESCRIPTION_MOIM,
        });
      });
    });

    describe("when failed", () => {
      it("should dispatch START_SET_DESCRIPTION_MOIM, FAILED_SET_DESCRIPTION_MOIM action", async () => {
        await store.dispatch(
          setMoimDescription(
            {
              id,
              description,
            },
            makeCancelTokenWithResponse(500, MOCK_ERROR),
          ),
        );

        const [
          startSetDescriptionMoim,
          failedSetDescriptionMoim,
        ] = store.getActions();

        expect(startSetDescriptionMoim).toMatchObject({
          type: GroupTypes.START_SET_DESCRIPTION_MOIM,
        });

        expect(failedSetDescriptionMoim).toEqual({
          type: GroupTypes.FAILED_SET_DESCRIPTION_MOIM,
          payload: {
            id,
            error: MOCK_ERROR,
          },
        });
      });
    });
  });

  describe("updateMoimIcon()", () => {
    const groupId = "G1234";
    const iconId = "I1234";

    describe("when succeed", () => {
      it("should dispatch START_UPDATE_GROUP_ICON, ADD_ENTITY, SUCCEED_UPDATE_GROUP_ICON Action", async () => {
        await store.dispatch(updateMoimIcon({ iconId, id: groupId }));

        const [
          startUpdateMoimIcon,
          addEntity,
          succeedUpdateMoimIcon,
        ] = store.getActions();

        expect(startUpdateMoimIcon).toMatchObject({
          type: GroupTypes.START_UPDATE_GROUP_ICON,
        });

        expect(addEntity).toMatchObject({
          type: EntityTypes.ADD_ENTITY,
        });

        expect(succeedUpdateMoimIcon).toMatchObject({
          type: GroupTypes.SUCCEED_UPDATE_GROUP_ICON,
        });
      });
    });

    describe("when failed", () => {
      it("should dispatch START_UPDATE_GROUP_ICON, FAILED_UPDATE_GROUP_ICON action", async () => {
        await store.dispatch(
          updateMoimIcon(
            { iconId, id: groupId },
            makeCancelTokenWithResponse(500, MOCK_ERROR),
          ),
        );

        const [startUpdateMoimIcon, failedUpdateMoimIcon] = store.getActions();

        expect(startUpdateMoimIcon).toMatchObject({
          type: GroupTypes.START_UPDATE_GROUP_ICON,
        });

        expect(failedUpdateMoimIcon).toMatchObject({
          type: GroupTypes.FAILED_UPDATE_GROUP_ICON,
        });
      });
    });
  });

  describe("getMoimTheme()", () => {
    const groupId = "G1234";

    describe("when succeed", () => {
      it("should dispatch START_GET_MOIM_THEME, SUCCEED_GET_MOIM_THEME", async () => {
        await store.dispatch(getMoimTheme({ groupId }));

        const [startGetMoimTheme, succeedGetMoimTheme] = store.getActions();

        expect(startGetMoimTheme).toMatchObject({
          type: GroupTypes.START_GET_MOIM_THEME,
        });

        expect(succeedGetMoimTheme).toMatchObject({
          type: GroupTypes.SUCCEED_GET_MOIM_THEME,
        });
      });
    });

    describe("when failed", () => {
      it("should dispatch START_GET_MOIM_THEME, FAILED_GET_MOIM_THEME action", async () => {
        await store.dispatch(
          getMoimTheme(
            { groupId },
            makeCancelTokenWithResponse(500, MOCK_ERROR),
          ),
        );

        const [startGetMoimTheme, failedGetMoimTheme] = store.getActions();

        expect(startGetMoimTheme).toMatchObject({
          type: GroupTypes.START_GET_MOIM_THEME,
        });

        expect(failedGetMoimTheme).toMatchObject({
          type: GroupTypes.FAILED_GET_MOIM_THEME,
        });
      });
    });
  });

  describe("getMoimCover()", () => {
    describe("when succeed", () => {
      it("should dispatch START_GET_MOIM_COVER, SUCCEED_GET_MOIM_COVER", async () => {
        await store.dispatch(getMoimCover());

        const [startGetMoimCover, succeedGetMoimCover] = store.getActions();

        expect(startGetMoimCover).toMatchObject({
          type: GroupTypes.START_GET_MOIM_COVER,
        });

        expect(succeedGetMoimCover).toMatchObject({
          type: GroupTypes.SUCCEED_GET_MOIM_COVER,
        });
      });
    });

    describe("when failed", () => {
      it("should dispatch START_GET_MOIM_COVER, FAILED_GET_MOIM_COVER action", async () => {
        await store.dispatch(
          getMoimCover(makeCancelTokenWithResponse(500, MOCK_ERROR)),
        );

        const [startGetMoimCover, failedGetMoimCover] = store.getActions();

        expect(startGetMoimCover).toMatchObject({
          type: GroupTypes.START_GET_MOIM_COVER,
        });

        expect(failedGetMoimCover).toMatchObject({
          type: GroupTypes.FAILED_GET_MOIM_COVER,
        });
      });
    });
  });
});
