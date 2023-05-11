import * as React from "react";
// hook
import useIsMobile from "common/hooks/useIsMobile";
// helper
import { px2rem } from "common/helpers/rem";
// component
import { Spacer } from "common/components/designSystem/spacer";
import { SkeletonBox } from "common/components/skeleton";
// style
import {
  ScheduleListBanner,
  ScheduleListItem,
  ScheduleListItemContainer,
  ScheduleListItemLeft,
  ScheduleListItemRight,
} from "app/modules/nftCollection/components/scheduleList/components/styled";

export const ScheduleItemSkeleton: React.FC = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <ScheduleListItem>
        <ScheduleListBanner>
          <SkeletonBox width="100%" height={px2rem(80)} />
        </ScheduleListBanner>
        <ScheduleListItemContainer>
          <ScheduleListItemLeft hasFullWidth={true}>
            <SkeletonBox width="60%" height={px2rem(20)} />
            <Spacer value={10} />
            <SkeletonBox width="80%" height={px2rem(20)} />
            <Spacer value={10} />
            <SkeletonBox width="40%" height={px2rem(20)} />
          </ScheduleListItemLeft>
        </ScheduleListItemContainer>
      </ScheduleListItem>
    );
  }
  return (
    <ScheduleListItem>
      <ScheduleListItemContainer>
        <ScheduleListItemLeft>
          <SkeletonBox width="50%" height={px2rem(20)} />
          <Spacer value={10} />
          <SkeletonBox width="80%" height={px2rem(20)} />
        </ScheduleListItemLeft>
        <ScheduleListItemRight>
          <SkeletonBox width={px2rem(86)} height={px2rem(86)} />
        </ScheduleListItemRight>
      </ScheduleListItemContainer>
    </ScheduleListItem>
  );
};
