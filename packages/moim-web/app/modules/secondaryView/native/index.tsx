import * as React from "react";
import { Switch, Route, Router } from "react-router";
import { CSSTransition } from "react-transition-group";
import { useEffects, useProps } from "./hooks";
// components
import { SlideTransitionGroup, TRANSITION_DURATION } from "../styled";
import WithParamsWrapper from "common/components/withParamsWrapper";
// helper
import { MoimURL } from "common/helpers/url";
// page
import ProfilePanel from "app/modules/profile";
import ConversationInformation from "./components/conversationInformation";
import ForumInformation from "./components/forumInformation";
import MoimMembers from "./components/moimMembers";
import PositionMembers from "./components/positionMembers";
import UserBookmark from "./components/bookmark";
import UserNftList from "./components/userNfts";
import UserCoin from "./components/coin";
import ToBeExpiredCoin from "./components/toBeExpiredCoin";
import CommerceCarts from "app/modules/commerce/containers/carts";
import CommerceMyShopping from "app/modules/commerce/containers/myShopping";
import PaymentDetail from "app/modules/commerce/containers/paymentDetail";
import MyQuests from "app/modules/dquest/containers/myQuests";
import UserCertificates from "./components/userCertificates";
import ProfileMe from "./components/me";

export default function() {
  const hookProps = useProps();
  useEffects(hookProps);

  const { history } = hookProps;

  if (!history) {
    return null;
  }

  return (
    <Router history={history}>
      <SlideTransitionGroup>
        <CSSTransition
          unmountOnExit={true}
          timeout={TRANSITION_DURATION}
          classNames="slide"
        >
          <Switch>
            <Route path={MoimURL.Me.pattern}>
              <ProfileMe />
            </Route>

            <Route path={MoimURL.CommercePaymentsShow.pattern}>
              <WithParamsWrapper paramKeys={[{ key: "id" }]}>
                {([id]) => <PaymentDetail id={id} />}
              </WithParamsWrapper>
            </Route>

            <Route
              path={[
                MoimURL.CommercePaymentsList.pattern,
                MoimURL.CommerceMyBenefitCoupons.pattern,
                MoimURL.CommerceMyBenefitCouponsFocus.pattern,
                MoimURL.CommerceMyBenefit.pattern,
                MoimURL.CommerceMyWishlist.pattern,
                MoimURL.CommerceMyShopping.pattern,
              ]}
            >
              <CommerceMyShopping />
            </Route>

            <Route path={MoimURL.CommerceMyCarts.pattern}>
              <CommerceCarts />
            </Route>

            <Route path={MoimURL.ProfileNftList.pattern}>
              <WithParamsWrapper paramKeys={[{ key: "userId" }]}>
                {([userId]) => <UserNftList userId={userId} />}
              </WithParamsWrapper>
            </Route>

            <Route
              path={[
                MoimURL.ProfileBadgeList.pattern,
                MoimURL.ProfileBadgeCardList.pattern,
              ]}
            >
              <UserCertificates />
            </Route>

            <Route path={MoimURL.Members.pattern}>
              <ProfilePanel />
            </Route>

            <Route path={MoimURL.MoimMembers.pattern}>
              <MoimMembers />
            </Route>

            <Route path={MoimURL.ConversationMembers.pattern}>
              <WithParamsWrapper paramKeys={[{ key: "conversationId" }]}>
                {([channelId]) => (
                  <ConversationInformation channelId={channelId} />
                )}
              </WithParamsWrapper>
            </Route>

            <Route path={MoimURL.ForumMembers.pattern}>
              <WithParamsWrapper paramKeys={[{ key: "forumId" }]}>
                {([channelId]) => <ForumInformation channelId={channelId} />}
              </WithParamsWrapper>
            </Route>

            <Route path={MoimURL.PositionMembers.pattern}>
              <WithParamsWrapper paramKeys={[{ key: "positionId" }]}>
                {([positionId]) => <PositionMembers positionId={positionId} />}
              </WithParamsWrapper>
            </Route>

            <Route path={MoimURL.UserBookmark.pattern}>
              <WithParamsWrapper paramKeys={[{ key: "userId" }]}>
                {([userId]) => <UserBookmark userId={userId} />}
              </WithParamsWrapper>
            </Route>

            <Route
              path={[
                MoimURL.MyQuestList.pattern,
                MoimURL.MyQuestListInActive.pattern,
                MoimURL.MyQuestListAchieved.pattern,
              ]}
            >
              <MyQuests />
            </Route>

            <Route path={MoimURL.CoinShow.pattern} exact={true}>
              <WithParamsWrapper paramKeys={[{ key: "coinId" }]}>
                {([coinId]) => <UserCoin coinId={coinId} />}
              </WithParamsWrapper>
            </Route>

            <Route path={MoimURL.CoinToBeExpired.pattern}>
              <WithParamsWrapper paramKeys={[{ key: "coinId" }]}>
                {([coinId]) => <ToBeExpiredCoin coinId={coinId} />}
              </WithParamsWrapper>
            </Route>
          </Switch>
        </CSSTransition>
      </SlideTransitionGroup>
    </Router>
  );
}
