import * as React from "react";
import { MemberItem } from "common/components/itemCell";
import { FormattedMessage } from "react-intl";
import getPhoneNumberWithCountryCode from "common/helpers/getPhoneNumberWithCountryCode";
import { Spacer } from "common/components/designSystem/spacer";
import WithPositionChip from "common/components/withPositionChip";
import { NativeEmojiSafeText } from "common/components/designSystem/texts";
import ShavedText from "common/components/shavedText";
import InfiniteScroller from "common/components/infiniteScroller/new";
import { DefaultLoader as Loader } from "common/components/loading";
import useIsMobile from "common/hooks/useIsMobile";
import {
  Wrapper,
  TitleContainer,
  Title,
  Divider,
  Inner,
  PositionTitle,
  SubTitleWrapper,
} from "./styled";

interface IProps {
  isLoading: boolean;
  totalMembers: number;
  memberSubTitleKeys?:
    | ("bio" | "email" | "phoneNumber")[]
    | {
        type: "customRenderer";
        value: (member: Moim.User.IUser) => React.ReactNode;
      };
  memberLoading: Record<Moim.Campaign.ExecutivePositionKey, boolean>;
  positionMembers: Record<
    Moim.Campaign.ExecutivePositionKey,
    Moim.IPaginatedListResponse<Moim.User.IUser>
  >;
  campaignPositions: Moim.Campaign.IDenormalizedCampaignExecutivePosition;
  onLoadMore(
    key: Moim.Campaign.ExecutivePositionKey,
    positionId: Moim.Id,
    paging: Moim.IPaging,
  ): void;
}

const ParticipantsComponent: React.FC<IProps> = ({
  totalMembers,
  memberSubTitleKeys = ["bio"],
  memberLoading,
  positionMembers,
  campaignPositions,
  onLoadMore,
}) => {
  const isMobile = useIsMobile();

  const renderSubTitleElement = React.useCallback(
    (member: Moim.User.IUser) => {
      let el: React.ReactNode = null;

      if (Array.isArray(memberSubTitleKeys)) {
        el = memberSubTitleKeys.map(key => {
          const value =
            key === "phoneNumber"
              ? getPhoneNumberWithCountryCode(member.phoneNumber)
              : member[key];

          return value && <NativeEmojiSafeText value={value} />;
        });
      } else if (typeof memberSubTitleKeys === "object") {
        if (memberSubTitleKeys.type === "customRenderer") {
          el = memberSubTitleKeys.value(member);
        }
      }

      return (
        <SubTitleWrapper>
          <ShavedText line={1} value={el} />
        </SubTitleWrapper>
      );
    },
    [memberSubTitleKeys],
  );

  const renderElem = React.useCallback(
    (key: Moim.Campaign.ExecutivePositionKey) => {
      const position = campaignPositions[key];
      if (!position || !position.moimPosition) {
        return null;
      }

      return (
        <>
          <Divider />
          <PositionTitle>
            {position!.moimPosition.name ?? ""} (
            {positionMembers[key].data.length})
          </PositionTitle>
          <InfiniteScroller
            key={`${key}_list`}
            isLoading={memberLoading[key]}
            itemLength={positionMembers[key].data.length}
            paging={positionMembers[key].paging}
            loader={
              <>
                <Loader />
                <Spacer value={8} />
              </>
            }
            loadMore={() => {
              onLoadMore(key, position.moim, positionMembers[key].paging);
            }}
          >
            {positionMembers[key]?.data.map(member => (
              <MemberItem
                key={`${key}_${member.id}`}
                title={
                  <WithPositionChip
                    positions={member.positions}
                    displayChipLimit={2}
                    hasPositionChip={true}
                  >
                    <ShavedText
                      value={<NativeEmojiSafeText value={member.name} />}
                      line={1}
                    />
                  </WithPositionChip>
                }
                subTitle={renderSubTitleElement(member)}
                disableTitleShave={true}
                subTitleShaveLine={1}
                image={{
                  userId: member.id,
                  src: member.avatar_url || "",
                }}
                canOpenProfileDialog={!member.is_deactivated}
              />
            ))}
          </InfiniteScroller>
        </>
      );
    },
    [
      campaignPositions,
      memberLoading,
      onLoadMore,
      positionMembers,
      renderSubTitleElement,
    ],
  );

  return (
    <Wrapper>
      <Spacer value={isMobile ? 20 : 40} />
      <TitleContainer>
        <Title>
          <FormattedMessage
            id="project_manager_participants_show_title"
            values={{ formattedCount: totalMembers }}
          />
        </Title>
      </TitleContainer>

      <Inner>
        {renderElem("host")}
        {renderElem("executor")}
        {renderElem("donor")}
        {renderElem("decisionMaker")}
      </Inner>
      <Spacer value={20} />
    </Wrapper>
  );
};

export default ParticipantsComponent;
