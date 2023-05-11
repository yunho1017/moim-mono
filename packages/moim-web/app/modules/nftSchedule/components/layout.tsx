import * as React from "react";
import useIsMobile from "common/hooks/useIsMobile";
import { TopWrapper, Left, Right, LayoutWrapper } from "../styled";
import { Spacer } from "common/components/designSystem/spacer";
import { NFTScheduleLayoutSkeleton } from "../skeleton";

interface IProps {
  type?: Moim.NFT.NFTScheduleViewType;
  mediaElement?: React.ReactNode;
  periodElement: React.ReactNode;
  buttonAreaElement?: React.ReactNode;
  priceElement: React.ReactNode;
  collectionElement: React.ReactNode;
  scheduleElement: React.ReactNode;
  soldBadgeElement: React.ReactNode;
  currentBlockElement: React.ReactNode;
}

const Layout: React.FC<IProps> = ({
  type,
  mediaElement,
  periodElement,
  priceElement,
  collectionElement,
  scheduleElement,
  buttonAreaElement,
  soldBadgeElement,
  currentBlockElement,
}: IProps) => {
  const isMobile = useIsMobile();

  if (!type) {
    return <NFTScheduleLayoutSkeleton />;
  }

  if (isMobile) {
    return (
      <>
        <LayoutWrapper>
          <Spacer value={16} />
          {mediaElement}
          {periodElement}
          {currentBlockElement}
          <Spacer value={8} />
          {priceElement}
          {soldBadgeElement}
          <Spacer value={12} />
          {collectionElement}
          <Spacer value={10} />
          {scheduleElement}
        </LayoutWrapper>
        {buttonAreaElement}
      </>
    );
  }

  if (!mediaElement) {
    return (
      <LayoutWrapper>
        <Spacer value={32} />
        <TopWrapper>
          <Left>{scheduleElement}</Left>
          <Right>
            {periodElement}
            {currentBlockElement}
            <Spacer value={8} />
            {priceElement}
            {soldBadgeElement}
            {buttonAreaElement}
            <Spacer value={12} />
            {collectionElement}
          </Right>
        </TopWrapper>
      </LayoutWrapper>
    );
  }

  return (
    <LayoutWrapper>
      <Spacer value={32} />
      <TopWrapper>
        <Left>{mediaElement}</Left>
        <Right>
          {periodElement}
          {currentBlockElement}
          <Spacer value={8} />
          {priceElement}
          {soldBadgeElement}
          {buttonAreaElement}
          <Spacer value={12} />
          {collectionElement}
          <Spacer value={12} />
          {scheduleElement}
        </Right>
      </TopWrapper>
    </LayoutWrapper>
  );
};

export default React.memo(Layout);
