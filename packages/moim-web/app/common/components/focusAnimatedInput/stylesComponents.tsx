import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { makeStyles } from "@material-ui/core/styles";
import { rgba } from "polished";

export const Wrapper = styled.div`
  width: 100%;
  position: relative;
`;

export const ClearTextButtonWrapper = styled.div`
  display: none;

  ${Wrapper} input:focus ~ div > & {
    display: inline-block;
    width: ${px2rem(16)};
    height: ${px2rem(16)};
    margin: 0 ${px2rem(8)};
    cursor: pointer;

    svg {
      width: ${px2rem(16)};
      height: ${px2rem(16)};
    }
  }
`;

export const useFocusAnimatedInputStyle = makeStyles({
  root: {
    width: "100%",
  },
  deleteButton: {
    margin: 0,
  },
  input: (theme: Moim.Theme.ITheme) => ({
    color: theme.colorV2.colorSet.grey800,
    fontSize: px2rem(12),
    fontWeight: theme.font.medium,
    lineHeight: px2rem(16),

    "&::placeholder": {
      fontSize: px2rem(12),
      fontWeight: theme.font.regular,
      lineHeight: px2rem(16),
      color: rgba(theme.colorV2.colorSet.grey300, 0.8),
    },
  }),
  label: (theme: Moim.Theme.ITheme) => ({
    marginTop: px2rem(8),
    marginBottom: px2rem(4),
    position: "relative",
    fontSize: px2rem(10),
    fontWeight: theme.font.bold,
    lineHeight: px2rem(16),
    color: theme.colorV2.colorSet.grey300,
    transform: "scale(1)",
  }),
  underline: (theme: Moim.Theme.ITheme) => ({
    "&:after": {
      borderBottomWidth: px2rem(1),
      borderBottomColor: theme.colorV2.colorSet.grey800,
    },
    "&:before": {
      borderBottomWidth: px2rem(1),
      borderBottomColor: theme.colorV2.colorSet.grey300,
    },
  }),
  labelFocused: (theme: Moim.Theme.ITheme) => ({
    color: `${theme.colorV2.colorSet.grey800} !important`,
  }),
  labelFilled: (theme: Moim.Theme.ITheme) => ({
    color: `${theme.colorV2.colorSet.grey800} !important`,
  }),
});
