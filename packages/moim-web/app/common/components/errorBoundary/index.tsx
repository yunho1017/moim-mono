import * as React from "react";
import { logException } from "app/common/helpers/errorLogger";

interface IProps {
  displayErrorMessage?: React.ReactNode;
}

interface IState {
  hasError: boolean;
}
export default class ErrorBoundary extends React.Component<IProps, IState> {
  public state: IState = {
    hasError: false,
  };

  public static getDerivedStateFromError() {
    return { hasError: true };
  }

  public componentDidCatch(error: any) {
    logException({ error });
  }

  public render() {
    if (this.state.hasError) {
      return this.props.displayErrorMessage || null;
    }

    return this.props.children;
  }
}
