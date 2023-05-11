import * as React from "react";
import useCurrentGroup from "common/hooks/useCurrentGroup";

function useDefaultOgMetaRawData() {
  const currentMoim = useCurrentGroup();

  return React.useMemo(
    () => ({
      title: currentMoim?.name,
      siteName: currentMoim?.name,
      type: "website",
      description: currentMoim?.description,
      imageUrl:
        currentMoim?.banner?.type === "image"
          ? currentMoim.banner.data.url
          : undefined,
      url: window.location.href,
    }),
    [currentMoim],
  );
}

export default useDefaultOgMetaRawData;
