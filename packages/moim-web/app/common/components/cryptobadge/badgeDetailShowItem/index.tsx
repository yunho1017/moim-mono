import React from "react";
import _ from "lodash";
import { FormattedMessage } from "react-intl";
import { SupportedLanguageType } from "app/intl";
// helpers
import { getCurrencyByChainId } from "../utils";
// hooks
import useIsMobile from "common/hooks/useIsMobile";
import { useCurrentUserLocale } from "app/common/hooks/useGroupTexts";
import DQuestMissionary from "common/components/dquestMissionary";
import { Divider } from "common/components/itemCell";
// components
import Media from "../components/media";
import ClaimPrice from "../components/ClaimPrice";
import BadgeWinners from "../components/BadgeWinners";
import BadgeClaimButton from "../components/claimButton";
import { Tags } from "../components/Tags";
import { TextWithMoreButton } from "../components/TextWithMoreButton";
import { Properties } from "../components/Property";
import {
  BadgeDetailPageWrapper,
  BadgeInfoWrapper,
  BadgeNameWrapper,
  BaseBadgeDetailFrame,
  Body,
  ClaimedIcon,
  CompleteIcon,
  Container,
  DividerWrapper,
  Foot,
  GuideTitle,
  Head,
  IssuerWrapper,
  MediaWrapper,
  MobileSectionDivider,
  MobileSectionDividerWrapper,
  StatusImageWrapper,
  TopWrapper,
  WhiteListChip,
} from "../styled";

interface IProps {
  badge: Moim.Cryptobadge.ICryptobadge;
  profileElements: any;
  certCount: number;
  questIds?: Moim.Id[];
  isUserInWhiteList: boolean;
  mintRequestStatus?: string;
  onClickClaim: (
    badge: Moim.Cryptobadge.ICryptobadge,
  ) => Promise<
    | {
        location: string;
      }
    | undefined
  >;
}

const BadgeDetailShowItem: React.FC<IProps> = ({
  badge,
  questIds,
  profileElements,
  certCount,
  isUserInWhiteList,
  mintRequestStatus,
  onClickClaim,
}) => {
  const locale: SupportedLanguageType = useCurrentUserLocale();

  const isMobile = useIsMobile();
  const isClaimed = React.useMemo(() => mintRequestStatus === "NEW", [
    mintRequestStatus,
  ]);
  const isCompleted = React.useMemo(() => mintRequestStatus === "DONE", [
    mintRequestStatus,
  ]);

  const isWhiteListOnly = React.useMemo(
    () =>
      badge.claimCondition?.whiteList &&
      badge.claimCondition?.whiteList?.displayingAddresses,
    [badge.claimCondition],
  );

  const currency = React.useMemo(() => getCurrencyByChainId(badge.chainId), [
    badge.chainId,
  ]);

  const priceAmount = React.useMemo(
    () => badge.claimCondition?.price?.amount,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [badge?.claimCondition?.price?.amount],
  );

  const styleProps = React.useMemo(
    () => ({
      backgroundColor: badge.backgroundColor ?? "white",
      textColor: badge.textColor ?? "black",
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [badge?.backgroundColor, badge?.textColor],
  );

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

  return (
    <BadgeDetailPageWrapper
      useBottomSticky={Boolean(questIds?.length) || badge.claimable}
      {...styleProps}
    >
      <Container>
        <TopWrapper className={isClaimed ? "withStatusMark" : undefined}>
          <Head>
            <BaseBadgeDetailFrame {...styleProps}>
              <StatusImageWrapper>
                <MediaWrapper
                  className={isClaimed ? "withStatusMark" : undefined}
                >
                  {badge.certificateAnimationUri ? (
                    <Media
                      key={badge.certificateAnimationUri}
                      src={badge.certificateAnimationUri}
                      isVideo={true}
                      poster={badge.certificateImageUri}
                    />
                  ) : (
                    <Media
                      key={badge.certificateImageUri}
                      isVideo={false}
                      src={badge.certificateImageUri ?? ""}
                      alt={badge.name ?? ""}
                    />
                  )}
                </MediaWrapper>
                {isClaimed ? (
                  <ClaimedIcon className="statusImageIcon" />
                ) : isCompleted ? (
                  <CompleteIcon className="statusImageIcon" />
                ) : null}
              </StatusImageWrapper>
            </BaseBadgeDetailFrame>
          </Head>
          <Body>
            <BadgeInfoWrapper {...styleProps}>
              {isWhiteListOnly ? (
                <WhiteListChip
                  mainColor={
                    badge.textColor?.toLowerCase() === "#ffffff"
                      ? "white"
                      : "black"
                  }
                  chipColor={styleProps.textColor}
                  shape={"rectangle"}
                  size={"medium"}
                >
                  <FormattedMessage id="badge_show_chip_whitelist_only" />
                </WhiteListChip>
              ) : (
                <></>
              )}
              <BadgeNameWrapper>{badge.name}</BadgeNameWrapper>
              <IssuerWrapper>
                <FormattedMessage id="badge_show_issued_by" />
                <span className="issuer-name">{` ${badge.issuer}`}</span>
              </IssuerWrapper>
              {priceAmount && currency && (
                <>
                  {isMobile && (
                    <DividerWrapper {...styleProps}>
                      <Divider className="divider" />
                    </DividerWrapper>
                  )}
                  <ClaimPrice
                    currency={
                      currency as Moim.Community.BlockchainCommunityCurrency
                    }
                    priceAmount={priceAmount}
                    {...styleProps}
                  />
                </>
              )}
            </BadgeInfoWrapper>
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
            {badge.tags && badge.tags.length > 0 && (
              <Tags tags={badge.tags} {...styleProps} />
            )}
            <MobileSectionDividerWrapper>
              <MobileSectionDivider {...styleProps} />
            </MobileSectionDividerWrapper>
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
              text={badge.criteria ?? ""}
              maxLine={4}
              {...styleProps}
            />
            {badge.claimable && (
              <div>
                <MobileSectionDividerWrapper>
                  <MobileSectionDivider {...styleProps} />
                </MobileSectionDividerWrapper>
                <BadgeClaimButton
                  key={`badge_claim_${badge.id}`}
                  badge={badge}
                  mainColor={
                    badge.textColor?.toLowerCase() === "#ffffff"
                      ? "white"
                      : "black"
                  }
                  isUserInWhiteList={isUserInWhiteList ? true : false}
                  onClickClaim={onClickClaim}
                  {...styleProps}
                />
              </div>
            )}
            {questIds && questIds?.length > 0 ? (
              <div>
                <MobileSectionDividerWrapper>
                  <MobileSectionDivider {...styleProps} />
                </MobileSectionDividerWrapper>
                {questIds.map(questId => (
                  <DQuestMissionary
                    key={`quest_summary_${questId}`}
                    questId={questId}
                    bottomStickyBGColor={badge.backgroundColor ?? undefined}
                    mainColor={
                      badge.textColor?.toLowerCase() === "#ffffff"
                        ? "white"
                        : "black"
                    }
                  />
                ))}
              </div>
            ) : null}
          </Body>
        </TopWrapper>
        <MobileSectionDividerWrapper>
          <MobileSectionDivider {...styleProps} />
        </MobileSectionDividerWrapper>
        <Foot>
          {badge.properties && !_.isEmpty(badge.properties) && (
            <>
              <GuideTitle>
                <FormattedMessage id="badge_show_properties_title" />
              </GuideTitle>
              <Properties properties={badge.properties} {...styleProps} />
            </>
          )}
        </Foot>
      </Container>
    </BadgeDetailPageWrapper>
  );
};

export default BadgeDetailShowItem;
