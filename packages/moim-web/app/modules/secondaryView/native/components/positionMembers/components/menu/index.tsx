import * as React from "react";
import { FormattedMessage } from "react-intl";
import ResponsiveMenu from "common/components/responsiveMenu";
import AlertDialog from "common/components/alertDialog";
import { MenuWrapper, MenuText, MenuItem } from "./styled";
import { useProps, useHandlers } from "./useHooks";

export interface IProps extends React.ComponentProps<typeof ResponsiveMenu> {
  open: boolean;
  userId: Moim.Id;
  positionId: Moim.Id;
  canDismissSelf?: boolean;
  onCloseRequest: () => void;
}

function PositionMenuComponent(props: IProps) {
  const {
    intl,
    open,
    anchorElement,
    canDismissSelf,
    dismissAlertIsOpen,
    dismissAlertOpen,
    dismissAlertClose,
    onCloseRequest,
    handleShareClick,
    handleConfirmDismissSelf,
  } = useHandlers(useProps(props));

  const menus = React.useMemo(() => {
    return (
      <>
        <MenuItem onClick={handleShareClick}>
          <MenuText>
            <FormattedMessage id="menu_content_link_share" />
          </MenuText>
        </MenuItem>
        <MenuItem onClick={dismissAlertOpen}>
          <MenuText>
            <FormattedMessage id="resign_position_button" />
          </MenuText>
        </MenuItem>
      </>
    );
  }, [handleShareClick, dismissAlertOpen]);

  const DismissSelfAlertButtons = React.useMemo(() => {
    if (canDismissSelf) {
      return [
        {
          text: intl.formatMessage({ id: "cancel_button" }),
          onClick: dismissAlertClose,
        },
        {
          text: intl.formatMessage({ id: "resign_position_button" }),
          onClick: handleConfirmDismissSelf,
        },
      ];
    }
    return [
      {
        text: intl.formatMessage({ id: "ok_button" }),
        onClick: dismissAlertClose,
      },
    ];
  }, [canDismissSelf, dismissAlertClose, handleConfirmDismissSelf, intl]);

  return (
    <>
      <ResponsiveMenu
        open={open}
        anchorElement={anchorElement}
        onCloseRequest={onCloseRequest}
      >
        <MenuWrapper>{menus}</MenuWrapper>
      </ResponsiveMenu>
      <AlertDialog
        open={dismissAlertIsOpen}
        onClose={dismissAlertClose}
        title={
          canDismissSelf ? (
            <FormattedMessage id="resign_position_dialog_title" />
          ) : (
            <FormattedMessage id="resign_position_unavailable_dialog_title" />
          )
        }
        content={
          canDismissSelf ? (
            <FormattedMessage id="resign_position_dialog_body" />
          ) : (
            <FormattedMessage id="resign_position_unavailable_dialog_body" />
          )
        }
        rightButtons={DismissSelfAlertButtons}
      />
    </>
  );
}

export default PositionMenuComponent;
