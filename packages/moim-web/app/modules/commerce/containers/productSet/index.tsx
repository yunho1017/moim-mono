import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { useStoreState, useActions } from "app/store";
import useIsMobile from "common/hooks/useIsMobile";
import useCurrentGroup from "common/hooks/useCurrentGroup";
import { getBatchProductSets } from "app/actions/commerce";
import { getProductSetSelector } from "app/selectors/commerce";
import CarouselBlockit from "common/components/blockitEditorBase/components/blockitRenderer/components/carousel";
import ScrollPositionSaveList from "common/components/scrollPositionSaveList";
import PageProductList from "../../components/productList";
import { Spacer } from "common/components/designSystem/spacer";
import PageUpdater from "common/components/pageUpdater";
import {
  RootWrapper,
  InnerStyle,
  Header,
  Title,
  Description,
  Body,
  InnerContentWrapper,
  CarouselContainedWrapper,
} from "../styled";
import { productItemLayoutSelector } from "app/selectors/componentLayout";

interface IProps extends RouteComponentProps<Moim.IMatchParams> {}

const ProductSetContainer: React.FC<IProps> = ({ match }) => {
  const { id } = match.params as {
    id: Moim.Id;
    section: "products" | "sellers";
  };
  const isMobile = useIsMobile();
  const currentGroup = useCurrentGroup();
  const [isLoading, setLoadStatus] = React.useState<boolean | undefined>();
  const productItemLayout = useStoreState(state =>
    productItemLayoutSelector(state, "listShow"),
  );
  const { productSet } = useStoreState(state => ({
    productSet: getProductSetSelector(state, id),
  }));
  const { dispatchGetBatchProductSets } = useActions({
    dispatchGetBatchProductSets: getBatchProductSets,
  });

  const handleProductsLoadMore = React.useCallback(() => {}, []);

  const targetImageSources = React.useMemo(() => {
    if (productSet && productSet.bannerImages) {
      if (!isMobile) {
        return productSet.bannerImages.web.length === 0
          ? productSet.bannerImages.mobile
          : productSet.bannerImages.web;
      }

      return productSet.bannerImages.mobile;
    }

    return [];
  }, [isMobile, productSet]);

  const carouselElement = React.useMemo(() => {
    if (targetImageSources.length > 0) {
      return (
        <CarouselBlockit
          images={
            targetImageSources.map(i => ({
              src: i.url,
              width: i.width,
              height: i.height,
            })) ?? []
          }
          images_web={
            targetImageSources.map(i => ({
              src: i.url,
              width: i.width,
              height: i.height,
            })) ?? []
          }
          style={{
            width: targetImageSources[0].width,
            height: targetImageSources[0].height,
            showBottomIndicate: true,
            showSideArrowButton: true,
          }}
          style_web={{
            width: targetImageSources[0].width,
            height: targetImageSources[0].height,
            showBottomIndicate: true,
            showSideArrowButton: true,
          }}
          interval={3000}
          interval_web={3000}
          sectionWidth={100}
        />
      );
    }

    return null;
  }, [targetImageSources]);

  React.useEffect(() => {
    if (!isLoading) {
      setLoadStatus(true);
      dispatchGetBatchProductSets(id).finally(() => {
        setLoadStatus(false);
      });
    }
  }, [id]);

  return (
    <>
      <PageUpdater
        title={
          productSet?.title
            ? `${productSet.title}${
                currentGroup?.name ? ` - ${currentGroup.name}` : ""
              }`
            : undefined
        }
      />
      <RootWrapper>
        <ScrollPositionSaveList id={id} overrideStyle={InnerStyle}>
          <CarouselContainedWrapper>
            {carouselElement}
            <Spacer value={40} />
            <InnerContentWrapper>
              <Header>
                <Title>{productSet?.title}</Title>
                <Description>{productSet?.description}</Description>
              </Header>
              <Body>
                <PageProductList
                  isLoading={isLoading || isLoading === undefined}
                  pageType="infinite"
                  currentId={id}
                  products={productSet?.products}
                  productItemLayout={productItemLayout}
                  onLoadMore={handleProductsLoadMore}
                />
              </Body>
            </InnerContentWrapper>
          </CarouselContainedWrapper>
        </ScrollPositionSaveList>
      </RootWrapper>
    </>
  );
};

export default ProductSetContainer;
