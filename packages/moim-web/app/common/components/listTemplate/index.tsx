import * as React from "react";

import { Wrapper, Title, Contents } from "./styled";

export interface IProps extends React.PropsWithChildren<{}> {
  title: string;
  count?: number;
}

export default function ListTemplate({ children, title, count }: IProps) {
  return (
    <Wrapper>
      <Title>
        {title}
        {count && `(${count})`}
      </Title>
      <Contents>{children}</Contents>
    </Wrapper>
  );
}
