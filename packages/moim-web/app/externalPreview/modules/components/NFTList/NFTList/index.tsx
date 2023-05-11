import * as React from "react";
import { FormattedMessage } from "react-intl";
import AppBar from "common/components/appBar";
import { Spacer } from "common/components/designSystem/spacer";
import { DefaultDivider } from "common/components/divider";
import {
  Wrapper,
  HeaderTitle,
  AppBarTitle,
} from "app/modules/secondaryView/native/components/userNfts/styled";
import { NftItem, Skeleton } from "./item";
import { DefaultLayout } from "../../secondaryView/native/layout";

interface PropsType {
  loading: boolean | null;
  groupId: string;
  items?: Moim.NFT.INftDetail[];
  tokens?: Moim.NFT.INftToken[];
}

const UserNFTList: React.FC<PropsType> = ({
  loading,
  groupId,
  items,
  tokens,
}) => {
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
          <HeaderTitle>
            <FormattedMessage id="nft_list_title" />
          </HeaderTitle>
        ),
      } as React.ComponentProps<typeof AppBar>),
    [],
  );

  const itemElements = React.useMemo(() => {
    if (loading) {
      return new Array(6).fill(0).map((_, idx) => <Skeleton key={idx} />);
    }

    if (!items || !tokens) {
      return null;
    }

    return items.map(token => {
      const contractName = tokens.filter(item => item.id === token.id)[0]
        .contractName;
      return (
        <NftItem
          key={token.id}
          tokenId={token.id}
          name={token.name}
          previewUrl={token.itemStaticPreviewUrl}
          contractName={contractName}
          groupId={groupId}
        />
      );
    });
  }, [loading, items, tokens, groupId]);

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

export default React.memo(UserNFTList);
