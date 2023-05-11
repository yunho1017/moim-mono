import React from "react";
import styled, { css } from "styled-components";
import { FormattedMessage } from "react-intl";
import { MEDIA_QUERY } from "common/constants/responsive";
// helpers
import { px2rem } from "common/helpers/rem";
// hooks
import useIsMobile from "common/hooks/useIsMobile";
// components
import { Spacer } from "common/components/designSystem/spacer";
import { SkeletonBox } from "common/components/skeleton";
import { CustomAppBarModalLayout } from "common/components/modalLayout";
import FreezeView from "common/components/freezeView";
import AppBar from "common/components/appBar";
import {
  B3Regular,
  H8Bold,
  B4Regular,
} from "common/components/designSystem/typos";
// styled
import {
  WithOutMaxHeightDialog,
  CloseButton,
  BackButton,
} from "common/components/basicResponsiveDialog/styled";
import { SectionTitle, WideDivider } from "../styled";

const wrapperStyle = css`
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    padding: 0 ${px2rem(16)};
  }
`;

const SeeAll = styled(B3Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey300};
  position: absolute;
  bottom: ${px2rem(8)};
  right: ${px2rem(16)};
`;

const Wrapper = styled.div`
  &:hover ${SeeAll} {
    text-decoration: underline;
  }
`;

const SeeAllWrapper = styled.div<{ shortText: boolean }>`
  display: ${props => (props.shortText ? "none" : "block")};
  position: absolute;
  bottom: ${px2rem(0)};
  left: 0;
  right: 0;
  width: 100%;
  height: ${px2rem(70)};
  background: linear-gradient(
    360deg,
    ${props => props.theme.colorV2.colorSet.white1000} 0%,
    ${props => props.theme.colorV2.colorSet.white1000} 11%,
    rgba(255, 255, 255, 0) 100%
  );
`;
export const DescWrapper = styled.div`
  padding: ${px2rem(16)} ${px2rem(16)} 0;
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    padding: ${px2rem(8)} ${px2rem(16)};
  }
`;
export const Desc = styled.div`
  position: relative;
  height: ${px2rem(140)};
  overflow: hidden;
  padding: ${px2rem(12)} ${px2rem(16)} ${px2rem(8)};
  border-radius: ${px2rem(4)};
  border: solid 1px ${props => props.theme.colorV2.colorSet.grey50};
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
`;

const DescTxt = styled(B3Regular)`
  width: 100%;
  color: ${props => props.theme.colorV2.colorSet.grey600};
  white-space: pre-line;
`;

const ContentWrapper = styled.div`
  padding: ${px2rem(12)} ${px2rem(16)};
  border-radius: ${px2rem(4)};
  border: solid 1px ${props => props.theme.colorV2.colorSet.grey50};
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
  @media ${MEDIA_QUERY.ONLY_DESKTOP} {
    margin: 0 ${px2rem(24)} ${px2rem(33)};
  }
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    margin: ${px2rem(16)} ${px2rem(16)} ${px2rem(33)};
  }
`;

const TitleTextWrapper = styled.div`
  margin-left: ${px2rem(9)};
`;

const TitleItemName = styled(B4Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey300};
`;

interface PropsType {
  value: string;
  itemName: string;
}
const DESC_TEXT_MIN_HEIGHT = 120;
const Description: React.FC<PropsType> = ({ value, itemName }) => {
  const isMobile = useIsMobile();
  const refDescText = React.useRef<HTMLDivElement>(null);
  const [isShortText, setShortText] = React.useState<boolean>(false);
  const [isModalOpen, setModalOpen] = React.useState<boolean>(false);

  const handleClickSeeAll: React.MouseEventHandler<HTMLDivElement> = React.useCallback(() => {
    if (!isShortText) {
      setModalOpen(true);
    }
  }, [isShortText]);

  const handleClose = React.useCallback(() => {
    setModalOpen(false);
  }, []);

  const TitleTextElement = React.useMemo(() => {
    return (
      <TitleTextWrapper>
        <H8Bold>
          <FormattedMessage id="nft_show_description_title" />
        </H8Bold>
        <TitleItemName>{itemName}</TitleItemName>
      </TitleTextWrapper>
    );
  }, [itemName]);

  React.useEffect(() => {
    if (
      refDescText.current &&
      refDescText.current.offsetHeight < DESC_TEXT_MIN_HEIGHT
    ) {
      setShortText(true);
    }
  }, [refDescText]);

  return (
    <>
      <Wrapper>
        <WideDivider />
        <SectionTitle>
          <FormattedMessage id="nft_show_description_title" />
        </SectionTitle>
        <DescWrapper
          role={!isShortText ? "button" : undefined}
          onClick={handleClickSeeAll}
        >
          <Desc>
            <DescTxt
              ref={refDescText}
              dangerouslySetInnerHTML={{ __html: value }}
            ></DescTxt>
            <SeeAllWrapper shortText={isShortText}>
              <SeeAll>
                <FormattedMessage id="button_see_more_nft_description" />
              </SeeAll>
            </SeeAllWrapper>
          </Desc>
        </DescWrapper>
      </Wrapper>
      <WithOutMaxHeightDialog
        open={isModalOpen}
        fullScreen={false}
        onClose={handleClose}
      >
        <CustomAppBarModalLayout
          appBar={
            <AppBar
              wrapperStyle={wrapperStyle}
              titleElement={!isMobile ? "" : TitleTextElement}
              titleAlignment="Center"
              leftButton={
                !isMobile ? (
                  <CloseButton onClick={handleClose} />
                ) : (
                  <BackButton onClick={handleClose} />
                )
              }
            />
          }
          hasAppBarBorder={false}
        >
          <FreezeView isFreeze={isModalOpen} delayedFreeze={50}>
            <ContentWrapper>
              <DescTxt
                ref={refDescText}
                dangerouslySetInnerHTML={{ __html: value }}
              ></DescTxt>
            </ContentWrapper>
          </FreezeView>
        </CustomAppBarModalLayout>
      </WithOutMaxHeightDialog>
    </>
  );
};

export const DescriptionSkeleton = React.memo(() => {
  return (
    <Wrapper>
      <SectionTitle>
        <FormattedMessage id="nft_show_description_title" />
      </SectionTitle>
      <DescWrapper>
        <Desc>
          <Spacer value={10} />
          <SkeletonBox height={px2rem(20)} width="60%" />
          <Spacer value={10} />
          <SkeletonBox height={px2rem(20)} width="90%" />
          <Spacer value={10} />
          <SkeletonBox height={px2rem(20)} width="30%" />
        </Desc>
      </DescWrapper>
    </Wrapper>
  );
});

export default React.memo(Description);
