import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";
import { useScrollStyle } from "common/components/designSystem/styles";
import { FixedHeightSmallModalLayout } from "common/components/modalLayout/small";

export const ModalLayoutContainer = styled(FixedHeightSmallModalLayout)`
  box-shadow: ${props => props.theme.shadow.whiteElevated};
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
  overflow: hidden;

  @media ${MEDIA_QUERY.ONLY_DESKTOP} {
    position: absolute;
    left: 50%;
    top: 50%;
    padding: 0;
    border-radius: ${px2rem(8)};
    width: ${px2rem(455)};
    height: ${px2rem(600)};
    transform: translate(-50%, -50%);
  }
`;

export const Wrapper = styled.div`
  position: relative;

  width: 100%;
  height: 100%;

  @media ${MEDIA_QUERY.EXCEPT_DESKTOP} {
    display: flex;
    flex-direction: column;
  }
`;

export const FormWrapper = styled.div<{ step: number }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  position: absolute;
  top: 0;
  left: 0;
  transform: ${props => `translate(-${(props.step - 1) * 100}%, 0)`};
  transition: transform 0.4s ease-in-out;
  @media ${MEDIA_QUERY.EXCEPT_DESKTOP} {
    flex: 1;
    position: relative;
  }
`;

export const Form = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
  margin-top: ${px2rem(8)};

  ${useScrollStyle}

  @media ${MEDIA_QUERY.EXCEPT_DESKTOP} {
    padding: 0 ${px2rem(16)};
  }

  @media ${MEDIA_QUERY.ONLY_DESKTOP} {
    padding: ${px2rem(40)} ${px2rem(56)};
  }
`;

export const BackIconWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: ${px2rem(9)};
`;

export const useCheckboxStyle = makeStyles({
  label: {
    fontSize: `${px2rem(16)}`,
  },
});

// Todo: change component span to Link
export const StyledLink = styled.span`
  color: ${props => props.theme.colorV2.accent};
`;

export const useProgressStyle = makeStyles({
  root: (theme: Moim.Theme.ITheme) => ({
    width: "100%",
    height: `${px2rem(2)}`,
    backgroundColor: `${theme.colorV2.colorSet.grey100}`,
  }),
  barColorPrimary: (theme: Moim.Theme.ITheme) => ({
    backgroundColor: `${theme.colorV2.accent}`,
  }),
});
