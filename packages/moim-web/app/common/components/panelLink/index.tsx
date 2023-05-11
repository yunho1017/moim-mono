import * as React from "react";
import { Link } from "react-router-dom";
import {
  useLocation,
  useRouteMatch,
  match as Match,
  matchPath,
} from "react-router";
// interface
import { URLDefinition } from "common/helpers/url/definition";
import { ILocationOptions } from "common/helpers/url/locationCreator";
// selector
import { MoimURL } from "common/helpers/url";

export interface IProps
  extends React.PropsWithChildren<{}>,
    React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: URLDefinition;
  locationOption?: Partial<ILocationOptions>;
  forwardedRef?: React.Ref<HTMLAnchorElement>;
}

function PanelLink(props: IProps) {
  const { to, locationOption, children, forwardedRef, ...rest } = props;
  const match = useRouteMatch();
  const location = useLocation();

  const panelState: Match<Moim.IMatchParams> | null = matchPath(
    location.pathname,
    {
      path: `${match.path}${MoimURL.SecondaryViewUrl.pattern}`,
    },
  );

  let redirectTo = to.toString();

  if (panelState && panelState.params.panelRouteUrl) {
    redirectTo += decodeURIComponent(
      new MoimURL.SecondaryViewUrl({
        panelRouteUrl: panelState.params.panelRouteUrl,
      }).toString(),
    );
  }

  return (
    <Link
      to={{
        ...to.toLocation({ ...locationOption }),
        pathname: redirectTo,
      }}
      innerRef={forwardedRef}
      {...rest}
    >
      {children}
    </Link>
  );
}

export default React.forwardRef<HTMLAnchorElement, IProps>((props, ref) => (
  <PanelLink {...props} forwardedRef={ref} />
));
