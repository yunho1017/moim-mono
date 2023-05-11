import * as React from "react";
import styled from "styled-components";
import {
  getCertificates_certificates_edges,
  getCertificates_certificates_edges_node,
} from "@vingle/cryptobadge-sdk";

import { CardBadge } from "common/components/cryptobadge";
import { BadgeSkeleton } from "common/components/cryptobadge/profileCertificateItem/card/skeleton";
import { BadgeEmpty } from "../../../empty";
import useRedirect from "common/hooks/useRedirect";
import { useNativeSecondaryView } from "common/hooks/useSecondaryView";
import useIsMobile from "common/hooks/useIsMobile";
import { px2rem } from "common/helpers/rem";
import { MoimURL } from "common/helpers/url";

const Wrapper = styled.div<{
  gapSize?: number;
  columnCount?: number;
  rowCount?: number;
}>`
  display: grid;
  gap: ${props => px2rem(props.gapSize ?? 12)};

  grid-template-columns: ${props =>
    `repeat(${props.columnCount ?? 1}, minmax(0, 1fr))`};
  grid-template-rows: ${props =>
    `repeat(${props.rowCount ?? 1}, minmax(0, 1fr))`};
  place-content: center;
`;

const CardBadgeItem: React.FC<{
  certification: getCertificates_certificates_edges_node;
}> = ({ certification: certification }) => {
  const isMobile = useIsMobile();
  const redirect = useRedirect();
  const { close } = useNativeSecondaryView();
  const handleClick = React.useCallback(() => {
    if (isMobile) {
      close();
    }
    redirect(
      new MoimURL.CertificateShow({
        certificateId: certification.id,
      }).toString(),
    );
  }, [redirect, certification.id, close, isMobile]);
  return (
    <CardBadge
      certificateId={certification.id}
      backgroundColor={certification.backgroundColor}
      textColor={certification.textColor}
      description={certification.description ?? ""}
      icon={certification.imageUri ?? ""}
      name={certification.name ?? ""}
      onClick={handleClick}
    />
  );
};

interface IProps {
  isLoading: boolean;
  columnCount: number;
  rowCount: number;
  cryptoBadges: Moim.IListResponse<getCertificates_certificates_edges>;
}

const CardCryptoBadges: React.FC<IProps> = ({
  isLoading,
  columnCount,
  rowCount,
  cryptoBadges,
}) => {
  const maxVisibleCount = columnCount * rowCount;

  const elements = React.useMemo(() => {
    if (isLoading) {
      return new Array(columnCount * 1)
        .fill(0)
        .map((_, idx) => <BadgeSkeleton key={`badge_skeleton_${idx}`} />);
    }
    return cryptoBadges.data
      .filter(item => Boolean(item.node))
      .slice(0, maxVisibleCount)
      .map(certification => (
        <CardBadgeItem
          key={certification.node.id}
          certification={certification.node}
        />
      ));
  }, [
    maxVisibleCount,
    columnCount,
    cryptoBadges.data,
    maxVisibleCount,
    isLoading,
  ]);

  const dynamicRowCount = Math.ceil(
    (elements.length >= maxVisibleCount ? maxVisibleCount : elements.length) /
      columnCount,
  );

  return (
    <>
      {!isLoading && cryptoBadges.data.length === 0 ? (
        <BadgeEmpty />
      ) : (
        <Wrapper
          columnCount={columnCount}
          rowCount={dynamicRowCount > rowCount ? rowCount : dynamicRowCount}
        >
          {elements}
        </Wrapper>
      )}
    </>
  );
};

export default CardCryptoBadges;
