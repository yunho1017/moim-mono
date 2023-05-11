import * as React from "react";
import styled from "styled-components";
import { FormattedMessage, useIntl } from "react-intl";
import { B4RegularStyle } from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";

const CaptionBody = styled.div`
  width: 100%;
  color: ${props => props.theme.colorV2.colorSet.grey800};
  padding: ${px2rem(8)} 0;
  color: ${props => props.theme.colorV2.colorSet.grey300};
  word-break: break-word;
  white-space: pre-line;
  ${B4RegularStyle}
`;

const MissionSummary: React.FC<{
  humanizedMission: Moim.DQuest.IHumanizedMission;
}> = React.memo(({ humanizedMission }) => {
  const intl = useIntl();

  const element = React.useMemo(() => {
    switch (humanizedMission.type) {
      case "SIMPLE": {
        return (
          <FormattedMessage
            id="quest_rule_guide_target_figure"
            values={{ n: humanizedMission.requiredCount }}
          />
        );
      }
      case "SAMPLING": {
        return (
          <FormattedMessage
            id="quest_rule_guide_target_figure_sampling_period"
            values={{
              n: humanizedMission.requiredCount,
              m: humanizedMission.samplingMaximum,
              sampling_period: intl.formatMessage({
                id: `quest_sampling_period_${humanizedMission.sampling?.toLowerCase()}`,
              }),
            }}
          />
        );
      }
      case "CONSECUTIVE": {
        return (
          <FormattedMessage
            id="quest_rule_guide_target_figure_consecutive"
            values={{
              n: humanizedMission.requiredCount,
              m: humanizedMission.samplingMaximum,
              sampling_period: intl.formatMessage({
                id: `quest_sampling_period_${humanizedMission.sampling?.toLowerCase()}`,
              }),
            }}
          />
        );
      }
    }
  }, [humanizedMission, intl]);

  return <CaptionBody>{element}</CaptionBody>;
});

interface IProps {
  humanizedMissions: Moim.DQuest.IHumanizedMission[];
}

const HumanizedMissionSummary: React.FC<IProps> = ({ humanizedMissions }) => (
  <>
    {humanizedMissions.map((data, index) => (
      <MissionSummary
        key={`humanized_mission_${index}`}
        humanizedMission={data}
      />
    ))}
  </>
);

export default React.memo(HumanizedMissionSummary);
