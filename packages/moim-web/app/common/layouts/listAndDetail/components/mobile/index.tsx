import { isiOS } from "common/helpers/browserDetect";
import * as React from "react";
import { Wrapper, Left, Right } from "./styled";

export interface IProps {
  isShowRightPanel?: boolean;
  detailElement: React.ReactNode;
  listElement?: React.ReactNode;
}

const MobileLayout: React.FC<IProps> = ({
  listElement,
  detailElement,
  isShowRightPanel,
}) => {
  const isIOS = isiOS();
  return (
    <Wrapper isShowRightPanel={isShowRightPanel || !listElement} isIOS={isIOS}>
      {listElement && <Left>{listElement}</Left>}
      <Right>{detailElement}</Right>
    </Wrapper>
  );
};

export default React.memo(MobileLayout);
