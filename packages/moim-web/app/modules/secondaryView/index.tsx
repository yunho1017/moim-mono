import * as React from "react";
import * as ReactDOM from "react-dom";
import NativeSecondaryView from "./native";
import PluginSecondaryView from "./plugin";

import { useStoreState } from "app/store";
import { usePluginSecondaryView } from "app/common/hooks/useSecondaryView";

import { MoimURL } from "common/helpers/url";
import useIsMobile from "common/hooks/useIsMobile";

const SecondaryViewContainer: React.FC = () => {
  const isMobile = useIsMobile();
  const {
    nativeOpenStatus,
    pluginOpenStatus,
    pluginCurrentLocationHash,
  } = useStoreState(state => ({
    ...state.secondaryViewPage,
  }));
  const { redirect } = usePluginSecondaryView();

  const inner = React.useMemo(
    () => (
      <>
        <NativeSecondaryView />
        <PluginSecondaryView />
      </>
    ),
    [],
  );

  React.useEffect(() => {
    if (pluginOpenStatus && pluginCurrentLocationHash) {
      redirect({
        pathname: new MoimURL.PluginRightPanel({
          hash: pluginCurrentLocationHash,
        }).toString(),
      });
    }
  }, [pluginOpenStatus, pluginCurrentLocationHash, redirect]);

  return isMobile
    ? nativeOpenStatus || pluginOpenStatus
      ? ReactDOM.createPortal(inner, document.body)
      : null
    : inner;
};

export default SecondaryViewContainer;
