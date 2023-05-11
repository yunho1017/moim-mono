import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { H8Bold } from "common/components/designSystem/typos";
import { GhostButton } from "common/components/designSystem/buttons";
import { MEDIA_QUERY } from "common/constants/responsive";

export const Wrapper = styled.div`
  width: 100%;
  background-color: ${props => props.theme.colorV2.colorSet.white1000};

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    width: ${px2rem(320)};
  }
`;

export const Header = styled.div`
  width: 100%;
`;

export const UsernameWrapper = styled.div`
  flex: 1;
  min-width: 0;
  padding: ${px2rem(11)} ${px2rem(16)};
`;

export const Username = styled(H8Bold)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
  &:hover {
    color: ${props => props.theme.colorV2.colorSet.grey100};
    transition: color 200ms ease-in;
  }
`;

export const Body = styled.div`
  padding-bottom: ${px2rem(4)};
`;

export const Footer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: ${px2rem(16)};
`;

export const Button = styled(GhostButton)`
  width: ${px2rem(163)};
  color: ${props => props.theme.colorV2.colorSet.grey800};
  border: ${px2rem(1)} solid ${props => props.theme.colorV2.colorSet.grey300};
  & + & {
    margin-left: ${px2rem(16)};
  }
`;

export const BlockitWrapper = styled.div`
  overflow: hidden;
`;
