import * as React from "react";
import {
  INextActionContext,
  NextActionContext,
} from "common/helpers/nextActionProvider";

export default function useNextAction() {
  const provider = React.useContext(NextActionContext);

  return provider;
}

export function withNextAction<
  T extends NextActionHOCProps = NextActionHOCProps
>(WrappedComponent: React.ComponentType<T>) {
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";

  const ComponentWithRedirect = (props: Omit<T, keyof NextActionHOCProps>) => {
    const nextAction = useNextAction();

    return <WrappedComponent {...(props as T)} nextAction={nextAction} />;
  };

  ComponentWithRedirect.displayName = `withNextAction(${displayName})`;

  return ComponentWithRedirect;
}

export interface NextActionHOCProps {
  nextAction: INextActionContext;
}
