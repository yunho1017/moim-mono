import * as React from "react";
import JoinButton from "app/modules/navigationPanel/components/joinButton";
import PeriodPopover from "../../../topNavigation/components/periodPopover";
import ShavedText from "common/components/shavedText";
import GroupProfileImage from "common/components/groupProfileImage";
import { NativeEmojiSafeText } from "common/components/designSystem/texts";
import {
  Wrapper,
  MoimInfoWrapper,
  MoimName,
  ButtonWrapper,
  PeriodIcon,
  PeriodIconWrapper,
} from "./styled";

import useCurrentGroup from "common/hooks/useCurrentGroup";
import useCurrentUser from "common/hooks/useCurrentUser";
import useOpenState from "common/hooks/useOpenState";

export default function SubMoimProfileElement() {
  const currentGroup = useCurrentGroup();
  const currentUser = useCurrentUser();
  const periodRef = React.useRef<HTMLDivElement>(null);
  const {
    isOpen: isPeriodDialogOpen,
    open: openPeriodDialog,
    close: closePeriodDialog,
  } = useOpenState();

  const visibleJoinButton = React.useMemo(() => !currentUser, [currentUser]);
  const visiblePeriodIcon = React.useMemo(
    () => !currentGroup?.is_hub && currentGroup?.status_config?.type !== "none",
    [currentGroup],
  );

  if (!currentGroup || currentGroup.is_hub) {
    return null;
  }

  return (
    <Wrapper>
      <MoimInfoWrapper visibleJoinButton={visibleJoinButton}>
        <GroupProfileImage
          icon={currentGroup.icon}
          title={currentGroup.name}
          size="s"
        />
        <MoimName>
          <ShavedText
            line={1}
            value={<NativeEmojiSafeText value={currentGroup.name} />}
          />
        </MoimName>
        {visiblePeriodIcon && (
          <PeriodIconWrapper
            ref={periodRef}
            selected={isPeriodDialogOpen}
            onClick={openPeriodDialog}
          >
            <PeriodIcon />
          </PeriodIconWrapper>
        )}
      </MoimInfoWrapper>
      {visibleJoinButton && (
        <ButtonWrapper>
          <JoinButton />
        </ButtonWrapper>
      )}

      <PeriodPopover
        open={isPeriodDialogOpen}
        anchorElement={periodRef.current}
        onCloseRequest={closePeriodDialog}
        onClickMenuButton={closePeriodDialog}
      />
    </Wrapper>
  );
}
