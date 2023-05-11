import * as React from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import MoreButtonIconBase from "@icon/18-rightarrow-g.svg";
import { TextGeneralButton } from "common/components/designSystem/buttons";
import { Spacer } from "common/components/designSystem/spacer";
import { px2rem } from "common/helpers/rem";
import useIsMobile from "common/hooks/useIsMobile";

const MoreButtonIcon = styled(MoreButtonIconBase).attrs(props => ({
  size: "xs",
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;

const MoreButton = styled(TextGeneralButton).attrs({ size: "s" })`
  display: flex;
  width: 100%;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 0;
  column-gap: ${px2rem(8)};
  color: ${props => props.theme.colorV2.colorSet.grey300};
`;

interface IProps {
  textKey?: string;
  onClick(): void;
}
const MobileViewMore: React.FC<IProps> = ({ onClick, textKey }) => {
  const isMobile = useIsMobile();

  if (!isMobile) {
    return null;
  }
  return (
    <>
      <MoreButton onClick={onClick}>
        <span>
          <FormattedMessage id={textKey ?? "button_see_more_product"} />
        </span>
        <MoreButtonIcon />
      </MoreButton>
      <Spacer value={8} />
    </>
  );
};

export default React.memo(MobileViewMore);
