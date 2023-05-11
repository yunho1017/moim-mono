import * as React from "react";
import AppBar from "common/components/appBar";
import { AppBarWrapperStickyStyle, Title } from "./styled";

import CloseIcon from "@icon/24-close-b.svg";

interface IProps {
  communityId: string;
  userId: string;
  userToken: string;
}

const NFTMintingHeader: React.FC<IProps> = ({
  communityId,
  userId,
  userToken,
}) => {
  const onBack = React.useCallback(() => {
    window.location.href = `/communities/${communityId}/user/${userId}?token=${userToken}`;
  }, [communityId, userId, userToken]);

  return (
    <AppBar
      wrapperStickyStyle={AppBarWrapperStickyStyle}
      titleElement={<Title>Mint</Title>}
      alwaysShowAppBarTitle={true}
      leftButton={
        <CloseIcon size="s" touch={44} role="button" onClick={onBack} />
      }
    />
  );
};

export default NFTMintingHeader;
