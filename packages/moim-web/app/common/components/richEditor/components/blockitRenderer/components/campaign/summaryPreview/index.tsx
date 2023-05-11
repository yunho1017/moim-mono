import * as React from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import { FormattedMessage, FormattedNumber, useIntl } from "react-intl";
import { FlattenInterpolation } from "styled-components";
import moment from "moment";
import CurrencyFormatter from "common/components/currencyFormatter";
import { MoimURL } from "common/helpers/url";
import { useStoreState, useActions } from "app/store";
import useRedirect from "common/hooks/useRedirect";
import useCurrentGroup from "common/hooks/useCurrentGroup";
import { selectCampaignProject } from "app/selectors/campaign";
import { fetchCampaign as fetchCampaignAction } from "app/actions/campaign/index";
import DDayComponent from "common/components/period";
import { DDayType, calculateDDay } from "common/components/period/helper";
import PositionChip from "common/components/chips/preset/positionChip";
import { getSellerSelector } from "app/selectors/commerce";

import {
  PlacementRootContainer,
  PlacementWrapper,
  Wrapper,
  Box,
  BoxSkeleton,
  BoxHeader,
  HeaderTitle,
  HeaderMore,
  PositionChipWrapper,
  PositionWrapper,
  Inner,
  InnerTitle,
  InnerTitleDescription,
  MoreIcon,
  BudgetWrapper,
  BudgetInfo,
  CircularBarWrapper,
  TokenCount,
  chipStyle,
} from "./styled";

type IProps = Omit<
  Moim.Blockit.Campaign.ICampaignSummaryPreviewBlock,
  "type"
> & {
  wrapperStyle?: FlattenInterpolation<any>;
};

const SummaryPreview: React.FC<IProps> = ({
  sectionWidth,
  contentWidth,
  wrapperStyle,
  campaignId,
  margin,
}) => {
  const intl = useIntl();
  const [isLoading, setLoadStatus] = React.useState(false);
  const [dDayDate, setDDayDate] = React.useState<DDayType | null>(null);
  const [startDateString, setStartDateString] = React.useState<null | string>(
    null,
  );
  const [endDateString, setEndDateString] = React.useState<null | string>(null);
  const [raisedAmount, setRaisedAmount] = React.useState(0);
  const [usedAmount, setUsedAmount] = React.useState(0);
  const currentGroup = useCurrentGroup();
  const redirect = useRedirect();

  const { campaignData, hubSeller } = useStoreState(state => ({
    campaignData: selectCampaignProject(state, campaignId),
    hubSeller: getSellerSelector(state, currentGroup?.seller_id ?? ""),
  }));

  const { fetchCampaign } = useActions({
    fetchCampaign: fetchCampaignAction,
  });

  const handleClickParty = React.useCallback(() => {
    redirect(new MoimURL.CampaignParticipants({ campaignId }).toString(), {
      from: "blockit-summary",
    });
  }, [campaignId, redirect]);

  const handleClickWallet = React.useCallback(() => {
    redirect(new MoimURL.CampaignWallet({ campaignId }).toString());
  }, [campaignId, redirect]);

  const remainRate = React.useMemo(
    () =>
      raisedAmount === 0
        ? 0
        : ((raisedAmount - usedAmount) / raisedAmount) * 100,
    [raisedAmount, usedAmount],
  );

  const positions = React.useMemo(() => {
    const elem: React.ReactNode[] = [];
    if (campaignData && campaignData.positions) {
      if (campaignData.positions.host?.moimPosition) {
        const { id, color, name } = campaignData.positions.host.moimPosition;
        elem.push(
          <PositionChipWrapper>
            <PositionChip
              size="large"
              id={id}
              color={color}
              name={name}
              overrideStyle={chipStyle}
            />
          </PositionChipWrapper>,
        );
      }

      if (campaignData.positions.executor?.moimPosition) {
        const {
          id,
          color,
          name,
        } = campaignData.positions.executor.moimPosition;
        elem.push(
          <PositionChipWrapper>
            <PositionChip
              size="large"
              id={id}
              color={color}
              name={name}
              overrideStyle={chipStyle}
            />
          </PositionChipWrapper>,
        );
      }
      if (campaignData.positions.donor?.moimPosition) {
        const { id, color, name } = campaignData.positions.donor.moimPosition;
        elem.push(
          <PositionChipWrapper>
            <PositionChip
              size="large"
              id={id}
              color={color}
              name={name}
              overrideStyle={chipStyle}
            />
          </PositionChipWrapper>,
        );
      }

      if (campaignData.positions.decisionMaker?.moimPosition) {
        const {
          id,
          color,
          name,
        } = campaignData.positions.decisionMaker.moimPosition;
        elem.push(
          <PositionChipWrapper>
            <PositionChip
              size="large"
              id={id}
              color={color}
              name={name}
              overrideStyle={chipStyle}
            />
          </PositionChipWrapper>,
        );
      }

      return <PositionWrapper>{elem}</PositionWrapper>;
    }
    return null;
  }, [campaignData]);

  const scheduleElem = React.useMemo(() => {
    if (!campaignData) return "-";
    const isBeforeStart = campaignData.startAt - Date.now() > 0;
    const isAfterEnd = campaignData.endAt - Date.now() < 0;
    if (isAfterEnd) {
      return <FormattedMessage id="status_project_manager_finished" />;
    } else if (isBeforeStart) {
      return <FormattedMessage id="status_project_manager_scheduled" />;
    } else {
      return <DDayComponent dDay={dDayDate} />;
    }
  }, [campaignData, dDayDate]);

  React.useEffect(() => {
    if (campaignData) {
      const { startAt, endAt } = campaignData;
      setDDayDate(
        calculateDDay({
          startTime: startAt,
          endTime: endAt,
        }),
      );
      setStartDateString(
        moment(startAt).format(
          intl.formatMessage({ id: "datetime_format_full_time_date" }),
        ),
      );
      setEndDateString(
        moment(endAt).format(
          intl.formatMessage({ id: "datetime_format_full_time_date" }),
        ),
      );

      setRaisedAmount(campaignData.raisedAmount ?? 0);
      setUsedAmount(campaignData.usedAmount ?? 0);
    }
  }, [campaignData, intl]);

  React.useEffect(() => {
    if (!campaignData && !isLoading) {
      setLoadStatus(true);
      fetchCampaign(campaignId).then(() => {
        setLoadStatus(false);
      });
    }
  }, [campaignData, campaignId, fetchCampaign, isLoading]);

  if (isLoading) {
    return (
      <PlacementRootContainer>
        <PlacementWrapper contentWidth={contentWidth}>
          <Wrapper
            sectionWidth={sectionWidth}
            overrideStyle={wrapperStyle}
            margin={margin}
          >
            <BoxSkeleton />
            <BoxSkeleton />
            <BoxSkeleton />
          </Wrapper>
        </PlacementWrapper>
      </PlacementRootContainer>
    );
  }

  return (
    <PlacementRootContainer>
      <PlacementWrapper contentWidth={contentWidth}>
        <Wrapper
          sectionWidth={sectionWidth}
          overrideStyle={wrapperStyle}
          margin={margin}
        >
          <Box>
            <BoxHeader>
              <HeaderTitle>
                <FormattedMessage id="project_manager_dashboard_schedule_title" />
              </HeaderTitle>
            </BoxHeader>
            <Inner>
              <InnerTitle>{scheduleElem}</InnerTitle>
              <InnerTitleDescription>
                {startDateString} ~ {endDateString}
              </InnerTitleDescription>
            </Inner>
          </Box>

          <Box role="button" onClick={handleClickParty}>
            <BoxHeader>
              <HeaderTitle>
                <FormattedMessage id="project_manager_dashboard_participants_title" />
              </HeaderTitle>
              <HeaderMore>
                <MoreIcon />
              </HeaderMore>
            </BoxHeader>
            <Inner>{positions}</Inner>
          </Box>

          <Box role="button" onClick={handleClickWallet}>
            <BoxHeader>
              <HeaderTitle>
                <FormattedMessage id="project_manager_dashboard_community_wallet_title" />
              </HeaderTitle>
              <HeaderMore>
                <MoreIcon />
              </HeaderMore>
            </BoxHeader>
            <Inner>
              <BudgetWrapper>
                <BudgetInfo>
                  <InnerTitleDescription>
                    <FormattedMessage id="project_manager_dashboard_community_wallet_current_balance_title" />
                  </InnerTitleDescription>
                  <InnerTitle>
                    <CurrencyFormatter
                      currency={hubSeller?.currency ?? "KRW"}
                      value={raisedAmount - usedAmount}
                    />
                  </InnerTitle>
                  <TokenCount>
                    <FormattedNumber
                      useGrouping={true}
                      value={
                        (raisedAmount - usedAmount) /
                        (campaignData?.token.price ?? 1)
                      }
                    />{" "}
                    {campaignData?.token.symbol}
                  </TokenCount>
                </BudgetInfo>
                <CircularBarWrapper>
                  <CircularProgressbarWithChildren
                    value={remainRate}
                    counterClockwise={false}
                    strokeWidth={6}
                    styles={buildStyles({
                      strokeLinecap: "butt",
                    })}
                  >
                    <span className="legendTitle">
                      {Math.round(remainRate)}%
                    </span>
                    <span className="legendDesc">
                      <FormattedMessage id="project_manager_dashboard_community_wallet_current_balance_percent" />
                    </span>
                  </CircularProgressbarWithChildren>
                </CircularBarWrapper>
              </BudgetWrapper>
            </Inner>
          </Box>
        </Wrapper>
      </PlacementWrapper>
    </PlacementRootContainer>
  );
};

export default SummaryPreview;
