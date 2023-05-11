import * as React from "react";
import {
  InnerWrapper,
  PositionChipWrapper,
  User,
  UserImage,
  UserName,
  Wrapper,
} from "./styled";
import PositionChip from "common/components/chips/preset/positionChip";

interface IProps {
  positionName?: string;
  positionColor?: string;
  userName?: string;
  userProfileImage?: string;
}

function PositionPreview(props: IProps) {
  const { userProfileImage, userName, positionName, positionColor } = props;

  return (
    <Wrapper>
      <InnerWrapper>
        <User>
          <UserImage src={userProfileImage || ""} size="m" />
          <UserName>{userName}</UserName>
          {positionName && positionColor && (
            <PositionChipWrapper>
              <PositionChip
                id={positionName}
                name={positionName}
                color={positionColor}
                size="small"
              />
            </PositionChipWrapper>
          )}
        </User>
      </InnerWrapper>
    </Wrapper>
  );
}

export default PositionPreview;
