import * as React from "react";
import AlertDialog from "common/components/alertDialog";
import { useIntlShort } from "common/hooks/useIntlShort";
import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { useStoreState } from "app/store";

interface IProps {}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;

  & > span + span::before {
    content: ",";
    margin: 0 ${px2rem(4)};
    display: inline-block;
  }
`;
export interface IRefHandler {
  open: (additionalFees: Moim.Commerce.IProductAdditionalFee[]) => void;
}

const InvalidAdditionalFee: React.FC<{
  additionalFee: Moim.Commerce.IProductAdditionalFee;
}> = ({ additionalFee }) => {
  const intl = useIntlShort();
  const coinId = additionalFee.resourceId;
  const { coin } = useStoreState(state => ({
    coin: coinId ? state.entities.community_coins[coinId] : undefined,
  }));

  if (!coin) {
    return null;
  }
  return (
    <span>
      {intl("buy_toast_message_error_price_candy_body", {
        candy_name: coin.name,
      })}
    </span>
  );
};
const ExceedCoinAmountAlertDialog = React.forwardRef<IRefHandler, IProps>(
  ({}, ref) => {
    const intl = useIntlShort();
    const [invalidAdditionalFees, setInvalidAdditionalFees] = React.useState<
      Moim.Commerce.IProductAdditionalFee[]
    >();
    React.useImperativeHandle(ref, () => ({
      open: additionalFees => setInvalidAdditionalFees(additionalFees),
    }));

    return (
      <AlertDialog
        open={Boolean(invalidAdditionalFees && invalidAdditionalFees.length)}
        title={intl("buy_toast_message_error_price_candy_title")}
        content={
          <Wrapper>
            {invalidAdditionalFees?.map(fee => (
              <InvalidAdditionalFee
                key={`${fee.resourceId}_${fee.amount}`}
                additionalFee={fee}
              />
            ))}
          </Wrapper>
        }
        rightButtons={[
          {
            text: intl("ok_button"),
            onClick: () => setInvalidAdditionalFees(undefined),
          },
        ]}
        onClose={() => setInvalidAdditionalFees(undefined)}
      />
    );
  },
);

export default ExceedCoinAmountAlertDialog;
