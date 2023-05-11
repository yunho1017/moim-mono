import * as React from "react";
import { Redirect } from "react-router";
import { useNativeSecondaryView } from "app/common/hooks/useSecondaryView";
import { MoimURL } from "common/helpers/url";
import { IRouteComponentProps } from "app/routes/client";

const MyQuestsRedirector: React.FC<IRouteComponentProps> = ({ match }) => {
  const { redirect } = useNativeSecondaryView();
  const redirectURL = React.useMemo(() => {
    if (
      MoimURL.MyQuestList.isSame(match.url) ||
      MoimURL.MyQuestListAchieved.isSameExact(match.url)
    ) {
      return new MoimURL.MyQuestListInActive().toString();
    } else {
      return new MoimURL.MyQuestListInActive().toString();
    }
  }, [match.url]);

  React.useLayoutEffect(() => {
    setTimeout(() => {
      redirect(redirectURL);
    }, 500);
  }, [redirect, redirectURL]);

  return <Redirect to="/" />;
};

export default MyQuestsRedirector;
