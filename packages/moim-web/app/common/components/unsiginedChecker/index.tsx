import * as React from "react";
import styled from "styled-components";
import { PermissionDeniedFallbackType } from "app/enums";
// hooks
import useCurrentUser from "common/hooks/useCurrentUser";
import UnsignedFullScreenFeedback from "../feedBack/components/unsigned/screen";
import { useHandleSignIn } from "common/hooks/useHandleSign";
import { useStoreState } from "app/store";

type IProps = React.PropsWithChildren<{
  fallbackType: Moim.Enums.PermissionDeniedFallbackType;
  unsignedCustomElement?: React.ReactNode;
  className?: string;
  groupId?: string;
}>;

const Wrapper = styled.div`
  position: relative;
s`;

const NonClickWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: ${props => props.theme.zIndexes.gnbSticky};
`;

const UnsignedChecker: React.FC<IProps> = ({
  fallbackType,
  unsignedCustomElement,
  className,
  children,
  groupId,
}) => {
  const currentUser = useCurrentUser();
  const { group, currentGroupId, joined } = useStoreState(state => ({
    group: groupId ? state.entities.groups[groupId] : undefined,
    joined: groupId
      ? state.subgroupsData.joinedSubMoims.data.includes(groupId)
      : undefined,
    currentGroupId: state.app.currentGroupId,
  }));
  const onSignIn = useHandleSignIn();
  const isSigned = React.useMemo(() => joined ?? Boolean(currentUser), [
    currentUser,
    joined,
  ]);
  const handleSignIn: React.MouseEventHandler<HTMLDivElement> = React.useCallback(
    e => {
      e.stopPropagation();
      if (group && group.id !== currentGroupId) {
        window.open(group.url, "_blank");
      } else {
        onSignIn();
      }
    },
    [, onSignIn, currentGroupId, group],
  );

  const inner = React.useMemo(() => {
    switch (fallbackType) {
      // PASS
      case PermissionDeniedFallbackType.NONE:
        return isSigned && children;

      // screen
      case PermissionDeniedFallbackType.SCREEN:
        return isSigned ? children : <UnsignedFullScreenFeedback />;

      // alert
      case PermissionDeniedFallbackType.ALERT:
        return (
          <Wrapper className={className}>
            {children}
            {!isSigned && <NonClickWrapper onClick={handleSignIn} />}
          </Wrapper>
        );
      // custom
      case PermissionDeniedFallbackType.CUSTOM:
      default:
        return isSigned ? children : unsignedCustomElement;
    }
  }, [
    fallbackType,
    isSigned,
    children,
    className,
    handleSignIn,
    unsignedCustomElement,
  ]);

  return <>{inner}</>;
};
export default UnsignedChecker;
