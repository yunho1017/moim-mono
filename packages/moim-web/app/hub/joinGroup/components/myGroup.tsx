import * as React from "react";
import { FormattedMessage } from "react-intl";
import { MOIM_AUTO_SIGN_IN_KEY } from "common/constants/keys";
import MyMoimManager, {
  generateMyMoim,
  generateMyMoimKey,
} from "common/helpers/useUserMoimManager";

import { Section, Title, Description } from "./styled";
import {
  GroupItem,
  Divider,
  RenderRightElement,
} from "common/components/itemCell";
import ExternalMoimLink from "common/components/externalMoimLink";

interface IProps {
  myGroups: Moim.IPaginatedListResponse<Moim.Group.IGroupWithUser>;
}

export default function MyGroup({ myGroups }: IProps) {
  if (!myGroups.data.length) {
    return null;
  }

  return (
    <Section>
      <Divider />
      <Title>
        <FormattedMessage id="get_started/your_moim_title" />
      </Title>
      {myGroups.data.map(moim => (
        <ExternalMoimLink
          key={moim.group.id}
          domain={moim.group.domain}
          query={`${MOIM_AUTO_SIGN_IN_KEY}=true`}
        >
          <Row group={moim.group} user={moim.user} />
        </ExternalMoimLink>
      ))}
      <Description>
        <FormattedMessage id="get_started/your_moim_guide" />
      </Description>
    </Section>
  );
}

interface IRowProps {
  group: Moim.Group.IGroup;
  user: Moim.User.IUser;
}

function Row({ group, user }: IRowProps) {
  const addedMoim = MyMoimManager.getUserMoim();
  const added = React.useMemo(
    () =>
      Boolean(
        addedMoim.find(
          myMoim => myMoim.id === generateMyMoimKey({ group, user }),
        ),
      ),
    [addedMoim, group, user],
  );

  const [localAdded, setLocalAdded] = React.useState<boolean>(added);

  const handleAddButtonClick: React.MouseEventHandler<HTMLButtonElement> = React.useCallback(
    e => {
      e.preventDefault();
      MyMoimManager.addUserMoim([generateMyMoim({ group, user })]);
      setLocalAdded(true);
    },
    [group, user],
  );

  const isAdded = React.useMemo(() => localAdded || added, [added, localAdded]);

  return (
    <GroupItem
      title={group.name}
      image={{
        icon: group.icon,
        title: group.name,
      }}
      rightElement={
        <RenderRightElement
          type="button"
          text={isAdded ? "Added" : "Add"}
          checked={isAdded}
          onClick={!isAdded ? handleAddButtonClick : undefined}
        />
      }
    />
  );
}
