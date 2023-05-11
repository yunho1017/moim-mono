import * as React from "react";
import { Link } from "react-router-dom";
import { useSingleLineStyle } from "common/components/designSystem/styles";
import { B4RegularStyle } from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";
import styled from "styled-components";

const BreadCrumbs = styled.div`
  color: ${props => props.theme.colorV2.colorSet.grey600};
  padding: ${px2rem(2)} 0;
  ${B4RegularStyle};
  ${useSingleLineStyle};
`;

interface IProps {
  linkTo: string;
  text: string;
}
const BreadCrumb: React.FC<IProps> = ({ linkTo, text }) => {
  if (!text) return null;

  return (
    <BreadCrumbs>
      <Link to={linkTo}>{text}</Link>
    </BreadCrumbs>
  );
};

export default React.memo(BreadCrumb);
