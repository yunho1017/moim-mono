import * as React from "react";
import styled, { css } from "styled-components";
import { FormattedMessage } from "react-intl";
import { FlatButton } from "common/components/designSystem/buttons";
import { CTAContainer } from "./styled";
import { MEDIA_QUERY } from "common/constants/responsive";

const Button = styled(FlatButton).attrs({
  size: "s",
})<{
  textColor?: Moim.Blockit.ColorValue;
  bgColor?: Moim.Blockit.ColorValue;
}>`
  width: 100%;

  ${props =>
    props.textColor
      ? css`
          color: ${props.theme.getColorByAlias(props.textColor)};
        `
      : null};
  ${props =>
    props.bgColor
      ? css`
          background-color: ${props.theme.getColorByAlias(props.bgColor)};
        `
      : null};

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    &:hover {
      opacity: inherit;
    }
  }
`;

interface IProps {
  text?: string;
  textColor?: Moim.Blockit.ColorValue;
  bgColor?: Moim.Blockit.ColorValue;
  onClick?(e: any): void;
}

const CTAButton: React.FC<IProps> = ({ text, textColor, bgColor, onClick }) => (
  <CTAContainer>
    <Button textColor={textColor} bgColor={bgColor} onClick={onClick}>
      {text ?? <FormattedMessage id="button_join" />}
    </Button>
  </CTAContainer>
);

export default React.memo(CTAButton);
