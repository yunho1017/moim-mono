import * as React from "react";
import useRedirect from "common/hooks/useRedirect";
import { FormattedMessage } from "react-intl";
import {
  CollectionWrapper,
  CollectionTitle,
  CollectionPreviewWrapper,
  CollectionItemPreview,
  CollectionItemTitle,
  CollectionItemDesc,
  CollectionDetail,
  MoreIcon,
} from "./styled";
import ShavedText from "common/components/shavedText";
import { MoimURL } from "common/helpers/url";

interface IProps {
  id: string;
  name: string;
  description: string;
  representResources?: Moim.NFT.IResource[];
}

const CollectionInfo: React.FC<IProps> = ({
  id,
  name,
  description,
  representResources,
}: IProps) => {
  const redirect = useRedirect();

  const handleRedirectCollection = React.useCallback(() => {
    redirect(
      new MoimURL.NftCollectionShow({
        contractId: id,
      }).toString(),
    );
  }, [redirect, id]);

  if (!id) return null;

  return (
    <CollectionWrapper role="button" onClick={handleRedirectCollection}>
      <CollectionTitle>
        <FormattedMessage id="nft_collection_sale_schedule_show_collection_info_title" />
        <MoreIcon />
      </CollectionTitle>
      <CollectionPreviewWrapper>
        {representResources?.length && (
          <CollectionItemPreview>
            <img src={representResources[0]?.previewUrl} />
          </CollectionItemPreview>
        )}
        <CollectionDetail>
          <CollectionItemTitle>{name}</CollectionItemTitle>
          <CollectionItemDesc>
            <ShavedText value={description} line={3} />
          </CollectionItemDesc>
        </CollectionDetail>
      </CollectionPreviewWrapper>
    </CollectionWrapper>
  );
};

export default React.memo(CollectionInfo);
