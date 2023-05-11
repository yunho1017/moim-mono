import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { useStoreState, useActions } from "app/store";
import useIsMobile from "common/hooks/useIsMobile";
import useRedirect from "common/hooks/useRedirect";
import { selectCampaignProject } from "app/selectors/campaign";
import { positionMemberSelector } from "app/selectors/position";
import { fetchCampaign as fetchCampaignAction } from "app/actions/campaign";
import ParticipantsComponent from "../../components/participants";
import { getPositionMembers } from "app/actions/position";
import AppBar from "common/components/appBar";
import { TopNaviPortalContainer } from "app/modules/layout/components/controller/topNaviPortal";
import { MoimURL } from "common/helpers/url";
import {
  CloseButtonWrapper,
  BackButton,
} from "common/components/basicResponsiveDialog/styled";

const ParticipantsContainer: React.FC<RouteComponentProps<
  Moim.IMatchParams
>> = ({ match, location }) => {
  const { campaignId } = match.params;
  const [isLoading, setLoadStatus] = React.useState(false);
  const [isFetched, setFetchStatus] = React.useState(false);
  const isMobile = useIsMobile();
  const redirect = useRedirect();
  const [memberLoadStatus, setMemberLoadStatus] = React.useState<
    Record<Moim.Campaign.ExecutivePositionKey, boolean>
  >({
    host: false,
    donor: false,
    executor: false,
    decisionMaker: false,
  });
  const { campaignData, memberCount, positionMembers } = useStoreState(
    state => {
      const campaign = campaignId
        ? selectCampaignProject(state, campaignId)
        : undefined;
      const executivePositionMembers: Record<
        Moim.Campaign.ExecutivePositionKey,
        Moim.IPaginatedListResponse<Moim.User.IUser>
      > = {
        host: { data: [], paging: {} },
        donor: { data: [], paging: {} },
        executor: { data: [], paging: {} },
        decisionMaker: { data: [], paging: {} },
      };
      let count = 0;

      if (campaign && campaign.positions) {
        Object.entries(campaign.positions).forEach(
          ([key, position]: [Moim.Campaign.ExecutivePositionKey, any]) => {
            if (position.moimPosition) {
              const members = positionMemberSelector(state, position.moim);
              if (members && members.data.length > 0) {
                executivePositionMembers[key] = members;
                count += members.data.length;
              }
            }
          },
        );
      }

      return {
        campaignData: campaign,
        memberCount: count,
        positionMembers: executivePositionMembers,
      };
    },
  );

  const { fetchCampaign, fetchPositionMembers } = useActions({
    fetchCampaign: fetchCampaignAction,
    fetchPositionMembers: getPositionMembers,
  });

  const handleLoadMore = React.useCallback(
    (
      key: Moim.Campaign.ExecutivePositionKey,
      positionId: Moim.Id,
      paging: Moim.IPaging,
    ) => {
      if (!memberLoadStatus[key]) {
        setMemberLoadStatus(tmpState => ({ ...tmpState, [key]: true }));
        fetchPositionMembers({
          positionId,
          ...paging,
        }).finally(() => {
          setMemberLoadStatus(tmpState => ({ ...tmpState, [key]: false }));
        });
      }
    },
    [fetchPositionMembers, memberLoadStatus],
  );

  const handleBackClick = React.useCallback(() => {
    const from = (location.state as any).from;
    if (from && from === "blockit-summary") {
      history.back();
    } else {
      redirect(new MoimURL.MoimAppHome().toString());
    }
  }, [redirect, location.state]);

  React.useEffect(() => {
    if (!isLoading && !isFetched && campaignId) {
      setLoadStatus(true);
      fetchCampaign(campaignId)
        .then(res => {
          if (res && res.positions) {
            setMemberLoadStatus({
              host: true,
              donor: true,
              executor: true,
              decisionMaker: true,
            });
            Promise.all(
              Object.entries(res.positions).map(async ([, value]) =>
                fetchPositionMembers({ positionId: value.moim }),
              ),
            ).finally(() => {
              setMemberLoadStatus({
                host: false,
                donor: false,
                executor: false,
                decisionMaker: false,
              });
              setLoadStatus(false);
              setFetchStatus(true);
            });
          } else {
            setLoadStatus(false);
            setFetchStatus(true);
          }
        })
        .catch(() => {
          setLoadStatus(false);
          setFetchStatus(true);
        });
    }
  }, [
    campaignData,
    campaignId,
    fetchCampaign,
    fetchPositionMembers,
    isFetched,
    isLoading,
  ]);

  if (!campaignData || !campaignData.positions) {
    if (isLoading) {
      return <div>Loading</div>;
    }
    if (isFetched) {
      return <div>잘못된 접근입니다.</div>;
    }
  }

  return (
    <>
      {isMobile && (
        <TopNaviPortalContainer>
          <AppBar
            titleElement=""
            titleAlignment="Center"
            leftButton={
              <CloseButtonWrapper>
                <BackButton onClick={handleBackClick} />
              </CloseButtonWrapper>
            }
          />
        </TopNaviPortalContainer>
      )}
      <ParticipantsComponent
        isLoading={isLoading}
        totalMembers={memberCount}
        memberLoading={memberLoadStatus}
        positionMembers={positionMembers}
        campaignPositions={campaignData!.positions!}
        onLoadMore={handleLoadMore}
      />
    </>
  );
};

export default ParticipantsContainer;
