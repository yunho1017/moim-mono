import * as React from "react";
import { px2rem } from "common/helpers/rem";
import { Spacer } from "common/components/designSystem/spacer";
import {
  TreasuryItemWrapper,
  TreasurySkeletonBox,
  TreasurySkeletonContentWrapper,
  TreasurySkeletonWrapper,
  PriceWrapper,
  TotalStatementWrapper,
  TreasurySkeletonFlexBox,
  roundSkeletonStyle,
} from "./styled";
import {
  DescriptionTitleWrapper,
  WalletsWrapper,
  WalletWrapper,
} from "./components/content/components/styled";
import { DefaultDivider } from "common/components/divider";

export const Skeleton: React.FC = () => (
  <TreasuryItemWrapper>
    <DescriptionTitleWrapper>
      <TreasurySkeletonBox height={px2rem(30)} width="30%" />
    </DescriptionTitleWrapper>
    <Spacer value={10} />
    <TreasurySkeletonBox height={px2rem(16)} width="80%" />
    <Spacer value={20} />
    <TreasurySkeletonContentWrapper>
      <TreasurySkeletonWrapper>
        <DescriptionTitleWrapper>
          <TreasurySkeletonBox height={px2rem(21)} width="25%" />
        </DescriptionTitleWrapper>
        <Spacer value={10} />
        <TreasurySkeletonBox height={px2rem(17)} width="60%" />
      </TreasurySkeletonWrapper>
      <DefaultDivider />
      <Spacer value={10} />
      <TreasurySkeletonWrapper>
        <PriceWrapper>
          <TreasurySkeletonBox height={px2rem(17)} width="30%" />
        </PriceWrapper>
        <Spacer value={10} />
        <PriceWrapper>
          <TreasurySkeletonBox height={px2rem(30)} width="80%" />
        </PriceWrapper>
        <Spacer value={49} />
        <TotalStatementWrapper>
          <TreasurySkeletonFlexBox height={px2rem(100)} width="100%">
            <TreasurySkeletonBox height={px2rem(17)} width={px2rem(96)} />
            <TreasurySkeletonBox height={px2rem(25)} width={px2rem(215)} />
          </TreasurySkeletonFlexBox>
          <TreasurySkeletonBox height={px2rem(100)} width="100%" />
        </TotalStatementWrapper>
        <Spacer value={10} />
        <DefaultDivider />
        <Spacer value={10} />
        <WalletsWrapper>
          <WalletWrapper>
            <TreasurySkeletonBox
              height={px2rem(48)}
              width={px2rem(48)}
              overrideStyle={roundSkeletonStyle}
            />
            <TreasurySkeletonBox height={px2rem(17)} width={px2rem(185)} />
          </WalletWrapper>
          <WalletWrapper>
            <TreasurySkeletonBox
              height={px2rem(48)}
              width={px2rem(48)}
              overrideStyle={roundSkeletonStyle}
            />
            <TreasurySkeletonBox height={px2rem(17)} width={px2rem(185)} />
          </WalletWrapper>
          <WalletWrapper>
            <TreasurySkeletonBox
              height={px2rem(48)}
              width={px2rem(48)}
              overrideStyle={roundSkeletonStyle}
            />
            <TreasurySkeletonBox height={px2rem(17)} width={px2rem(185)} />
          </WalletWrapper>
        </WalletsWrapper>
      </TreasurySkeletonWrapper>
    </TreasurySkeletonContentWrapper>
  </TreasuryItemWrapper>
);

export default React.memo(Skeleton);
