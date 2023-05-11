import * as React from "react";

import ReactResizeDetector from "react-resize-detector";
import ResponsiveMenu from "common/components/responsiveMenu";
import { MenuWrapper } from "common/components/responsiveMenu/components/menu";
import Profile from "./components/profile";
import LogoutButton from "app/modules/navigationPanel/components/moimConfigMenu/component/logoutButton";

interface IProps extends React.ComponentProps<typeof ResponsiveMenu> {
  onClickMenuButton: () => void;
}

export default function ParentProfileMenu({
  onClickMenuButton,
  ...props
}: IProps) {
  const [minHeight, setMinHeight] = React.useState<number | undefined>();

  const handleResize = React.useCallback((_width: number, height: number) => {
    setMinHeight(height);
  }, []);

  return (
    <ResponsiveMenu {...props} minHeight={minHeight}>
      <ReactResizeDetector handleHeight={true} onResize={handleResize}>
        <MenuWrapper>
          <Profile onClickButton={onClickMenuButton} />
          <LogoutButton onClickButton={onClickMenuButton} />
        </MenuWrapper>
      </ReactResizeDetector>
    </ResponsiveMenu>
  );
}
