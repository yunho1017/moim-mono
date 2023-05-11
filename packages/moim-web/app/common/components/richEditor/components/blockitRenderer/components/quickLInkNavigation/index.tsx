import * as React from "react";
import { FlattenInterpolation } from "styled-components";
import BlockitListLayout from "common/components/blockitListLayout";
import {
  DimmedLeftArrow,
  DimmedRightArrow,
} from "common/components/horizontalScroll/arrows";
import NavItem from "./components/item";
import { Wrapper } from "./styled";
import { withPlacement } from "../../hoc/withPlacement";

interface IProps extends Omit<Moim.Blockit.IQuickLinkNavigationBlock, "type"> {
  wrapperStyle?: FlattenInterpolation<any>;
}

const QuickLinkNavigation: React.FC<IProps> = ({
  listElement,
  navigationItems,
}) => {
  const items = React.useMemo(
    () =>
      [...navigationItems]
        .sort((x, y) => y.priority - x.priority)
        .map(datum => <NavItem {...datum} />),
    [navigationItems],
  );

  return (
    <Wrapper>
      <BlockitListLayout
        element={listElement}
        leftArrow={DimmedLeftArrow}
        rightArrow={DimmedRightArrow}
      >
        {items}
      </BlockitListLayout>
    </Wrapper>
  );
};

export default withPlacement(React.memo(QuickLinkNavigation));
