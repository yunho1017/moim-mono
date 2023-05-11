import React from "react";

import DeliveryPolicyDialog from "./components/dialog";
import { InfoIcon } from "./styled";
import useOpenState from "common/hooks/useOpenState";

interface IProps {
  currency: string;
  deliveryPolicies: Moim.Commerce.DeliveryPolicy[];
}
const DeliveryPolicyButton: React.FC<IProps> = ({
  deliveryPolicies,
  currency,
}) => {
  const { isOpen, open, close } = useOpenState();

  return (
    <>
      <InfoIcon onClick={open} />

      <DeliveryPolicyDialog
        currency={currency}
        isOpen={isOpen}
        close={close}
        deliveryPolicies={deliveryPolicies}
      />
    </>
  );
};

export default React.memo(DeliveryPolicyButton);
