import * as React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { FlattenInterpolation } from "styled-components";
import { ActionCreators as CampaignActionCreators } from "app/actions/campaign";
import { MoimURL } from "common/helpers/url";
import { useStoreState, useActions } from "app/store";
import useIsMobile from "app/common/hooks/useIsMobile";
import useCurrentGroup from "common/hooks/useCurrentGroup";
import useCurrentUser from "common/hooks/useCurrentUser";
import useRedirect from "common/hooks/useRedirect";
import useOpenState from "app/common/hooks/useOpenState";
import { getSellerSelector } from "app/selectors/commerce";
import { selectCampaignProject } from "app/selectors/campaign";
import PositionChip from "common/components/chips/preset/positionChip";
import RequestFundItem from "../requestFundItem";
import AlertDialog from "common/components/alertDialog";
import {
  PlacementRootContainer,
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
  MoreIcon,
  AddIcon,
  EmptyWrapper,
  MoreIconContainer,
  SmallAddIcon,
  CreateButton,
  SmallAddIconWrap,
} from "./styled";
import useCurrentUserPositionCheck from "common/hooks/useCurrentUserPositionCheck";
import { NativeEmojiSafeText } from "common/components/designSystem/texts";
import { Spacer } from "common/components/designSystem/spacer";

interface IProps
  extends Omit<Moim.Blockit.Campaign.ICampaignRequestFundPreviewBlock, "type"> {
  wrapperStyle?: FlattenInterpolation<any>;
}

const RequestFundPreview: React.FC<IProps> = ({
  sectionWidth,
  contentWidth,
  wrapperStyle,
  margin,
  title,
  campaignId,
  columnCount,
  columnCount_web,
  rowCount,
  rowCount_web,
  itemGutterSize,
  itemGutterSize_web,
}) => {
  const intl = useIntl();
  const isMobile = useIsMobile();
  const currentGroup = useCurrentGroup();
  const currentUser = useCurrentUser();
  const redirect = useRedirect();
  const { campaignData, hubSeller } = useStoreState(state => ({
    campaignData: selectCampaignProject(state, campaignId),
    hubSeller: getSellerSelector(state, currentGroup?.seller_id ?? ""),
  }));
  const { openExecutionCreateDialog, clearExecutionEntities } = useActions({
    openExecutionCreateDialog: CampaignActionCreators.openExecutionCreateDialog,
    clearExecutionEntities: CampaignActionCreators.clearExecutionEntity,
  });

  const positionCheck = useCurrentUserPositionCheck();

  const {
    isOpen: createPermissionAlertOpenStatus,
    open: openCreatePermissionAlert,
    close: closeCreatePermissionAlert,
  } = useOpenState();

  const createPermissionAlertButtons = React.useMemo(
    () => [
      {
        text: intl.formatMessage({ id: "button_ok" }),
        onClick: closeCreatePermissionAlert,
      },
    ],
    [closeCreatePermissionAlert, intl],
  );

  const handleClickCreateRequest = React.useCallback(() => {
    if (
      campaignId &&
      campaignData &&
      campaignData.positions &&
      campaignData.positions.executor &&
      positionCheck([campaignData.positions.executor.moim])
    ) {
      openExecutionCreateDialog({
        campaignId,
      });
    } else {
      openCreatePermissionAlert();
    }
  }, [
    campaignData,
    campaignId,
    openCreatePermissionAlert,
    openExecutionCreateDialog,
    positionCheck,
  ]);

  const colSize = React.useMemo(
    () => (isMobile ? columnCount ?? 1 : columnCount_web ?? 4),
    [columnCount, columnCount_web, isMobile],
  );
  const rowSize = React.useMemo(
    () => (isMobile ? rowCount : rowCount_web) ?? undefined,
    [isMobile, rowCount, rowCount_web],
  );
  const gapSize = React.useMemo(
    () => (isMobile ? itemGutterSize : itemGutterSize_web) ?? 12,
    [isMobile, itemGutterSize, itemGutterSize_web],
  );

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
        <GridLayout rowCount={rowSize} columnCount={colSize} gapSize={gapSize}>
          {campaignData.executions
            .slice(0, isMobile ? 4 : colSize * (rowSize ?? 1))
            .map(exec =>
              exec ? (
                <RequestFundItem
                  key={`execution_${exec.id}`}
                  currency={hubSeller?.currency ?? "KRW"}
                  {...exec}
                />
              ) : null,
            )}
        </GridLayout>
      );
    }
    return (
      <EmptyWrapper>
        <FormattedMessage id="funding_proposal_list_empty" />
        <Spacer value={16} />
        <CreateButton size="s" onClick={handleClickCreateRequest}>
          <SmallAddIconWrap>
            <SmallAddIcon />
          </SmallAddIconWrap>
          {intl.formatMessage({
            id: "button_apply_funding",
          })}
        </CreateButton>
      </EmptyWrapper>
    );
  }, [
    campaignData,
    colSize,
    gapSize,
    handleClickCreateRequest,
    hubSeller,
    intl,
    isMobile,
    rowSize,
  ]);

  const handleClickTitle = React.useCallback(() => {
    redirect(
      new MoimURL.CampaignExecutions({
        campaignId,
      }).toString(),
    );
  }, [campaignId, redirect]);

  const handleMoreClick = React.useCallback(() => {
    clearExecutionEntities();
  }, [clearExecutionEntities]);

  return (
    <>
      <PlacementRootContainer>
        <PlacementWrapper contentWidth={contentWidth}>
          <Wrapper
            sectionWidth={sectionWidth}
            overrideStyle={wrapperStyle}
            margin={margin}
          >
            <Inner>
              <Header>
                <Title role="button" onClick={handleClickTitle}>
                  <NativeEmojiSafeText
                    value={title ?? campaignData?.title ?? ""}
                  />
                </Title>
                <TitleSideContainer>
                  {!currentUser ? null : isMobile ? (
                    <AddIcon role="button" onClick={handleClickCreateRequest} />
                  ) : (
                    <CreateButton size="s" onClick={handleClickCreateRequest}>
                      <SmallAddIconWrap>
                        <SmallAddIcon />
                      </SmallAddIconWrap>
                      {intl.formatMessage({
                        id: "button_apply_funding",
                      })}
                    </CreateButton>
                  )}
                  <MoreIconContainer
                    to={new MoimURL.CampaignExecutions({
                      campaignId,
                    }).toString()}
                    onClick={handleMoreClick}
                  >
                    <MoreIcon role="button" />
                  </MoreIconContainer>
                </TitleSideContainer>
              </Header>

              {positionRoleElem}

              {requestElems}
            </Inner>
          </Wrapper>
        </PlacementWrapper>
      </PlacementRootContainer>
      <AlertDialog
        open={createPermissionAlertOpenStatus}
        content={<FormattedMessage id="dialog_apply_funding_no_rights_body" />}
        rightButtons={createPermissionAlertButtons}
        onClose={closeCreatePermissionAlert}
      />
    </>
  );
};

export default RequestFundPreview;
