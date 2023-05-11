import * as React from "react";
import { MemberItem } from "common/components/itemCell";
import { NativeEmojiSafeText } from "common/components/designSystem/texts";
import WithPositionChip from "common/components/withPositionChip";
import ShavedText from "common/components/shavedText";

import { MemberItemWrapper } from "../styled";

interface IProps {
  member: Moim.User.IUser;
  isSelected: boolean;
  isMultipleSelect: boolean;
  subTitle: React.ReactNode;
  hasPositionChip: boolean;
  hover?: boolean;
  onClick: (userId: Moim.Id) => void;
}

function SelectableMemberItem(props: IProps) {
  const {
    member,
    hover,
    isSelected,
    isMultipleSelect,
    hasPositionChip,
    subTitle,
    onClick,
  } = props;

  const image = React.useMemo(
    () => ({
      userId: member.id,
      src: member.avatar_url || "",
    }),
    [member.id, member.avatar_url],
  );

  const button = React.useMemo(() => {
    const commonButtonSet = {
      name: "userSelectInput",
      value: member.id,
      checked: isSelected,
    };

    return isMultipleSelect
      ? {
          type: "checkbox" as const,
          ...commonButtonSet,
        }
      : {
          type: "radio" as const,
          ...commonButtonSet,
        };
  }, [member.id, isMultipleSelect, isSelected]);

  const handleClickUserItem = React.useCallback(() => {
    onClick(member.id);
  }, [onClick, member]);

  return (
    <MemberItemWrapper onClick={handleClickUserItem}>
      <MemberItem
        hover={hover}
        key={member.id}
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
        disableTitleShave={true}
        subTitle={subTitle}
        subTitleShaveLine={1}
        image={image}
        button={button}
      />
    </MemberItemWrapper>
  );
}

export default SelectableMemberItem;
