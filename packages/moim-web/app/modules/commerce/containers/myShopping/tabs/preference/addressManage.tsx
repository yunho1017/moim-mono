import * as React from "react";
import { useActions, useStoreState } from "app/store";
import { getShippingAddressList } from "app/selectors/commerce";
import { fetchMyShippingAddress } from "app/actions/commerce";
import AddressManageComponent from "../../../../components/addressManage";
import AddressCreateDialog from "../../../../components/addressManage/components/createDialog";
import useOpenState from "common/hooks/useOpenState";

const AddressManage: React.FC = ({}) => {
  const [isLoading, setLoadStatus] = React.useState<boolean | null>(null);
  const { isOpen, open, close } = useOpenState();
  const [selectedAddressId, setSelectedAddressId] = React.useState<
    string | undefined
  >(undefined);
  const { addressList } = useStoreState(state => ({
    addressList: getShippingAddressList(state),
  }));
  const { getAddressList } = useActions({
    getAddressList: fetchMyShippingAddress,
  });

  const handleAddressModifyClick = React.useCallback(
    (id: Moim.Id) => {
      setSelectedAddressId(id);
      open();
    },
    [open],
  );
  const handleCreateButtonClick = React.useCallback(() => {
    open();
    setSelectedAddressId(undefined);
  }, [open]);

  const handleCloseDialog = React.useCallback(() => {
    close();
    setSelectedAddressId(undefined);
  }, []);

  const handleLoadMore = React.useCallback(() => {
    // MOCK FUNCTION
  }, []);

  React.useEffect(() => {
    if (isLoading === null) {
      setLoadStatus(true);
      getAddressList().finally(() => {
        setLoadStatus(false);
      });
    }
  }, [isLoading]);

  return (
    <>
      <AddressManageComponent
        isLoading={Boolean(isLoading)}
        addressList={addressList}
        onAddressModifyButtonClick={handleAddressModifyClick}
        onCreateButtonClick={handleCreateButtonClick}
        onLoadMore={handleLoadMore}
      />
      <AddressCreateDialog
        open={isOpen}
        onClose={handleCloseDialog}
        shippingAddressId={selectedAddressId}
      />
    </>
  );
};

export default AddressManage;
