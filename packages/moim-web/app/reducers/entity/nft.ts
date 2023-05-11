import { produce } from "immer";
import { AllActions } from "app/actions";
import { EntityTypes } from "app/actions/types";

export const INITIAL_STATE_ITEM: Record<Moim.Id, Moim.NFT.INftDetail> = {};
export const INITIAL_STATE_CONTRACT: Record<Moim.Id, Moim.NFT.IContract> = {};
export const INITIAL_STATE_SET: Record<
  Moim.Id,
  Moim.IPaginatedListResponse<Moim.NFT.INftSet>
> = {};
export const INITIAL_STATE_SCHEDULE: Record<Moim.Id, Moim.NFT.ISchedule> = {};

export function nftItemReducer(
  state: Record<Moim.Id, Moim.NFT.INftDetail> = INITIAL_STATE_ITEM,
  action: AllActions,
) {
  return produce(state, draft => {
    switch (action.type) {
      case EntityTypes.ADD_ENTITY: {
        if (action.payload.nftItems) {
          Object.entries(action.payload.nftItems).forEach(([key, value]) => {
            draft[key] = value;
          });
        }
        break;
      }

      default: {
        break;
      }
    }
  });
}

export function nftContractReducer(
  state: Record<Moim.Id, Moim.NFT.IContract> = INITIAL_STATE_CONTRACT,
  action: AllActions,
) {
  return produce(state, draft => {
    switch (action.type) {
      case EntityTypes.ADD_ENTITY: {
        if (action.payload.nftContracts) {
          Object.entries(action.payload.nftContracts).forEach(
            ([key, value]) => {
              draft[key] = value;
            },
          );
        }
        break;
      }

      default: {
        break;
      }
    }
  });
}

export function nftScheduleReducer(
  state: Record<Moim.Id, Moim.NFT.ISchedule> = INITIAL_STATE_SCHEDULE,
  action: AllActions,
) {
  return produce(state, draft => {
    switch (action.type) {
      case EntityTypes.ADD_ENTITY: {
        if (action.payload.nftSchedules) {
          Object.entries(action.payload.nftSchedules).forEach(
            ([key, value]) => {
              draft[key] = value;
            },
          );
        }
        break;
      }

      default: {
        break;
      }
    }
  });
}
