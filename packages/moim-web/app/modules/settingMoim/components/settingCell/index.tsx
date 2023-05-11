import * as React from "react";
import { Wrapper, Title, Description, Divider } from "./styled";
import { BaseItemCell } from "common/components/itemCell";
import ShavedText from "common/components/shavedText";

type IProps = React.PropsWithChildren<{
  title?: React.ReactNode;
  description?: React.ReactNode;
  hasDivider?: boolean;
}>;

function SettingCell({
  title,
  description,
  hasDivider = true,
  children,
}: IProps) {
  return (
    <>
      <Wrapper>
        {title && <BaseItemCell title={<Title>{title}</Title>} size="s" />}
        {description && (
          <ShavedText
            value={<Description>{description}</Description>}
            line={1}
          />
        )}
        {children}
      </Wrapper>

      {hasDivider && <Divider />}
    </>
  );
}

export default SettingCell;
