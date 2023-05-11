import * as React from "react";
import Helmet, { HelmetProps } from "react-helmet";
import ellipsisText from "../helpers/ellipsisText";
import { AnalyticsClass } from "common/helpers/analytics/analytics";

interface IProps extends HelmetProps {
  metaObjects?: Moim.MetaTag[];
  favicons?: Moim.IFavicon[];
}

const OG_DESCRIPTION_MAX_SIZE = 300;
const OG_DESCRIPTION_ELLIPSIS = "...";

const PageUpdater: React.FC<IProps> = props => {
  const {
    meta: _meta,
    metaObjects,
    favicons,
    onChangeClientState,
    title,
    ...rest
  } = props;

  const pageTitle = React.useMemo(() => (title || "").trim(), [title]);

  const metaTags = React.useMemo(() => {
    let filledMeta = metaObjects
      ? metaObjects.filter(meta => Boolean(meta.content)).slice()
      : [];

    const ogDescription = filledMeta.find(
      tag => tag.property === "og:description",
    );

    if (ogDescription && ogDescription.content) {
      const filterDescription = ellipsisText(
        ogDescription.content,
        OG_DESCRIPTION_MAX_SIZE,
        OG_DESCRIPTION_ELLIPSIS,
      );
      filledMeta = filledMeta.filter(tag => tag.property !== "og:description");
      filledMeta.push({
        name: "description",
        content: filterDescription,
      });
      filledMeta.push({
        property: "og:description",
        content: filterDescription,
      });
    }

    const ogTitle = filledMeta.find(tag => tag.property === "og:title");

    if (!ogTitle) {
      filledMeta.push({
        property: "og:title",
        content: pageTitle,
      });
    }

    return filledMeta;
  }, [metaObjects, pageTitle]);

  const linkTags = React.useMemo(
    () =>
      favicons
        ? favicons.map(favicon => {
            return {
              rel: favicon.rel,
              size: `${favicon.size}x${favicon.size}`,
              href: favicon.url,
            };
          })
        : [],
    [favicons],
  );

  React.useEffect(() => {
    if (pageTitle) {
      AnalyticsClass.getInstance().screenView(pageTitle, location.pathname);
    }
  }, [pageTitle]);

  return (
    <>
      <Helmet
        {...rest}
        title={pageTitle}
        meta={metaTags}
        link={linkTags}
        onChangeClientState={onChangeClientState}
      />
    </>
  );
};

export default PageUpdater;
