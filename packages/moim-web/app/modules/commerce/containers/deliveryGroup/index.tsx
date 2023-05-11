import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { searchSellerProducts } from "app/actions/commerce";
import { getProductsSelector } from "app/selectors/commerce";
import ScrollPositionSaveList from "common/components/scrollPositionSaveList";
import PageUpdater from "common/components/pageUpdater";
import PageProductList from "../../components/productList";
import {
  RootWrapper,
  InnerStyle,
  Header,
  Title,
  Description,
  Body,
  InnerContentWrapper,
  TitleSkeleton,
} from "../styled";

import { useStoreState, useActions, ThunkPromiseResult } from "app/store";
import useCurrentGroup from "common/hooks/useCurrentGroup";

import { AddEntities } from "app/actions/entity";
import { deliveryGroupNormalizer } from "app/models";
import { productItemLayoutSelector } from "app/selectors/componentLayout";

function getDeliveryGroup(id: Moim.Id): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    try {
      const response = await apiSelector(
        getState(),
        dispatch,
      ).commerce.getDeliveryGroup(id);
      const { entities } = deliveryGroupNormalizer(response);
      dispatch(AddEntities(entities));

      // eslint-disable-next-line no-empty
    } catch {}
  };
}

interface IProps extends RouteComponentProps<Moim.IMatchParams> {}

const DeliveryGroupContainer: React.FC<IProps> = ({ match }) => {
  const { id } = match.params as {
    id: Moim.Id;
  };
  const currentGroup = useCurrentGroup();
  const [isLoading, setLoadStatus] = React.useState<boolean | undefined>();
  const productItemLayout = useStoreState(state =>
    productItemLayoutSelector(state, "deliveryGroup"),
  );
  const { products, paging, deliveryGroup } = useStoreState(state => {
    const key = `${currentGroup?.seller_id}-${id}`;
    const pageDataMeta = state.commercePage.productListPages[key]?.infinite;
    return {
      products: pageDataMeta
        ? getProductsSelector(state, pageDataMeta.data).data
        : undefined,
      paging: pageDataMeta ? pageDataMeta.paging : undefined,
      deliveryGroup: state.entities.commerce_delivery_group[id],
    };
  });
  const { dispatchSearchSellerProducts, dispatchGetDeliveryGroup } = useActions(
    {
      dispatchSearchSellerProducts: searchSellerProducts,
      dispatchGetDeliveryGroup: getDeliveryGroup,
    },
  );

  const handleProductsLoadMore = React.useCallback(() => {
    dispatchSearchSellerProducts(id, {
      after: paging?.after,
    });
  }, [dispatchSearchSellerProducts, id, paging?.after]);

  React.useEffect(() => {
    if (!isLoading && currentGroup?.seller_id) {
      setLoadStatus(true);

      Promise.all([
        dispatchSearchSellerProducts(currentGroup.seller_id, {
          deliveryGroupId: id,
        }),
        dispatchGetDeliveryGroup(id),
      ]).finally(() => {
        setLoadStatus(false);
      });
    }
  }, [id, currentGroup?.seller_id]);

  return (
    <>
      <PageUpdater
        title={
          deliveryGroup?.name
            ? `${deliveryGroup.name}${
                currentGroup?.name ? ` - ${currentGroup.name}` : ""
              }`
            : undefined
        }
      />
      <RootWrapper>
        <ScrollPositionSaveList id={id} overrideStyle={InnerStyle}>
          <InnerContentWrapper>
            <Header>
              {deliveryGroup ? (
                <>
                  <Title>{deliveryGroup.name}</Title>
                  <Description>{deliveryGroup.description}</Description>
                </>
              ) : (
                <TitleSkeleton />
              )}
            </Header>

            <Body>
              <PageProductList
                isLoading={isLoading || isLoading === undefined}
                pageType="infinite"
                currentId={id}
                paging={paging}
                products={products}
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

export default DeliveryGroupContainer;
