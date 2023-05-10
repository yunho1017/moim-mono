import * as React from "react";
import { components } from "react-select";
import styled from "styled-components";
import { MEDIA_QUERY } from "../../../../constants/responsive";
import { px2rem } from "../../../../helpers/rem";
import { useScrollStyle } from "../../../styles";
import { B1RegularStyle } from "../../../typos";

const Wrapper = styled.div`
  height: 100%;
  max-height: ${px2rem(150)};
  padding: ${px2rem(4)} 0;
  ${B1RegularStyle};
  color: ${(props) => props.theme.colorV2.colorSet.grey800};

  .inner {
    @media ${MEDIA_QUERY.ONLY_MOBILE} {
      ${useScrollStyle}
    }
  }
`;

export default function MenuList({
  isLoading,
  children,
  ...rest
}: React.ComponentProps<typeof components.MenuList> & {
  isLoading?: boolean;
}) {
  return (
    <components.MenuList {...rest}>
      <Wrapper data-scroll-lock-scrollable>
        {/* TODO: (mono) fix here */}
        {/* <div className="inner">{isLoading ? <DefaultLoader /> : children}</div> */}
        <div className="inner">{children}</div>
      </Wrapper>
    </components.MenuList>
  );
}
