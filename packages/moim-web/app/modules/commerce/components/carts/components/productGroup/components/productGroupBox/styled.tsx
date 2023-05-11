import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import { DefaultDivider } from "app/common/components/divider/styled";
import { B4Regular, H9Bold } from "common/components/designSystem/typos";
import { useSingleLineStyle } from "common/components/designSystem/styles";

export const Divider = styled(DefaultDivider)`
  margin: ${px2rem(8)} 0;
`;

export const ProductGroupContainer = styled.div<{
  disableBodyPadding: boolean;
}>`
  width: 100%;
  height: fit-content;
  border: solid 1px ${props => props.theme.colorV2.colorSet.grey50};
  border-radius: ${px2rem(4)};
  overflow: hidden;

  background-color: ${props => props.theme.colorV2.colorSet.white1000};

  .head {
    padding: 0 ${px2rem(16)};
  }

  .body {
    ${props =>
      !props.disableBodyPadding &&
      css`
        padding-left: ${px2rem(16)};
      `}
  }

  .footer {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const ProductGroupTitleContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  & > * + * {
    margin-left: ${px2rem(16)};
  }
`;

export const ProductGroupTitle = styled(H9Bold)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
  display: flex;
  align-items: center;
  width: 100%;
  flex: 1;
  min-width: 0;

  padding: ${px2rem(6)} 0;
  ${useSingleLineStyle};
`;

export const TotalPriceInformation = styled(B4Regular)`
  width: 100%;
  color: ${props => props.theme.colorV2.colorSet.grey300};
  padding: ${px2rem(2)} ${px2rem(16)};
  text-align: center;

  .operator {
    margin: 0 ${px2rem(4)};
  }
`;
