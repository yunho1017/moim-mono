import * as React from "react";
import { components } from "react-select";
import styled from "styled-components";
import { MEDIA_QUERY } from "../../../../constants/responsive";
import { px2rem } from "../../../../helpers/rem";
import { getBGLevel3DialogStyle } from "../../../BGLevel";
import { useHoverStyle } from "../../../styles";

const Wrapper = styled.div`
  .rs__menu {
    border: 1px solid ${(props) => props.theme.colorV2.colorSet.grey50};
    border-radius: ${px2rem(2)};
    ${getBGLevel3DialogStyle({ borderRadius: 2 })}
    z-index: ${(props) => props.theme.zIndexes.toast};
    margin-top: 0;
  }

  .rs__option {
    display: flex;
    align-items: center;
    min-height: ${px2rem(42)};
    padding: 0;
    background: none;
    ${useHoverStyle}
  }

  .rs__option:hover {
    background-color: initial !important;
    @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
      background-color: ${(props) =>
        props.theme.colorV2.colorSet.grey10} !important;
    }
  }

  .rs__option:active {
    background-color: initial !important;
  }

  .rs__option--is-selected {
    color: ${(props) => props.theme.colorV2.colorSet.grey800};

    background-color: ${(props) =>
      props.theme.colorV2.colorSet.grey50} !important;
  }

  .rs__option--is-disabled:active,
  .rs__option--is-disabled {
    cursor: default;
    pointer-events: none;
    background-color: ${(props) => props.theme.colorV2.colorSet.grey50};
    &:hover {
      background-color: initial !important;
    }
  }

  .rs__menu-notice--no-options {
    color: ${(props) => props.theme.colorV2.colorSet.grey300};
  }
`;

export default function Menu(
  props: React.ComponentProps<typeof components.Menu>
) {
  return (
    <Wrapper>
      <components.Menu {...props}>{props.children}</components.Menu>
    </Wrapper>
  );
}
