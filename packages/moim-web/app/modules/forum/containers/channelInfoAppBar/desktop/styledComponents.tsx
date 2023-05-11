import styled from "styled-components";
import { B4Regular, H4Bold } from "common/components/designSystem/typos";
// icons
import InfoIconBase from "@icon/24-info-b.svg";
import BlackMoreIcon from "@icon/24-more-b.svg";
import { px2rem } from "common/helpers/rem";
import { useSingleLineStyle } from "common/components/designSystem/styles";

export const RightWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const MoreMenuWrapper = styled.div`
  display: inline-block;
`;

export const TitleWrapper = styled.div`
  flex: 1;
  min-width: 0;
  height: ${px2rem(150)};
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Title = styled(H4Bold)`
  color: ${props => props.theme.colorV2.colorSet.grey800};

  ${useSingleLineStyle};
`;

export const Desc = styled(B4Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey300};

  ${useSingleLineStyle};
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;

  padding: 0 ${px2rem(8)} 0 ${px2rem(16)};
`;

export const InfoIcon = styled(InfoIconBase).attrs(props => ({
  size: "s",
  role: "button",
  touch: 42,
  iconColor: props.theme.colorV2.colorSet.grey800,
}))``;

export const MoreIcon = styled(BlackMoreIcon).attrs(props => ({
  size: "s",
  role: "button",
  touch: 42,
  iconColor: props.theme.colorV2.colorSet.grey800,
}))``;
