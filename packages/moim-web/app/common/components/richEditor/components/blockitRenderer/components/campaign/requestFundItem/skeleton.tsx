import * as React from "react";
import { SkeletonBox } from "common/components/skeleton";
import { Spacer } from "common/components/designSystem/spacer";
import { Wrapper } from "./styled";

interface IProps {}

const RequestFundItemSkeleton: React.FC<IProps> = ({}) => {
  return (
    <Wrapper>
      <SkeletonBox />
      <Spacer value={8} />
    </Wrapper>
  );
};

export default RequestFundItemSkeleton;
