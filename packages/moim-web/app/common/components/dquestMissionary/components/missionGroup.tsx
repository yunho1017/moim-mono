import * as React from "react";
import { rgba } from "polished";
import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import { ThemeType } from "../component";
import MissionItem from "./missionItem";
import { B4RegularStyle } from "common/components/designSystem/typos";
import OrSvgConnector from "./orConnector";

const OrConnector = styled.div<{ selectedTheme: ThemeType }>`
  ${B4RegularStyle}
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  color: ${props =>
    props.selectedTheme === "black"
      ? props.theme.themeMode.lightPalette.colorSet.grey800
      : props.theme.themeMode.lightPalette.colorSet.white800};
  width: px2rem(24);
  height: px2rem(24);

  ::after {
    content: "OR";
  }
`;

const BarConnector = styled.div<{ selectedTheme: ThemeType; isDeep?: boolean }>`
  width: ${props => (props.isDeep ? px2rem(2) : px2rem(4))};
  height: ${props => (props.isDeep ? px2rem(24) : px2rem(32))};
  background-color: ${props =>
    props.selectedTheme === "black"
      ? rgba(
          props.theme.themeMode.lightPalette.colorSet.grey1000,
          props.isDeep ? 0.14 : 0.24,
        )
      : rgba(
          props.theme.themeMode.lightPalette.colorSet.white1000,
          props.isDeep ? 0.14 : 0.24,
        )};
`;

const GroupContainer = styled.div<{
  selectedTheme: ThemeType;
  completed?: boolean;
}>`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${px2rem(8)};
  border-radius: ${px2rem(40)};
  border: ${px2rem(4)} solid
    ${props =>
      props.selectedTheme === "black"
        ? props.theme.themeMode.lightPalette.colorSet.grey100
        : props.theme.themeMode.lightPalette.colorSet.white100};
  color: ${props => (props.selectedTheme === "black" ? "black" : "white")};

  ${props =>
    props.completed &&
    css`
      border-width: ${px2rem(4)};
      border-color: ${props.theme.color.jade300};
    `}
`;

interface IProps {
  missions: Moim.DQuest.IMission;
  isLoading?: boolean;
  history?: Moim.DQuest.IHistory;
  selectedTheme?: ThemeType;
  onClickMission?(missionId: Moim.Id): void;
}

const MissionGroup: React.FC<IProps> = ({
  missions,
  isLoading,
  history,
  selectedTheme = "black",
  onClickMission,
}) => {
  const isReJoinable = React.useMemo(() => Boolean(history?.reJoinable), [
    history?.reJoinable,
  ]);
  const getHistory = React.useCallback(
    (missionId: Moim.Id) =>
      history?.missionProgress?.find(mp => mp.missionId === missionId),
    [history],
  );

  const checkCompleted = React.useCallback(
    (mission: Moim.DQuest.IMission) => {
      switch (mission.type) {
        case "EVENT": {
          const targetHistory = getHistory(
            (mission as Moim.DQuest.IMissionEventOp).id,
          );
          return (
            targetHistory &&
            targetHistory.progress === targetHistory.progressTotal
          );
        }

        case "OR": {
          return (mission as Moim.DQuest.IMissionOrOp).children.reduce(
            (acc, curr) => acc || checkCompleted(curr),
            false,
          );
        }

        case "AND": {
          return (mission as Moim.DQuest.IMissionAndOp).children.reduce(
            (acc, curr) => acc && checkCompleted(curr),
            true,
          );
        }
      }
    },
    [getHistory],
  );

  const render = React.useCallback(
    (mission: Moim.DQuest.IMission, depth: number = 0) => {
      switch (mission.type) {
        case "EVENT": {
          const typeSafeMission = mission as Moim.DQuest.IMissionEventOp;
          const targetHistory = getHistory(typeSafeMission.id);

          return (
            <MissionItem
              isLoading={isLoading}
              icon={typeSafeMission.action?.iconUrl ?? typeSafeMission.imageUrl}
              actionText={typeSafeMission.action?.title}
              missionId={typeSafeMission.id}
              completed={
                isReJoinable
                  ? false
                  : targetHistory &&
                    targetHistory.progress === targetHistory.progressTotal
              }
              disabled={false}
              buttonDisabled={
                typeSafeMission.action === undefined ||
                Boolean(typeSafeMission.action?.disabled)
              }
              title={typeSafeMission.title}
              description={typeSafeMission.description}
              selectedTheme={selectedTheme}
              onClick={onClickMission}
            />
          );
        }
        case "OR": {
          const children = (mission as Moim.DQuest.IMissionOrOp).children.map(
            (mObj, index) => (
              <>
                {index > 0 ? (
                  Boolean(depth) ? (
                    <OrConnector selectedTheme={selectedTheme} />
                  ) : (
                    <OrSvgConnector selectedTheme={selectedTheme} />
                  )
                ) : null}
                {render(mObj, depth + 1)}
              </>
            ),
          );

          return depth === 0 ? (
            <>{children}</>
          ) : (
            <GroupContainer
              key={`group-or-${depth}`}
              completed={checkCompleted(mission)}
              selectedTheme={selectedTheme}
            >
              {children}
            </GroupContainer>
          );
        }
        case "AND": {
          const children = (mission as Moim.DQuest.IMissionAndOp).children.map(
            (mObj, index) => (
              <>
                {index > 0 && (
                  <BarConnector
                    selectedTheme={selectedTheme}
                    isDeep={Boolean(depth)}
                  />
                )}
                {render(mObj, depth + 1)}
              </>
            ),
          );
          return depth === 0 ? (
            <>{children}</>
          ) : (
            <GroupContainer
              key={`group-and-${depth}`}
              completed={checkCompleted(mission)}
              selectedTheme={selectedTheme}
            >
              {children}
            </GroupContainer>
          );
        }
      }
    },
    [
      getHistory,
      isReJoinable,
      isLoading,
      selectedTheme,
      onClickMission,
      checkCompleted,
    ],
  );

  return render(missions);
};

export default React.memo(MissionGroup);
