import * as React from "react";
import { FlattenInterpolation } from "styled-components";
import { useProps, useHandlers } from "./useHooks";
// components
import ShavedText from "common/components/shavedText";
import UserProfileImage from "common/components/userProfileImage";
import WithPositionChip from "common/components/withPositionChip";
import { NativeEmojiSafeText } from "common/components/designSystem/texts";
import Texts from "../texts";
import {
  CommonTextsWrapStyle,
  Wrapper,
  Left,
  Body,
  Right,
  Title,
  Description,
} from "./styled";

export interface IProps extends Omit<Moim.Blockit.IProfileBlock, "type"> {
  wrapperStyle?: FlattenInterpolation<any>;
}

const ProfileBlockit: React.FC<IProps> = props => {
  const {
    align,
    userId,
    shortSizeChar,
    size,
    user,
    avatarType,
    title,
    bottomDescription,
    rightTitleDescription,
    rightDescription,
    margin,
    wrapperStyle,
  } = useHandlers(useProps(props));

  const overrideChildWrapperStyle = React.useMemo(
    () =>
      wrapperStyle
        ? [...CommonTextsWrapStyle, ...wrapperStyle]
        : CommonTextsWrapStyle,
    [wrapperStyle],
  );

  const bottomDescriptionElement = React.useMemo(
    () =>
      bottomDescription && Boolean(bottomDescription.content) ? (
        <Description>
          <Texts
            wrapperStyle={overrideChildWrapperStyle}
            color={bottomDescription.color}
            content={bottomDescription.content}
            fontStyle="caption"
          />
        </Description>
      ) : null,
    [bottomDescription, overrideChildWrapperStyle],
  );

  const rightElement = React.useMemo(() => {
    if (!rightDescription && !rightTitleDescription) return null;

    return (
      <Right>
        {rightTitleDescription && (
          <Texts
            {...rightTitleDescription}
            wrapperStyle={CommonTextsWrapStyle}
            fontStyle={rightTitleDescription.subType}
          />
        )}
        {rightDescription && (
          <Texts
            {...rightDescription}
            wrapperStyle={overrideChildWrapperStyle}
            fontStyle={rightDescription.subType}
          />
        )}
      </Right>
    );
  }, [rightTitleDescription, overrideChildWrapperStyle, rightDescription]);

  const username = React.useMemo(() => {
    if (user && user.name) {
      return user.name;
    }
    return title?.content ?? "";
  }, [user, title]);

  return (
    <Wrapper
      overrideStyle={wrapperStyle}
      size={size}
      align={align}
      margin={margin}
    >
      <Left>
        <UserProfileImage
          size={shortSizeChar}
          shape={avatarType}
          src={user?.avatar_url}
          userId={userId}
          canOpenProfileDialog={false}
        />
      </Left>
      <Body>
        <Title>
          <Texts
            wrapperStyle={overrideChildWrapperStyle}
            color={title?.color}
            fontStyle={title?.subType || "body2"}
            content={
              <WithPositionChip
                positions={user?.positions || []}
                hasPositionChip={Boolean(user?.positions)}
                elementAlign={align}
              >
                <ShavedText
                  line={1}
                  value={<NativeEmojiSafeText value={username} />}
                />
              </WithPositionChip>
            }
          />
        </Title>
        {bottomDescriptionElement}
      </Body>
      {rightElement}
    </Wrapper>
  );
};

export default ProfileBlockit;
