import * as React from "react";
import { FormattedMessage } from "react-intl";

interface IProps {
  network: string;
  transactionHash: string;
  titleTextKey?: string;
}

const TransactionHashExternalLink: React.FC<IProps> = ({
  network,
  transactionHash,
  titleTextKey,
}) => {
  const href = React.useMemo(() => {
    switch (network) {
      case "POLYGON": {
        return `https://polygonscan.com/tx/${transactionHash}`;
      }
      case "ETHEREUM": {
        return `https://etherscan.io/tx/${transactionHash}`;
      }
    }
  }, [transactionHash, network]);

  return (
    <a href={href} target="_blank">
      <FormattedMessage id={titleTextKey} />
    </a>
  );
};

export default TransactionHashExternalLink;
