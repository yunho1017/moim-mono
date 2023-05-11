import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { B4Regular, H8BoldStyle } from "common/components/designSystem/typos";

export const TopWrapper = styled.div`
  width: 100%;
  flex: 1 1 0%;
  align-self: flex-start;
`;

export const BottomWrapper = styled.div`
  width: 100%;
  flex: 1 1 0%;
  align-self: flex-end;
`;

export const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: flex-end;
`;

export const NFTItemCellBody = styled.div<{
  alignItems?: string;
  textAlignment?: string;
}>`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: ${props => props.alignItems};
  text-align: ${props => props.textAlignment};
`;

export const NFTItemCellCollection = styled(B4Regular)`
  width: 100%;
  padding: ${px2rem(4)} 0;
  color: ${props => props.theme.colorV2.colorSet.grey600};
  word-break: break-all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const NFTItemCellName = styled.div`
  ${H8BoldStyle}
  color: ${props => props.theme.colorV2.colorSet.grey800};
  word-break: break-all;
`;
