import { px2rem } from "common/helpers/rem";
import styled from "styled-components";

export const ProfileNFTGrid = styled.div`
  width: 100%;
  display: grid;
  padding: ${px2rem(8)} ${px2rem(16)};

  gap: ${px2rem(16)} ${px2rem(21)};
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr);
`;
