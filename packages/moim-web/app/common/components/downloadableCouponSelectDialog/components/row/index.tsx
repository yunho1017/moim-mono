import * as React from "react";
import { Wrapper, Body, Right, Title, Description } from "./styled";
import { Checkbox } from "common/components/designSystem/inputs";
import Thumbnail from "./thumbnail";

interface IProps {
  isChecked: boolean;
  coupon: Moim.Commerce.ICoupon;
  onSelectChange(couponId: Moim.Id, checked: boolean): void;
}

const RowItem: React.FC<IProps> = ({ isChecked, coupon, onSelectChange }) => {
  const handleClick = React.useCallback(() => {
    onSelectChange(coupon.id, !isChecked);
  }, [onSelectChange, isChecked, coupon.id]);

  const handlePreventClick = React.useCallback(e => {
    e.stopPropagation();
    e.preventDefault();
  }, []);

  return (
    <Wrapper onClick={handleClick} selected={isChecked}>
      <Thumbnail />
      <Body>
        <Title>{coupon.name}</Title>
        {coupon.description && <Description>{coupon.description}</Description>}
      </Body>
      <Right>
        <Checkbox onClick={handlePreventClick} checked={isChecked} />
      </Right>
    </Wrapper>
  );
};

export default React.memo(RowItem);
