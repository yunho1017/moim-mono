import { push } from "connected-react-router";
import { getRemoteConfig } from "common/helpers/firebase";
import { MoimURL } from "common/helpers/url";
import { ThunkPromiseResult } from "app/store";

const SERVER_MAINTENANCE_CONFIG_NAME = "is_server_maintenance";

export function checkServerMaintenance(): ThunkPromiseResult {
  return async dispatch => {
    const remoteConfig = await getRemoteConfig();

    if (!remoteConfig) {
      return;
    }

    try {
      await remoteConfig.fetchAndActivate();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error("FireBase Remote Config fail Loaded", e);
      return;
    }

    const isServerMaintenance = remoteConfig.getBoolean(
      SERVER_MAINTENANCE_CONFIG_NAME,
    );

    if (isServerMaintenance) {
      dispatch(push(new MoimURL.ServerMaintenance().toString()));
    }
  };
}
