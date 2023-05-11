import * as React from "react";
import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { SkeletonBox as Base } from "common/components/skeleton";
import { Spacer } from "common/components/designSystem/spacer";
import { DefaultDivider } from "common/components/divider";
import PurchaseItemSkeleton from "app/modules/commerce/containers/myShopping/tabs/payments/components/purchaseItem/skeleton";
import { Divider } from "app/modules/commerce/containers/myShopping/tabs/payments/styled";

const SkeletonBox = styled(Base)`
  display: block;
`;

const HeadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${px2rem(16)};
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
`;

const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${px2rem(12)} ${px2rem(8)};
  background-color: ${props => props.theme.colorV2.colorSet.grey50};
`;

const BoxWrapper = styled.div`
  width: 100%;
  padding: ${px2rem(16)} 0;
  border-radius: ${px2rem(4)};
  border: solid 1px rgba(1, 5, 5, 0.06);
  background-color: ${props => props.theme.colorV2.colorSet.white1000};

  & + & {
    margin-top: ${px2rem(12)};
  }

  .head {
    padding: 0 ${px2rem(8)};
    padding-top: ${px2rem(2)};
  }

  .body {
    display: flex;
    padding: 0 ${px2rem(8)};

    .left {
      display: flex;
      flex-direction: column;

      flex: 1;
      min-width: 0;
      width: 100%;
    }

    .right {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      width: fit-content;
    }
  }
`;

const PaymentDetailSkeleton: React.FC = ({}) => {
  return (
    <>
      <HeadWrapper>
        <SkeletonBox width={px2rem(190)} height={px2rem(18)} />
        <Spacer value={12} />
        <SkeletonBox width={px2rem(100)} height={px2rem(10)} />
        <Spacer value={10} />
      </HeadWrapper>
      <BodyContainer>
        <BoxWrapper>
          <div className="head">
            <SkeletonBox width={px2rem(132)} height={px2rem(18)} />
            <Spacer value={21} />
          </div>
          <div className="body">
            <div className="left">
              <SkeletonBox width={px2rem(108)} height={px2rem(12)} />
              <Spacer value={15} />
              <SkeletonBox width={px2rem(108)} height={px2rem(12)} />
            </div>
            <div className="right">
              <SkeletonBox width={px2rem(108)} height={px2rem(12)} />
              <Spacer value={15} />
              <SkeletonBox width={px2rem(126)} height={px2rem(12)} />
            </div>
          </div>
          <Spacer value={8} />
        </BoxWrapper>

        <BoxWrapper>
          <div className="head">
            <SkeletonBox width={px2rem(132)} height={px2rem(18)} />
            <Spacer value={21} />
          </div>
          <div className="body">
            <div className="left">
              <SkeletonBox width={px2rem(108)} height={px2rem(12)} />
              <Spacer value={15} />
              <SkeletonBox width={px2rem(108)} height={px2rem(12)} />
              <Spacer value={15} />
              <SkeletonBox width={px2rem(108)} height={px2rem(12)} />
              <Spacer value={15} />
              <SkeletonBox width={px2rem(108)} height={px2rem(12)} />
            </div>
            <div className="right">
              <SkeletonBox width={px2rem(108)} height={px2rem(12)} />
              <Spacer value={15} />
              <SkeletonBox width={px2rem(126)} height={px2rem(12)} />
              <Spacer value={15} />
              <SkeletonBox width={px2rem(108)} height={px2rem(12)} />
              <Spacer value={15} />
              <SkeletonBox width={px2rem(126)} height={px2rem(12)} />
            </div>
          </div>

          <Spacer value={16} />
          <DefaultDivider />
          <Spacer value={16} />

          <div className="body">
            <div className="left">
              <SkeletonBox width={px2rem(108)} height={px2rem(12)} />
            </div>
            <div className="right">
              <SkeletonBox width={px2rem(108)} height={px2rem(12)} />
            </div>
          </div>
        </BoxWrapper>

        <BoxWrapper>
          <div className="body">
            <div className="left"></div>
            <div className="right">
              <SkeletonBox width={px2rem(108)} height={px2rem(12)} />
              <Spacer value={4} />
            </div>
          </div>
          <Spacer value={8} />
          <DefaultDivider />
          <Spacer value={8} />
          <div className="body">
            <div className="left">
              <Spacer value={3} />

              <SkeletonBox width={px2rem(132)} height={px2rem(12)} />
              <Spacer value={12} />
            </div>
            <div className="right"></div>
          </div>
          <DefaultDivider />
          <Spacer value={8} />
          <PurchaseItemSkeleton />
          <Divider />
          <PurchaseItemSkeleton />
          <Divider />
          <PurchaseItemSkeleton />
          <Spacer value={8} />
        </BoxWrapper>
      </BodyContainer>
    </>
  );
};

export default PaymentDetailSkeleton;
