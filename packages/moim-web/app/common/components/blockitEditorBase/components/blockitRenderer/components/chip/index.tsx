import * as React from "react";
import { css } from "styled-components";
import { rgba } from "polished";
import { useActions } from "app/store";
import { doBlockAction as doBlockActionDispatch } from "app/actions/referenceBlock";
import { PluginPanelContext } from "app/modules/secondaryView/plugin/context";
import ChipBase from "common/components/chips";
import ShavedText from "common/components/shavedText";
import { NativeEmojiSafeText } from "common/components/designSystem/texts";
import { Content } from "./styled";

type IProps = Omit<Moim.Blockit.IChipBlock, "type"> & {};

const ChipBlock: React.FC<IProps> = ({
  content,
  style,
  size,
  color,
  botId,
  actionId,
  params,
}) => {
  const isInPluginPanel = React.useContext(PluginPanelContext);
  const { doBlockAction } = useActions({
    doBlockAction: doBlockActionDispatch,
  });
  const tempSlicedColor = React.useMemo(() => {
    if (color.length >= 8) {
      return color.slice(0, -2);
    }
    return color;
  }, [color]);

  const overrideStyle = React.useMemo(
    () => css`
      cursor: ${botId && actionId ? "cursor" : "default"} !important;
      min-width: 0;
      color: ${props => props.theme.getColorByAlias(tempSlicedColor)};
      background-color: ${props =>
        rgba(
          props.theme.getColorByAlias(
            tempSlicedColor,
            props.theme.colorV2.primary.main,
          ) ?? "",
          0.15,
        )};
    `,
    [actionId, botId, tempSlicedColor],
  );

  const shape = React.useMemo(
    () => (style === "round" ? "round" : "rectangle"),
    [style],
  );

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

  return (
    <ChipBase
      shape={shape}
      size={size}
      overrideStyle={overrideStyle}
      onClick={handleClick}
    >
      <Content size={size}>
        <ShavedText value={<NativeEmojiSafeText value={content} />} />
      </Content>
    </ChipBase>
  );
};

export default ChipBlock;
