import * as React from "react";
import {
  Title,
  DescriptionText,
  DetailWrapper,
  DetailRow,
  DetailLabel,
  DetailValue,
  DropdownIcon,
  DetailTitleButton,
} from "./styled";
import { shaveWalletAddress } from "common/helpers/nft";
import ShavedText from "common/components/shavedText";
import { FormattedMessage } from "react-intl";

interface IProps {
  description: string;
  contract: Moim.NFT.IContract;
  tokenId: number;
  showItemDescription: boolean;
  showDetail: boolean;
}

const Description = ({
  description,
  contract,
  tokenId,
  showItemDescription,
  showDetail,
}: IProps) => {
  const [isDetailOpened, setDetailOpen] = React.useState<boolean>(false);

  const handleDropDown: React.MouseEventHandler<HTMLDivElement> = React.useCallback(
    async e => {
      e.preventDefault();
      e.stopPropagation();
      setDetailOpen(status => !status);
    },
    [],
  );

  return (
    <>
      {showItemDescription && (
        <>
          <Title>
            <FormattedMessage id="nft_show_description_title" />
          </Title>
          <DescriptionText role="button">
            <ShavedText value={description} line={4} />
          </DescriptionText>
        </>
      )}
      {showDetail && (
        <>
          <DetailTitleButton onClick={handleDropDown}>
            <Title>
              <FormattedMessage id="nft_show_details_title" />
            </Title>
            <DropdownIcon opened={isDetailOpened} />
          </DetailTitleButton>
          <DetailWrapper role="button" opened={isDetailOpened}>
            <DetailRow>
              <DetailLabel>
                <FormattedMessage id="nft_show_details_contract_address" />
              </DetailLabel>
              <DetailValue>{shaveWalletAddress(contract.address)}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>
                <FormattedMessage id="nft_show_details_token_id" />
              </DetailLabel>
              <DetailValue>{tokenId}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>
                <FormattedMessage id="nft_show_details_token_standard" />
              </DetailLabel>
              <DetailValue>{contract.standard}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>
                <FormattedMessage id="nft_show_details_block_chain" />
              </DetailLabel>
              <DetailValue>{contract.network}</DetailValue>
            </DetailRow>
          </DetailWrapper>
        </>
      )}
    </>
  );
};

export default React.memo(Description);
