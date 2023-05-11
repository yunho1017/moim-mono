import { ICollectionItemFilter } from ".";

export const convertSelectedTags2CollectionItemFilter = (
  selectedTags: Record<Moim.Id, string[]>,
): ICollectionItemFilter => {
  const filterTagValues = Object.keys(selectedTags).reduce<{
    statuses: string[];
    attributes: string[];
  }>(
    (acc, cur: string) => {
      if (cur === "statuses") {
        acc.statuses = selectedTags.statuses.map(item => item.split(":")[1]);
      } else {
        if (selectedTags[cur] && selectedTags[cur].length > 0) {
          acc.attributes.push(...selectedTags[cur]);
        }
      }
      return acc;
    },
    { statuses: [], attributes: [] },
  );

  return {
    ...(filterTagValues.statuses &&
      filterTagValues.statuses.length > 0 && {
        statuses: filterTagValues.statuses,
      }),
    ...(filterTagValues.attributes &&
      filterTagValues.attributes.length > 0 && {
        attributes: filterTagValues.attributes,
      }),
  };
};
