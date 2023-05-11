import * as React from "react";
import { matchPath, useHistory } from "react-router";
import { FlattenInterpolation } from "styled-components";
import { BaseItemCell } from "common/components/itemCell";
import {
  MenuItem,
  MenuLink,
  MenuList,
  MenuText,
  Wrapper,
  LinkIcon,
  CollapseIconButton,
  ArrowIcon,
  ParentMenu,
  ParentMenuWrapper,
  ParentMenuButtonWrapper,
} from "./styled";

interface IProps {
  menus: Moim.Setting.ISettingMenu[];
  wrapperStyle?: FlattenInterpolation<any>;
}

interface IMenuSetting {
  menuSetting: Moim.Setting.ISettingMenu;
}

function Menu(props: IMenuSetting) {
  const history = useHistory();
  const { menuSetting } = props;
  const [popoverOpen, setPopoverOpenStatus] = React.useState(true);

  const isSelected = React.useMemo(() => {
    return Boolean(
      matchPath(history.location.pathname, {
        path: props.menuSetting.location,
      }),
    );
  }, [history.location.pathname, props.menuSetting.location]);

  const handleClickParentMenu = React.useCallback(() => {
    setPopoverOpenStatus(!popoverOpen);
  }, [popoverOpen]);

  return (
    <>
      {!menuSetting.isParentMenu ? (
        <MenuItem
          key={menuSetting.text}
          isSelected={isSelected}
          isChildMenu={Boolean(menuSetting.isChildMenu)}
        >
          <MenuLink
            to={{
              pathname: menuSetting.location,
              state: {
                modal: true,
              },
            }}
            target={menuSetting.openNewTab ? "_blank" : undefined}
          >
            <BaseItemCell
              title={
                <MenuText color={menuSetting.color}>
                  {menuSetting.text}
                  {menuSetting.openNewTab && <LinkIcon />}
                </MenuText>
              }
              size="s"
            />
          </MenuLink>
        </MenuItem>
      ) : (
        <ParentMenuWrapper>
          <ParentMenu open={popoverOpen}>
            <ParentMenuButtonWrapper
              onClick={handleClickParentMenu}
              isSelected={isSelected}
            >
              <BaseItemCell
                title={
                  <MenuText color={menuSetting.color}>
                    {menuSetting.text}
                    {menuSetting.openNewTab && <LinkIcon />}
                  </MenuText>
                }
                size="s"
              />
              <CollapseIconButton open={popoverOpen}>
                <ArrowIcon />
              </CollapseIconButton>
            </ParentMenuButtonWrapper>
            {menuSetting.childMenus?.map(childMenu => (
              <Menu
                key={`childMenuItem_${childMenu.text}`}
                menuSetting={childMenu}
              ></Menu>
            ))}
          </ParentMenu>
        </ParentMenuWrapper>
      )}
    </>
  );
}

export default function Menus({ menus, wrapperStyle }: IProps) {
  const menuList = React.useMemo(
    () =>
      menus.map(menuItem => {
        return (
          <Menu key={`menuItem_${menuItem.text}`} menuSetting={menuItem}></Menu>
        );
      }),
    [menus],
  );

  return (
    <Wrapper wrapperStyle={wrapperStyle}>
      <MenuList>{menuList}</MenuList>
    </Wrapper>
  );
}
