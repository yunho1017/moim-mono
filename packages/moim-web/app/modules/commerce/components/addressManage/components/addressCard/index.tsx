import * as React from "react";
import { FormattedMessage } from "react-intl";
import ChipBase from "common/components/chips";
import {
  Wrapper,
  CardFrame,
  Header,
  Body,
  TitleContainer,
  Title,
  DefaultAddressChipStyle,
  ModifyButton,
  Address,
  Phone,
  Memo,
} from "./styled";

interface IProps {
  isDefault: boolean;
  data: Moim.Commerce.ICommerceShippingAddress;
  onModifyButtonClick(id: Moim.Id): void;
}

const AddressCard: React.FC<IProps> = ({
  isDefault,
  data,
  onModifyButtonClick,
}) => {
  const handleClick = React.useCallback(() => {
    onModifyButtonClick(data.id);
  }, [data.id, onModifyButtonClick]);

  return (
    <Wrapper>
      <CardFrame>
        <Header>
          <TitleContainer>
            <Title>{data.recipientName}</Title>
            {isDefault && (
              <ChipBase
                size="medium"
                shape="round"
                overrideStyle={DefaultAddressChipStyle}
              >
                <FormattedMessage id="badge_default_address" />
              </ChipBase>
            )}
          </TitleContainer>
          <ModifyButton onClick={handleClick}>
            <FormattedMessage id="button_edit" />
          </ModifyButton>
        </Header>
        <Body>
          <Address>
            ({data.zipCode}) {data.address} {data.address2}
          </Address>
          <Phone>{data.recipientPhoneNumber}</Phone>
          <Memo>{data.memo}</Memo>
        </Body>
      </CardFrame>
    </Wrapper>
  );
};

export default AddressCard;
export { default as AddressCardSkeleton } from "./skeleton";
