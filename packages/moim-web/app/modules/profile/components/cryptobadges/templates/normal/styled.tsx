import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { B3Regular } from "common/components/designSystem/typos";
import { ICON_HOLDER_SIZE } from "common/components/cryptobadge/profileCertificateItem/normal/styled";

export const Wrapper = styled.div`
  --gap: ${px2rem(8)};
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
  margin-top: calc(-1 * var(--gap));
  margin-bottom: calc(-1 * var(--gap));

  > * {
    margin-top: var(--gap);
    margin-bottom: var(--gap);
  }
`;

export const BadgeCell = styled.div``;

export const CountWrapper = styled.div`
  width: ${px2rem(ICON_HOLDER_SIZE)};
  height: ${px2rem(ICON_HOLDER_SIZE)};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: ${props => props.theme.colorV2.colorSet.grey50};
`;

export const MoreCount = styled(B3Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey300};
`;
