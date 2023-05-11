import * as React from "react";
import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { rgba } from "polished";

export const Wrapper = styled.div``;

export const Title = styled.div`
  font-size: ${px2rem(16)};
  font-weight: ${props => props.theme.font.bold};
  padding: ${px2rem(16)};
  margin-bottom: ${px2rem(16)};
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
  border: ${props =>
    `${px2rem(1)} solid ${props.theme.colorV2.colorSet.grey50}`};
`;

export const CustomInput = styled.input`
  outline: none;
  border: none;
  width: 100%;
  font-size: ${px2rem(16)};
  color: ${props => props.theme.colorV2.colorSet.grey800};
  padding: ${px2rem(8)} ${px2rem(16)};
`;

export const CustomTextArea = styled.textarea`
  outline: none;
  border: none;
  width: 100%;
  min-height: ${px2rem(100)};
  font-size: ${px2rem(16)};
  color: ${props => props.theme.colorV2.colorSet.grey800};
  padding: ${px2rem(8)} ${px2rem(16)};
`;

export const Footer = styled.div`
  width: 100%;
  display: flex;
  padding: ${px2rem(16)};
  justify-content: flex-end;
  background-color: ${props => props.theme.colorV2.colorSet.grey50};
`;

export const SubmitButtonWrapper = styled.div`
  padding: ${px2rem(8)} ${px2rem(16)};
  border-radius: ${px2rem(20)};
  color: ${props => props.theme.colorV2.colorSet.white1000};
  background-color: ${props => props.theme.color.red700};
  font-weight: ${props => props.theme.font.medium};
  &:disabled {
    pointer-events: none;
    position: relative;
    &:before {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      border-radius: ${px2rem(4)};
      background-color: ${props =>
        rgba(props.theme.colorV2.colorSet.white1000, 0.5)};
    }
  }
`;

interface ISubmitButtonProps {
  handleClick: () => void;
}

export function SubmitButton({ handleClick }: ISubmitButtonProps) {
  return (
    <SubmitButtonWrapper onClick={handleClick}>Submit</SubmitButtonWrapper>
  );
}
