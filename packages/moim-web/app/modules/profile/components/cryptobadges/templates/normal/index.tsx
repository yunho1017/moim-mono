import * as React from "react";
import { getCertificates_certificates_edges } from "@vingle/cryptobadge-sdk";
import { MoimURL } from "common/helpers/url";
import { useNativeSecondaryView } from "common/hooks/useSecondaryView";
import { NormalBadge } from "common/components/cryptobadge";
import actionCountFormat from "common/helpers/actionCountFormat";
import { Wrapper, CountWrapper, MoreCount } from "./styled";

import { BadgeEmpty } from "../../../empty";
import { BadgeSkeleton } from "common/components/cryptobadge/profileCertificateItem/normal/skeleton";

const MAX_VISIBLE_BADGE = 8;
const MAX_VISIBLE_BADGE_WITH_MORE_COUNT_SPACE = 7;

interface IProps {
  userId: string;
  isLoading: boolean;
  cryptoBadges: Moim.IListResponse<getCertificates_certificates_edges>;
}

const CryptoBadges: React.FC<IProps> = ({
  userId,
  isLoading,
  cryptoBadges,
}) => {
  const { redirect } = useNativeSecondaryView();

  const hasBadges = cryptoBadges.data.length > 0;
  const maxVisibleCount = React.useMemo(
    () =>
      cryptoBadges.data.length > MAX_VISIBLE_BADGE
        ? MAX_VISIBLE_BADGE_WITH_MORE_COUNT_SPACE
        : MAX_VISIBLE_BADGE,
    [cryptoBadges.data.length],
  );

  const elements = React.useMemo(() => {
    if (isLoading) {
      return new Array(4)
        .fill(0)
        .map((_, idx) => <BadgeSkeleton key={`badge_skeleton_${idx}`} />);
    }
    return cryptoBadges.data
      .filter(item => Boolean(item.node))
      .slice(0, maxVisibleCount)
      .map(certification => (
        <NormalBadge
          key={certification.node?.id}
          resourceUrl={certification.node?.resourceUrl || ""}
          name={certification.node?.name || ""}
          icon={certification.node?.imageUri || ""}
          description={certification.node?.description || ""}
        />
      ));
  }, [cryptoBadges.data, maxVisibleCount, isLoading]);

  const handleNextButtonClick = React.useCallback(() => {
    if (hasBadges && userId) {
      redirect(new MoimURL.ProfileBadgeList({ userId }).toString());
    }
  }, [hasBadges, userId, redirect]);

  const moreCount = React.useMemo(() => {
    if (cryptoBadges.data.length > maxVisibleCount) {
      const remainCount = cryptoBadges.data.length - maxVisibleCount;
      return (
        <CountWrapper role="button" onClick={handleNextButtonClick}>
          <MoreCount>+{actionCountFormat(remainCount)}</MoreCount>
        </CountWrapper>
      );
    }
    return null;
  }, [cryptoBadges.data.length, handleNextButtonClick, maxVisibleCount]);

  return (
    <>
      {!isLoading && cryptoBadges.data.length === 0 ? (
        <BadgeEmpty />
      ) : (
        <Wrapper>
          {elements}
          {moreCount}
        </Wrapper>
      )}
    </>
  );
};

export default CryptoBadges;
