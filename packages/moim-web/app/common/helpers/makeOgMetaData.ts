interface IParams {
  type: string;
  url: string;
  siteName?: string;
  title?: string;
  description?: string;
  imageUrl?: string;
}

function makeOgMetaData(data: IParams) {
  const ogMetaData: Moim.MetaTag[] = [];

  if (data.type) {
    ogMetaData.push({ property: "og:type", content: data.type });
  }

  if (data.url) {
    ogMetaData.push({ property: "og:url", content: data.url });
  }

  if (data.siteName) {
    ogMetaData.push({ property: "og:site_name", content: data.siteName });
  }

  if (data.title) {
    ogMetaData.push({ property: "og:title", content: data.title });
  }

  if (data.description) {
    ogMetaData.push({ property: "og:description", content: data.description });
  }

  if (data.imageUrl) {
    ogMetaData.push({ property: "og:image", content: data.imageUrl });
  }

  return ogMetaData;
}

export default makeOgMetaData;
