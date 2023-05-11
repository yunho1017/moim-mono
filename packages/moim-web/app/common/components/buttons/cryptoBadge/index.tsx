import * as React from "react";
import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import CryptoBadgeLogo from "@icon/cryptobadge-logo.svg";

interface IProps {
  baseTheme: "yellow" | "white" | "white-outline";
}

const CryptoBadgeButton = styled.button.attrs((props: IProps) => ({
  baseTheme: props.baseTheme || "yellow",
}))<IProps>`
  min-width: ${px2rem(210)};
  height: ${px2rem(56)};

  padding: ${px2rem(8)};
  border-radius: ${px2rem(27)};
  display: inline-flex;
  align-items: center;
  justify-content: center;

  color: #0086ff;

  > span {
    font-size: ${px2rem(14)};
    font-weight: ${props => props.theme.font.bold};
    line-height: 1;
  }

  ${props => {
    switch (props.baseTheme) {
      case "white": {
        return `
          background-color: #FFF;
          border: 1px solid #FFF;
        `;
      }
      case "white-outline": {
        return `
          background-color: #FFF;
          border: 1px solid #0086ff;
        `;
      }

      case "yellow": {
        return `
            background-color: #ffff00;
            border: 1px solid #ffff00;
          `;
      }
    }
  }}
`;

const CryptoBadgeIconWrapper = styled.div`
  width: ${px2rem(36)};
  height: ${px2rem(36)};
  margin-right: ${px2rem(8)};
`;

export const CryptoBadgeIcon = () => (
  <CryptoBadgeIconWrapper>
    <CryptoBadgeLogo size="m" />
  </CryptoBadgeIconWrapper>
);

export default CryptoBadgeButton;
