import styled from "styled-components";
import { NFTItemCellThumbnail } from "./components/thumbnail/styled";

export const NFTItemCellWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: inline-flex;
  flex-direction: column;

  &:hover ${NFTItemCellThumbnail} img {
    transform: scale(1.1);
  }
`;
