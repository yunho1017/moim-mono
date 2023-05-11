import * as React from "react";
import loadable from "@loadable/component";
import LoadingIcon from "common/components/loading/icon";

export function VingleLoadable(component: () => Promise<any>) {
  return loadable<any>(component, {
    fallback: <LoadingIcon />,
  });
}

export class VingleError extends Error {}
