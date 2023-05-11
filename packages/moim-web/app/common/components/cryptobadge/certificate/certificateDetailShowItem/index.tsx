import { getCertificate_node_Certificate } from "@vingle/cryptobadge-sdk";
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
import { shaveWalletAddress } from "common/helpers/nft";
import Media from "../../components/media";
import { FormattedMessage } from "react-intl";
import { Properties } from "../../components/Property";
import UserProfileImage from "common/components/userProfileImage";
import { SupportedLanguageType } from "app/intl";
import { useCurrentUserLocale } from "common/hooks/useGroupTexts";

interface IProps {
  certificate: getCertificate_node_Certificate;
  badge: Moim.Cryptobadge.ICryptobadge;
  profileElements: any;
  certCount: number;
  winner?: Moim.Community.ICommunityUser;
}

const CertificateDetailShowItem: React.FC<IProps> = ({
  certificate,
  badge,
  profileElements,
  certCount,
  winner,
}) => {
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

  const styleProps = React.useMemo(
    () => ({
      backgroundColor: certificate.backgroundColor ?? "white",
      textColor: certificate.textColor ?? "black",
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [certificate?.backgroundColor, certificate?.textColor],
  );

  const mainColor = React.useMemo(
    () =>
      badge.textColor?.toLowerCase() === "#ffffff"
        ? "white"
        : badge.textColor?.toLowerCase() === "#000000"
        ? "black"
        : undefined,
    [badge.textColor],
  );

  return (
    <BadgeDetailPageWrapper {...styleProps}>
      <Container>
        <TopWrapper>
          <Head>
            <BaseBadgeDetailFrame {...styleProps}>
              <MediaWrapper>
                {certificate.animationUri ? (
                  <Media
                    key={certificate.animationUri}
                    src={certificate.animationUri}
                    isVideo={true}
                    poster={certificate.imageUri ?? ""}
                  />
                ) : (
                  <Media
                    key={certificate.imageUri}
                    src={certificate.imageUri ?? ""}
                    alt={certificate.name ?? ""}
                    isVideo={false}
                  />
                )}
              </MediaWrapper>
            </BaseBadgeDetailFrame>
          </Head>
          <Body>
            <BadgeInfoWrapper {...styleProps}>
              <BadgeNameWrapper>{certificate.name}</BadgeNameWrapper>
              <IssuerWrapper>
                <FormattedMessage id="badge_show_issued_by" />
                <span className="issuer-name">{` ${certificate.issuer}`}</span>
              </IssuerWrapper>
            </BadgeInfoWrapper>
            <WinnerNameWrapper {...styleProps} mainColor={mainColor}>
              <Winner>
                <FormattedMessage id="certificate_show_winner_information_title" />
              </Winner>
              <UserProfileImage size="l" src={winner?.avatarUrl} />
              <UserName>{certificate.winner}</UserName>
              <WinnerAddress>
                {shaveWalletAddress(certificate.winnerAddress ?? "")}
              </WinnerAddress>
            </WinnerNameWrapper>
            <MobileSectionDividerWrapper>
              <MobileSectionDivider {...styleProps} />
            </MobileSectionDividerWrapper>
            {!_.isEmpty(certificate.evidence) &&
            !(certificate.evidence === "-") ? (
              <>
                <GuideTitle {...styleProps}>
                  <FormattedMessage id="certificate_show_evidence_title" />
                </GuideTitle>
                <TextWithMoreButton
                  text={certificate.evidence ?? ""}
                  maxLine={2}
                  {...styleProps}
                />
              </>
            ) : (
              <></>
            )}
            <MobileSectionDividerWrapper>
              <MobileSectionDivider {...styleProps} />
            </MobileSectionDividerWrapper>
            <GuideTitle {...styleProps}>
              {badgeDescriptionTitle ?? (
                <FormattedMessage id="badge_show_badge_description_title" />
              )}
            </GuideTitle>
            <TextWithMoreButton
              text={certificate.description ?? ""}
              maxLine={2}
              {...styleProps}
            />
            {certificate.tags && (
              <Tags tags={certificate.tags ?? []} {...styleProps} />
            )}
            <BadgeWinners
              profileElements={profileElements}
              certCount={certCount}
              {...styleProps}
            />
            <MobileSectionDividerWrapper>
              <MobileSectionDivider {...styleProps} />
            </MobileSectionDividerWrapper>
            <GuideTitle {...styleProps}>
              {badgeHowToWinTitle ?? (
                <FormattedMessage id="badge_show_how_to_win_title" />
              )}
            </GuideTitle>
            <TextWithMoreButton
              text={certificate.criteria ?? ""}
              maxLine={4}
              {...styleProps}
            />
          </Body>
        </TopWrapper>
        <Foot>
          <Properties properties={certificate.properties} {...styleProps} />
        </Foot>
      </Container>
    </BadgeDetailPageWrapper>
  );
};

export default React.memo(CertificateDetailShowItem);
