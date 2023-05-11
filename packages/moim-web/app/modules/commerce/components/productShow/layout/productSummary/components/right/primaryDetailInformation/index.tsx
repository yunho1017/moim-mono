import * as React from "react";
import styled from "styled-components";
import { B3Regular } from "common/components/designSystem/typos";

import ProductSummaryElementWrapper from "../../wrapper";
import { px2rem } from "common/helpers/rem";

const Wrapper = styled(ProductSummaryElementWrapper)`
  width: 100%;
`;

const Item = styled(B3Regular)`
  padding: ${px2rem(6)} 0;
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 0;
  justify-items: start;
  align-items: baseline;
  color: ${props => props.theme.colorV2.colorSet.grey300};

  .value {
    color: ${props => props.theme.colorV2.colorSet.grey800};
  }
`;

interface IProps {
  details?: Moim.Commerce.IProductDetail[];
  block: Moim.Component.ProductShow.IPrimaryDetails;
}

const ProductPrimaryDetailInformation: React.FC<IProps> = ({
  details = [],
  block,
}) => {
  const elems = React.useMemo(() => {
    return details?.map(item => (
      <Item key={item.key}>
        <span className="key">{item.key}</span>
        <span className="value">{item.value}</span>
      </Item>
    ));
  }, [details]);

  if (!details || !details.length) return null;

  return (
    <Wrapper hasBottomDivider={Boolean(block.dividerConfig?.hasBottomDivider)}>
      {elems}
    </Wrapper>
  );
};

export default React.memo(ProductPrimaryDetailInformation);
