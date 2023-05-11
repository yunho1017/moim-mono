import * as React from "react";
import { MoimURL } from "common/helpers/url";
import { useNativeSecondaryView } from "common/hooks/useSecondaryView";
import { FormattedMessage } from "react-intl";
import { H8Bold } from "common/components/designSystem/typos";

import {
  Container,
  SectionTitleWrapper,
  SectionTitle,
  RightArrow,
  RetryIcon,
} from "./styled";
import CardCryptoBadges from "./templates/card";
import CryptoBadges from "./templates/normal";
import { useActions, useStoreState } from "app/store";
import { userCertificationSelector } from "app/selectors/cryptobadge";
import { getCertificatesByUserId } from "app/actions/cryptobadge";
import CryptoBadgeClient from "common/helpers/cryptobadgeHelper";

interface IProps {
  viewType: "card" | "normal" | undefined;
  user: Moim.User.INormalizedUser;
}

const CryptoBadgesContainer: React.FC<IProps> = ({
  viewType = "normal",
  user,
}) => {
  const { redirect } = useNativeSecondaryView();
  const { isLoading, cryptoBadges } = useStoreState(state => ({
    isLoading: Boolean(state.profilePage.isCryptoBadgeLoading[user?.id]),
    cryptoBadges: userCertificationSelector(
      state,
      user?.certifications || { data: [] },
    ),
  }));
  const { dispatchGetCertifications } = useActions({
    dispatchGetCertifications: getCertificatesByUserId,
  });
  const hasBadges = cryptoBadges.data.length > 0;
  const userId = user.id;

  const handleNextButtonClick = React.useCallback(() => {
    if (hasBadges && userId) {
      redirect(
        (viewType === "normal"
          ? new MoimURL.ProfileBadgeList({ userId })
          : new MoimURL.ProfileBadgeCardList({ userId })
        ).toString(),
      );
    }
  }, [viewType, hasBadges, userId, redirect]);

  const handleClickRefreshButton: React.MouseEventHandler<HTMLSpanElement> = React.useCallback(
    async e => {
      e.stopPropagation();

      if (user.canId && !isLoading) {
        await CryptoBadgeClient.queryClient.clearStore();
        dispatchGetCertifications(user.id, { canId: user.canId });
      }
    },
    [user, isLoading],
  );
  React.useEffect(() => {
    if (user.canId && !isLoading) {
      dispatchGetCertifications(user.id, { canId: user.canId });
    }
  }, [user?.canId]);

  return (
    <>
      <SectionTitleWrapper role="button" onClick={handleNextButtonClick}>
        <SectionTitle>
          <H8Bold>
            <FormattedMessage id="profile_show/badge_title" />
          </H8Bold>
          <RetryIcon onClick={handleClickRefreshButton} />
        </SectionTitle>
        {hasBadges && <RightArrow />}
      </SectionTitleWrapper>
      <Container>
        {viewType === "card" ? (
          <CardCryptoBadges
            columnCount={2}
            rowCount={2}
            isLoading={isLoading}
            cryptoBadges={cryptoBadges}
          />
        ) : (
          <CryptoBadges
            userId={userId}
            isLoading={isLoading}
            cryptoBadges={cryptoBadges}
          />
        )}
      </Container>
    </>
  );
};

export default CryptoBadgesContainer;
