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
import BlockitHeader from "../header";
import BlockitFooter from "../footer";

interface IProps extends Omit<Moim.Blockit.IQuickLinkNavigationBlock, "type"> {
  wrapperStyle?: FlattenInterpolation<any>;
}

const QuickLinkNavigation: React.FC<IProps> = ({
  listElement,
  navigationItems,
  header,
  footer,
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
      <BlockitHeader
        title={header?.title}
        description={header?.description}
        showTitle={header?.showTitle ?? false}
        showDescription={header?.showDescription ?? false}
        showMoreButton={header?.showMoreButton ?? false}
      />
      <BlockitListLayout
        element={listElement}
        leftArrow={DimmedLeftArrow}
        rightArrow={DimmedRightArrow}
      >
        {items}
      </BlockitListLayout>
      <BlockitFooter showMoreButton={footer?.showMoreButton ?? false} />
    </Wrapper>
  );
};

export default withPlacement(React.memo(QuickLinkNavigation));
