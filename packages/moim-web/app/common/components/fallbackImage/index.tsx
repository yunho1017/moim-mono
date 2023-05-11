import * as React from "react";
import styled from "styled-components";
import ImageFallbackIconBase from "@icon/24-image-g.svg";
import { useStoreState } from "app/store";

const ImageFallbackIcon = styled(ImageFallbackIconBase).attrs(props => ({
  size: "s",
  iconColor: props.theme.colorV2.colorSet.grey100,
}))``;

const GreyImage = styled.img`
  width: 30%;
  filter: saturate(0%);
`;

const ImageFallback = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colorV2.colorSet.grey50};
`;

interface IProps {}

const FallbackImage: React.FC<IProps> = ({ children: _, ...rest }) => {
  const { logo } = useStoreState(state => ({
    logo: state.group.parentTheme?.logo ?? state.group.theme.logo,
  }));

  const inner = React.useMemo(
    () => (logo ? <GreyImage src={logo} /> : <ImageFallbackIcon />),
    [logo],
  );

  return React.createElement(ImageFallback, { ...rest }, inner);
};

export default FallbackImage;
