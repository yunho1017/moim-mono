import * as React from "react";

interface IProps extends Omit<React.HTMLProps<HTMLAnchorElement>, "href"> {
  domain?: string;
  query?: string;
}
const getMoimLink = ({ domain, query }: IProps) => {
  const host = location.host
    .split(".")
    .slice(-2)
    .join(".");
  const queryString = query ? `?${query}` : "";
  return `${location.protocol}//${domain}.${host}${queryString}`;
};

export default function ExternalMoimLink({
  children,
  domain,
  query,
  ...rest
}: React.PropsWithChildren<IProps>) {
  if (!domain) {
    return <>{children}</>;
  }
  const link = getMoimLink({ domain, query });
  return (
    <a tabIndex={-1} href={link} target="_blank" {...rest}>
      {children}
    </a>
  );
}
