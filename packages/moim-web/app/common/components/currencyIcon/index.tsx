import * as React from "react";
import {
  APEIcon,
  AVAXIcon,
  EthereumIcon,
  LINKIcon,
  MANAIcon,
  NEARIcon,
  PolygonIcon,
  SANDIcon,
  SHIBIcon,
  USDCIcon,
  USDTIcon,
  APEIconXS,
  AVAXIconXS,
  EthereumIconXS,
  LINKIconXS,
  MANAIconXS,
  NEARIconXS,
  PolygonIconXS,
  SANDIconXS,
  SHIBIconXS,
  USDCIconXS,
  USDTIconXS,
} from "./style";

interface IProps {
  currency: Moim.Community.BlockchainCommunityCurrency;
  size?: Moim.DesignSystem.Size;
}

const CurrencyIcon: React.FC<IProps> = ({ currency, size = "s" }) => {
  switch (currency) {
    case "MATIC": {
      if (size === "xs") {
        return <PolygonIconXS />;
      } else {
        return <PolygonIcon size={size} />;
      }
    }
    case "ETH": {
      if (size === "xs") {
        return <EthereumIconXS />;
      } else {
        return <EthereumIcon size={size} />;
      }
    }
    case "LINK": {
      if (size === "xs") {
        return <LINKIconXS />;
      } else {
        return <LINKIcon size={size} />;
      }
    }
    case "USDT": {
      if (size === "xs") {
        return <USDTIconXS />;
      } else {
        return <USDTIcon size={size} />;
      }
    }
    case "USDC": {
      if (size === "xs") {
        return <USDCIconXS />;
      } else {
        return <USDCIcon size={size} />;
      }
    }
    case "APE": {
      if (size === "xs") {
        return <APEIconXS />;
      } else {
        return <APEIcon size={size} />;
      }
    }
    case "SAND": {
      if (size === "xs") {
        return <SANDIconXS />;
      } else {
        return <SANDIcon size={size} />;
      }
    }
    case "SHIB": {
      if (size === "xs") {
        return <SHIBIconXS />;
      } else {
        return <SHIBIcon size={size} />;
      }
    }
    case "NEAR": {
      if (size === "xs") {
        return <NEARIconXS />;
      } else {
        return <NEARIcon size={size} />;
      }
    }
    case "AVAX": {
      if (size === "xs") {
        return <AVAXIconXS />;
      } else {
        return <AVAXIcon size={size} />;
      }
    }
    case "MANA": {
      if (size === "xs") {
        return <MANAIconXS />;
      } else {
        return <MANAIcon size={size} />;
      }
    }

    default: {
      return null;
    }
  }
};

export default CurrencyIcon;
