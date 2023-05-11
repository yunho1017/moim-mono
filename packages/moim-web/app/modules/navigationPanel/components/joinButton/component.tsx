import { useStoreState } from "app/store";
import * as React from "react";
import { FlatJoinButton } from "./styled";

interface IProp {
  label: React.ReactNode;
  onClick: () => void;
  size?: Moim.DesignSystem.Size;
}

function JoinButtonView({ label, onClick }: IProp) {
  const { joinButtonScale } = useStoreState(state => ({
    joinButtonScale: state.group.theme.element.sideArea.childMoimNameText.scale,
  }));
  return (
    <FlatJoinButton
      joinButtonScale={joinButtonScale}
      onClick={onClick}
      size="s"
    >
      {label}
    </FlatJoinButton>
  );
}

export default JoinButtonView;
