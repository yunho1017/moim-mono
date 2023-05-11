import * as React from "react";
import styled from "styled-components";
import PinnedIconBase from "@icon/18-pinsolid.svg";
import { px2rem } from "common/helpers/rem";
import { LoadingIcon } from "common/components/loading";
import { MEDIA_QUERY } from "common/constants/responsive";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const LoaderWrapper = styled.div`
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    margin-top: 50%;
  }

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    margin: ${px2rem(20)} 0;
  }
`;

export const PinnedIcon = styled(PinnedIconBase).attrs(props => ({
  size: "xs",
  iconColor: props.theme.colorV2.colorSet.grey800,
}))``;

export function Loader() {
  return (
    <LoaderWrapper>
      <LoadingIcon />
    </LoaderWrapper>
  );
}
