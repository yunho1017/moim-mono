import * as React from "react";
import { Link } from "react-router-dom";
import { Wrapper, Image, ImageSvgWrap } from "./styled";
import { SkeletonBox } from "common/components/skeleton";
import { useActions, useStoreState } from "app/store";
import { getUserTokensDetail } from "app/actions/nft";
import { ActionCreators as ProfileActionCreators } from "app/actions/profile";
import { px2rem } from "common/helpers/rem";
import { MoimURL } from "common/helpers/url";

interface IProps {
  userId?: string;
  accountId?: string;
}

const UserNfts: React.FC<IProps> = ({ userId }) => {
  const [isLoading, setLoadStatus] = React.useState(false);

  const userNfts = useStoreState(state => {
    if (!userId) return null;
    return state.nft.userTokens[userId] ?? null;
  });

  const initialLoaded = userNfts !== undefined && !isLoading;

  const { dispatchGetUserTokensList, dispatchCloseProfileDialog } = useActions({
    dispatchGetUserTokensList: getUserTokensDetail,
    dispatchCloseProfileDialog: ProfileActionCreators.closeProfileDialog,
  });

  const itemElements = React.useMemo(() => {
    if (!initialLoaded) {
      return new Array(3)
        .fill(0)
        .map((_, idx) => (
          <SkeletonBox key={idx} width={px2rem(24)} height={px2rem(24)} />
        ));
    }
    if (initialLoaded && userNfts?.data.length === 0) {
      return;
    }

    return userNfts?.data?.map(token => (
      <Link
        key={token.id}
        to={new MoimURL.NftShow({
          nftItemId: token.id,
        }).toString()}
        onClick={dispatchCloseProfileDialog}
      >
        {token.itemUrl.startsWith("<svg") ? (
          <ImageSvgWrap dangerouslySetInnerHTML={{ __html: token.itemUrl }} />
        ) : (
          <Image src={token.itemPreviewUrl} alt={token.id} />
        )}
      </Link>
    ));
  }, [userNfts, initialLoaded, dispatchCloseProfileDialog]);

  React.useEffect(() => {
    setLoadStatus(true);
    if (!userNfts) {
      if (userId) {
        dispatchGetUserTokensList(userId);
      }
    }
    setLoadStatus(false);
  }, [userId]);

  return <Wrapper>{itemElements}</Wrapper>;
};

export default React.memo(UserNfts);
