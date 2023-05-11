import * as React from "react";
import styled from "styled-components";
import { SkeletonBox } from "common/components/skeleton";
import { px2rem } from "common/helpers/rem";
import { ThemeType } from "../component";

const Container = styled.div`
  width: 100%;
  height: ${px2rem(484)};
  padding: ${px2rem(18)} ${px2rem(16)};
`;

const Box = styled(SkeletonBox)`
  width: 100%;
  height: ${px2rem(76)};
`;

const Wrapper = styled.div<{ selectedTheme: ThemeType }>`
  display: flex;
  flex-direction: column;
  gap: ${px2rem(27)};
  width: 100%;
  height: 100%;
  padding: ${px2rem(16)} ${px2rem(18)};
  border-radius: ${px2rem(44)};
  background-color: ${props =>
    props.selectedTheme === "black"
      ? props.theme.themeMode.lightPalette.colorSet.grey10
      : props.theme.themeMode.lightPalette.colorSet.white10};

  ${Box} {
    background-color: ${props =>
      props.selectedTheme === "black"
        ? props.theme.themeMode.lightPalette.colorSet.grey50
        : props.theme.themeMode.lightPalette.colorSet.white50};
  }
`;

interface IProps {
  selectedTheme: ThemeType;
}

const Skeleton: React.FC<IProps> = ({ selectedTheme }) => {
  return (
    <Container>
      <Wrapper selectedTheme={selectedTheme}>
        <Box />
        <Box />
        <Box />
      </Wrapper>
    </Container>
  );
};

export default Skeleton;
