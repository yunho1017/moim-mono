import * as React from "react";
import { FlattenInterpolation } from "styled-components";
import hexToRGBA from "app/theme/helpers/hexToRgba";
import {
  Wrapper as NormalWrapper,
  LabelWrapper,
  Image,
  DefaultImage,
  Content,
  Badge,
  NewContentsBadge,
  NewNotificationBadge,
} from "./styledComponents";
import getRandomColorOfLetter from "common/helpers/getRandomColorOfLetter";

import useHover from "common/hooks/useHover";

export interface IProps {
  size: Moim.DesignSystem.Size;
  title: string;
  icon?: Moim.IIcon | null;
  badge?: number | string;
  hasNewNotification?: boolean;
  hasNewContents?: boolean;
  styles?: FlattenInterpolation<any>;
  selected?: boolean;
  useHoverStyle?: boolean;
  onImageClick?: React.MouseEventHandler<HTMLImageElement>;
}

function GroupProfileImage(props: IProps) {
  const {
    size,
    title,
    icon,
    badge,
    hasNewNotification,
    hasNewContents,
    selected,
    useHoverStyle,
    onImageClick,
    styles,
  } = props;
  const [hoverRef, hovered] = useHover<HTMLDivElement>();
  const isTextIcon = icon?.type === "text" || !icon;
  const textIcon = React.useMemo(
    () =>
      icon?.type === "text"
        ? {
            ...icon.data,
            color: hexToRGBA(icon.data.color),
            bg_color: hexToRGBA(icon.data.bg_color),
          }
        : {
            color: getRandomColorOfLetter(props.title),
            bg_color: getRandomColorOfLetter(props.title),
            text: props.title.charAt(0),
          },
    [icon, props.title],
  );

  const badgeElement = React.useMemo(() => {
    if (selected) {
      return null;
    }

    if (badge) {
      return <Badge>{badge}</Badge>;
    } else if (hasNewNotification) {
      return <NewNotificationBadge />;
    } else if (hasNewContents) {
      return <NewContentsBadge />;
    }

    return null;
  }, [badge, hasNewContents, hasNewNotification, selected]);

  return React.createElement(
    selected ? LabelWrapper : NormalWrapper,
    {
      size,
      styles,
      selected,
      hovered: useHoverStyle && hovered,
      ref: hoverRef,
    },
    <>
      <Content
        style={{
          backgroundColor: isTextIcon ? textIcon.bg_color : undefined,
        }}
      >
        {icon?.type === "image" ? (
          icon.data.url ? (
            <Image
              src={icon.data.url}
              alt={title}
              role="button"
              onClick={onImageClick}
            />
          ) : (
            <DefaultImage onClick={onImageClick} size={size} />
          )
        ) : (
          textIcon.text
        )}
      </Content>
      {badgeElement}
    </>,
  );
}

export default React.memo(GroupProfileImage);
