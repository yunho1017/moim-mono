import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import {
  B1RegularStyle,
  B4RegularStyle,
} from "common/components/designSystem/typos";
import { useSingleLineStyle } from "common/components/designSystem/styles";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
`;

export const AvatarHolder = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: ${px2rem(12)} ${px2rem(8)} ${px2rem(12)} 0;
`;

export const UserDataHolder = styled.div<{ hasBio: boolean }>`
  width: 100%;
  flex: 1;
  min-width: 0;
  margin-left: ${px2rem(8)};
  padding-top: ${px2rem(10)};

  ${props => {
    if (!props.hasBio) {
      return css`
        padding-top: 0;

        display: flex;
        align-items: center;
      `;
    }
  }}
`;

export const UsernameContainer = styled.div`
  display: flex;
  align-items: center;
  .ql-editor {
    ${B1RegularStyle};
    p {
      padding: 0 !important;
    }
  }
`;

export const Username = styled.div`
  min-width: 0;
  ${useSingleLineStyle};
  ${B1RegularStyle};
`;

export const UserBio = styled.div`
  margin-top: ${px2rem(2)};
  .ql-editor {
    ${B4RegularStyle};
    p {
      padding: 0 !important;
    }
    color: ${props => props.theme.colorV2.colorSet.grey300};
  }
`;

export const PositionChipsWrapper = styled.div`
  white-space: nowrap;
  margin-left: ${px2rem(4)};
`;
