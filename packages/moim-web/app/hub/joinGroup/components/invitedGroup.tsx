import * as React from "react";

import { Section, Title, Description } from "./styled";
import {
  GroupItem,
  Divider,
  RenderRightElement,
} from "common/components/itemCell";

export interface IMockInvitedGroupItem {
  name: string;
  icon: Moim.IIcon;
  joined: boolean;
}

interface IProps {
  invitedGroups: readonly IMockInvitedGroupItem[];
}

export default function InvitedGroup({
  invitedGroups: joinableGroups,
}: IProps) {
  return (
    <Section>
      <Divider />
      <Title>Invited Groups</Title>
      {joinableGroups.map(group => (
        <Row {...group} />
      ))}
      <Description>You can join groups you've been invited</Description>
    </Section>
  );
}

interface IRowProps {
  name: string;
  icon: Moim.IIcon;
  joined: boolean;
}

function Row({ name, icon, joined }: IRowProps) {
  const handleJoin = () => {
    // todo: fill function
  };

  return (
    <GroupItem
      title={name}
      rightElement={
        <RenderRightElement
          type="button"
          onClick={handleJoin}
          text={joined ? "Joined" : "Join"}
          checked={joined}
        />
      }
      image={{
        icon,
        title: name,
      }}
    />
  );
}
