import { getCertificates_certificates_edges } from "@vingle/cryptobadge-sdk";
import { normalize } from "normalizr";
import {
  cryptobadgeBadgeListEntity,
  cryptobadgeCertificateListEntity,
  cryptobadgeCertificationListEntity,
  cryptobadgeCertificationNodeEntity,
  cryptobadgeCertificationSingleItemEntity,
} from "./entity";

// certification
export const certificationNormalizer = (
  certification: getCertificates_certificates_edges,
) =>
  normalize<
    getCertificates_certificates_edges,
    Moim.Entity.INormalizedData,
    Moim.User.INormalizedCertification
  >(certification, cryptobadgeCertificationNodeEntity);

export const certificationSingleItemNormalizer = (
  datum: Moim.ISingleItemResponse<getCertificates_certificates_edges>,
) =>
  normalize<
    getCertificates_certificates_edges,
    Moim.Entity.INormalizedData,
    Moim.ISingleItemResponse<Moim.User.INormalizedCertification>
  >(datum, cryptobadgeCertificationSingleItemEntity);

export const certificationListNormalizer = <
  T extends Moim.IListResponse<getCertificates_certificates_edges | null>
>(
  data: T,
) =>
  normalize<
    getCertificates_certificates_edges,
    Moim.Entity.INormalizedData,
    Moim.BetweenListResponse<T, Moim.User.INormalizedCertification>
  >(data, cryptobadgeCertificationListEntity);

// certificate
export const certificateListNormalizer = <
  T extends Moim.Cryptobadge.NormalizedCertificateList
>(
  data: T,
) =>
  normalize<
    Moim.Cryptobadge.NormalizedCertificateItem,
    Moim.Entity.INormalizedData,
    Moim.BetweenListResponse<T, Moim.Id>
  >(data, cryptobadgeCertificateListEntity);

// badge
export const badgeListNormalizer = <
  T extends Moim.Cryptobadge.NormalizedBadgeList
>(
  data: T,
) =>
  normalize<
    Moim.Cryptobadge.NormalizedBadgeListItem,
    Moim.Entity.INormalizedData,
    Moim.BetweenListResponse<T, Moim.Id>
  >(data, cryptobadgeBadgeListEntity);
