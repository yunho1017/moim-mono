import * as React from "react";
import { FormattedMessage } from "react-intl";
import { rgba } from "polished";
import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import {
  B4RegularStyle,
  H8BoldStyle,
  H10BoldStyle,
} from "common/components/designSystem/typos";
import CheckIconBase from "@icon/36-check.svg";
import ThreeDButton from "./3dButton";
import CircleSpinner from "./circleSpinner";
import { ThemeType } from "../component";
import { MEDIA_QUERY } from "common/constants/responsive";
import useIsMobile from "common/hooks/useIsMobile";

const LEFT_ICON_SIZE = 36;

const CheckIcon = styled(CheckIconBase).attrs(props => ({
  size: "x",
  iconColor:
    props.selectedTheme === "black"
      ? props.theme.themeMode.lightPalette.colorSet.grey800
      : props.theme.themeMode.lightPalette.colorSet.white800,
}))<{ selectedTheme: ThemeType }>``;

const CompleteIcon = styled.div`
  width: ${px2rem(LEFT_ICON_SIZE)};
  height: ${px2rem(LEFT_ICON_SIZE)};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  background-color: ${props => props.theme.color.green400};
`;

const LeftIconWrapper = styled.div`
  position: relative;
  width: ${px2rem(LEFT_ICON_SIZE)};
  height: ${px2rem(LEFT_ICON_SIZE)};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;

  background-color: ${props =>
    props.theme.themeMode.lightPalette.colorSet.white1000};

  img {
    width: ${px2rem(24)};
    height: ${px2rem(24)};
  }
`;

const ContentTitle = styled.div`
  ${H8BoldStyle}
`;
const ContentDescription = styled.div`
  ${B4RegularStyle}
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: ${px2rem(12)};
  width: 100%;
  height: 100%;
  flex: 4;
  min-width: 0;
`;

const RightWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  min-width: 0;

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    width: 100%;
    flex: 1;
  }

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    min-width: ${px2rem(120)};
    margin-left: ${px2rem(12)};
  }
`;

const VerifyText = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: ${px2rem(32)};
  border-radius: ${px2rem(18)};
  overflow: hidden;
  text-overflow: ellipsis;

  ${H10BoldStyle}
`;

const Container = styled.div<{
  selectedTheme: ThemeType;
  disabled?: boolean;
  completed?: boolean;
}>`
  position: relative;
  width: 100%;
  height: ${px2rem(68)};
  display: flex;
  align-items: center;
  padding: ${px2rem(16)} ${px2rem(18)};
  border-radius: ${px2rem(35)};
  color: ${props =>
    props.selectedTheme === "black"
      ? props.theme.themeMode.lightPalette.colorSet.grey800
      : props.theme.themeMode.lightPalette.colorSet.white800};
  overflow: hidden;
  background-color: ${props =>
    props.selectedTheme === "black"
      ? props.theme.themeMode.lightPalette.colorSet.grey50
      : props.theme.themeMode.lightPalette.colorSet.white50};

  ${CompleteIcon} {
    border-color: ${props =>
      props.selectedTheme === "black"
        ? props.theme.themeMode.lightPalette.colorSet.white1000
        : props.theme.themeMode.lightPalette.colorSet.grey1000};
  }

  ${VerifyText} {
    background-color: ${props =>
      props.selectedTheme === "black"
        ? props.theme.themeMode.lightPalette.colorSet.grey100
        : props.theme.themeMode.lightPalette.colorSet.white100};
  }

  ${ContentDescription} {
    color: ${props =>
      props.selectedTheme === "black"
        ? rgba(props.theme.themeMode.lightPalette.colorSet.grey1000, 0.38)
        : rgba(props.theme.themeMode.lightPalette.colorSet.white1000, 0.38)};
  }

  ${props =>
    props.completed &&
    css`
      border: ${px2rem(4)} solid;
      border-color: ${props.theme.color.green400};
      ${VerifyText} {
        background-color: ${props.theme.color.green400};
      }
    `};

  ${props =>
    props.disabled &&
    css`
      ::after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        z-index: ${props.theme.zIndexes.default};
        cursor: not-allowed;
        background-color: ${props.selectedTheme === "black"
          ? rgba(0, 0, 0, 0.2)
          : rgba(255, 255, 255, 0.2)};
      }
    `};

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    flex-direction: column;
    height: fit-content;
    gap: ${px2rem(8)};
  }
`;

export const LeftWrapper = styled.div`
  width: 100%;
  height: 100%;
  flex: 2;
  display: flex;
  align-items: center;
  min-width: 0;
  min-height: 0;
`;

interface IProps {
  missionId: Moim.Id;
  icon?: string;
  actionText?: string;
  isLoading?: boolean;
  title?: string;
  description?: string;
  disabled?: boolean;
  buttonDisabled?: boolean;
  completed?: boolean;
  selectedTheme?: ThemeType;
  onClick?(missionId: Moim.Id): void;
}

const MissionItem: React.FC<IProps> = ({
  isLoading,
  actionText,
  icon,
  missionId,
  title,
  description,
  disabled,
  buttonDisabled,
  completed,
  selectedTheme = "black",
  onClick,
}) => {
  const isMobile = useIsMobile();
  const handleClick = React.useCallback(() => {
    onClick?.(missionId);
  }, [missionId, onClick]);

  const rightContent = React.useMemo(() => {
    if (completed) {
      return (
        <VerifyText>
          <FormattedMessage id="quest_mission_verified" />
        </VerifyText>
      );
    }

    if (isLoading) {
      return (
        <VerifyText>
          <FormattedMessage id="quest_mission_verifying" />
        </VerifyText>
      );
    }

    return (
      <ThreeDButton size="s" buttonTheme={selectedTheme} onClick={handleClick}>
        {actionText ?? <FormattedMessage id="button_quest_mission_default" />}
      </ThreeDButton>
    );
  }, [completed, actionText, handleClick, isLoading, selectedTheme]);

  return (
    <>
      <Container
        disabled={disabled}
        completed={completed}
        selectedTheme={selectedTheme}
      >
        <LeftWrapper>
          {completed ? (
            <CompleteIcon>
              <CheckIcon selectedTheme={selectedTheme} />
            </CompleteIcon>
          ) : isLoading ? (
            <CircleSpinner
              size={isMobile ? 36 : 38}
              selectedTheme={selectedTheme}
            />
          ) : (
            <LeftIconWrapper>
              {icon ? <img src={icon} /> : undefined}
            </LeftIconWrapper>
          )}
          <ContentWrapper>
            {title ? <ContentTitle>{title}</ContentTitle> : undefined}
            {description ? (
              <ContentDescription>{description}</ContentDescription>
            ) : (
              undefined
            )}
          </ContentWrapper>
        </LeftWrapper>
        {buttonDisabled ? null : <RightWrapper>{rightContent}</RightWrapper>}
      </Container>
    </>
  );
};

export default React.memo(MissionItem);
