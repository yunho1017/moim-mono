import produce from "immer";
import { AllActions } from "app/actions";
import { EntityTypes } from "app/actions/types";

export const INITIAL_CERTIFICATIONS_STATE: Record<string, any> = {};

export function certificationsReducer(
  state = INITIAL_CERTIFICATIONS_STATE,
  action: AllActions,
) {
  return produce(state, draft => {
    switch (action.type) {
      case EntityTypes.ADD_ENTITY: {
        if (action.payload.certifications) {
          Object.entries(action.payload.certifications).forEach(
            ([key, value]) => {
              draft[key] = value;
            },
          );
        }
        break;
      }
    }
  });
}

export const INITIAL_CERTIFICATES_STATE: Record<
  Moim.Id,
  Moim.Cryptobadge.NormalizedCertificateItem
> = {};

export function certificatesReducer(
  state = INITIAL_CERTIFICATES_STATE,
  action: AllActions,
) {
  return produce(state, draft => {
    switch (action.type) {
      case EntityTypes.ADD_ENTITY: {
        if (action.payload.certificates_list) {
          Object.entries(action.payload.certificates_list).forEach(
            ([key, value]) => {
              draft[key] = value;
            },
          );
        }
        break;
      }
    }
  });
}

export const INITIAL_BADGES_STATE: Record<
  Moim.Id,
  Moim.Cryptobadge.NormalizedBadgeListItem
> = {};

export function badgesReducer(
  state = INITIAL_BADGES_STATE,
  action: AllActions,
) {
  return produce(state, draft => {
    switch (action.type) {
      case EntityTypes.ADD_ENTITY: {
        if (action.payload.cryptobadges_list) {
          Object.entries(action.payload.cryptobadges_list).forEach(
            ([key, value]) => {
              draft[key] = value;
            },
          );
        }
        break;
      }
    }
  });
}
