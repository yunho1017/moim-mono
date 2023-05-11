import * as React from "react";
import { FlattenInterpolation } from "styled-components";
import { NativeEmojiSafeText } from "common/components/designSystem/texts";
import { useActions } from "app/store";
import { doBlockAction as doBlockActionDispatch } from "app/actions/referenceBlock";
import { PluginPanelContext } from "app/modules/secondaryView/plugin/context";
import {
  ILinkButtonProps,
  IButtonProps,
} from "common/components/designSystem/buttons/base";
import {
  LargeWrapper,
  MediumWrapper,
  SmallWrapper,
  GhostButton,
  GhostGeneralButton,
  FlatButton,
  FlatGeneralButton,
  TextButton,
  TextGeneralButton,
} from "./styled";

type IProps = Omit<Moim.Blockit.IButtonBlock, "type"> & {
  wrapperStyle?: FlattenInterpolation<any>;
};

type BaseButtonProps = Omit<ILinkButtonProps & IButtonProps, "ref" | "size">;

export const ButtonElement: React.FC<BaseButtonProps & {
  element: Moim.Blockit.IButtonBlockElement;
  isWaiting?: boolean;
  wrapperStyle?: FlattenInterpolation<any>;
  margin?: Moim.Blockit.IBlockitMargin;
  withoutWrapper?: boolean;
}> = ({
  element,
  withoutWrapper = false,
  wrapperStyle,
  isWaiting,
  margin,
  ...props
}) => {
  const { style: _, ...restProps } = element;
  const { size, type, style, content, status = "enabled" } = element;
  const isDisabled = React.useMemo(() => status === "disabled", [status]);
  const isActivated = React.useMemo(() => status === "activated", [status]);

  const shortSize = React.useMemo(() => {
    switch (size) {
      case "large":
        return "l";
      case "medium":
        return "m";
      default:
      case "small":
        return "s";
    }
  }, [size]);

  const buttonElement = React.useMemo(() => {
    switch (type) {
      case "ghost": {
        if (style === "general") {
          return (
            <GhostGeneralButton
              size={shortSize}
              disabled={isDisabled}
              isActive={isActivated}
              waiting={isWaiting}
              {...props}
            >
              <NativeEmojiSafeText value={content} />
            </GhostGeneralButton>
          );
        } else {
          return (
            <GhostButton
              size={shortSize}
              disabled={isDisabled}
              isActive={isActivated}
              waiting={isWaiting}
              {...props}
            >
              <NativeEmojiSafeText value={content} />
            </GhostButton>
          );
        }
      }

      case "text": {
        if (style === "general") {
          return (
            <TextGeneralButton
              size={shortSize}
              disabled={isDisabled}
              isActive={isActivated}
              waiting={isWaiting}
              {...props}
            >
              <NativeEmojiSafeText value={content} />
            </TextGeneralButton>
          );
        } else {
          return (
            <TextButton
              size={shortSize}
              disabled={isDisabled}
              isActive={isActivated}
              waiting={isWaiting}
              {...props}
            >
              <NativeEmojiSafeText value={content} />
            </TextButton>
          );
        }
      }

      case "flat": {
        if (style === "general") {
          return (
            <FlatGeneralButton
              size={shortSize}
              disabled={isDisabled}
              isActive={isActivated}
              waiting={isWaiting}
              {...props}
            >
              <NativeEmojiSafeText value={content} />
            </FlatGeneralButton>
          );
        } else {
          return (
            <FlatButton
              size={shortSize}
              disabled={isDisabled}
              isActive={isActivated}
              waiting={isWaiting}
              {...props}
            >
              <NativeEmojiSafeText value={content} />
            </FlatButton>
          );
        }
      }
    }
  }, [
    content,
    isDisabled,
    isActivated,
    isWaiting,
    props,
    shortSize,
    style,
    type,
  ]);

  if (withoutWrapper) {
    return buttonElement;
  }

  switch (size) {
    case "large": {
      return (
        <LargeWrapper
          styleType={style}
          overrideStyle={wrapperStyle}
          margin={margin}
          {...restProps}
        >
          {buttonElement}
        </LargeWrapper>
      );
    }

    case "medium": {
      return (
        <MediumWrapper
          styleType={style}
          overrideStyle={wrapperStyle}
          margin={margin}
          {...restProps}
        >
          {buttonElement}
        </MediumWrapper>
      );
    }

    default:
    case "small": {
      return (
        <SmallWrapper
          styleType={style}
          overrideStyle={wrapperStyle}
          margin={margin}
          {...restProps}
        >
          {buttonElement}
        </SmallWrapper>
      );
    }
  }
};

const Buttons: React.FC<IProps> = ({
  actionId,
  params,
  element,
  botId,
  wrapperStyle,
}) => {
  const isInPluginPanel = React.useContext(PluginPanelContext);
  const [waiting, setWaiting] = React.useState(false);
  const { doBlockAction } = useActions({
    doBlockAction: doBlockActionDispatch,
  });

  const handleClick: React.MouseEventHandler<
    HTMLButtonElement | HTMLAnchorElement
  > = React.useCallback(
    async e => {
      if (botId && actionId) {
        e.preventDefault();
        e.stopPropagation();
        setWaiting(true);
        await doBlockAction(
          {
            botId,
            data: {
              actionId,
              params,
            },
          },
          isInPluginPanel,
        );

        setWaiting(false);
      }
    },
    [actionId, botId, doBlockAction, isInPluginPanel, params],
  );

  return (
    <ButtonElement
      element={element}
      wrapperStyle={wrapperStyle}
      isWaiting={waiting}
      onClick={handleClick}
    />
  );
};

export default Buttons;
