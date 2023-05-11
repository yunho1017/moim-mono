import * as React from "react";
import useIsMobile from "common/hooks/useIsMobile";

import ProductSummary from "./layout/productSummary";
import RecommendProducts from "./layout/recommendProducts";
import { RootWrapper, InnerWrapper, Container, Spacer } from "./styled";
import ProductHeaderSkeleton from "./layout/productSummary/skeleton";
import ProductTabContainer from "./layout/tabs";
import ScrollToTop from "common/components/scrollToTop";
import { ProductShowHeaderContext } from "./context";
import SelectedReviews from "./layout/selectedReviews";

interface IProps {
  isLoading: boolean | undefined;
  productId: string;
  product: Moim.Commerce.IProduct | undefined;
  productShowLayout: Moim.Component.ProductShow.IProductShowLayout | undefined;
}

const ProductShowComponent: React.FC<IProps> = ({
  productId,
  isLoading,
  product,
  productShowLayout,
}) => {
  const refWrapper = React.useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  React.useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const productHeaderContextValue = React.useMemo(
    () => (product ? { productId, product } : undefined),
    [product, productId],
  );

  if (isLoading === false && !product) {
    return <RootWrapper>서버로부터 데이터를 불러오지 못했습니다.</RootWrapper>;
  }

  if (!product) {
    return (
      <RootWrapper data-scroll-lock-scrollable ref={refWrapper}>
        <InnerWrapper>
          <Container>
            <ProductHeaderSkeleton />
          </Container>
        </InnerWrapper>
      </RootWrapper>
    );
  }

  return (
    <RootWrapper data-scroll-lock-scrollable ref={refWrapper}>
      <InnerWrapper>
        <Container>
          {productShowLayout?.children.map((block, index) => {
            const isFirst = index === 0;
            let inner: React.ReactNode = null;
            switch (block.type) {
              case "product-summary":
                inner = (
                  <>
                    <ProductShowHeaderContext.Provider
                      value={productHeaderContextValue!}
                    >
                      <ProductSummary block={block} />
                    </ProductShowHeaderContext.Provider>

                    <Spacer value={isMobile ? 16 : 40} />
                  </>
                );

                break;

              case "contents-group":
                inner =
                  product && product.selectedReviews ? (
                    <>
                      <SelectedReviews
                        key={product.id}
                        title={product.selectedReviews.title}
                        description={product.selectedReviews.description}
                        queries={product.selectedReviews.queries}
                        block={block}
                      />
                      <Spacer value={isMobile ? 16 : 40} />
                    </>
                  ) : null;
                break;

              case "product-group":
                inner = product.recommendProductIds?.length ? (
                  <RecommendProducts productId={productId} block={block} />
                ) : null;
                break;

              case "product-tab":
                inner = (
                  <ProductTabContainer
                    isLoading={isLoading}
                    productId={productId}
                    block={block}
                  />
                );
                break;
            }

            return (
              <>
                {inner && !isFirst && <Spacer value={isMobile ? 16 : 40} />}
                {inner}
              </>
            );
          })}
        </Container>
      </InnerWrapper>
      {!isMobile && (
        <ScrollToTop scrollingTarget={refWrapper.current} disappearOffset={0} />
      )}
    </RootWrapper>
  );
};

export default ProductShowComponent;
