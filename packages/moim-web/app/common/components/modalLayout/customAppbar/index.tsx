import * as React from "react";
import { FlattenInterpolation } from "styled-components";
import { Wrapper, Header, Content, Border } from "./styled";
import useMedia from "common/hooks/useMedia";
import { MEDIA_QUERY } from "common/constants/responsive";

interface IProps extends React.PropsWithChildren<{}> {
  appBar: React.ReactNode;
  hasAppBarBorder?: boolean;
  withoutBorderMargin?: boolean;
  wrapperStyle?: FlattenInterpolation<any>;
  headerStyle?: FlattenInterpolation<any>;
  contentStyle?: FlattenInterpolation<any>;
  disableScrollLock?: boolean;
}

function CustomAppBarModalLayout({
  appBar,
  hasAppBarBorder = true,
  withoutBorderMargin = false,
  wrapperStyle,
  headerStyle,
  contentStyle,
  disableScrollLock,
  children,
}: IProps) {
  const isExceptMobile = useMedia([MEDIA_QUERY.EXCEPT_MOBILE], [true], false);

  return (
    <Wrapper wrapperStyle={wrapperStyle}>
      <Header headerStyle={headerStyle}>{appBar}</Header>
      {hasAppBarBorder && isExceptMobile && (
        <Border withoutMargin={withoutBorderMargin} />
      )}
      <Content
        data-scroll-lock-scrollable={!disableScrollLock}
        contentStyle={contentStyle}
      >
        {children}
      </Content>
    </Wrapper>
  );
}

export default CustomAppBarModalLayout;
