import { createSelector } from "reselect";
import { entitiesSelector } from ".";
import { postTemplateListDenormalizer } from "app/models";

export const postTemplateListSelector = createSelector(
  entitiesSelector,
  state => state.postTemplate.postTemplates,
  (entities, postTemplates) => {
    return postTemplateListDenormalizer(postTemplates, entities);
  },
);
