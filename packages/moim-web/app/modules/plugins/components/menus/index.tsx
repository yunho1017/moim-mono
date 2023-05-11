import * as React from "react";
import { FlattenInterpolation } from "styled-components";
import { MoimURL } from "common/helpers/url";
import { Wrapper, MenuList, MenuItem, MenuText } from "./styled";

interface IProps {
  plugins?: Moim.Plugin.IPlugin[];
  paging?: Moim.IPaging;
  selectedPluginId?: Moim.Id;
  wrapperStyle?: FlattenInterpolation<any>;
}

// NOTE: paging prop exists but why there is no infiniteScroll.
// Cuz can't focus to few paginated plugin id.
const Menus: React.FC<IProps> = ({
  plugins,
  selectedPluginId,
  wrapperStyle,
}) => {
  const menus = React.useMemo(
    () =>
      plugins?.map(item => (
        <MenuItem
          key={`plugin_menu_${item.id}`}
          isSelected={item.id === selectedPluginId}
        >
          <MenuText to={new MoimURL.PluginShow({ id: item.id }).toString()}>
            {item.name}
          </MenuText>
        </MenuItem>
      )),
    [plugins, selectedPluginId],
  );
  return (
    <Wrapper wrapperStyle={wrapperStyle}>
      <MenuList>{menus}</MenuList>
    </Wrapper>
  );
};

export default Menus;
export { LEFT_WIDTH } from "./styled";
