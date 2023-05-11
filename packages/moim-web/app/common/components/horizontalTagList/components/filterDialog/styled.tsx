import styled from "styled-components";
import CloseIconBase from "@icon/24-close-b.svg";
import { px2rem } from "common/helpers/rem";
import { useScrollStyle } from "common/components/designSystem/styles";
import { MEDIA_QUERY } from "common/constants/responsive";

export const CloseButton = styled(CloseIconBase).attrs({
  size: "m",
  touch: 24,
  role: "button",
})``;

export const GroupFilterDialogWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const GroupFilterContainer = styled.div`
  height: 100%;
  padding: 0 ${px2rem(24)};
  ${useScrollStyle}
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    height: ${px2rem(420)};
    padding: 0;
  }
`;

export const GroupFilterButtonContainer = styled.div`
  padding: 0 ${px2rem(20)};
  width: 100%;
  height: ${px2rem(70)};
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    height: ${px2rem(51)};
    padding: 0 ${px2rem(16)};
  }
`;

export const BottomSheetWrapper = styled.div``;

export const Title = styled.div`
  margin-left: ${px2rem(9)};
`;
