import * as React from "react";
import { FlattenInterpolation } from "styled-components";
import { useActions } from "app/store";
import { doBlockAction as doBlockActionDispatch } from "app/actions/referenceBlock";
import { PluginPanelContext } from "app/modules/secondaryView/plugin/context";
import {
  Wrapper,
  MenuWrapper,
  Left,
  Caption,
  MoreIconWrapper,
  MoreIcon,
  BadgeCount,
  Center,
} from "./styled";

type IProps = Omit<Moim.Blockit.IMenuWrapBlock, "type"> & {
  wrapperStyle?: FlattenInterpolation<any>;
  margin?: Moim.Blockit.IBlockitMargin;
};

const Menus: React.FC<IProps> = ({ wrapperStyle, margin, menus, botId }) => {
  const isInPluginPanel = React.useContext(PluginPanelContext);
  const { doBlockAction } = useActions({
    doBlockAction: doBlockActionDispatch,
  });
  const handleClick: React.MouseEventHandler<HTMLDivElement> = React.useCallback(
    e => {
      const idx = parseInt(e.currentTarget.dataset.idx || "0", 10);
      const { actionId, params } = menus[idx];
      if (idx === null || idx === undefined) return;

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
    [botId, doBlockAction, isInPluginPanel, menus],
  );

  const elements = React.useMemo(
    () =>
      menus.map((menu, idx) => (
        <MenuWrapper
          role="button"
          data-idx={idx}
          key={`menu_${idx}`}
          onClick={handleClick}
        >
          {menu.icon && (
            <Left>
              <img src={menu.icon} />
            </Left>
          )}
          <Center textStyle={menu.subType}>{menu.title}</Center>
          {menu.caption && <Caption>{menu.caption}</Caption>}
          {menu.badgeCount && <BadgeCount>{menu.badgeCount}</BadgeCount>}
          {menu.hasMore && (
            <MoreIconWrapper>
              <MoreIcon />
            </MoreIconWrapper>
          )}
        </MenuWrapper>
      )),
    [handleClick, menus],
  );
  return (
    <Wrapper overrideStyle={wrapperStyle} margin={margin}>
      {elements}
    </Wrapper>
  );
};

export default Menus;
