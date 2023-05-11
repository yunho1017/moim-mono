import { Spacer } from "common/components/designSystem/spacer";
import _ from "lodash";
import React from "react";
import BadgeWinners from "../../components/BadgeWinners";
import { Tags } from "../../components/Tags";
import { TextWithMoreButton } from "../../components/TextWithMoreButton";
import {
  BadgeDetailPageWrapper,
  BadgeInfoWrapper,
  BadgeNameWrapper,
  BaseBadgeDetailFrame,
  Body,
  Container,
  Foot,
  GuideTitle,
  Head,
  IssuerWrapper,
  MediaWrapper,
  MobileSectionDivider,
  MobileSectionDividerWrapper,
  TopWrapper,
  UserName,
  Winner,
  WinnerAddress,
  WinnerNameWrapper,
} from "../../styled";
import Media from "../../components/media";
import useCurrentUser from "common/hooks/useCurrentUser";
import useRedirect from "common/hooks/useRedirect";
import { shaveWalletAddress } from "common/helpers/nft";
import { FormattedMessage } from "react-intl";
import { MoimURL } from "common/helpers/url";
import UserProfileImage from "common/components/userProfileImage";
import { Properties } from "../../components/Property";
import { SupportedLanguageType } from "app/intl";
import { useCurrentUserLocale } from "common/hooks/useGroupTexts";

interface IProps {
  badge: Moim.Cryptobadge.ICryptobadge;
  tokenId?: string;
  profileElements: any;
  certCount: number;
}

const CertificateMetadataDetailShowItem: React.FC<IProps> = ({
  badge,
  profileElements,
  certCount,
}) => {
  const user = useCurrentUser();
  const redirect = useRedirect();

  const locale: SupportedLanguageType = useCurrentUserLocale();

  const badgeDescriptionTitle = React.useMemo(
    () =>
      badge.descriptionTitle &&
      _.find(
        badge.descriptionTitle,
        title => title.locale?.toLowerCase() === locale?.toLowerCase(),
      )?.value,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [badge?.descriptionTitle, locale],
  );

  const badgeHowToWinTitle = React.useMemo(
    () =>
      badge.winConditionTitle &&
      _.find(
        badge.winConditionTitle,
        title => title.locale?.toLowerCase() === locale?.toLowerCase(),
      )?.value,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [badge?.descriptionTitle, locale],
  );

  const styleProps = {
    backgroundColor: badge.backgroundColor ?? "white",
    textColor: badge.textColor ?? "black",
  };

  const mainColor = React.useMemo(
    () =>
      badge.textColor?.toLowerCase() === "#ffffff"
        ? "white"
        : badge.textColor?.toLowerCase() === "#000000"
        ? "black"
        : undefined,
    [badge.textColor],
  );

  const redirectToProfileShow = React.useCallback(() => {
    const url = new MoimURL.Me().toString();
    redirect(url);
  }, [redirect]);

  return (
    <BadgeDetailPageWrapper {...styleProps}>
      <Container>
        <TopWrapper>
          <Head>
            <BaseBadgeDetailFrame {...styleProps}>
              <MediaWrapper>
                {badge.certificateAnimationUri ? (
                  <Media
                    key={badge.certificateAnimationUri}
                    src={badge.certificateAnimationUri}
                    isVideo={true}
                    poster={badge.certificateImageUri ?? ""}
                  />
                ) : (
                  <Media
                    key={badge.certificateImageUri}
                    src={badge.certificateImageUri ?? ""}
                    alt={badge.certificateImageUri ?? ""}
                    isVideo={false}
                  />
                )}
              </MediaWrapper>
            </BaseBadgeDetailFrame>
          </Head>
          <Body>
            <BadgeInfoWrapper {...styleProps}>
              <BadgeNameWrapper>{badge.name}</BadgeNameWrapper>
              <IssuerWrapper>
                <FormattedMessage id="badge_show_issued_by" />
                <span className="issuer-name">{` ${badge.issuer}`}</span>
              </IssuerWrapper>
            </BadgeInfoWrapper>
            <WinnerNameWrapper
              role={"button"}
              onClick={redirectToProfileShow}
              mainColor={mainColor}
            >
              <Winner>Winner</Winner>
              <UserProfileImage size="l" src={user?.avatar_url} />
              <UserName>{user?.name}</UserName>
              <WinnerAddress>
                {shaveWalletAddress(user?.metamask ?? "")}
              </WinnerAddress>
            </WinnerNameWrapper>
            <MobileSectionDividerWrapper>
              <MobileSectionDivider {...styleProps} />
            </MobileSectionDividerWrapper>
            <GuideTitle {...styleProps}>
              {badgeDescriptionTitle ?? (
                <FormattedMessage id="badge_show_badge_description_title" />
              )}
            </GuideTitle>
            <TextWithMoreButton
              text={badge.description ?? ""}
              maxLine={2}
              {...styleProps}
            />
            {badge.tags && (
              <>
                <Tags tags={badge.tags ?? []} {...styleProps} />
                <Spacer value={20} />
              </>
            )}
            <BadgeWinners
              profileElements={profileElements}
              certCount={certCount}
              {...styleProps}
            />
            <Spacer value={20} />
            <MobileSectionDividerWrapper>
              <MobileSectionDivider {...styleProps} />
            </MobileSectionDividerWrapper>
            <GuideTitle {...styleProps}>
              {badgeHowToWinTitle ?? (
                <FormattedMessage id="badge_show_how_to_win_title" />
              )}
            </GuideTitle>
            <TextWithMoreButton
              text={badge.criteria ?? ""}
              maxLine={4}
              {...styleProps}
            />
          </Body>
        </TopWrapper>
        <Foot>
          <Properties properties={badge.properties} {...styleProps} />
        </Foot>
      </Container>
    </BadgeDetailPageWrapper>
  );
};

export default React.memo(CertificateMetadataDetailShowItem);
