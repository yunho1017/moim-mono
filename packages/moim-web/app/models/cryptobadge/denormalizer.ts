import { denormalize } from "../";
import { getCertificates_certificates_edges } from "@vingle/cryptobadge-sdk";
import { cryptobadgeCertificationListEntity } from "./entity";

export const certificationListDenormalizer = <
  T extends Moim.User.NormalizedCertificationList
>(
  input: T,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<
    T,
    Moim.BetweenListResponse<T, getCertificates_certificates_edges>
  >(input, cryptobadgeCertificationListEntity, entities);
