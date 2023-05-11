import { MEDIA_QUERY } from "common/constants/responsive";
import { px2rem } from "common/helpers/rem";
import * as React from "react";
import { css, FlattenInterpolation } from "styled-components";
import ChipBase from "../chips";
import { Wrapper } from "./styled";

export interface IMenu {
  key: string;
  text: React.ReactNode;
  default?: boolean;
}

interface IProps {
  menus: IMenu[];
  chipStyle?: FlattenInterpolation<any>;
  onClickChip?(key: string): void;
}

const ChipSwitch: React.FC<IProps> = ({ menus, chipStyle, onClickChip }) => {
  const [selectedMenuKey, setSelectedMenuKey] = React.useState(
    menus.find(menu => menu.default)?.key ?? menus[0].key,
  );

  const handleClick: React.MouseEventHandler<HTMLDivElement> = React.useCallback(
    e => {
      const key = e.currentTarget.dataset.key;
      if (key) {
        setSelectedMenuKey(key);
        onClickChip?.(key);
      }
    },
    [onClickChip],
  );

  const overrideStyle = React.useMemo(
    () => css<{ selected: boolean }>`
      max-width: 100%;
      height: fit-content;
      transition: all 200ms ease-in-out;

      &[data-selected="true"] {
        color: ${props => props.theme.colorV2.colorSet.grey800};
        background-color: ${props => props.theme.colorV2.colorSet.grey50};
      }
      &[data-selected="false"] {
        color: ${props => props.theme.colorV2.colorSet.grey300};
      }

      @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
        &:hover {
          color: ${props => props.theme.colorV2.colorSet.grey300};
          background-color: ${props => props.theme.colorV2.colorSet.grey50};
        }
      }

      & + & {
        margin-left: ${px2rem(12)};
      }

      ${chipStyle}
    `,
    [chipStyle],
  );

  const elements = React.useMemo(
    () =>
      menus.map(menu => (
        <ChipBase
          key={menu.key}
          data-key={menu.key}
          size="medium"
          shape="rectangle"
          selected={menu.key === selectedMenuKey}
          onClick={handleClick}
          overrideStyle={overrideStyle}
        >
          {menu.text}
        </ChipBase>
      )),
    [handleClick, menus, overrideStyle, selectedMenuKey],
  );

  return <Wrapper>{elements}</Wrapper>;
};

export default ChipSwitch;
