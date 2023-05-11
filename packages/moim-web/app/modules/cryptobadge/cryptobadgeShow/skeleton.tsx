import * as React from "react";
// components
import CryptobadgeDetailSkeleton from "common/components/cryptobadge/badgeDetailShowItem/skeleton";
// styled
import { Wrapper } from "./styled";
import useIsMobile from "common/hooks/useIsMobile";
import { Spacer } from "common/components/designSystem/spacer";

export const CryptobadgeShowSkeleton: React.FC = () => {
  const isMobile = useIsMobile();
  return (
    <Wrapper>
      {isMobile ? <Spacer value={20} /> : <Spacer value={60} />}
      <CryptobadgeDetailSkeleton />
    </Wrapper>
  );
};
