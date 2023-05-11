import * as React from "react";
import { getCertificates_certificates_edges } from "@vingle/cryptobadge-sdk";
import { SmallBadge } from "common/components/cryptobadge";
import { BadgeWrapper as SmallBadgeWrapper } from "common/components/cryptobadge/profileCertificateItem/small/styled";
import actionCountFormat from "common/helpers/actionCountFormat";
import { Wrapper, MoreCount } from "./styled";
import { BadgeSmallSkeleton } from "common/components/cryptobadge/profileCertificateItem/normal/skeleton";

const MAX_VISIBLE_BADGE = 6;

interface IProps {
  isLoading: boolean;
  cryptoBadges: Moim.IListResponse<getCertificates_certificates_edges>;
  onClickMore(): void;
}

const CryptoBadges: React.FC<IProps> = ({
  isLoading,
  cryptoBadges,
  onClickMore,
}) => {
  const badges = React.useMemo(() => {
    if (isLoading) {
      return new Array(4)
        .fill(0)
        .map((_, idx) => <BadgeSmallSkeleton key={`badge_skeleton_${idx}`} />);
    }

    return cryptoBadges.data
      .filter(item => Boolean(item.node))
      .slice(0, MAX_VISIBLE_BADGE)
      .map(certification => (
        <SmallBadge
          key={certification.node?.id}
          certificateId={certification.node?.id || ""}
          icon={certification.node?.imageUri || ""}
          name={certification.node?.name || ""}
        />
      ));
  }, [isLoading, cryptoBadges.data]);

  const moreCount = React.useMemo(() => {
    if (cryptoBadges.data.length > MAX_VISIBLE_BADGE) {
      const remainCount = cryptoBadges.data.length - MAX_VISIBLE_BADGE;
      return (
        <SmallBadgeWrapper role="button" onClick={onClickMore}>
          <MoreCount>+{actionCountFormat(remainCount)}</MoreCount>
        </SmallBadgeWrapper>
      );
    }
    return null;
  }, [cryptoBadges.data.length, onClickMore]);

  if (!isLoading && !badges.length) {
    return null;
  }

  return (
    <Wrapper>
      {badges}
      {moreCount}
    </Wrapper>
  );
};

export default CryptoBadges;
