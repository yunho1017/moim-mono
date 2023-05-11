import * as React from "react";
import { Link } from "react-router-dom";
import { LogoImage, Wrapper } from "./styled";
import { useHomeUrl } from "common/hooks/useRedirectDefaultChannel";
import { AnalyticsClass } from "common/helpers/analytics/analytics";

interface IProps {
  logoUrl: string;
}

function LogoHeader(props: IProps) {
  const { logoUrl } = props;
  const homeUrl = useHomeUrl();
  const linkElement = React.useMemo(
    () => (
      <Link
        to={homeUrl}
        onClick={() => {
          AnalyticsClass.getInstance().channelListParentLogoSelect();
        }}
      >
        <LogoImage src={logoUrl} />
      </Link>
    ),
    [homeUrl, logoUrl],
  );

  return <Wrapper>{linkElement}</Wrapper>;
}

export default LogoHeader;
