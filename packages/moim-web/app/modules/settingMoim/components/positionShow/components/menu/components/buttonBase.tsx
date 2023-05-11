import * as React from "react";
import { FormattedMessage } from "react-intl";
import { MenuItem } from "common/components/responsiveMenu/components/menu";
import { BaseItemCell } from "common/components/itemCell";
import { ButtonText } from "../styled";
import { MarginSize } from "app/enums";

interface IProps {
  icon: React.ReactNode;
  titleKey: string;
  onClick: () => void;
}

function ButtonBase(props: IProps) {
  const { icon, titleKey, onClick } = props;

  return (
    <MenuItem onClick={onClick}>
      <BaseItemCell
        title={
          <ButtonText>
            <FormattedMessage id={titleKey} />
          </ButtonText>
        }
        leftElement={{
          element: icon,
          props: {
            leftContentsSize: "s",
            margin: {
              left: MarginSize.ZERO,
              right: MarginSize.TWELVE,
            },
          },
        }}
        size="s"
      />
    </MenuItem>
  );
}

export default ButtonBase;
