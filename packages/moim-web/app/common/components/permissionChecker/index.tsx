import * as React from "react";
import { PermissionDeniedFallbackType } from "app/enums";
import { useIntl } from "react-intl";
// hooks
import useIsMobile from "common/hooks/useIsMobile";

import NoRightAlert, {
  IRefHandler as INoRightRefHandler,
} from "common/components/feedBack/components/noRight/alert";
import NoRightDialog, {
  IRefHandler as INoRightDialogRefHandler,
} from "common/components/feedBack/components/noRight/dialog";
import { DefaultLoader as Loader } from "common/components/loading";
import {
  NonClickWrapper,
  Wrapper,
  BackIconWrapper,
  BackIcon,
  LoaderWrapper,
} from "./styled";
import NoRightFullScreenDialog from "../feedBack/components/noRight";
import { useVisibleTopNavigation } from "app/modules/layout/components/controller/hooks";
import UnsignedChecker from "../unsiginedChecker";

export {
  default as useResourcePermission,
  useResourcePermissionWithoutSuperCheck,
} from "./hooks/useResourcePermission";

type IProps = React.PropsWithChildren<{
  fallbackType: Moim.Enums.PermissionDeniedFallbackType;
  hasPermission: boolean;
  isLoading?: boolean;
  permissionDeniedCustomElement?: React.ReactNode;
  unsignedCustomElement?: React.ReactNode;
  groupId?: string;
  onBackClick?(): void;
}>;

const PermissionChecker: React.FC<IProps> = ({
  isLoading,
  fallbackType,
  hasPermission,
  permissionDeniedCustomElement,
  unsignedCustomElement,
  groupId,
  onBackClick,
  children,
}) => {
  const intl = useIntl();
  const isMobile = useIsMobile();
  const visibleTopNavigation = useVisibleTopNavigation();
  const refNoRightAlert = React.useRef<INoRightRefHandler>(null);
  const refNoRightDialog = React.useRef<INoRightDialogRefHandler>(null);
  const handleNonClickHandler: React.MouseEventHandler<HTMLDivElement> = React.useCallback(
    e => {
      e.stopPropagation();

      refNoRightAlert.current?.openHandler();
      refNoRightDialog.current?.openHandler();
    },
    [],
  );

  React.useEffect(() => {
    if (!hasPermission && !isLoading) {
      refNoRightDialog.current?.openHandler();
    }
  }, [hasPermission, isLoading]);

  const permissionCheckedElement = React.useMemo(() => {
    switch (fallbackType) {
      // PASS
      case PermissionDeniedFallbackType.NONE:
        return hasPermission && children;
      // fullscreen
      case PermissionDeniedFallbackType.FULLSCREEN_DIALOG:
        return (
          <>
            {hasPermission && children}
            <NoRightDialog ref={refNoRightDialog} />
          </>
        );

      // screen
      case PermissionDeniedFallbackType.SCREEN:
        return hasPermission ? (
          children
        ) : (
          <NoRightFullScreenDialog hasButtons={false} />
        );

      // alert
      case PermissionDeniedFallbackType.ALERT:
        return (
          <Wrapper>
            {children}
            <NoRightAlert
              ref={refNoRightAlert}
              message={intl.formatMessage({ id: "no_right_alert_dialog_body" })}
            />
            {!hasPermission && (
              <NonClickWrapper onClick={handleNonClickHandler} />
            )}
          </Wrapper>
        );
      // custom
      case PermissionDeniedFallbackType.CUSTOM:
      default:
        return hasPermission ? children : permissionDeniedCustomElement;
    }
  }, [
    children,
    permissionDeniedCustomElement,
    handleNonClickHandler,
    hasPermission,
    intl,
    fallbackType,
  ]);

  const unsignedCheckedElement = React.useMemo(() => {
    if (hasPermission) {
      return permissionCheckedElement;
    }

    return (
      <UnsignedChecker
        fallbackType={fallbackType}
        unsignedCustomElement={unsignedCustomElement}
        groupId={groupId}
      >
        {permissionCheckedElement}
      </UnsignedChecker>
    );
  }, [
    fallbackType,
    hasPermission,
    permissionCheckedElement,
    unsignedCustomElement,
    groupId,
  ]);

  return (
    <>
      {!isLoading ? (
        <>
          {isMobile && !hasPermission && onBackClick ? (
            <BackIconWrapper visibleTopNavigation={visibleTopNavigation}>
              <BackIcon onClick={onBackClick} />
            </BackIconWrapper>
          ) : null}
          {unsignedCheckedElement}
        </>
      ) : (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      )}
    </>
  );
};

const PermissionCheckerWithUndefinedCheck: React.FC<IProps> = ({
  isLoading,
  hasPermission,
  ...rest
}) => {
  if (!hasPermission && isLoading === undefined) {
    return null;
  }

  return (
    <PermissionChecker
      isLoading={isLoading}
      hasPermission={hasPermission}
      {...rest}
    />
  );
};
export default PermissionCheckerWithUndefinedCheck;
