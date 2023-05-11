import styled from "styled-components";
import { px2rem } from "common/helpers/rem";

export const NFTItemCellThumbnail = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  border-radius: ${px2rem(6)};
  overflow: hidden;
  background-color: ${props => props.theme.colorV2.colorSet.grey50};
  img {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: transform 120ms ease-in-out 0ms;
  }
`;

export const NFTItemCellHead = styled.div`
  width: 100%;
  height: fit-content !important;
`;
