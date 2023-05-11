import * as React from "react";
import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { NumberBoxInput } from "common/components/designSystem/boxInput";
import {
  TrashIcon,
  WhiteWishIcon,
  BlackWishIcon,
  ThrashButton,
  WishButton,
} from "./common";

const Buttons = styled.div`
  display: flex;
  align-items: center;
  margin: ${px2rem(4)} 0 ${px2rem(12)};
`;

const NumberInputWrapper = styled.div`
  flex: 1;
  min-width: 0;
  width: 100%;
  max-width: ${px2rem(150)};
  margin: 0 ${px2rem(8)};
`;

export interface IButtonCaseTypeAProps {
  type: "caseA";
  onChangeQty(parcel: Moim.Commerce.IPurchaseReadyItem): void;
  onClickDelete(parcel: Moim.Commerce.IPurchaseReadyItem): void;
  onClickFavorite(
    status: boolean,
    parcel: Moim.Commerce.IPurchaseReadyItem,
  ): void;
}

interface IProps {
  disabled: boolean;
  isFavorite: boolean;
  qty: number;
  maxQty?: number;
  onChangeQty(value: number): void;
  onClickDelete(): void;
  onClickFavorite(): void;
}

const ButtonCaseTypeA: React.FC<IProps> = ({
  disabled,
  isFavorite,
  qty: qtyProps,
  maxQty,
  onChangeQty,
  onClickDelete,
  onClickFavorite,
}) => {
  const [qty, setQty] = React.useState<number | undefined>(undefined);

  const handleChangeQty = React.useCallback(
    async (value: number) => {
      setQty(value);
      onChangeQty(value);
    },
    [qtyProps, onChangeQty],
  );

  React.useEffect(() => {
    setQty(qtyProps);
  }, [qtyProps]);

  return (
    <Buttons>
      <ThrashButton onClick={onClickDelete}>
        <TrashIcon />
      </ThrashButton>
      <NumberInputWrapper>
        <NumberBoxInput
          min={disabled ? 0 : 1}
          value={disabled ? 0 : qty ?? qtyProps}
          max={disabled ? 0 : maxQty}
          onChange={handleChangeQty}
          disabled={disabled}
        />
      </NumberInputWrapper>
      <WishButton isFavorite={isFavorite} onClick={onClickFavorite}>
        {isFavorite ? <WhiteWishIcon /> : <BlackWishIcon />}
      </WishButton>
    </Buttons>
  );
};

export default React.memo(ButtonCaseTypeA);
