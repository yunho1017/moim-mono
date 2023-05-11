import * as React from "react";
import { useRouteMatch } from "react-router";

interface IProps {
  paramKeys: { key: Moim.MatchParamKeys }[];
  children(params: string[]): React.ReactNode;
}
export default function WithParamsWrapper({ children, paramKeys }: IProps) {
  const match = useRouteMatch<Moim.IMatchParams>();
  const params: string[] = paramKeys
    .map(({ key }) => match.params[key])
    .filter((param): param is string => Boolean(param));

  if (params.length !== paramKeys.length) {
    return null;
  }
  return <>{children(params)}</>;
}
