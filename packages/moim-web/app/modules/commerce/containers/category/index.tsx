import * as React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { useStoreState, useActions } from "app/store";
import { searchSellerProducts } from "app/actions/commerce";
import useCurrentGroup from "common/hooks/useCurrentGroup";

import { MoimURL } from "common/helpers/url";
import CategoryBlock from "common/components/blockitEditorBase/components/blockitRenderer/components/commerce/category";
import PageUpdater from "common/components/pageUpdater";
import ScrollPositionSaveList from "common/components/scrollPositionSaveList";
import PageProductList from "../../components/productList";
import {
  RootWrapper,
  InnerStyle,
  Header,
  BreadCrumbs,
  Title,
  Body,
  CommerceCategoryWrapper,
  CommerceCategoryStyle,
  InnerContentWrapper,
} from "../styled";
import { productItemLayoutSelector } from "app/selectors/componentLayout";

interface IProps extends RouteComponentProps<Moim.IMatchParams> {}

const CommerceCategoryContainer: React.FC<IProps> = ({ match }) => {
  const { id } = match.params as {
    id: Moim.Id;
    section: "products" | "sellers";
  };
  const currentGroup = useCurrentGroup();
  const [isLoading, setLoadStatus] = React.useState<boolean | undefined>();
  const productItemLayout = useStoreState(state =>
    productItemLayoutSelector(state, "listShow"),
  );
  const { category, pageData } = useStoreState(state => {
    const key = `${currentGroup?.seller_id}-${id}`;
    const pageDataMeta = state.commercePage.productListPages[key]?.infinite;

    return {
      category: state.entities.commerce_category[id],
      pageData: pageDataMeta
        ? {
            data: pageDataMeta.data.map(
              id => state.entities.commerce_product[id],
            ),
            paging: pageDataMeta.paging,
          }
        : undefined,
    };
  });
  const { dispatchSearchSellerProducts } = useActions({
    dispatchSearchSellerProducts: searchSellerProducts,
  });

  const handleProductsLoadMore = React.useCallback(() => {
    if (currentGroup?.seller_id && category) {
      dispatchSearchSellerProducts(
        currentGroup.seller_id,
        {
          categoryIds: [id],
          after: pageData?.paging.after,
        },
        category.isAll,
      );
    }
  }, [
    category,
    currentGroup,
    dispatchSearchSellerProducts,
    id,
    pageData?.paging,
  ]);

  React.useEffect(() => {
    if (!isLoading && currentGroup?.seller_id && category) {
      setLoadStatus(true);
      dispatchSearchSellerProducts(
        currentGroup.seller_id,
        {
          categoryIds: [id],
        },
        category.isAll,
      ).finally(() => {
        setLoadStatus(false);
      });
    }
  }, [id, category]);

  return (
    <>
      <PageUpdater
        title={
          category?.name
            ? `${category.name}${
                currentGroup?.name ? ` - ${currentGroup.name}` : ""
              }`
            : undefined
        }
      />
      <RootWrapper>
        <ScrollPositionSaveList id={id} overrideStyle={InnerStyle}>
          <InnerContentWrapper>
            <CommerceCategoryWrapper>
              <CategoryBlock
                itemContainerWidth={100}
                itemContainerWidth_web={100}
                columnCount={4}
                columnCount_web={8}
                wrapperStyle={CommerceCategoryStyle}
                selectedCategoryId={id}
              />
            </CommerceCategoryWrapper>
            <Header>
              {category && (
                <BreadCrumbs>
                  <Link
                    to={new MoimURL.CommerceCategories({
                      id: category.id,
                      section: "products",
                    }).toString()}
                  >
                    {category.name}
                  </Link>
                </BreadCrumbs>
              )}
              <Title>{category?.name}</Title>
            </Header>
            <Body>
              <PageProductList
                isLoading={isLoading || isLoading === undefined}
                pageType="infinite"
                currentId={id}
                paging={pageData?.paging}
                products={pageData?.data}
                productItemLayout={productItemLayout}
                onLoadMore={handleProductsLoadMore}
              />
            </Body>
          </InnerContentWrapper>
        </ScrollPositionSaveList>
      </RootWrapper>
    </>
  );
};

export default CommerceCategoryContainer;
