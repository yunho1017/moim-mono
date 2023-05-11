import styled from "styled-components";
import { FlatGeneralButton } from "common/components/designSystem/buttons";
import { px2rem } from "common/helpers/rem";
import {
  B2Regular,
  H4Bold,
  H9Bold,
  B3RegularStyle,
} from "common/components/designSystem/typos";

import { MEDIA_QUERY } from "common/constants/responsive";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LeaveButton = styled(FlatGeneralButton).attrs({
  size: "s",
})`
  width: fit-content;
  align-self: flex-end;
  height: ${px2rem(32)};

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    width: 100%;
    height: ${px2rem(48)};
  }
`;

export const Title = styled(H4Bold)`
  padding: ${px2rem(11)} ${px2rem(16)};
  color: ${props => props.theme.colorV2.colorSet.grey800};
  border-bottom: ${px2rem(1)} solid
    ${props => props.theme.colorV2.colorSet.grey50};
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 ${px2rem(16)};

  & + & {
    margin-top: ${px2rem(17)};
  }

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    & + &:last-child {
      margin-top: ${px2rem(8)};
    }
  }
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    & + &:last-child {
      margin-top: ${px2rem(4)};
    }
  }
`;

export const Description = styled(B2Regular)`
  padding: ${px2rem(11)} 0;
  color: ${props => props.theme.colorV2.colorSet.grey800};
  margin-bottom: ${px2rem(8)};
  white-space: pre-wrap;
  word-break: break-word;
`;

export const Warning = styled.div`
  width: 100%;
  padding: ${px2rem(11)} ${px2rem(16)} ${px2rem(12)};
  background-color: ${props => props.theme.colorV2.colorSet.grey50};
  color: ${props => props.theme.color.red700};
  margin-bottom: ${px2rem(8)};
  white-space: pre-wrap;
  word-break: break-word;
  ${B3RegularStyle}
`;

export const InputLabel = styled(H9Bold)`
  width: 100%;
  padding: ${px2rem(8)} 0;
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;
