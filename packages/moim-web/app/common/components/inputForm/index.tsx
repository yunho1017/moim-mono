import * as React from "react";
import { Wrapper, Description, Title, Form } from "./components";

interface IProps extends React.PropsWithChildren<{}> {
  title: string;
  titleType: "GREY" | "WHITE";
  description?: string;
  labelFor?: string;
}

export default function InputForm({
  title,
  titleType,
  description,
  children,
  labelFor,
}: IProps) {
  return (
    <Wrapper>
      <label htmlFor={labelFor}>
        <Title titleType={titleType}>{title}</Title>
        <Form titleType={titleType}>{children}</Form>
        <Description>{description}</Description>
      </label>
    </Wrapper>
  );
}
