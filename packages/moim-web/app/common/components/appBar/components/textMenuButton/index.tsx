import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import { TextButton } from "common/components/designSystem/buttons";

const TextMenuButton = styled(TextButton)<{ align: "left" | "right" }>`
  width: ${px2rem(60)};
  height: ${px2rem(24)};
  padding: 0;
  margin: ${px2rem(10)} 0;
  ${props =>
    props.align === "left"
      ? css`
          text-align: left;
          padding-left: ${px2rem(16)};
          margin-right: ${px2rem(8)};
          color: ${props.theme.colorV2.colorSet.grey800};
        `
      : css`
          text-align: right;
          padding-right: ${px2rem(16)};
          margin-left: ${px2rem(8)};
          color: ${props.theme.colorV2.primary.main};
        `}
`;

export default TextMenuButton;
