import * as React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import useIsMobile from "common/hooks/useIsMobile";
import PositionChip from "common/components/chips/preset/positionChip";
import RequestFundItem from "common/components/blockitEditorBase/components/blockitRenderer/components/campaign/requestFundItem";
import LoadingIconBase from "common/components/loading/icon";
import { Spacer } from "common/components/designSystem/spacer";
import {
  PlacementWrapper,
  Wrapper,
  Inner,
  Header,
  GridLayout,
  Title,
  TitleSideContainer,
  PositionContainer,
  PositionAndTitleWrapper,
  PositionRoleTitle,
  PositionWrap,
  CreateButton,
  EmptyWrapper,
  SmallAddIcon,
  SmallAddIconWrap,
} from "./styled";

interface IProps {
  isLoading: boolean;
  currency: string;
  disableCreateButton: boolean;
  campaignData?: Moim.Campaign.IDenormalizedCampaign;
  onClickExecutionCreateButton(): void;
}

const ExecutionListComponent: React.FC<IProps> = ({
  isLoading,
  currency,
  disableCreateButton,
  campaignData,
  onClickExecutionCreateButton,
}) => {
  const intl = useIntl();
  const isMobile = useIsMobile();

  const campaignExecutivePositionName = React.useCallback(
    (key: Moim.Campaign.ExecutivePositionKey) => {
      switch (key) {
        default:
        case "decisionMaker":
          return <FormattedMessage id="funding_proposal_list_decision_maker" />;
        case "executor":
          return <FormattedMessage id="funding_proposal_list_requester" />;
      }
    },
    [],
  );

  const positionRoleElem = React.useMemo(() => {
    if (campaignData && campaignData.positions) {
      const tmpPositions = {
        decisionMaker: [
          campaignData.positions.donor,
          campaignData.positions.decisionMaker,
        ],
        executor: [campaignData.positions.executor],
      };
      return (
        <PositionContainer>
          {Object.entries(tmpPositions).map(
            ([key, positions]: [
              Moim.Campaign.ExecutivePositionKey,
              Moim.Campaign.IDenormalizedCampaignPosition[],
            ]) => (
              <PositionAndTitleWrapper>
                <PositionRoleTitle>
                  {campaignExecutivePositionName(key)}
                </PositionRoleTitle>
                {positions.map(position => {
                  const p = position?.moimPosition;
                  if (!p) return null;
                  return (
                    <PositionWrap key={`${key}_${p.id}`}>
                      <PositionChip
                        size="small"
                        id={p.id}
                        color={p.color}
                        name={p.name}
                      />
                    </PositionWrap>
                  );
                })}
              </PositionAndTitleWrapper>
            ),
          )}
        </PositionContainer>
      );
    }

    return null;
  }, [campaignData, campaignExecutivePositionName]);

  const requestElems = React.useMemo(() => {
    if (
      campaignData &&
      campaignData.executions &&
      campaignData.executions.length
    ) {
      return (
        <GridLayout columnCount={isMobile ? 1 : 4}>
          {campaignData.executions.map(exec =>
            exec ? (
              <RequestFundItem
                key={`execution_${exec.id}`}
                currency={currency}
                {...exec}
              />
            ) : null,
          )}
        </GridLayout>
      );
    }
    return (
      <EmptyWrapper>
        <Spacer value={32} />
        <FormattedMessage id="funding_proposal_list_empty" />
        <Spacer value={32} />
      </EmptyWrapper>
    );
  }, [campaignData, isMobile, currency]);

  return (
    <PlacementWrapper>
      <Wrapper>
        <Inner>
          <Header>
            <Title>{campaignData?.title}</Title>
            <TitleSideContainer>
              {disableCreateButton ? null : (
                <CreateButton size="s" onClick={onClickExecutionCreateButton}>
                  <SmallAddIconWrap>
                    <SmallAddIcon />
                  </SmallAddIconWrap>
                  {intl.formatMessage({
                    id: "button_apply_funding",
                  })}
                </CreateButton>
              )}
            </TitleSideContainer>
          </Header>

          {positionRoleElem}

          {isLoading ? <LoadingIconBase /> : requestElems}
        </Inner>
      </Wrapper>
    </PlacementWrapper>
  );
};

export default ExecutionListComponent;
