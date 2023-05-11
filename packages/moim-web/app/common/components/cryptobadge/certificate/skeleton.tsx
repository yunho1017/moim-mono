import { Spacer } from "common/components/designSystem/spacer";
import { SkeletonBox } from "common/components/skeleton";
import { px2rem } from "common/helpers/rem";
import React from "react";
import { SkeletonRatioBox } from "app/common/components/skeleton";
import {
  BadgeDetailPageWrapper,
  BaseBadgeDetailFrame,
  Body,
  Container,
  Head,
  TopWrapper,
} from "../styled";

const CertificateDetailSkeleton: React.FC = () => (
  <React.Fragment>
    <BadgeDetailPageWrapper useBottomSticky={false}>
      <Container>
        <TopWrapper>
          <Head>
            <BaseBadgeDetailFrame>
              <div className="imageWrapper">
                <SkeletonRatioBox width="100%" ratio="1:1" />
              </div>
            </BaseBadgeDetailFrame>
          </Head>
          <Body>
            <SkeletonBox height={px2rem(40)} />
            <Spacer value={10} />
            <SkeletonBox height={px2rem(20)} width={px2rem(120)} />
            <Spacer value={10} />
            <SkeletonBox height={px2rem(116)} />
            <Spacer value={24} />
            <SkeletonBox height={px2rem(50)} />
            <Spacer value={10} />
            <SkeletonBox height={px2rem(20)} width={px2rem(120)} />
            <Spacer value={10} />
            <SkeletonBox height={px2rem(30)} width={px2rem(240)} />
            <Spacer value={10} />
            <SkeletonBox height={px2rem(40)} />
          </Body>
        </TopWrapper>
      </Container>
    </BadgeDetailPageWrapper>
  </React.Fragment>
);

export default CertificateDetailSkeleton;
