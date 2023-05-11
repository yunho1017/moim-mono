import * as React from "react";
import { ShavedTextV2Wrapper } from "./styled";

interface IProps {
  line: number;
}

const ShavedTextV2: React.FC<IProps> = React.memo(({ line, children }) => (
  <ShavedTextV2Wrapper line={line}>{children}</ShavedTextV2Wrapper>
));

export default ShavedTextV2;
