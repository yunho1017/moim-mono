import * as React from "react";
import PositionItemBase from "./base";
import { RightArrowButton } from "../styled";

type IProps = Omit<
  React.ComponentProps<typeof PositionItemBase>,
  "rightContent"
>;

function PositionItemBasic(props: IProps) {
  return <PositionItemBase {...props} rightContent={<RightArrowButton />} />;
}

export default PositionItemBasic;
