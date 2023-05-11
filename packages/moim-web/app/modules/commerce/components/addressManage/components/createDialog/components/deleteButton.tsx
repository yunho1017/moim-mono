import * as React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { ThemeContext } from "styled-components";
// selector
// hooks
import { useActions } from "app/store";
import useOpenState from "common/hooks/useOpenState";
// actions
import { deleteShippingAddress } from "app/actions/commerce";
// components
import AlertDialog from "common/components/alertDialog";
import { DeleteButton, DeleteButtonContainer, Divider } from "../styled";

interface IProps {
  disabled: boolean;
  shippingAddressId: string;
  onClose(): void;
}

const AddressDeleteButton: React.FC<IProps> = ({
  disabled,
  shippingAddressId,
  onClose,
}) => {
  const intl = useIntl();
  const theme = React.useContext(ThemeContext);

  const {
    isOpen: isOpenDeleteAlert,
    open: handleOpenDeleteAlert,
    close: handleCloseDeleteAlert,
  } = useOpenState();

  const { deleteAddress } = useActions({
    deleteAddress: deleteShippingAddress,
  });

  const handleDeleteConfirmClick = React.useCallback(() => {
    if (shippingAddressId) {
      deleteAddress(shippingAddressId).finally(() => {
        onClose();
        handleCloseDeleteAlert();
      });
    }
  }, [deleteAddress, handleCloseDeleteAlert, shippingAddressId]);

  const deleteAlertButtons = React.useMemo(
    () => [
      {
        text: intl.formatMessage({ id: "cancel_button" }),
        textColor: theme.colorV2.colorSet.grey600,
        onClick: handleCloseDeleteAlert,
      },
      {
        text: intl.formatMessage({ id: "button_delete" }),
        onClick: handleDeleteConfirmClick,
      },
    ],
    [
      handleDeleteConfirmClick,
      handleCloseDeleteAlert,
      intl,
      theme.colorV2.colorSet.grey600,
    ],
  );

  const handleClickDelete = React.useCallback(() => {
    handleOpenDeleteAlert();
  }, [handleOpenDeleteAlert]);

  return (
    <>
      <Divider />
      <DeleteButtonContainer>
        <DeleteButton disabled={disabled} onClick={handleClickDelete}>
          <FormattedMessage id="add_address_button_delete" />
        </DeleteButton>
      </DeleteButtonContainer>

      <AlertDialog
        open={isOpenDeleteAlert}
        title={<FormattedMessage id="add_address_delete_dialog_title" />}
        content={<FormattedMessage id="add_address_delete_dialog_body" />}
        rightButtons={deleteAlertButtons}
        onClose={handleCloseDeleteAlert}
      />
    </>
  );
};

export default AddressDeleteButton;
