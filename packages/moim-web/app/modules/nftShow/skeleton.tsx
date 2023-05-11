import * as React from "react";
// hooks
import useIsMobile from "common/hooks/useIsMobile";
// components
import { MaxWidthWrapper } from "./components/styled";
import { Spacer } from "common/components/designSystem/spacer";
import TopSkeleton from "./components/top/skeleton";
import { PropertiesSkeleton } from "./components/properties";
import { DescriptionSkeleton } from "./components/description";
import { DetailSkeleton } from "./components/detail";
import History from "./components/history";
// styled
import { Wrapper, TopWrapper, ContentsWrapper } from "./styled";

export const NFTShowSkeleton: React.FC = () => {
  const isMobile = useIsMobile();
  return (
    <Wrapper>
      <Spacer value={isMobile ? 0 : 88} />
      <TopWrapper>
        <MaxWidthWrapper>
          <TopSkeleton />
        </MaxWidthWrapper>
      </TopWrapper>
      {!isMobile && <Spacer value={60} />}
      <MaxWidthWrapper>
        <ContentsWrapper>
          <DescriptionSkeleton />
          <DetailSkeleton />
        </ContentsWrapper>
      </MaxWidthWrapper>
      {!isMobile && <Spacer value={44} />}
      <MaxWidthWrapper>
        <PropertiesSkeleton />
        {!isMobile && <Spacer value={60} />}
        <History transferList={undefined} />
      </MaxWidthWrapper>
      <Spacer value={isMobile ? 42 : 120} />
    </Wrapper>
  );
};
