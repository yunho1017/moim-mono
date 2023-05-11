import * as React from "react";
import ResponsiveMenu from "common/components/responsiveMenu";
import EditButton from "./components/editButton";
import AppointMembersButton from "./components/appointMembersButton";
import DismissMembersButton from "./components/dismissMembersButton";
import DeletePositionButton from "./components/deletePositionButton";
import { Wrapper } from "./styled";

interface IProps extends React.ComponentProps<typeof ResponsiveMenu> {
  onClickEditButton: () => void;
  onClickAppointMembersButton: () => void;
  onClickDismissMembersButton: () => void;
  onClickDeletePositionButton: () => void;
}

function Menu(props: IProps) {
  const {
    open,
    onCloseRequest,
    anchorElement,
    onClickEditButton,
    onClickAppointMembersButton,
    onClickDismissMembersButton,
    onClickDeletePositionButton,
  } = props;

  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const wrapperHeight = React.useMemo(
    () => (wrapperRef.current ? wrapperRef.current.clientHeight : undefined),
    [wrapperRef.current],
  );

  return (
    <ResponsiveMenu
      open={open}
      onCloseRequest={onCloseRequest}
      anchorElement={anchorElement}
      minHeight={wrapperHeight}
    >
      <Wrapper ref={wrapperRef}>
        <EditButton onClick={onClickEditButton} />
        <AppointMembersButton onClick={onClickAppointMembersButton} />
        <DismissMembersButton onClick={onClickDismissMembersButton} />
        <DeletePositionButton onClick={onClickDeletePositionButton} />
      </Wrapper>
    </ResponsiveMenu>
  );
}

export default Menu;
