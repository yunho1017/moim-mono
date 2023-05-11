import { getCertificates_certificates_edges } from "@vingle/cryptobadge-sdk";
import { schema } from "normalizr";

export const cryptobadgeCertificationDefinition = {};

// certifications
export const cryptobadgeCertificationEntity = new schema.Entity(
  "certifications",
  cryptobadgeCertificationDefinition,
  {
    idAttribute: "id",
  },
);

export const cryptobadgeCertificationNodeEntity = new schema.Object<
  getCertificates_certificates_edges
>({
  node: cryptobadgeCertificationEntity,
});

export const cryptobadgeCertificationSingleItemEntity = new schema.Object<
  getCertificates_certificates_edges
>({
  data: cryptobadgeCertificationNodeEntity,
});

export const cryptobadgeCertificationListEntity = new schema.Object<
  getCertificates_certificates_edges
>({
  data: new schema.Array(cryptobadgeCertificationNodeEntity),
});

// certificates

export const cryptobadgeCertificateDefinition = {};

export const cryptobadgeCertificateEntity = new schema.Entity(
  "certificates_list",
  cryptobadgeCertificateDefinition,
  {
    idAttribute: "id",
  },
);

export const cryptobadgeCertificateListEntity = new schema.Object<
  getCertificates_certificates_edges
>({
  data: new schema.Array(cryptobadgeCertificateEntity),
});

// badges
export const cryptobadgeBadgeDefinition = {};

export const cryptobadgeBadgesItemEntity = new schema.Entity<
  Moim.Cryptobadge.NormalizedBadgeListItem
>("cryptobadges_list", cryptobadgeBadgeDefinition, {
  idAttribute: "id",
});

export const cryptobadgeBadgeListEntity = new schema.Object<
  Moim.Cryptobadge.NormalizedBadgeList
>({
  data: new schema.Array(cryptobadgeBadgesItemEntity),
});
