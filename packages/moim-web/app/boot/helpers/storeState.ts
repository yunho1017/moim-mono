import _, { debounce } from "lodash";
import moment from "moment";
import { getDatabase } from "app/database";
import { INITIAL_STATE as CAMPAIGN_INITIAL_STATE } from "app/modules/campaign/reducer";
import { IAppState, initialState } from "app/rootReducer";
import { IAppStore } from "app/store";
import {
  CACHED_STORE_STATE_EXPIRED_DAYS,
  moimClientIdStoreName,
} from "../constants";
import { getDatabaseFromStore } from "./getDatabaseFromStore";
import { storeMoimClientId } from "./moimClientId";

function omitNonPersistenceFields(state: IAppState): IAppState {
  return {
    ...initialState,
    app: state.app,
    channelData: state.channelData,
    permission: {
      ...state.permission,
      permissionLoading: initialState.permission.permissionLoading,
    },
    directMessage: state.directMessage,
    group: state.group,
    commercePage: initialState.commercePage,
    entities: {
      ...state.entities,
      stats: {},
      threads: Object.entries(state.entities.threads).reduce(
        (heap, [key, value]) => {
          if (!value.id.startsWith("R")) {
            heap = {
              ...heap,
              [key]: value,
            };
          }
          return heap;
        },
        {},
      ),
      referenceBlockBlocks: {},
      commerce_category: {},
      commerce_product: {},
      commerce_productSet: {},
      commerce_seller: {},
      commerce_carts: {},
      commerce_purchaseItems: {},
      commerce_payments: {},
      commerce_purchases: {},
      commerce_variants: {},
      campaign_campaign: {},
      campaign_campaign_execution: {},
      campaign_execution_vote: {},
    },
  };
}

export async function setStoreState(db: LocalForage, state: IAppState) {
  await db.setItem<{
    payload: IAppState;
    updatedAt: number;
  }>("store", {
    payload: omitNonPersistenceFields(state),
    updatedAt: Date.now(),
  });
}

export async function clearCachedStore(storeName: string) {
  await getDatabase(storeName).removeItem("store");
}

export async function getStoreState(storeName: string) {
  try {
    const storeData = await getDatabase(storeName).getItem<{
      payload: IAppState;
      updatedAt?: number;
    } | null>("store");

    let store = storeData?.payload;
    if (
      storeData &&
      moment().diff(moment(storeData.updatedAt || undefined), "days") >
        CACHED_STORE_STATE_EXPIRED_DAYS
    ) {
      store = undefined;
    }

    return _.merge(initialState, store ?? {});
  } catch (error) {
    throw error;
  }
}

export function subscribeStoreForCache(store: IAppStore) {
  const saveStateToDB = debounce(async () => {
    const state = store.getState();
    const { app } = state;
    if (app.currentGroupId) {
      const db = getDatabaseFromStore(store);
      await Promise.all([
        setStoreState(db, state),
        db.setItem<string>(moimClientIdStoreName, storeMoimClientId(state)),
      ]);
    }
  }, 150);

  store.subscribe(() => {
    saveStateToDB();
  });
}

export function migrationStoreState(state: IAppState | undefined) {
  if (!state) {
    return undefined;
  }

  const migratedState = state;
  // Note: migration 해야되는 데이터를 여기에서 수정
  migratedState.campaignPage = CAMPAIGN_INITIAL_STATE;

  return migratedState;
}
