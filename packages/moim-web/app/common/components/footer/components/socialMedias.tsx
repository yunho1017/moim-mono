import * as React from "react";
import { px2rem } from "common/helpers/rem";
import styled from "styled-components";
import { rgba } from "polished";

const Wrapper = styled.div`
  width: 100%;
  padding: ${px2rem(8)} ${px2rem(10)};
  display: inline;
  align-items: center;
`;

const IconHolder = styled.a`
  width: ${px2rem(30)};
  height: ${px2rem(30)};
  display: inline-flex;
  align-items: center;
  justify-content: center;

  :hover {
    border-radius: ${px2rem(2)};
    background-color: ${props =>
      rgba(props.theme.colorV2.colorSet.grey600, 0.1)};
  }
`;
const Icon = styled.img`
  width: ${px2rem(18)};
  height: ${px2rem(18)};
`;

interface IProps {
  socialMedias: { icon: string; link: string }[];
}

const SocialMedias: React.FC<IProps> = ({ socialMedias }) => {
  const elements = React.useMemo(
    () =>
      socialMedias.map(item => (
        <IconHolder title={item.link} href={item.link}>
          <Icon src={item.icon} width="100%" height="100%" />
        </IconHolder>
      )),
    [socialMedias],
  );

  if (!socialMedias.length) return null;

  return <Wrapper>{elements}</Wrapper>;
};

export default SocialMedias;
