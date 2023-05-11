import * as React from "react";
import GlobalStyle from "../common/globalStyle";
import LoadingIcon from "common/components/loading/icon";

export default function SSRFallback() {
  return (
    <>
      <GlobalStyle />
      <LoadingIcon />
    </>
  );
}
