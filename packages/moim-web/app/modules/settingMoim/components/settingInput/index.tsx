import * as React from "react";
import { Wrapper, Description } from "./styled";
import { useHandlers } from "./hooks";

export interface IProps {
  input: React.ReactElement;
  direction: "horizontal" | "vertical";
  title?: React.ReactNode;
  description?: React.ReactNode;
  rightPadding?: number;
  leftIconElement?: React.SVGAttributes<HTMLOrSVGElement>;
}

function SettingInput(props: IProps) {
  const { description, rightPadding } = props;
  const { renderContent } = useHandlers(props);

  return (
    <Wrapper rightPadding={rightPadding}>
      {renderContent()}
      {description && <Description>{description}</Description>}
    </Wrapper>
  );
}

export default SettingInput;
