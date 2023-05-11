import * as React from "react";
import { Route, Switch } from "react-router";
import { MoimURL } from "common/helpers/url";
import { IRouteComponentProps } from "app/routes/client";
// containers
import SellerContainer from "./containers/seller";
import CategoryContainer from "./containers/category";
import ProductSetContainer from "./containers/productSet";
import ProductShowContainer from "./containers/productShow";
import DeliveryGroupContainer from "./containers/deliveryGroup";

const Commerce: React.FC<IRouteComponentProps> = ({}) => {
  return (
    <Switch>
      <Route
        exact={true}
        path={MoimURL.CommerceDeliveryGroup.pattern}
        component={DeliveryGroupContainer}
      />
      <Route
        exact={true}
        path={MoimURL.CommerceSellers.pattern}
        component={SellerContainer}
      />
      <Route
        exact={true}
        path={MoimURL.CommerceCategories.pattern}
        component={CategoryContainer}
      />
      <Route
        exact={true}
        path={MoimURL.CommerceProductSets.pattern}
        component={ProductSetContainer}
      />
      <Route
        exact={true}
        path={[
          MoimURL.CommerceProductShow.pattern,
          MoimURL.CommerceProductShowReview.pattern,
          MoimURL.CommerceProductShowReviewReply.pattern,
          MoimURL.CommerceProductShowQnA.pattern,
          MoimURL.CommerceProductShowQnAReply.pattern,
          MoimURL.CommerceProductShowComment.pattern,
          MoimURL.CommerceProductShowCommentReply.pattern,
        ]}
        component={ProductShowContainer}
      />
    </Switch>
  );
};

export default Commerce;
