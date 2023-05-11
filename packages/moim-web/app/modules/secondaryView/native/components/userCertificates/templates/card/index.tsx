import * as React from "react";
import { FormattedMessage } from "react-intl";
import { DefaultLayout } from "../../../../layout";
import AppBar from "common/components/appBar";
import { Wrapper, HeaderTitle, AppBarTitle, RetryIcon } from "./styled";
import { CertificateItem, Skeleton } from "./item";
import useIsMobile from "common/hooks/useIsMobile";
import { useActions, useStoreState } from "app/store";
import { getCertificatesByUserId as getCertificationsAction } from "app/actions/cryptobadge";
import CryptoBadgeClient from "common/helpers/cryptobadgeHelper";

interface PropsType {
  userId: string;
}

const CardTypeUserCertificates: React.FC<PropsType> = ({ userId }) => {
  const isMobile = useIsMobile();
  const [isLoading, setLoadStatus] = React.useState(false);
  const userBadges = useStoreState(state => state.entities.certifications);
  const initialLoaded = userBadges !== undefined && !isLoading;

  const { userBadgesActual, userCanId } = useStoreState(state => {
    const user = state.entities.users[userId];
    return {
      userBadgesActual: user.certifications,
      userCanId: user.canId,
    };
  });

  const { getCertifications } = useActions({
    getCertifications: getCertificationsAction,
  });

  const handleGetCertifications = React.useCallback(() => {
    if (userId && userCanId) {
      setLoadStatus(true);
      getCertifications(userId, { canId: userCanId });
      setLoadStatus(false);
    }
  }, [userId, userCanId]);
  const handleClickRefreshButton: React.MouseEventHandler<HTMLSpanElement> = React.useCallback(
    async e => {
      e.stopPropagation();

      if (!isLoading) {
        await CryptoBadgeClient.queryClient.clearStore();
        handleGetCertifications();
      }
    },
    [handleGetCertifications, isLoading],
  );

  const appBarProps = React.useMemo(
    () =>
      ({
        titleElement: (
          <AppBarTitle>
            <FormattedMessage id="profile_show/badge_title" />
          </AppBarTitle>
        ),
        rightButton: <RetryIcon onClick={handleClickRefreshButton} />,
        titleAlignment: "Left",
        enableScrollParallax: true,
        parallaxWrapperComponent: "div",
        expendScrollParallaxElement: (
          <HeaderTitle>
            <FormattedMessage id="profile_show/badge_title" />
          </HeaderTitle>
        ),
      } as React.ComponentProps<typeof AppBar>),
    [isMobile, handleClickRefreshButton],
  );

  const itemElements = React.useMemo(() => {
    if (!initialLoaded) {
      return new Array(6).fill(0).map((_, idx) => <Skeleton key={idx} />);
    }

    return userBadgesActual?.data.map(cert => {
      const badge = userBadges[cert.node];

      return (
        <CertificateItem
          key={badge.id}
          certificateId={badge.id}
          backgroundColor={badge.backgroundColor}
          textColor={badge.textColor}
          description={badge.description ?? ""}
          icon={badge.imageUri ?? ""}
          name={badge.name ?? ""}
        />
      );
    });
  }, [initialLoaded, userBadges]);

  React.useEffect(() => {
    if (!initialLoaded) {
      handleGetCertifications();
    }
  }, [userId]);

  return (
    <DefaultLayout appBar={appBarProps}>
      <Wrapper>{itemElements}</Wrapper>
    </DefaultLayout>
  );
};

export default React.memo(CardTypeUserCertificates);
