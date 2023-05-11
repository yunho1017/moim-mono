import { BlockchainCurrencyTypes, NetworkTypes } from "app/enums";
import _ from "lodash";

export const getPropertiesObjectToArray = (
  properties: Record<string, { name: string; value: string }> | undefined,
) =>
  properties && !_.isEmpty(properties)
    ? _.entries(properties).map(([, value]) => value)
    : [];

export const getPropertiesArrayToObject = (
  properties: { name: string; value: string }[],
) =>
  properties.reduce((result, current) => {
    result[current.name] = current;
    return result;
  }, {} as Record<string, { name: string; value: string }>);

export function getNetworkNameByChainId(
  chainId?: number | null,
): Moim.Enums.BlockchainNetwork | null {
  switch (chainId) {
    case 1:
      return NetworkTypes.ETHEREUM;
    case 137:
      return NetworkTypes.POLYGON;
    case 80001:
      return NetworkTypes.MUMBAI;
    default:
      return null;
  }
}

export function getCurrencyByChainId(
  chainId?: number | null,
): Moim.Enums.BlockchainCommunityCurrency | null {
  switch (chainId) {
    case 1:
      return BlockchainCurrencyTypes.ETH;
    case 137:
      return BlockchainCurrencyTypes.MATIC;
    case 80001:
      return BlockchainCurrencyTypes.MATIC;
    default:
      return null;
  }
}
