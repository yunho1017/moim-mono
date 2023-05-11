import styled from "styled-components";
import RatingBase from "@material-ui/lab/Rating";
import withStyles from "@material-ui/core/styles/withStyles";
import { px2rem } from "common/helpers/rem";
import {
  Inner as InnerBase,
  ButtonContainer as ButtonContainerBase,
} from "../commonDialogStyled";
import {
  B3RegularStyle,
  H9Bold,
} from "app/common/components/designSystem/typos";
import { MEDIA_QUERY } from "common/constants/responsive";

export const Wrapper = styled.div`
  padding: 0 ${px2rem(24)};

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    padding: 0;
  }
`;

export const Inner = styled(InnerBase)`
  padding: 0 ${px2rem(16)};
`;

export const ButtonContainer = styled(ButtonContainerBase)`
  padding: ${px2rem(24)} ${px2rem(16)} ${px2rem(36)};
  margin: 0;
`;

export const SelectProductContainer = styled.div`
  padding: ${px2rem(8)} ${px2rem(16)};
`;

export const Title = styled(H9Bold)`
  padding: ${px2rem(6)} ${px2rem(16)};
  font-weight: ${props => props.theme.font.bold};
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const RatingWrapper = styled.div`
  width: 100%;
  margin: ${px2rem(8)} 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const RatingValueLabel = styled.div`
  width: 100%;
  text-align: center;
  padding: ${px2rem(6)} ${px2rem(16)};
  margin: ${px2rem(8)} 0;
  color: ${props => props.theme.colorV2.colorSet.grey300};
  ${B3RegularStyle}
`;

export const Rating = withStyles({
  sizeLarge: {
    fontSize: px2rem(48),
  },
})(RatingBase);
