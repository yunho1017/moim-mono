import * as React from "react";
import { css } from "styled-components";
import { FormattedMessage } from "react-intl";
import { MoimURL } from "app/common/helpers/url";
import RoutedMoimTab, { IRoutedTab } from "common/components/tab/routed";
import AddressManage from "./addressManage";
import { MEDIA_QUERY } from "common/constants/responsive";

export const RoutedTapContainerStyle = css`
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    width: 100%;
    height: 100%;
  }
`;

const CommercePreference: React.FC = () => {
  const tabs: IRoutedTab[] = React.useMemo(
    () => [
      {
        key: "preference_address_manage",
        url: MoimURL.CommerceMyPreferenceAddressManage,
        title: (
          <FormattedMessage id="my_shopping_shopping_preferences_addresses" />
        ),
        page: AddressManage,
        default: true,
      },
      // {
      //   key: "benefit_credit_histories",
      //   url: MoimURL.CommerceMyPreferenceReviewManage,
      //   title: (
      //     <FormattedMessage id="my_shopping_shopping_preferences_payments" />
      //   ),
      //   page: CreditHistories,
      // },
    ],
    [],
  );

  return (
    <RoutedMoimTab
      type="sub"
      tabs={tabs}
      routedTabContainerStyle={RoutedTapContainerStyle}
    />
  );
};

export default CommercePreference;
