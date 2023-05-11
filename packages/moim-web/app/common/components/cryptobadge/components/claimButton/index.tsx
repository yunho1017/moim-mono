import * as React from "react";
import { FormattedMessage } from "react-intl";
import { shaveWalletAddress } from "common/helpers/nft";

import useCurrentUser from "common/hooks/useCurrentUser";
import { useHandleSignIn } from "common/hooks/useHandleSign";
import useIsMobile from "common/hooks/useIsMobile";
import useOpenState from "common/hooks/useOpenState";

import AlertDialog from "common/components/alertDialog";
import { useSnackbar } from "common/components/alertTemplates/alerts/globalSnackbar/useGlobalSnackbar";

import BadgeClaimComponent, {
  ThemeType,
} from "./components/badgeClaimComponent";
import MobileStickyFooter from "./components/mobileStickyFooter";
import ClaimBadgeRedirectLoadingDialog from "./components/claimBadgeRedirectDialog";
import { CLAIM_TRIED_BADGE_ID } from "common/constants/keys";
import { useStoreState } from "app/store";
import { currentGroupSelector } from "app/selectors/app";
import { getHasSignUpConfig } from "common/components/joinGroupDialog/helpers";

interface IProps {
  badge: Moim.Cryptobadge.ICryptobadge;
  textColor: string;
  backgroundColor: string;
  mainColor?: ThemeType;
  onClickClaim: (
    badge: Moim.Cryptobadge.ICryptobadge,
  ) => Promise<
    | {
        location: string;
      }
    | undefined
  >;
  isUserInWhiteList: boolean;
}

const BadgeClaimButton: React.FC<IProps> = ({
  badge,
  mainColor = "black",
  textColor,
  backgroundColor,
  onClickClaim,
  isUserInWhiteList,
}) => {
  const [isLoading, setLoadStatus] = React.useState<boolean | undefined>(
    undefined,
  );
  const [alertMessage, setAlertMessage] = React.useState<React.ReactNode>(null);
  const [alertTitle, setAlertTitle] = React.useState<React.ReactNode>(null);
  const [isOpenClaimDialog, setIsOpenClaimDialog] = React.useState<boolean>(
    false,
  );
  const { isOpen, open: openAlert, close: closeAlert } = useOpenState();

  const { hasSignUpConfig } = useStoreState(state => {
    const currentGroup = currentGroupSelector(state);
    return {
      hasSignUpConfig: getHasSignUpConfig(currentGroup),
    };
  });

  const currentUser = useCurrentUser();
  const dispatchSignIn = useHandleSignIn();

  const claim_tried_badge_id = sessionStorage.getItem(CLAIM_TRIED_BADGE_ID);

  const { open: openFailClaimSnackbar } = useSnackbar({
    timeout: 5000,
    type: "error",
  });

  const isMobile = useIsMobile();

  const web3UserName = React.useMemo(() => {
    if (currentUser) {
      return `${currentUser.name}${
        currentUser.metamask
          ? `(${shaveWalletAddress(currentUser.metamask)})`
          : ""
      }`;
    }
    return "Hey";
  }, [currentUser]);

  const handleClickClaim = React.useCallback(async () => {
    setLoadStatus(true);
    if (!currentUser) {
      sessionStorage.setItem(CLAIM_TRIED_BADGE_ID, badge.id);
      setLoadStatus(false);
      dispatchSignIn();
      return;
    }
    if (!isUserInWhiteList) {
      sessionStorage.removeItem(CLAIM_TRIED_BADGE_ID);
      setAlertTitle(
        <FormattedMessage id="dialog_badge_show_not_in_whitelist_title" />,
      );
      setAlertMessage(
        <FormattedMessage id="dialog_badge_show_not_in_whitelist_body" />,
      );
      openAlert();
      setLoadStatus(false);
      return;
    }
    if (currentUser && isUserInWhiteList) {
      try {
        sessionStorage.removeItem(CLAIM_TRIED_BADGE_ID);
        setIsOpenClaimDialog(true);
        setLoadStatus(true);
        setTimeout(() => {
          onClickClaim(badge);
        }, 1000);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log("!!!error", e);
        openFailClaimSnackbar({ text: "error occurred" });
        setLoadStatus(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    badge,
    currentUser,
    dispatchSignIn,
    isUserInWhiteList,
    onClickClaim,
    openAlert,
    openFailClaimSnackbar,
  ]);

  /**
   * NOTE:
   * 아래 함수들은 미로그인 상태로 클레임 시도시 로그인 페이지로 이동,
   * 그리고 로그인 또는 회원가입 완료후 이 페이지로 복귀 하는 과정을 상정하고 didMount시점에 동작하게 작업했습니다.
   */
  React.useEffect(() => {
    if (
      !!currentUser &&
      !!currentUser?.name &&
      !!claim_tried_badge_id &&
      claim_tried_badge_id === badge?.id
    ) {
      handleClickClaim();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  React.useEffect(() => {
    if (
      !!hasSignUpConfig &&
      !!currentUser &&
      !!currentUser?.name &&
      !!claim_tried_badge_id &&
      claim_tried_badge_id === badge?.id
    ) {
      handleClickClaim();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser?.name]);

  React.useEffect(() => {
    if (
      !!hasSignUpConfig &&
      !!currentUser &&
      !!currentUser?.name &&
      !!currentUser?.phoneNumber &&
      !!claim_tried_badge_id &&
      claim_tried_badge_id === badge?.id
    ) {
      handleClickClaim();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser?.phoneNumber]);

  if (!badge) {
    return null;
  }

  return (
    <>
      <BadgeClaimComponent
        isLoading={Boolean(isLoading)}
        selectedTheme={mainColor}
        textColor={textColor}
        currentUser={currentUser}
        web3UserName={web3UserName}
        onClickClaim={handleClickClaim}
      />
      {isMobile && (
        <MobileStickyFooter
          isLoading={Boolean(isLoading)}
          selectedTheme={mainColor}
          textColor={textColor}
          backgroundColor={backgroundColor}
          currentUser={currentUser}
          web3UserName={web3UserName}
          onClickClaim={handleClickClaim}
        />
      )}
      <AlertDialog
        open={isOpen}
        title={alertTitle}
        content={alertMessage}
        rightButtons={[
          {
            text: <FormattedMessage id="button_ok" />,
            onClick: closeAlert,
          },
        ]}
        onClose={closeAlert}
      />
      <ClaimBadgeRedirectLoadingDialog
        isOpenClaimDialog={isOpenClaimDialog}
        closeClaimDialog={() => {
          setIsOpenClaimDialog(false);
        }}
      />
    </>
  );
};

export default React.memo(BadgeClaimButton);
