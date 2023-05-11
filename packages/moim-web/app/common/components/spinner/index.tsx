import * as React from "react";
import { Spinner } from "./styledComponents";

interface ISpinnerComponentProps {
  className?: string;
}

class SpinnerComponent extends React.PureComponent<ISpinnerComponentProps> {
  public render() {
    return <Spinner />;
  }
}

export default SpinnerComponent;
