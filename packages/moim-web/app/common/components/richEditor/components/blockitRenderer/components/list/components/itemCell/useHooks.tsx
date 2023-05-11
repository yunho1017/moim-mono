import { useActions } from "app/store";
import * as React from "react";
import { IProps } from ".";
import { doBlockAction as doBlockActionDispatch } from "app/actions/referenceBlock";
import { PluginPanelContext } from "app/modules/secondaryView/plugin/context";

export function useProps(props: IProps) {
  const { actionId } = props;
  const isInPluginPanel = React.useContext(PluginPanelContext);
  const { doBlockAction } = useActions({
    doBlockAction: doBlockActionDispatch,
  });
  const role = React.useMemo(() => (actionId ? "button" : undefined), [
    actionId,
  ]);

  const shortSizeChar: Moim.DesignSystem.Size = React.useMemo(() => {
    switch (props.size) {
      case "large":
        return "l";
      case "medium":
        return "m";
      case "small":
        return "s";
    }
  }, [props.size]);

  return {
    ...props,
    role,
    isInPluginPanel,
    doBlockAction,
    shortSizeChar,
  };
}

export function useHandlers(props: ReturnType<typeof useProps>) {
  const { botId, actionId, isInPluginPanel, doBlockAction, params } = props;
  const handleClick = React.useCallback(
    e => {
      if (botId && actionId) {
        e.preventDefault();
        e.stopPropagation();
        doBlockAction(
          {
            botId,
            data: {
              actionId,
              params,
            },
          },
          isInPluginPanel,
        );
      }
    },
    [actionId, botId, doBlockAction, isInPluginPanel, params],
  );

  return {
    ...props,
    handleClick,
  };
}
