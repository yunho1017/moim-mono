import styled from "styled-components";
import { px2rem } from "common/helpers/rem";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
`;

export const Title = styled.div<{ titleType: "GREY" | "WHITE" }>`
  width: 100%;
  padding: ${px2rem(8)} ${px2rem(16)};
  font-size: ${px2rem(14)};
  font-weight: ${props => props.theme.font.regular};
  line-height: ${px2rem(16)};
  color: ${props => props.theme.colorV2.colorSet.grey800};
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
`;

export const Form = styled.div<{ titleType: "GREY" | "WHITE" }>`
  display: flex;
  flex-direction: column;
`;

export const Description = styled.div`
  width: 100%;
  padding: ${px2rem(8)} ${px2rem(16)} ${px2rem(24)};
  font-size: ${px2rem(12)};
  font-weight: ${props => props.theme.font.regular};
  color: ${props => props.theme.colorV2.colorSet.grey200};
`;
