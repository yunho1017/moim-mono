import * as React from "react";
import { FlattenInterpolation } from "styled-components";
import { FormattedMessage } from "react-intl";
import { DefaultLoader as Loader } from "common/components/loading";
import InfiniteScroller from "common/components/infiniteScroller";
import { MemberItem } from "common/components/itemCell";
import WithPositionChip from "common/components/withPositionChip";
import { NativeEmojiSafeText } from "common/components/designSystem/texts";
import ShavedText from "common/components/shavedText";
import SelectableMemberItem from "./components/selectableMemberItem";
import useGroupTexts from "common/hooks/useGroupTexts";
import {
  Section,
  SectionHeader,
  SectionContents,
  MemberItemWrapper,
  SubTitleWrapper,
} from "./styled";

import getPhoneNumberWithCountryCode from "common/helpers/getPhoneNumberWithCountryCode";

export interface IProps {
  members: Moim.IPaginatedListResponse<Moim.User.IUser>;
  isLoading: boolean;
  totalMembers?: number;
  subTitleKeys?:
    | ("bio" | "email" | "phoneNumber")[]
    | {
        type: "customRenderer";
        value: (member: Moim.User.IUser) => React.ReactNode;
      };
  hasTitle?: boolean;
  hasPositionChip?: boolean;
  subTitleShaveLine?: number;
  hover?: boolean;
  selectedProps?: {
    isMultipleSelect: boolean;
    isSelected(userId: Moim.Id): boolean;
    onSelected(userId: Moim.Id): void;
  };
  memberItemStyle?: FlattenInterpolation<any>;
  emptyStateElement?: React.ReactNode;
  onGetMembers(paging?: Moim.IPaging): void;
}

export default function MemberList({
  hover,
  members,
  totalMembers,
  isLoading,
  selectedProps,
  subTitleKeys = ["bio"],
  subTitleShaveLine,
  memberItemStyle,
  onGetMembers,
  emptyStateElement,
  hasTitle = true,
  hasPositionChip = true,
}: IProps) {
  const memberTexts = useGroupTexts("member");
  const renderSubTitleElement = React.useCallback(
    (member: Moim.User.IUser) => {
      let el: React.ReactNode = null;

      if (Array.isArray(subTitleKeys)) {
        el = subTitleKeys.map(key => {
          const value =
            key === "phoneNumber"
              ? getPhoneNumberWithCountryCode(member.phoneNumber)
              : member[key];

          return value && <NativeEmojiSafeText value={value} />;
        });
      } else if (typeof subTitleKeys === "object") {
        if (subTitleKeys.type === "customRenderer") {
          el = subTitleKeys.value(member);
        }
      }

      return (
        <SubTitleWrapper>
          <ShavedText line={1} value={el} />
        </SubTitleWrapper>
      );
    },
    [subTitleKeys],
  );
  const handleLoadMoreMembers = React.useCallback(() => {
    if (members.paging) {
      onGetMembers(members.paging);
    }
  }, [onGetMembers, members.paging]);
  const memberListElement = React.useMemo(
    () =>
      !isLoading && members.data.length === 0
        ? emptyStateElement
        : members.data.map(member => (
            <MemberItemWrapper
              key={`${member.group_id}_${member.id}`}
              memberItemStyle={memberItemStyle}
            >
              {selectedProps ? (
                <SelectableMemberItem
                  hover={hover}
                  member={member}
                  subTitle={renderSubTitleElement(member)}
                  isSelected={selectedProps.isSelected(member.id)}
                  isMultipleSelect={selectedProps.isMultipleSelect}
                  hasPositionChip={hasPositionChip}
                  onClick={selectedProps?.onSelected}
                />
              ) : (
                <MemberItem
                  hover={hover}
                  title={
                    <WithPositionChip
                      positions={member.positions}
                      hasPositionChip={hasPositionChip}
                    >
                      <ShavedText
                        value={<NativeEmojiSafeText value={member.name} />}
                        line={1}
                      />
                    </WithPositionChip>
                  }
                  subTitle={renderSubTitleElement(member)}
                  disableTitleShave={true}
                  subTitleShaveLine={subTitleShaveLine}
                  image={{
                    userId: member.id,
                    src: member.avatar_url || "",
                    isOnline: member.presence === "ACTIVE",
                  }}
                  canOpenProfileDialog={!member.is_deactivated}
                />
              )}
            </MemberItemWrapper>
          )),

    [
      emptyStateElement,
      hasPositionChip,
      hover,
      isLoading,
      memberItemStyle,
      members.data,
      renderSubTitleElement,
      selectedProps,
      subTitleShaveLine,
    ],
  );
  return (
    <Section>
      {hasTitle && (
        <SectionHeader>
          <FormattedMessage
            id="channel_information_show/member_title"
            values={{
              ref_member: memberTexts?.plural ?? "",
            }}
          />
          {totalMembers && `(${totalMembers})`}
        </SectionHeader>
      )}
      <SectionContents>
        <InfiniteScroller
          loadMore={handleLoadMoreMembers}
          isLoading={isLoading}
          loader={<Loader />}
          paging={members.paging}
          itemLength={members.data.length}
        >
          {memberListElement}
        </InfiniteScroller>
      </SectionContents>
    </Section>
  );
}
