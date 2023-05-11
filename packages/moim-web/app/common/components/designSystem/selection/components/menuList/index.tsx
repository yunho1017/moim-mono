import * as React from "react";
import { components } from "react-select";
import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { B1RegularStyle } from "common/components/designSystem/typos";
import { useScrollStyle } from "common/components/designSystem/styles";
import { MEDIA_QUERY } from "common/constants/responsive";
import { DefaultLoader } from "common/components/loading";

const Wrapper = styled.div`
  height: 100%;
  max-height: ${px2rem(150)};
  padding: ${px2rem(4)} 0;
  ${B1RegularStyle};
  color: ${props => props.theme.colorV2.colorSet.grey800};

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
        <div className="inner">{isLoading ? <DefaultLoader /> : children}</div>
      </Wrapper>
    </components.MenuList>
  );
}
