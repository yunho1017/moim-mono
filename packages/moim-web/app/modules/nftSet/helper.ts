import { IResourceFilter } from ".";

export const convertSelectedTags2ResourceFilter = (
  selectedTags: Record<Moim.Id, string[]>,
): IResourceFilter => {
  const filterTagValues = Object.keys(selectedTags).reduce<{
    statuses: string;
    tags: string[];
  }>(
    (acc, cur: string) => {
      if (cur === "statuses") {
        acc.statuses = selectedTags.statuses
          .map(item => item.split(":")[1])
          .join(",");
      } else {
        const tagsByKey =
          selectedTags[cur] && selectedTags[cur].length > 0
            ? selectedTags[cur].join(",")
            : undefined;
        if (tagsByKey) acc.tags.push(tagsByKey);
      }
      return acc;
    },
    { statuses: "", tags: [] },
  );

  return {
    ...(filterTagValues.statuses &&
      filterTagValues.statuses.length > 0 && {
        statuses: filterTagValues.statuses,
      }),
    ...(filterTagValues.tags &&
      filterTagValues.tags.length > 0 && {
        tags: filterTagValues.tags.join(","),
      }),
  };
};
