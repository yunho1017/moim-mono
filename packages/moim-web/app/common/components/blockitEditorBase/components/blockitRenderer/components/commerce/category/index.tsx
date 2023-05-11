import * as React from "react";
import { FlattenInterpolation } from "styled-components";
import { useStoreState } from "app/store";
import { getStoreCommerceCategoriesSelector } from "app/selectors/commerce";
import useIsMobile from "common/hooks/useIsMobile";
import { MoimURL } from "common/helpers/url";
import Skeleton from "./skeleton";
import { Container, Wrapper, GridLayout, Item } from "./styled";
import { withPlacement } from "../../../hoc/withPlacement";
import BlockitHeader from "../../header";
import BlockitFooter from "../../footer";
import { AnalyticsClass } from "common/helpers/analytics/analytics";

interface IProps extends Omit<Moim.Blockit.Commerce.ICategoryBlock, "type"> {
  wrapperStyle?: FlattenInterpolation<any>;
  selectedCategoryId?: Moim.Id;
}

/**
 * Note: category id all 케이스는 bootAPI호출 직후 getCategories()호출
 * 별도로 categoryId가 주어졌을때 케이스는 추후 개발.
 */
const CategoryBlock: React.FC<IProps> = ({
  // categoryId,
  selectedCategoryId,
  itemContainerWidth,
  itemContainerWidth_web,
  columnCount, // mobile 4 고정
  columnCount_web,
  rowCount,
  rowCount_web,
  itemGutterSize,
  itemGutterSize_web,
  itemStyle,
  itemStyle_web,
  header,
  footer,
}) => {
  const isMobile = useIsMobile();
  const { categories, isLoading } = useStoreState(state => ({
    categories: getStoreCommerceCategoriesSelector(state),
    isLoading: state.commerce.getCategoriesLoading,
  }));

  const targetContainerWidth = React.useMemo(
    () => (isMobile ? itemContainerWidth : itemContainerWidth_web),
    [isMobile, itemContainerWidth, itemContainerWidth_web],
  );

  const targetColumnCount = React.useMemo(
    () => (isMobile ? columnCount ?? 4 : columnCount_web ?? 8),
    [columnCount, columnCount_web, isMobile],
  );

  const targetRowCount = React.useMemo(
    () => (isMobile ? rowCount : rowCount_web) || 1,
    [isMobile, rowCount, rowCount_web],
  );

  const targetGap = React.useMemo(
    () => (isMobile ? itemGutterSize : itemGutterSize_web),
    [isMobile, itemGutterSize, itemGutterSize_web],
  );

  const targetItemStyle = React.useMemo(
    () => (isMobile ? itemStyle : itemStyle_web),
    [isMobile, itemStyle, itemStyle_web],
  );

  const elements = React.useMemo(() => {
    if (isLoading && categories.data.length === 0) {
      return new Array(targetColumnCount).fill(0).map(_ => <Skeleton />);
    }

    return categories.data.map(i => (
      <Item
        key={`category_block_item_${i.id}`}
        text={i.name}
        imageSrc={i.imageUrl}
        href={new MoimURL.CommerceCategories({
          id: i.id,
          section: "products",
        }).toString()}
        onSelect={() => {
          AnalyticsClass.getInstance().blockCategoryNavigationSelect({
            categoryId: i.id,
          });
        }}
        selected={i.id === selectedCategoryId}
        itemStyle={targetItemStyle}
      />
    ));
  }, [
    isLoading,
    categories.data,
    selectedCategoryId,
    targetItemStyle,
    targetColumnCount,
  ]);

  return (
    <Container>
      <Wrapper width={targetContainerWidth}>
        <BlockitHeader
          title={header?.title}
          description={header?.description}
          showTitle={header?.showTitle ?? false}
          showDescription={header?.showDescription ?? false}
          showMoreButton={header?.showMoreButton ?? false}
        />
        <GridLayout
          columnCount={targetColumnCount}
          rowCount={targetRowCount}
          gapSize={targetGap}
        >
          {elements}
        </GridLayout>
        <BlockitFooter showMoreButton={footer?.showMoreButton ?? false} />
      </Wrapper>
    </Container>
  );
};

export default withPlacement(React.memo(CategoryBlock));
