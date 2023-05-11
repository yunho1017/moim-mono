import React from "react";
import moment from "moment-timezone";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
// constant
import { WITHOUT_TIME_DATE_FORMAT } from "common/constants/default";
// helpers
import { px2rem } from "common/helpers/rem";
// hooks
import { useIntlShort } from "common/hooks/useIntlShort";
// components
import { B4Regular } from "common/components/designSystem/typos";
import BlockchainExternalLink from "app/modules/nft/components/blockchainExternalLink";
import { Spacer } from "common/components/designSystem/spacer";
import { HistoryList } from "./list";
import {
  HistoryRow,
  HistorySkeletonRow,
  HistoryCell,
  HistoryLinkCell,
  HistoryTitleRow,
  HistoryTitleCell,
  HistorySkeletonCell,
} from "./item";
// styled
import { SectionTitle, WideDivider } from "../styled";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: ${px2rem(90)};
`;

const Text = styled(B4Regular)`
  width: 100%;
  color: ${props => props.theme.colorV2.colorSet.grey300};
  text-align: center;
`;

function getTransferStatusText(event: Moim.NFT.TokenTransferEventType) {
  switch (event) {
    case "MINTED":
      return <FormattedMessage id="nft_show_history_event_minted" />;
    case "TRANSFER":
      return <FormattedMessage id="nft_show_history_event_transfer" />;
    case "SALE":
      return <FormattedMessage id="nft_show_history_event_sale" />;
    case "BURNED":
      return <FormattedMessage id="nft_show_history_event_burned" />;
  }
}
const History: React.FC<{
  network?: Moim.Community.IBlockchainType;
  transferList: Moim.NFT.IGetTokenTransferListResponseBody | undefined | null;
  onLoadMore?: (paging?: Moim.IPaging) => void;
}> = ({ network, transferList, onLoadMore }) => {
  const intl = useIntlShort();

  const historyList = React.useMemo(() => {
    if (!transferList || !network) {
      return new Array(1).fill(0).map((_, idx) => (
        <>
          <HistorySkeletonRow key={idx}>
            <HistoryCell>
              <HistorySkeletonCell height={px2rem(14)} width={px2rem(76)} />
            </HistoryCell>
            <HistoryCell>
              <HistorySkeletonCell height={px2rem(14)} width={px2rem(76)} />
            </HistoryCell>
            <HistoryCell>
              <HistorySkeletonCell height={px2rem(14)} width={px2rem(76)} />
            </HistoryCell>
            <HistoryCell>
              <HistorySkeletonCell height={px2rem(14)} width={px2rem(76)} />
            </HistoryCell>
          </HistorySkeletonRow>
          <Spacer value={24} key={`${idx}_empty_spacer`} />
          <Text>
            <FormattedMessage id="nft_history_empty" />
          </Text>
        </>
      ));
    }
    return transferList?.data.map(transfer => {
      return (
        <>
          <Spacer value={12} key={`${transfer.timestamp}_spacer`} />

          <HistoryRow>
            <HistoryCell>{getTransferStatusText(transfer.event)}</HistoryCell>
            {/* TBD */}
            {/* <HistoryCell>
              <FormattedMessage id="nft_show_history_price" />
            </HistoryCell> */}
            <HistoryLinkCell>
              <BlockchainExternalLink
                key={`${transfer.timestamp}_address`}
                network={network}
                address={transfer.fromAddress}
              />
            </HistoryLinkCell>
            <HistoryLinkCell>
              <BlockchainExternalLink
                key={`${transfer.timestamp}_address`}
                network={network}
                address={transfer.toAddress}
              />
            </HistoryLinkCell>
            <HistoryCell>
              {moment(transfer.timestamp * 1000).format(
                intl(WITHOUT_TIME_DATE_FORMAT),
              )}
            </HistoryCell>
          </HistoryRow>
        </>
      );
    });
  }, [intl, network, transferList]);

  const handleLoadMore = React.useCallback(() => {
    if (onLoadMore && transferList?.paging) {
      onLoadMore(transferList.paging);
    }
  }, [onLoadMore, transferList?.paging]);

  return (
    <Wrapper>
      <WideDivider />
      <SectionTitle>
        <FormattedMessage id="nft_show_history_title" />
      </SectionTitle>
      <HistoryList
        hasMore={Boolean(transferList?.paging.after)}
        onLoadMore={handleLoadMore}
      >
        <HistoryTitleRow>
          <HistoryTitleCell>
            <FormattedMessage id="nft_show_history_event" />
          </HistoryTitleCell>
          {/* TBD */}
          {/* <HistoryTitleCell>
            <FormattedMessage id="nft_show_history_price" />
          </HistoryTitleCell> */}
          <HistoryTitleCell>
            <FormattedMessage id="nft_show_history_from" />
          </HistoryTitleCell>
          <HistoryTitleCell>
            <FormattedMessage id="nft_show_history_to" />
          </HistoryTitleCell>
          <HistoryTitleCell>
            <FormattedMessage id="nft_show_history_date" />
          </HistoryTitleCell>
        </HistoryTitleRow>
        {historyList}
      </HistoryList>
    </Wrapper>
  );
};

export default React.memo(History);
