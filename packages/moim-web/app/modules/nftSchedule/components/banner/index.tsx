import * as React from "react";
import { px2rem } from "common/helpers/rem";
import { SkeletonBox } from "common/components/skeleton";
import { BannerWrapper } from "./styled";
import useIsMobile from "common/hooks/useIsMobile";

interface IProps {
  item?: Moim.NFT.ISchedule;
}

const Banner: React.FC<IProps> = ({ item }: IProps) => {
  const isMobile = useIsMobile();

  if (!item) {
    return (
      <SkeletonBox width="100%" height={isMobile ? px2rem(100) : px2rem(320)} />
    );
  }
  return item.banner?.url ? (
    <BannerWrapper>
      <img src={item.banner?.url} />
    </BannerWrapper>
  ) : null;
};

export default React.memo(Banner);
