import useCurrentGroup from "common/hooks/useCurrentGroup";

function usePageTitleWithMoimName(title: string) {
  const currentMoim = useCurrentGroup();

  if (!currentMoim || !title) {
    return undefined;
  }

  return `${currentMoim.name} - ${title}`;
}

export default usePageTitleWithMoimName;
