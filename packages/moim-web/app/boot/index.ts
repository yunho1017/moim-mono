import { updateActionsForRefresh } from "app/actions/boot";
import {
  bootstrap,
  getInitialGroupId,
  getMoimTheme,
  getParentMoimTheme,
} from "app/actions/group";

import { getTagSets } from "app/actions/tagset";
import { IAppState, initialState } from "app/rootReducer";
import { createAppStore, IAppStore } from "app/store";
import { isHubDomain } from "common/helpers/envChecker";
import selectHubMoimId from "common/helpers/selectHubMoimId";
import { History } from "history";
import { getMoimClientId } from "./helpers/moimClientId";
import {
  isRedirectFromExecutionRemit,
  isRedirectFromMint,
  isRedirectFromOAuth,
  isRedirectFromPayment,
  isRedirectFromPlugin,
} from "./helpers/redirectFromChecker";
import { migrationStoreState, clearCachedStore } from "./helpers/storeState";
import * as ExpiredInMemoryHelper from "common/helpers/expiredInMemoryHelper";
import { GROUP_ID, HUB_GROUP_ID } from "common/constants/keys";
import { compatibleOAuthV2 } from "./helpers/compatibleOAuthV2";

export async function initializeStore(history: History) {
  if (isHubDomain()) {
    return createAppStore(history);
  }
}

export async function bootStore(history: History): Promise<IAppStore> {
  try {
    let storedStore: IAppState | undefined | null;
    const cachedStoreName = localStorage.getItem("CURRENT_STORE_NAME");
    let moimId: string | null = null;

    if (cachedStoreName) {
      clearCachedStore(cachedStoreName);
      moimId = await getMoimClientId(cachedStoreName);
    }

    const store = createAppStore(
      history,
      migrationStoreState(storedStore || initialState),
    );

    // 현재 state에 groupId , hubGroupId가 없으면 initialize
    const {
      currentGroupId: initialGroupId,
      currentHubGroupId: initialHubGroupId,
    } = store.getState().app;
    if (!initialGroupId || !initialHubGroupId) {
      await store.dispatch(getInitialGroupId(moimId));
    }

    const { currentGroupId, currentHubGroupId } = store.getState().app;
    if (currentGroupId && currentHubGroupId) {
      // in memory helper에서 GroupId hubGroupId가 없으면 세팅
      if (!ExpiredInMemoryHelper.get(GROUP_ID)) {
        ExpiredInMemoryHelper.set(GROUP_ID, currentGroupId, -1);
      }

      if (!ExpiredInMemoryHelper.get(HUB_GROUP_ID)) {
        ExpiredInMemoryHelper.set(HUB_GROUP_ID, currentHubGroupId, -1);
      }
    }

    await isRedirectFromOAuth(store.dispatch, store.getState());
    isRedirectFromPlugin(store.dispatch);
    isRedirectFromPayment(store.dispatch);
    isRedirectFromExecutionRemit(store.dispatch);
    isRedirectFromMint(store.dispatch);

    if (currentHubGroupId) {
      await compatibleOAuthV2(currentHubGroupId);
    }

    return store;
  } catch (error) {
    throw error;
  }
}

export async function bootData(store: IAppStore) {
  try {
    await store.dispatch(bootstrap());
    const hubGroupId = selectHubMoimId(store.getState());

    if (!hubGroupId) {
      return;
    }

    await Promise.all([
      store.dispatch(
        getMoimTheme({
          groupId: store.getState().app.currentGroupId!,
        }),
      ),
      store.dispatch(
        getParentMoimTheme({
          groupId: hubGroupId,
        }),
      ),
      store.dispatch(getTagSets()),
      store.dispatch(updateActionsForRefresh()),
    ]);

    return store;
  } catch (error) {
    throw error;
  }
}
