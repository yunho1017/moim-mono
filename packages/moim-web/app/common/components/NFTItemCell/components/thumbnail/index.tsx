import * as React from "react";
// style
import { NFTItemCellHead, NFTItemCellThumbnail } from "./styled";

interface IProps {
  id: string;
  thumbnailUrl: string;
}

const Thumbnail: React.FC<IProps> = ({ id, thumbnailUrl }: IProps) => (
  <NFTItemCellHead>
    <NFTItemCellThumbnail>
      <img src={thumbnailUrl} alt={id} />
    </NFTItemCellThumbnail>
  </NFTItemCellHead>
);

export default React.memo(Thumbnail);
