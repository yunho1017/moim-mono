import * as React from "react";
import { Wrapper, Bar } from "./styledComponents";

interface IProps {
  percentage?: number; // 0 ~ 1
}

export default function LinearLoading({ percentage }: IProps) {
  const useAnimation = percentage === undefined;
  return (
    <Wrapper animation={useAnimation}>
      <Bar
        style={{ width: useAnimation ? undefined : `${percentage! * 100}%` }}
      />
    </Wrapper>
  );
}
