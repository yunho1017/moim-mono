import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { useStoreState, useActions } from "app/store";
import useCurrentGroup from "common/hooks/useCurrentGroup";
import { searchSellerProducts, getSellerData } from "app/actions/commerce";
import { getSellerSelector, getProductsSelector } from "app/selectors/commerce";
import ScrollPositionSaveList from "common/components/scrollPositionSaveList";
import PageUpdater from "common/components/pageUpdater";
import PageProductList from "../../components/productList";
import {
  RootWrapper,
  InnerStyle,
  Header,
  Title,
  Body,
  InnerContentWrapper,
} from "../styled";

import { productItemLayoutSelector } from "app/selectors/componentLayout";

interface IProps extends RouteComponentProps<Moim.IMatchParams> {}

const SellerContainer: React.FC<IProps> = ({ match }) => {
  const { id } = match.params as {
    id: Moim.Id;
    section: "products" | "sellers";
  };
  const currentGroup = useCurrentGroup();
  const [isLoading, setLoadStatus] = React.useState<boolean | undefined>();
  const productItemLayout = useStoreState(state =>
    productItemLayoutSelector(state, "seller"),
  );
  const { seller, pageData } = useStoreState(state => {
    const pageDataMeta = state.commercePage.productListPages[id]?.infinite;

    return {
      seller: getSellerSelector(state, id),
      pageData: !pageDataMeta
        ? { data: [], paging: {} }
        : {
            data: getProductsSelector(state, pageDataMeta.data).data,
            paging: pageDataMeta.paging,
          },
    };
  });
  const { dispatchSearchSellerProducts, dispatchGetSellerData } = useActions({
    dispatchSearchSellerProducts: searchSellerProducts,
    dispatchGetSellerData: getSellerData,
  });

  const handleProductsLoadMore = React.useCallback(() => {
    dispatchSearchSellerProducts(id, {
      after: pageData.paging.after,
    });
  }, [dispatchSearchSellerProducts, id, pageData.paging.after]);

  React.useEffect(() => {
    if (!isLoading) {
      setLoadStatus(true);
      Promise.all([
        dispatchGetSellerData(id),
        dispatchSearchSellerProducts(id),
      ]).finally(() => {
        setLoadStatus(false);
      });
    }
  }, [id]);

  return (
    <>
      <PageUpdater
        title={
          seller?.name
            ? `${seller.name}${
                currentGroup?.name ? ` - ${currentGroup.name}` : ""
              }`
            : undefined
        }
      />
      <RootWrapper>
        <ScrollPositionSaveList id={id} overrideStyle={InnerStyle}>
          <InnerContentWrapper>
            <Header>
              <Title>{seller?.name}</Title>
            </Header>

            <Body>
              <PageProductList
                isLoading={isLoading || isLoading === undefined}
                pageType="infinite"
                currentId={id}
                paging={pageData.paging}
                products={pageData.data}
                onLoadMore={handleProductsLoadMore}
                productItemLayout={productItemLayout}
              />
            </Body>
          </InnerContentWrapper>
        </ScrollPositionSaveList>
      </RootWrapper>
    </>
  );
};

export default SellerContainer;
