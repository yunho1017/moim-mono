import * as React from "react";
import { shaveWalletAddress } from "common/helpers/nft";
interface IProps {
  network: Moim.Community.IBlockchainType;
  address: string;
}

const BlockchainExternalLink: React.FC<IProps> = ({ network, address }) => {
  const href = React.useMemo(() => {
    switch (network) {
      case "POLYGON": {
        return `https://polygonscan.com/address/${address}`;
      }
      case "ETHEREUM": {
        return `https://etherscan.io/address/${address}`;
      }
    }
  }, [address, network]);

  return (
    <a href={href} target="_blank">
      {shaveWalletAddress(address)}
    </a>
  );
};

export default BlockchainExternalLink;
