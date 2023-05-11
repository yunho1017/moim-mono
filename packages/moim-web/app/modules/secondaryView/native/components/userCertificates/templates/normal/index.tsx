import * as React from "react";
import { FormattedMessage } from "react-intl";
import { DefaultLayout } from "../../../../layout";
import AppBar from "common/components/appBar";
import { Spacer } from "common/components/designSystem/spacer";
import { DefaultDivider } from "common/components/divider";
import { Wrapper, HeaderTitle, AppBarTitle, MoimName } from "./styled";
import { CertificateItem, Skeleton } from "./item";
import useIsMobile from "common/hooks/useIsMobile";
import { useActions, useStoreState } from "app/store";
import { getCertificatesByUserId as getCertificationsAction } from "app/actions/cryptobadge";

interface PropsType {
  userId: string;
}

const NormalTypeUserCertificates: React.FC<PropsType> = ({ userId }) => {
  const isMobile = useIsMobile();
  const [isLoading, setLoadStatus] = React.useState(false);
  const userBadges = useStoreState(state => state.entities.certifications);
  const initialLoaded = userBadges !== undefined && !isLoading;

  const { moimName, userBadgesActual, userCanId } = useStoreState(state => {
    const user = state.entities.users[userId];
    return {
      moimName: state.entities.groups[user?.group_id]?.name,
      userBadgesActual: user.certifications,
      userCanId: user.canId,
    };
  });

  const { getCertifications } = useActions({
    getCertifications: getCertificationsAction,
  });

  const appBarProps = React.useMemo(
    () =>
      ({
        titleElement: (
          <AppBarTitle>
            <FormattedMessage id="profile_show/badge_title" />
          </AppBarTitle>
        ),
        titleAlignment: "Left",
        enableScrollParallax: true,
        parallaxWrapperComponent: "div",
        expendScrollParallaxElement: (
          <>
            {moimName && <MoimName>{moimName}</MoimName>}
            <HeaderTitle>
              <FormattedMessage id="profile_show/badge_title" />
            </HeaderTitle>
          </>
        ),
      } as React.ComponentProps<typeof AppBar>),
    [isMobile],
  );

  const itemElements = React.useMemo(() => {
    if (!initialLoaded) {
      return new Array(6).fill(0).map((_, idx) => <Skeleton key={idx} />);
    }

    return userBadgesActual?.data.map(cert => {
      const badge = userBadges[cert.node];

      return (
        <CertificateItem
          key={badge?.id}
          id={badge?.id}
          name={badge?.name ?? ""}
          imageUri={badge?.imageUri ?? ""}
        />
      );
    });
  }, [initialLoaded, userBadges]);

  React.useEffect(() => {
    if (!initialLoaded && userId && userCanId && !userBadges) {
      setLoadStatus(true);
      getCertifications(userId, { canId: userCanId });
      setLoadStatus(false);
    }
  }, [userId]);

  return (
    <DefaultLayout appBar={appBarProps}>
      <Wrapper>
        <Spacer value={18} />
        <DefaultDivider />
        {itemElements}
      </Wrapper>
    </DefaultLayout>
  );
};

export default React.memo(NormalTypeUserCertificates);
