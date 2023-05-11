import * as React from "react";
import PageUpdater from "common/components/pageUpdater";
import makeOgMetaData from "common/helpers/makeOgMetaData";
import useDefaultOgMetaRawData from "common/hooks/useDefaultOgMetaRawData";
import usePageTitleWithMoimName from "common/hooks/usePageTitleWithMoimName";

interface IProps {
  username: string;
  userProfileImage?: string;
  userBio?: string;
}

function ProfileHelmet(props: IProps) {
  const { username, userProfileImage, userBio } = props;

  const title = usePageTitleWithMoimName(username);
  const metaObjects = makeOgMetaData({
    ...useDefaultOgMetaRawData(),
    title,
    description: userBio,
    imageUrl: userProfileImage,
  });

  return <PageUpdater title={title} metaObjects={metaObjects} />;
}

export default ProfileHelmet;
