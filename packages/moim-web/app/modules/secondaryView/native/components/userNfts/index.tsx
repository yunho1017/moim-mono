import * as React from "react";
import { FormattedMessage } from "react-intl";
import { DefaultLayout } from "../../layout";
import AppBar from "common/components/appBar";
import { Spacer } from "common/components/designSystem/spacer";
import { DefaultDivider } from "common/components/divider";
import { Wrapper, HeaderTitle, AppBarTitle, MoimName } from "./styled";
import { NftItem, Skeleton } from "./item";
import useIsMobile from "common/hooks/useIsMobile";
import { useActions, useStoreState } from "app/store";
import { getUserTokensDetail } from "app/actions/nft";

interface PropsType {
  userId: string;
}
const UserNftList: React.FC<PropsType> = ({ userId }) => {
  const isMobile = useIsMobile();
  const [isLoading, setLoadStatus] = React.useState(false);
  const userNfts = useStoreState(state => {
    if (!userId) return null;
    return state.nft.userTokens[userId];
  });
  const initialLoaded = userNfts !== undefined && !isLoading;

  const { moimName } = useStoreState(state => {
    const user = state.entities.users[userId];
    return {
      moimName: state.entities.groups[user?.group_id]?.name,
    };
  });

  const { dispatchGetUserTokensDetail } = useActions({
    dispatchGetUserTokensDetail: getUserTokensDetail,
  });

  const appBarProps = React.useMemo(
    () =>
      ({
        titleElement: (
          <AppBarTitle>
            <FormattedMessage id="nft_list_title" />
          </AppBarTitle>
        ),
        titleAlignment: "Left",
        enableScrollParallax: true,
        parallaxWrapperComponent: "div",
        expendScrollParallaxElement: (
          <>
            {moimName && <MoimName>{moimName}</MoimName>}
            <HeaderTitle>
              <FormattedMessage id="nft_list_title" />
            </HeaderTitle>
          </>
        ),
      } as React.ComponentProps<typeof AppBar>),
    [isMobile],
  );

  const itemElements = React.useMemo(() => {
    if (!initialLoaded) {
      return new Array(6).fill(0).map((_, idx) => <Skeleton key={idx} />);
    }

    return userNfts!.data.map(token => (
      <NftItem
        key={token.id}
        tokenId={token.id}
        name={token.name}
        previewUrl={token.itemPreviewUrl}
        contractId={token.contractId}
      />
    ));
  }, [initialLoaded, userNfts]);

  React.useEffect(() => {
    if (!initialLoaded && userId && !userNfts) {
      setLoadStatus(true);
      dispatchGetUserTokensDetail(userId);
      setLoadStatus(false);
    }
  }, [userId]);

  return (
    <DefaultLayout appBar={appBarProps}>
      <Wrapper>
        <Spacer value={18} />
        <DefaultDivider />
        {itemElements}
      </Wrapper>
    </DefaultLayout>
  );
};

export default React.memo(UserNftList);
