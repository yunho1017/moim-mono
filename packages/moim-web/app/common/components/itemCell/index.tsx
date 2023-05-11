// vendor
import * as React from "react";
// component
import { Switch, Radio, Checkbox } from "common/components/designSystem/inputs";
import GroupProfileImage from "common/components/groupProfileImage";
import Left from "./components/left";
import {
  Wrapper,
  Contents,
  RightWrapper,
  Title,
  SubTitle,
  ContentWrapper,
  Divider,
  CheckedButton,
  UnCheckedButton,
} from "./styled";
import ShavedText from "common/components/shavedText";
// icons
import ForumIcon from "@icon/24-forum-g.svg";
import TalkIcon from "@icon/24-talk-g.svg";
// type
import {
  IBaseItemCellProps,
  ILabelWithInputProps,
  IGroupItemProps,
  IMemberItemProps,
  IRightSectionProps,
  IChannelItemProps,
  sizeMap,
} from "./type";
import { ILeftProps } from "./components/left/type";
import { MarginSize } from "app/enums";
import UserProfileImage from "common/components/userProfileImage";
import { useOpenProfileDialog } from "common/hooks/profileDialog";

export { Divider };

export function BaseItemCell({
  title,
  subTitle,
  subTitleShaveLine,
  disabled,
  size = "m",
  leftElement,
  rightElement,
  disableTitleShave,
  disableRightPadding,
  hover,
  selected,
  onClick,
}: IBaseItemCellProps) {
  const subTitleElement = React.useMemo(
    () =>
      subTitle && (
        <SubTitle disabled={disabled}>
          {subTitleShaveLine ? (
            <ShavedText value={subTitle} line={subTitleShaveLine} />
          ) : (
            subTitle
          )}
        </SubTitle>
      ),
    [disabled, subTitle, subTitleShaveLine],
  );

  const titleElement = React.useMemo(() => {
    if (disableTitleShave) {
      return <Title disabled={disabled}>{title}</Title>;
    }

    return (
      <Title disabled={disabled}>
        <ShavedText value={title} line={2} />
      </Title>
    );
  }, [disabled, disableTitleShave, title]);
  return (
    <Wrapper
      size={size}
      hover={hover}
      selected={selected}
      onClick={onClick}
      disableRightPadding={disableRightPadding}
    >
      {leftElement && (
        <Left {...leftElement.props} touchArea={sizeMap[size]?.touchArea!}>
          {leftElement.element}
        </Left>
      )}
      <ContentWrapper>
        <Contents>
          {titleElement}
          {subTitleElement}
        </Contents>
      </ContentWrapper>
      {rightElement && <RightWrapper>{rightElement}</RightWrapper>}
    </Wrapper>
  );
}

export function Label({ title }: { title: React.ReactNode }) {
  return <BaseItemCell title={title} />;
}

export function LabelWithSwitch({
  title,
  subTitle,
  size,
  ...rest
}: ILabelWithInputProps) {
  return (
    <BaseItemCell
      title={title}
      subTitle={subTitle}
      size={size}
      rightElement={<Switch {...rest} />}
    />
  );
}

export function LabelWithRadio({
  title,
  subTitle,
  size,
  ...rest
}: ILabelWithInputProps) {
  return (
    <BaseItemCell
      title={title}
      subTitle={subTitle}
      size={size}
      rightElement={<Radio {...rest} />}
    />
  );
}

export const RenderRightElement = React.memo((props: IRightSectionProps) => {
  if (props.type === "button") {
    const { checked, onClick, text } = props;
    const Button = checked ? CheckedButton : UnCheckedButton;

    return (
      <Button size="s" onClick={onClick}>
        {text}
      </Button>
    );
  } else if (props.type === "radio") {
    return <Radio {...props} />;
  } else if (props.type === "checkbox") {
    return <Checkbox {...props} />;
  }
  return null;
});

export function GroupItem({
  title,
  subTitle,
  image,
  rightElement,
  margin,
  hover = true,
}: IGroupItemProps) {
  const leftElement = React.useMemo(
    () =>
      image && {
        element: <GroupProfileImage size="l" {...image} />,
        props: {
          leftContentsSize: "l",
          margin: {
            left: MarginSize.SIXTEEN,
            right: MarginSize.TWELVE,
            ...margin,
          },
        } as ILeftProps,
      },
    [image, margin],
  );

  return (
    <BaseItemCell
      title={title}
      subTitle={subTitle}
      size="l"
      leftElement={leftElement}
      rightElement={rightElement}
      hover={hover}
    />
  );
}

export function MemberItem({
  title,
  subTitle,
  subTitleShaveLine,
  image,
  hover = true,
  size = "member",
  button,
  canOpenProfileDialog,
  disableTitleShave,
  onClick,
}: IMemberItemProps) {
  const openProfileDialog = useOpenProfileDialog();
  const handleClick: React.MouseEventHandler<HTMLDivElement> = React.useCallback(
    e => {
      if (canOpenProfileDialog && image.userId) {
        openProfileDialog(image.userId, { current: e.currentTarget });
      }
      onClick?.();
    },
    [canOpenProfileDialog, image.userId, onClick, openProfileDialog],
  );
  const leftElement = React.useMemo(
    () => ({
      element: (
        <UserProfileImage size={image.size ? image.size : "m"} {...image} />
      ),
      props: {
        leftContentsSize: "m",
        margin: {
          left: MarginSize.SIXTEEN,
          right: MarginSize.EIGHT,
        },
      } as ILeftProps,
    }),
    [image],
  );

  return (
    <BaseItemCell
      hover={hover}
      title={title}
      subTitle={subTitle}
      subTitleShaveLine={subTitleShaveLine}
      size={size}
      leftElement={leftElement}
      rightElement={button && <RenderRightElement {...button} />}
      disableTitleShave={disableTitleShave}
      onClick={handleClick}
    />
  );
}

export function ChannelItem({ channelType, name, size }: IChannelItemProps) {
  let Icon: React.ElementType;

  switch (channelType) {
    case "forum": {
      Icon = ForumIcon;
      break;
    }

    case "conversation":
    default: {
      Icon = TalkIcon;
      break;
    }
  }

  const leftProps: ILeftProps = {
    leftContentsSize: "s",
    margin: {
      left: MarginSize.SIXTEEN,
      right: MarginSize.TWELVE,
    },
  };

  const leftElement = React.useMemo(
    () => ({ element: <Icon size="s" />, props: leftProps }),
    [leftProps],
  );

  return <BaseItemCell title={name} size={size} leftElement={leftElement} />;
}
