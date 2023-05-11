import produce from "immer";
import uniq from "lodash/uniq";

import { AllActions } from "app/actions";
import { PositionTypes } from "app/actions/types";
import mergePaginatedResponse from "common/helpers/mergePaginatedResponse";

export interface IPositionState {
  positions: Moim.IPaginatedListResponse<Moim.Id>;
  positionMemberMap: Record<Moim.Id, Moim.IPaginatedListResponse<Moim.Id>>;
  getPositionLoading: Record<Moim.Id, boolean>;
  getPositionMembersLoading: Record<Moim.Id, boolean>;
  appointPositionLoading: Record<Moim.Id, boolean>;
  dismissPositionLoading: Record<Moim.Id, boolean>;
  updatePositionLoading: Record<Moim.Id, boolean>;
  deletePositionLoading: Record<Moim.Id, boolean>;
  deletePositionError: Record<Moim.Id, Moim.IErrorResponse>;
  getPositionsLoading: boolean;
  createPositionLoading: boolean;
}

export const INITIAL_STATE: IPositionState = {
  positions: {
    data: [],
    paging: {},
  },
  positionMemberMap: {},
  getPositionLoading: {},
  getPositionMembersLoading: {},
  appointPositionLoading: {},
  dismissPositionLoading: {},
  updatePositionLoading: {},
  deletePositionLoading: {},
  deletePositionError: {},
  getPositionsLoading: false,
  createPositionLoading: false,
};

export function reducer(state = INITIAL_STATE, action: AllActions) {
  return produce(state, draft => {
    switch (action.type) {
      case PositionTypes.START_GET_POSITIONS: {
        draft.getPositionsLoading = true;
        break;
      }

      case PositionTypes.SUCCEED_GET_POSITIONS: {
        const { positions } = action.payload;

        draft.positions = mergePaginatedResponse(draft.positions, positions);
        draft.getPositionsLoading = false;
        break;
      }

      case PositionTypes.FAILED_GET_POSITIONS: {
        draft.getPositionsLoading = false;
        break;
      }

      case PositionTypes.START_GET_POSITION: {
        draft.getPositionLoading[action.payload.positionId] = true;
        break;
      }

      case PositionTypes.SUCCEED_GET_POSITION: {
        const positionId = action.payload.position.data;

        draft.positions.data = uniq(draft.positions.data.concat([positionId]));
        draft.getPositionLoading[positionId] = false;
        break;
      }

      case PositionTypes.FAILED_GET_POSITION: {
        draft.getPositionLoading[action.payload.positionId] = false;
        break;
      }

      case PositionTypes.START_GET_POSITIONS_BATCH: {
        const { positionIds } = action.payload;

        positionIds.forEach(positionId => {
          draft.getPositionLoading[positionId] = true;
        });
        break;
      }

      case PositionTypes.SUCCEED_GET_POSITIONS_BATCH: {
        const { data: positionIds } = action.payload.positions;

        draft.positions.data = uniq(draft.positions.data.concat(positionIds));
        positionIds.forEach(positionId => {
          draft.getPositionLoading[positionId] = false;
        });

        break;
      }

      case PositionTypes.FAILED_GET_POSITIONS_BATCH: {
        const { positionIds } = action.payload;

        positionIds.forEach(positionId => {
          draft.getPositionLoading[positionId] = false;
        });

        break;
      }

      case PositionTypes.START_CREATE_POSITION: {
        draft.createPositionLoading = true;
        break;
      }

      case PositionTypes.SUCCEED_CREATE_POSITION: {
        const { position } = action.payload;

        draft.positions.data = uniq(
          draft.positions.data.concat([position.data]),
        );
        draft.createPositionLoading = false;
        break;
      }

      case PositionTypes.FAILED_CREATE_POSITION: {
        draft.createPositionLoading = false;
        break;
      }

      case PositionTypes.START_APPOINT_POSITION: {
        const { positionId } = action.payload;

        draft.appointPositionLoading[positionId] = true;
        break;
      }

      case PositionTypes.SUCCEED_APPOINT_POSITION: {
        const { position, members } = action.payload;

        draft.appointPositionLoading[position.data] = false;
        draft.positionMemberMap[position.data] = mergePaginatedResponse(
          draft.positionMemberMap[position.data],
          members,
        );

        break;
      }

      case PositionTypes.FAILED_APPOINT_POSITION: {
        const { positionId } = action.payload;

        draft.appointPositionLoading[positionId] = false;
        break;
      }

      case PositionTypes.START_DISMISS_POSITION: {
        const { positionId } = action.payload;

        draft.dismissPositionLoading[positionId] = true;
        break;
      }

      case PositionTypes.SUCCEED_DISMISS_POSITION: {
        const { position, members } = action.payload;

        draft.dismissPositionLoading[position.data] = false;

        if (!draft.positionMemberMap[position.data]) {
          draft.positionMemberMap[position.data] = {
            data: [],
            paging: {},
          };
        }

        draft.positionMemberMap[position.data].data = draft.positionMemberMap[
          position.data
        ].data.filter(memberId => !members.data.includes(memberId));
        break;
      }

      case PositionTypes.FAILED_DISMISS_POSITION: {
        const { positionId } = action.payload;

        draft.dismissPositionLoading[positionId] = false;
        break;
      }

      case PositionTypes.START_UPDATE_POSITION_INFO:
      case PositionTypes.START_UPDATE_POSITION_PRIORITY: {
        const { positionId } = action.payload;

        draft.updatePositionLoading[positionId] = true;
        break;
      }

      case PositionTypes.SUCCEED_UPDATE_POSITION_INFO: {
        const { position } = action.payload;

        draft.updatePositionLoading[position.data] = false;
        break;
      }

      case PositionTypes.SUCCEED_UPDATE_POSITION_PRIORITY: {
        const { position } = action.payload;
        draft.updatePositionLoading[position.id] = false;
        break;
      }

      case PositionTypes.FAILED_UPDATE_POSITION_INFO:
      case PositionTypes.FAILED_UPDATE_POSITION_PRIORITY: {
        const { positionId } = action.payload;

        draft.updatePositionLoading[positionId] = false;
        break;
      }

      case PositionTypes.START_DELETE_POSITION: {
        const { positionId } = action.payload;

        draft.deletePositionLoading[positionId] = true;
        break;
      }

      case PositionTypes.SUCCEED_DELETE_POSITION: {
        const { position } = action.payload;

        draft.deletePositionLoading[position.data] = false;
        draft.positions.data = draft.positions.data.filter(
          positionId => positionId !== position.data,
        );
        delete draft.positionMemberMap[position.data];
        break;
      }

      case PositionTypes.FAILED_DELETE_POSITION: {
        const { positionId, error } = action.payload;

        draft.deletePositionLoading[positionId] = false;
        draft.deletePositionError[positionId] = error;
        break;
      }

      case PositionTypes.START_GET_POSITION_MEMBERS: {
        const { positionId } = action.payload;

        draft.getPositionMembersLoading[positionId] = true;
        break;
      }

      case PositionTypes.SUCCEED_GET_POSITION_MEMBERS: {
        const { positionId, members } = action.payload;
        draft.positionMemberMap[positionId] = mergePaginatedResponse(
          draft.positionMemberMap[positionId],
          members,
        );
        draft.getPositionMembersLoading[positionId] = false;
        break;
      }

      case PositionTypes.FAILED_GET_POSITION_MEMBERS: {
        const { positionId } = action.payload;

        draft.getPositionMembersLoading[positionId] = false;
        break;
      }

      default: {
        return state;
      }
    }
  });
}
