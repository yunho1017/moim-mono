import { createSelector } from "reselect";
import { getCertificates_certificates_edges } from "@vingle/cryptobadge-sdk";
import { IAppState } from "app/rootReducer";
import { certificationListDenormalizer } from "app/models";
import { entitiesSelector } from ".";

export const userCertificationSelector = (
  state: IAppState,
  certifications: Moim.User.NormalizedCertificationList,
): Moim.IListResponse<getCertificates_certificates_edges> =>
  createSelector(entitiesSelector, entities => {
    const list = certificationListDenormalizer(certifications, entities).data;
    return {
      data: list,
    };
  })(state);
