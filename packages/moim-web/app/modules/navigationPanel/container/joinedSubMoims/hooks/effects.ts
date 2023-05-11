import * as React from "react";

import { IHookProps, IHookHandlers } from "../hooks";

export default function useEffects(props: IHookProps, handlers: IHookHandlers) {
  const { currentUser } = props;
  const { handleGetJoinedSubMoims } = handlers;
  React.useEffect(() => {
    if (currentUser?.id) {
      handleGetJoinedSubMoims();
    }
  }, [currentUser?.id]);
}
