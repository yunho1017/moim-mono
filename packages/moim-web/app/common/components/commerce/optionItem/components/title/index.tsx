import * as React from "react";
import ShavedText from "common/components/shavedText";

interface IProps {
  value: string;
}
export default function Title({ value }: IProps) {
  return <ShavedText value={value} line={3} />;
}
