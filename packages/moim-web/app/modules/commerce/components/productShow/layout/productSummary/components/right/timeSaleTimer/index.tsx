import React from "react";
import styled, { css } from "styled-components";
import Timer from "../../../../../components/timer";
import { Spacer } from "common/components/designSystem/spacer";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";

const TimeSaleWrapper = styled.div`
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    padding: 0 ${px2rem(16)};
  }
`;

export function getActiveTimeSaleProductSet(
  productSets?: Moim.Commerce.ITimeSaleEntity[],
): Moim.Commerce.ITimeSaleEntity | undefined {
  const activeTimeSaleProductSets = (productSets ?? []).filter(
    item => item.showTimeSaleTimer && item.timeSaleEndAt,
  );

  return activeTimeSaleProductSets.reverse()[0];
}

interface IProps {
  size: "small" | "normal";
  productSets: Moim.Commerce.ITimeSaleEntity[] | undefined;
  className?: string;
}

export default function TimeSaleTimer({
  size,
  productSets,
  className,
}: IProps) {
  if (Boolean(productSets?.length)) {
    const latestProductSet = getActiveTimeSaleProductSet(productSets);
    if (latestProductSet) {
      return (
        <>
          <TimeSaleWrapper className={className}>
            <Timer
              size={size}
              endDateTime={latestProductSet.timeSaleEndAt}
              overrideStyle={css`
                width: 100%;
                background-color: ${latestProductSet.badgeBackgroundColor ??
                  "transparent"};
                color: #ffffff;
              `}
            />
          </TimeSaleWrapper>
          <Spacer value={16} />
        </>
      );
    }
  }

  return null;
}
