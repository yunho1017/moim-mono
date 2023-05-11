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
} from "./styled";

interface IProps {
  menus: Moim.Setting.ISettingMenu[];
  wrapperStyle?: FlattenInterpolation<any>;
}

export default function SettingMenu({ menus, wrapperStyle }: IProps) {
  const history = useHistory();
  const menuList = React.useMemo(
    () =>
      menus.map(menu => {
        const isSelected = Boolean(
          matchPath(history.location.pathname, {
            path: menu.location,
          }),
        );

        return (
          <MenuItem key={menu.text} isSelected={isSelected}>
            <MenuLink
              to={{
                pathname: menu.location,
                state: {
                  modal: true,
                },
              }}
              target={menu.openNewTab ? "_blank" : undefined}
            >
              <BaseItemCell
                title={
                  <MenuText>
                    {menu.text}
                    {menu.openNewTab && <LinkIcon />}
                  </MenuText>
                }
                size="s"
              />
            </MenuLink>
          </MenuItem>
        );
      }),
    [menus, history.location.pathname],
  );

  return (
    <Wrapper wrapperStyle={wrapperStyle}>
      <MenuList>{menuList}</MenuList>
    </Wrapper>
  );
}
