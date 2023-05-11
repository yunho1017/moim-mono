import * as React from "react";
import styled from "styled-components";
import { px2rem } from "common/helpers/rem";

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
`;

const FormWrapper = styled.form`
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;

  padding: ${px2rem(21)} ${px2rem(8)} 0;
  box-sizing: border-box;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;

  padding: ${px2rem(21)} ${px2rem(8)} 0;
  box-sizing: border-box;
`;

const HeaderWrapper = styled.div`
  .title {
    font-size: ${px2rem(16)};
    font-weight: ${props => props.theme.font.bold};
    text-align: center;
    color: ${props => props.theme.colorV2.colorSet.grey800};
    margin-top: ${px2rem(24)};
  }

  .subTitle {
    font-size: ${px2rem(12)};
    font-weight: ${props => props.theme.font.medium};
    line-height: ${px2rem(18)};
    text-align: center;
    color: ${props => props.theme.colorV2.colorSet.grey300};
    margin-top: ${px2rem(16)};

    white-space: pre-line;
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  padding: 0 ${px2rem(46)};
  box-sizing: border-box;
`;

const FlexContentFormTemplate = ({
  children,
  onSubmit,
}: React.HTMLProps<HTMLFormElement>) => (
  <Container>
    <FormWrapper onSubmit={onSubmit}>{children}</FormWrapper>
  </Container>
);

const FlexContentTemplate = ({ children }: { children?: React.ReactNode }) => (
  <Container>
    <Wrapper>{children}</Wrapper>
  </Container>
);

const Header = styled.div`
  width: 100%;
`;

const Content = styled.div`
  width: 100%;
  flex: 1;
`;

const NormalContent = styled.div`
  width: 100%;
`;

const Footer = styled.div`
  width: 100%;
`;

export {
  FlexContentFormTemplate,
  FlexContentTemplate,
  Header,
  Content,
  NormalContent,
  Footer,
  HeaderWrapper,
  ButtonWrapper,
};
