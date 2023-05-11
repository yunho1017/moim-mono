import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";

/**
 * HEADING 1
 */
export const H1RegularStyle = css`
  font-size: ${px2rem(40)};
  font-weight: ${props => props.theme.font.regular};
  line-height: ${px2rem(60)};
`;
export const H1BoldStyle = css`
  font-size: ${px2rem(40)};
  font-weight: ${props => props.theme.font.bold};
  line-height: ${px2rem(60)};
`;
export const H1Regular = styled.h1`
  display: block;
  ${H1RegularStyle}
`;
export const H1Bold = styled.h1`
  display: block;
  ${H1BoldStyle}
`;

/**
 * HEADING 2
 */
export const H2RegularStyle = css`
  font-size: ${px2rem(32)};
  font-weight: ${props => props.theme.font.regular};
  line-height: ${px2rem(48)};
`;

export const H2BoldStyle = css`
  font-size: ${px2rem(32)};
  font-weight: ${props => props.theme.font.bold};
  line-height: ${px2rem(48)};
`;

export const H2Regular = styled.h2`
  display: block;
  ${H2BoldStyle}
`;

export const H2Bold = styled.h2`
  display: block;
  ${H2BoldStyle}
`;

/**
 * HEADING 3
 */
export const H3RegularStyle = css`
  font-size: ${px2rem(28)};
  font-weight: ${props => props.theme.font.regular};
  line-height: ${px2rem(42)};
`;

export const H3BoldStyle = css`
  font-size: ${px2rem(28)};
  font-weight: ${props => props.theme.font.bold};
  line-height: ${px2rem(42)};
`;

export const H3Regular = styled.h3`
  display: block;
  ${H3BoldStyle}
`;

export const H3Bold = styled.h3`
  display: block;
  ${H3BoldStyle}
`;

/**
 * HEADING 4
 */
export const H4RegularStyle = css`
  font-size: ${px2rem(24)};
  font-weight: ${props => props.theme.font.regular};
  line-height: ${px2rem(36)};
`;
export const H4BoldStyle = css`
  font-size: ${px2rem(24)};
  font-weight: ${props => props.theme.font.bold};
  line-height: ${px2rem(36)};
`;
export const H4Regular = styled.h4`
  display: block;
  ${H4RegularStyle};
`;
export const H4Bold = styled.h4`
  display: block;
  ${H4BoldStyle};
`;

/**
 * HEADING 5
 */
export const H5RegularStyle = css`
  font-size: ${px2rem(22)};
  font-weight: ${props => props.theme.font.regular};
  line-height: ${px2rem(32)};
`;
export const H5BoldStyle = css`
  font-size: ${px2rem(22)};
  font-weight: ${props => props.theme.font.bold};
  line-height: ${px2rem(32)};
`;
export const H5Regular = styled.h5`
  display: block;
  ${H5RegularStyle};
`;
export const H5Bold = styled.h5`
  display: block;
  ${H5BoldStyle};
`;

/**
 * HEADING 6
 */
export const H6RegularStyle = css`
  font-size: ${px2rem(20)};
  font-weight: ${props => props.theme.font.regular};
  line-height: ${px2rem(30)};
`;
export const H6BoldStyle = css`
  font-size: ${px2rem(20)};
  font-weight: ${props => props.theme.font.bold};
  line-height: ${px2rem(30)};
`;
export const H6Regular = styled.h6`
  display: block;
  ${H6RegularStyle};
`;
export const H6Bold = styled.h6`
  display: block;
  ${H6BoldStyle};
`;

/**
 * HEADING 7
 */
export const H7RegularStyle = css`
  font-size: ${px2rem(18)};
  font-weight: ${props => props.theme.font.regular};
  line-height: ${px2rem(28)};
`;
export const H7BoldStyle = css`
  font-size: ${px2rem(18)};
  font-weight: ${props => props.theme.font.bold};
  line-height: ${px2rem(28)};
`;
export const H7Regular = styled.div`
  display: block;
  ${H7RegularStyle};
`;
export const H7Bold = styled.div`
  display: block;
  ${H7BoldStyle};
`;

/**
 * HEADING 8
 */
export const H8RegularStyle = css`
  font-size: ${px2rem(16)};
  font-weight: ${props => props.theme.font.regular};
  line-height: ${px2rem(22)};
`;
export const H8BoldStyle = css`
  font-size: ${px2rem(16)};
  font-weight: ${props => props.theme.font.bold};
  line-height: ${px2rem(22)};
`;
export const H8Regular = styled.div`
  display: block;
  ${H8RegularStyle};
`;
export const H8Bold = styled.div`
  display: block;
  ${H8BoldStyle};
`;

/**
 * HEADING 9
 */
export const H9RegularStyle = css`
  font-size: ${px2rem(15)};
  font-weight: ${props => props.theme.font.regular};
  line-height: ${px2rem(21)};
`;
export const H9BoldStyle = css`
  font-size: ${px2rem(15)};
  font-weight: ${props => props.theme.font.bold};
  line-height: ${px2rem(21)};
`;
export const H9Regular = styled.div`
  display: block;
  ${H9RegularStyle};
`;
export const H9Bold = styled.div`
  display: block;
  ${H9BoldStyle};
`;

/**
 * HEADING 10
 */
export const H10RegularStyle = css`
  font-size: ${px2rem(14)};
  font-weight: ${props => props.theme.font.regular};
  line-height: ${px2rem(20)};
`;
export const H10BoldStyle = css`
  font-size: ${px2rem(14)};
  font-weight: ${props => props.theme.font.bold};
  line-height: ${px2rem(20)};
`;
export const H10Regular = styled.div`
  display: block;
  ${H10RegularStyle};
`;
export const H10Bold = styled.div`
  display: block;
  ${H10BoldStyle};
`;

/**
 * Body 1
 */
export const B1RegularStyle = css`
  font-size: ${px2rem(16)};
  font-weight: ${props => props.theme.font.regular};
  line-height: ${px2rem(22)};
`;
export const B1BoldStyle = css`
  font-size: ${px2rem(16)};
  font-weight: ${props => props.theme.font.bold};
  line-height: ${px2rem(22)};
`;
export const B1Regular = styled.div`
  ${B1RegularStyle};
`;
export const B1Bold = styled.div`
  ${B1BoldStyle};
`;

/**
 * paragraph Body 1
 */
export const pB1RegularStyle = css`
  font-size: ${px2rem(16)};
  font-weight: ${props => props.theme.font.regular};
  line-height: ${px2rem(28)};
`;
export const pB1BoldStyle = css`
  font-size: ${px2rem(16)};
  font-weight: ${props => props.theme.font.bold};
  line-height: ${px2rem(28)};
`;
export const PB1Regular = styled.div`
  ${B1RegularStyle};
`;
export const PB1Bold = styled.div`
  ${B1BoldStyle};
`;

/**
 * Body 2
 */
export const BODY_TWO_LINE_HEIGHT = 21;
export const B2RegularStyle = css`
  font-size: ${px2rem(15)};
  font-weight: ${props => props.theme.font.regular};
  line-height: ${px2rem(BODY_TWO_LINE_HEIGHT)};
`;
export const B2BoldStyle = css`
  font-size: ${px2rem(15)};
  font-weight: ${props => props.theme.font.bold};
  line-height: ${px2rem(BODY_TWO_LINE_HEIGHT)};
`;
export const B2Regular = styled.div`
  ${B2RegularStyle};
`;
export const B2Bold = styled.div`
  ${B2BoldStyle};
`;

/**
 * paragraph Body 2
 */
export const pB2RegularStyle = css`
  font-size: ${px2rem(15)};
  font-weight: ${props => props.theme.font.regular};
  line-height: ${px2rem(27)};
`;
export const pB2BoldStyle = css`
  font-size: ${px2rem(15)};
  font-weight: ${props => props.theme.font.bold};
  line-height: ${px2rem(27)};
`;
export const PB2Regular = styled.div`
  ${B2RegularStyle};
`;
export const PB2Bold = styled.div`
  ${B2BoldStyle};
`;

/**
 * Body 3
 */
export const BODY_THREE_LINE_HEIGHT = 20;
export const B3RegularStyle = css`
  font-size: ${px2rem(14)};
  font-weight: ${props => props.theme.font.regular};
  line-height: ${px2rem(BODY_THREE_LINE_HEIGHT)};
`;
export const B3BoldStyle = css`
  font-size: ${px2rem(14)};
  font-weight: ${props => props.theme.font.bold};
  line-height: ${px2rem(BODY_THREE_LINE_HEIGHT)};
`;
export const B3Regular = styled.div`
  ${B3RegularStyle};
`;
export const B3Bold = styled.div`
  ${B3BoldStyle};
`;

/**
 * paragraph Body 3
 */
export const pB3RegularStyle = css`
  font-size: ${px2rem(14)};
  font-weight: ${props => props.theme.font.regular};
  line-height: ${px2rem(24)};
`;
export const pB3BoldStyle = css`
  font-size: ${px2rem(14)};
  font-weight: ${props => props.theme.font.bold};
  line-height: ${px2rem(24)};
`;
export const PB3Regular = styled.div`
  ${B3RegularStyle};
`;
export const PB3Bold = styled.div`
  ${B3BoldStyle};
`;

/**
 * Body 3
 */
export const B4RegularStyle = css`
  font-size: ${px2rem(12)};
  font-weight: ${props => props.theme.font.regular};
  line-height: ${px2rem(16)};
`;
export const B4BoldStyle = css`
  font-size: ${px2rem(12)};
  font-weight: ${props => props.theme.font.bold};
  line-height: ${px2rem(16)};
`;
export const B4Regular = styled.div`
  ${B4RegularStyle};
`;
export const B4Bold = styled.div`
  ${B4BoldStyle};
`;

/**
 * paragraph Body 3
 */
export const pB4RegularStyle = css`
  font-size: ${px2rem(12)};
  font-weight: ${props => props.theme.font.regular};
  line-height: ${px2rem(20)};
`;
export const pB4BoldStyle = css`
  font-size: ${px2rem(12)};
  font-weight: ${props => props.theme.font.bold};
  line-height: ${px2rem(20)};
`;
export const PB4Regular = styled.div`
  ${B4RegularStyle};
`;
export const PB4Bold = styled.div`
  ${B4BoldStyle};
`;

/**
 * LABEL
 */
export const LabelStyle = css`
  font-size: ${px2rem(16)};
  font-weight: ${props => props.theme.font.regular};
  line-height: ${px2rem(22)};
`;

export const Label = styled.label`
  ${LabelStyle};
`;

const EmptyComponent = styled.div``;

export function getTextComponent(
  textStyle: Moim.Blockit.TEXT_SUB_TYPE | "p-body3",
) {
  switch (textStyle) {
    case "h1":
      return H2Bold;
    case "h2":
      return H4Bold;
    case "h3":
      return H8Bold;
    case "h4":
      return H8Regular;
    case "h5":
      return H8Bold;
    case "h6":
      return H6Bold;
    case "h7":
      return H10Bold;
    case "body1":
      return B1Regular;
    case "body2":
      return B2Regular;
    case "body3":
      return B3Regular;
    case "p-body3":
      return PB3Regular;
    case "caption":
      return B4Regular;

    default:
      return EmptyComponent;
  }
}
export function getTextStyle(textStyle: Moim.Blockit.TEXT_SUB_TYPE) {
  switch (textStyle) {
    case "h1":
      return H2BoldStyle;
    case "h2":
      return H4BoldStyle;
    case "h3":
      return H8BoldStyle;
    case "h4":
      return H8RegularStyle;
    case "h5":
      return H8BoldStyle;
    case "h6":
      return H9BoldStyle;
    case "h7":
      return H10BoldStyle;
    case "body1":
      return B1RegularStyle;
    case "body2":
      return B2RegularStyle;
    case "body3":
      return B3RegularStyle;
    case "caption":
      return B4RegularStyle;
  }
}
