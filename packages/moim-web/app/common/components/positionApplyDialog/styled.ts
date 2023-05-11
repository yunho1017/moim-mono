import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { B1Regular, H9Bold, H8Bold } from "../designSystem/typos";
import { MEDIA_QUERY } from "common/constants/responsive";
import { FlatButton } from "../designSystem/buttons";

import CloseIconBase from "@icon/24-close-b.svg";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: ${px2rem(16)} ${px2rem(24)} ${px2rem(24)};

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    padding: ${px2rem(16)} 0 ${px2rem(24)};
  }
`;

export const Section = styled.div`
  padding: ${px2rem(8)} ${0};
`;

export const SectionTitle = styled(H9Bold)`
  padding: ${px2rem(8)} ${px2rem(16)};
`;

export const SectionContent = styled.div`
  padding: ${px2rem(4)} ${px2rem(16)};
`;

export const ButtonWrapper = styled.div`
  padding: ${px2rem(16)};
`;
export const ApplyButton = styled(FlatButton)`
  width: 100%;
`;

export const ApplicantName = styled(B1Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey600};
`;

export const ModalTitle = styled(H8Bold)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const CloseButton = styled(CloseIconBase).attrs({
  size: "m",
  touch: 24,
  role: "button",
})``;

export const PositionColor = styled.div<{ color: string }>`
  background-color: ${props => props.color};
  width: ${px2rem(18)};
  height: ${px2rem(18)};
  border-radius: ${px2rem(2)};
`;
