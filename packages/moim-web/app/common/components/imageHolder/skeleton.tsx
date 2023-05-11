import * as React from "react";
import BlurhashCanvas from "common/components/blurHash";
import { SkeletonBox } from "common/components/skeleton";
import { px2rem } from "common/helpers/rem";

interface IProps {
  blurHash?: string;
  width?: number;
  height?: number;
}

const ImageHolderSkeleton: React.FC<IProps> = ({ blurHash, width, height }) => {
  if (blurHash) {
    return <BlurhashCanvas hash={blurHash} width={width} height={height} />;
  }
  return <SkeletonBox width="100%" height={px2rem(height ?? 250)} />;
};

export default ImageHolderSkeleton;
