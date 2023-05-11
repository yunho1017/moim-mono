import * as React from "react";
import styled from "styled-components";
import { userListDenormalizer } from "app/models";
import { useStoreState } from "app/store";
import UserProfileImage from "common/components/userProfileImage";
import { UserPlaceholder } from "common/components/userProfileImage/styledComponents";
import { px2rem } from "common/helpers/rem";

const Wrapper = styled.div`
  display: inline-flex;
  width: fit-content;
  height: fit-content;

  align-items: center;
  flex-direction: row-reverse;
`;

const AvatarContainer = styled.div`
  width: 100%;
  height: ${px2rem(18)};
  display: inline-block;
  position: relative;
`;

const InnerAvatar = styled.div<{ position: number }>`
  position: absolute;
  transform: ${props =>
    `translate3d(-${px2rem(
      props.position === 0 ? 18 : 14 * (props.position + 1),
    )}, 0, 0)`};
  z-index: ${props => props.position};
`;

interface IProps {
  userIds: Moim.Id[];
  onClick?(): void;
}

const AvatarArray: React.FC<IProps> = ({ userIds, onClick }) => {
  const { users } = useStoreState(state => ({
    users: (
      userListDenormalizer(
        { data: userIds.filter(i => Boolean(i)) },
        state.entities,
      ) ?? { data: [] }
    ).data.filter(i => Boolean(i)),
  }));

  return (
    <Wrapper role="button" onClick={onClick}>
      <AvatarContainer>
        {users
          .slice(0, 5)
          .reverse()
          .map((item, idx) => (
            <InnerAvatar key={item?.id} position={idx}>
              {item?.avatar_url ? (
                <UserProfileImage
                  size="xs"
                  shape="round"
                  src={item?.avatar_url}
                  canOpenProfileDialog={false}
                />
              ) : (
                <UserPlaceholder size="xs" />
              )}
            </InnerAvatar>
          ))}
      </AvatarContainer>
    </Wrapper>
  );
};

export default AvatarArray;
