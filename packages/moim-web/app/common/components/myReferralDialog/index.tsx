import * as React from "react";
import { FormattedMessage } from "react-intl";
import { Spacer } from "../designSystem/spacer";
import { DefaultDivider } from "../divider";
import { FlatButton } from "../designSystem/buttons";
import { DefaultLoader } from "../loading";
import FormattedTextSet from "../formattedTextSet";
import { SkeletonBox } from "../skeleton";

import {
  Inner,
  DividerWrapper,
  MyReferralIconWrapper,
  ReferralIcon,
  MyReferralTitle,
  MyReferralDescription,
  MyReferralImage,
  LinkShareButtonWrapper,
  MyPerformanceTitleWrapper,
  MyPerformanceTitle,
  MyPerformanceSubTitle,
  MyPerformanceValue,
  ReferralPolicyWrapper,
  ReferralPolicyTitle,
  ReferralPolicy,
  RightArrow,
} from "./styled";
import useIsMobile from "common/hooks/useIsMobile";
import useCancelToken from "common/hooks/useCancelToken";
import useCurrentGroup from "common/hooks/useCurrentGroup";
import { useOpenMyReferralPerformanceDialog } from "common/components/myReferralPerformanceDialog/hooks";
import { Share } from "common/components/snsShareDialog/utils";
import { useActions, useStoreState } from "app/store";
import { getReferralStat, getSharedUrl, getReferralPromotion } from "./actions";
import { px2rem } from "common/helpers/rem";

export default function MyReferral() {
  const [sharedUrl, setSharedUrl] = React.useState<string>("");
  const {
    referralPromotion,
    referralPromotionLoading,
    referralStat,
    referralStatLoading,
  } = useStoreState(state => ({
    referralPromotion: state.myReferralDialog.promotion,
    referralPromotionLoading: state.myReferralDialog.promotionLoading,
    referralStat: state.myReferralDialog.referralStat,
    referralStatLoading: state.myReferralDialog.referralStatLoading,
  }));
  const {
    dispatchGetSharedUrl,
    dispatchGetReferralPromotion,
    dispatchGetReferralStat,
  } = useActions({
    dispatchGetSharedUrl: getSharedUrl,
    dispatchGetReferralStat: getReferralStat,
    dispatchGetReferralPromotion: getReferralPromotion,
  });

  const isMobile = useIsMobile();
  const cancelToken = useCancelToken();
  const currentGroup = useCurrentGroup();

  const openMyInviteeListDialog = useOpenMyReferralPerformanceDialog();
  const handleClickMyPerformanceTitle = React.useCallback(() => {
    if (currentGroup?.is_hub) {
      openMyInviteeListDialog();
    }
  }, [currentGroup, openMyInviteeListDialog]);

  React.useEffect(() => {
    if (currentGroup?.id && currentGroup.active_referral_promotions?.signUp) {
      dispatchGetReferralPromotion(
        currentGroup.active_referral_promotions.signUp,
        cancelToken.current.token,
      );
      dispatchGetReferralStat(
        { referralType: "signUp" },
        cancelToken.current.token,
      );
      dispatchGetSharedUrl(
        { referralType: "signUp" },
        cancelToken.current.token,
      ).then(response => {
        if (response) {
          setSharedUrl(response.data.url);
        }
      });
    }
  }, [currentGroup?.id]);

  if (!referralPromotion) {
    if (referralPromotionLoading) {
      return (
        <Inner>
          <DefaultLoader />
        </Inner>
      );
    }

    return null;
  }

  return (
    <Inner>
      {referralPromotion.myReferral.image ? (
        <MyReferralImage
          src={referralPromotion.myReferral.image}
          alt={referralPromotion.title}
        />
      ) : (
        <MyReferralIconWrapper>
          <ReferralIcon />
        </MyReferralIconWrapper>
      )}
      <Spacer value={8} />

      <MyReferralTitle>
        <FormattedTextSet textSet={referralPromotion.myReferral.title} />
      </MyReferralTitle>
      {referralPromotion.myReferral.description && (
        <MyReferralDescription>
          <FormattedTextSet
            textSet={referralPromotion.myReferral.description}
          />
        </MyReferralDescription>
      )}
      <LinkShareButtonWrapper>
        <Share shareUrl={sharedUrl}>
          {handler => (
            <FlatButton
              size="l"
              onClick={handler}
              isFullWidth={true}
              disabled={!sharedUrl}
            >
              <FormattedMessage id="button_invite_url" />
            </FlatButton>
          )}
        </Share>
      </LinkShareButtonWrapper>
      <DividerWrapper>
        <Spacer value={8} />
        <DefaultDivider />
        <Spacer value={8} />
      </DividerWrapper>
      <MyPerformanceTitleWrapper onClick={handleClickMyPerformanceTitle}>
        <MyPerformanceTitle>
          <FormattedMessage id="my_referral_my_performance_title" />
        </MyPerformanceTitle>
        {currentGroup?.is_hub && <RightArrow />}
      </MyPerformanceTitleWrapper>
      <MyPerformanceValue>
        {!referralStatLoading ? (
          <FormattedMessage
            id="my_referral_my_performance_total_number_of_invitees"
            values={{ count: referralStat?.actionsCount ?? 0 }}
          />
        ) : (
          <SkeletonBox width="50%" height={px2rem(18)} />
        )}
      </MyPerformanceValue>
      <MyPerformanceSubTitle>
        <FormattedMessage id="my_referral_my_performance_invitees" />
      </MyPerformanceSubTitle>
      {referralPromotion.reward && (
        <>
          <Spacer value={8} />
          <MyPerformanceValue>
            {!referralStatLoading ? (
              <FormattedMessage
                id="price_won"
                values={{ n: referralStat?.totalRewardAmount ?? 0 }}
              />
            ) : (
              <SkeletonBox width="50%" height={px2rem(18)} />
            )}
          </MyPerformanceValue>
          <MyPerformanceSubTitle>
            <FormattedMessage id="my_referral_my_performance_credits" />
          </MyPerformanceSubTitle>
        </>
      )}
      <Spacer value={24} />

      {referralPromotion.myReferral.policy ? (
        <>
          {!isMobile && (
            <>
              <DefaultDivider />
              <Spacer value={11} />
            </>
          )}
          <ReferralPolicyWrapper>
            <ReferralPolicyTitle>
              <FormattedMessage id="my_referral_policy_in_detail_title" />
            </ReferralPolicyTitle>

            <ReferralPolicy>
              {referralPromotion.myReferral.policy}
            </ReferralPolicy>

            <Spacer value={27} />
          </ReferralPolicyWrapper>
        </>
      ) : null}
    </Inner>
  );
}
