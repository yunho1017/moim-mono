import * as React from "react";
import { Link } from "react-router-dom";
import { getCommerceCategorySelector } from "app/selectors/commerce";
import { useStoreState } from "app/store";
import { useSingleLineStyle } from "common/components/designSystem/styles";
import { B4RegularStyle } from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";
import { MoimURL } from "common/helpers/url";
import styled from "styled-components";

const BreadCrumbs = styled.div`
  color: ${props => props.theme.colorV2.colorSet.grey600};
  padding: ${px2rem(2)} 0;
  ${B4RegularStyle};
  ${useSingleLineStyle};
`;

interface IProps {
  resourceId: string;
}
const BreadCrumb: React.FC<IProps> = ({ resourceId }) => {
  const category = useStoreState(state =>
    getCommerceCategorySelector(state, resourceId),
  );

  if (!category) {
    return null;
  }

  return (
    <BreadCrumbs>
      <Link
        to={new MoimURL.CommerceCategories({
          id: category.id,
          section: "products",
        }).toString()}
      >
        {category.name}
      </Link>
    </BreadCrumbs>
  );
};

export default React.memo(BreadCrumb);
