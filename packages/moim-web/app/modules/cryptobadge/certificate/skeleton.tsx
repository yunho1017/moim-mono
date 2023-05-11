import * as React from "react";
// components
import CertificateDetailSkeleton from "common/components/cryptobadge/certificate/skeleton";

// styled
import { Wrapper } from "./styled";
import useIsMobile from "common/hooks/useIsMobile";
import { Spacer } from "common/components/designSystem/spacer";

export const CertificateShowSkeleton: React.FC = () => {
  const isMobile = useIsMobile();
  return (
    <Wrapper>
      {isMobile ? <Spacer value={20} /> : <Spacer value={60} />}
      <CertificateDetailSkeleton />
    </Wrapper>
  );
};
