import * as React from "react";
import { FormattedMessage } from "react-intl";
import { PermissionDeniedFallbackType } from "app/enums";
import { MoimURL } from "common/helpers/url";
import useGroupTexts from "common/hooks/useGroupTexts";
import useHubSeller from "common/hooks/commerce/useHubSeller";
import {
  useNativeSecondaryView,
  useSecondaryViewOpenState,
} from "common/hooks/useSecondaryView";
import { DefaultLayout } from "app/modules/secondaryView/native/layout";
import RoutedMoimTab, { IRoutedTab } from "common/components/tab/routed";
import {
  ParallaxWrapper,
  ParallaxTitle,
  AppBarStickyWrapperStyle,
  RoutedTapContainerStyle,
  DefaultLayoutBodyStyle,
  LeftButtonWrapper,
  BackIcon,
} from "./styled";
import Payments from "./tabs/payments";
import Benefits from "./tabs/benefits";
import CommercePreference from "./tabs/preference";
import CommerceWishlist from "./tabs/wishlist";
import UnsignedChecker from "common/components/unsiginedChecker";
import useIsMobile from "common/hooks/useIsMobile";
import useCurrentUser from "common/hooks/useCurrentUser";
import { useActions } from "app/store";
import { ActionCreators } from "app/actions/secondaryView";
import { NativeMemoryHistoryContext } from "app/modules/SecondaryHistory";

export default function MyShopping() {
  const isMobile = useIsMobile();
  const { redirect } = useNativeSecondaryView();
  const currentUser = useCurrentUser();
  const hubSeller = useHubSeller();
  const { nativeOpenFromProfile } = useSecondaryViewOpenState();
  const myShoppingText = useGroupTexts("my_shopping_menu_title");
  const myShoppingOrderText = useGroupTexts("my_shopping_orders_menu_title");
  const myShoppingBenefitText = useGroupTexts(
    "my_shopping_coupon_credit_menu_title",
  );
  const myShoppingWishListText = useGroupTexts(
    "my_shopping_wishlist_menu_title",
  );
  const { openFromProfile } = useActions({
    openFromProfile: ActionCreators.openNativeSecondaryViewFromProfile,
  });
  const history = React.useContext(NativeMemoryHistoryContext);

  const hasBackButton = React.useMemo(() => {
    return history && history?.index > 1;
  }, [history?.index]);

  const isFirstEntry = React.useMemo(() => {
    return history && history?.entries.length < 3;
  }, [history?.entries.length]);

  React.useEffect(() => {
    if (isFirstEntry) openFromProfile(true);
  }, [isFirstEntry, openFromProfile]);

  const tabs: IRoutedTab[] = React.useMemo(() => {
    const paymentTab = {
      key: "myshopping-payments",
      url: MoimURL.CommercePaymentsList,
      title: myShoppingOrderText ? (
        myShoppingOrderText.singular
      ) : (
        <FormattedMessage id="my_shopping_purchase" />
      ),
      page: Payments,
      default: true,
    };
    const benefitTab = {
      key: "myshopping-benefits",
      url: [
        MoimURL.CommerceMyBenefitCoupons,
        MoimURL.CommerceMyBenefitCouponsFocus,
        MoimURL.CommerceMyBenefitCredits_Legacy,
        MoimURL.CommerceMyBenefit,
      ],
      title: myShoppingBenefitText ? (
        myShoppingBenefitText.singular
      ) : (
        <FormattedMessage id="my_shopping_coupon" />
      ),
      page: Benefits,
    };
    const wishlistTab = {
      key: "myshopping-wishlist",
      url: MoimURL.CommerceMyWishlist,
      title: myShoppingWishListText?.singular ?? (
        <FormattedMessage id="my_shopping_wishlist_menu_title" />
      ),
      page: CommerceWishlist,
      default: true,
    };
    const informationTab = {
      key: "myshopping-information",
      url: [
        MoimURL.CommerceMyPreference,
        MoimURL.CommerceMyPreferenceAddressManage,
        MoimURL.CommerceMyPreferencePaymentManage,
      ],
      title: <FormattedMessage id="my_shopping_shopping_preferences" />,
      page: CommercePreference,
      default: true,
    };

    if (!hubSeller?.config.couponEnabled) {
      return [paymentTab, wishlistTab, informationTab];
    }
    return [paymentTab, benefitTab, wishlistTab, informationTab];
  }, [
    hubSeller,
    myShoppingBenefitText,
    myShoppingWishListText,
    myShoppingOrderText,
  ]);

  const handleBackButtonClick = React.useCallback(() => {
    if (!isMobile && currentUser) {
      redirect(new MoimURL.Members({ userId: currentUser?.id }).toString());
    }
  }, [isMobile, currentUser, redirect]);

  return (
    <DefaultLayout
      appBar={{
        wrapperStickyStyle: AppBarStickyWrapperStyle,
        enableScrollParallax: true,
        parallaxWrapperComponent: ParallaxWrapper,
        titleContainerDisappearPosition: 20,
        parallaxDisappearPosition: 110,
        titleElement: myShoppingText ? (
          <span>{myShoppingText.singular}</span>
        ) : (
          <FormattedMessage id="my_shopping" />
        ),
        expendScrollParallaxElement: (
          <ParallaxTitle>
            {myShoppingText ? (
              <span>{myShoppingText.singular}</span>
            ) : (
              <FormattedMessage id="my_shopping" />
            )}
          </ParallaxTitle>
        ),
        leftButton: !isMobile && hasBackButton && !nativeOpenFromProfile && (
          <LeftButtonWrapper onClick={handleBackButtonClick}>
            <BackIcon />
          </LeftButtonWrapper>
        ),
      }}
      bodyOverrideStyle={DefaultLayoutBodyStyle}
    >
      <UnsignedChecker fallbackType={PermissionDeniedFallbackType.SCREEN}>
        <RoutedMoimTab
          tabs={tabs}
          stickyData={{ topPosition: 45 }}
          routedTabContainerStyle={RoutedTapContainerStyle}
        />
      </UnsignedChecker>
    </DefaultLayout>
  );
}
