import * as React from "react";
import { Redirect } from "react-router";
import { useNativeSecondaryView } from "app/common/hooks/useSecondaryView";
import { MoimURL } from "common/helpers/url";
import { IRouteComponentProps } from "app/routes/client";

const SharePositionMemberRedirectors: React.FC<IRouteComponentProps> = props => {
  const { redirect } = useNativeSecondaryView();
  if (props.match.params.positionId) {
    const pId = props.match.params.positionId;
    setTimeout(() => {
      redirect(
        new MoimURL.PositionMembers({
          positionId: pId,
        }).toString(),
      );
    }, 500);
  }
  return <Redirect to="/" />;
};

export default SharePositionMemberRedirectors;
