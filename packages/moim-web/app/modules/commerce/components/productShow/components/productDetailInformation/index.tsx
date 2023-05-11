import * as React from "react";
import styled from "styled-components";
import {
  B4RegularStyle,
  H10BoldStyle,
} from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";
import { FormattedMessage } from "react-intl";
import { MEDIA_QUERY } from "common/constants/responsive";

const Title = styled.div`
  padding: ${px2rem(6)} 0;
  width: 100%;
  color: ${props => props.theme.colorV2.colorSet.grey300};
  margin-bottom: ${px2rem(8)};
  ${H10BoldStyle};
`;

const Wrapper = styled.div`
  height: fit-content;
  border-radius: ${px2rem(2)};
  border: 1px solid ${props => props.theme.colorV2.colorSet.grey50};
  background-color: ${props => props.theme.colorV2.colorSet.grey10};
  padding: ${px2rem(18)} ${px2rem(16)};
  max-height: ${px2rem(375)};
`;

const Item = styled.div`
  display: flex;
  padding: ${px2rem(6)} 0;
  ${B4RegularStyle}

  .key {
    display: inline-block;
    color: ${props => props.theme.colorV2.colorSet.grey600};

    @media ${MEDIA_QUERY.ONLY_MOBILE} {
      width: ${px2rem(77)};
    }

    @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
      width: ${px2rem(232)};
    }
  }

  .value {
    display: inline-block;
    width: 100%;
    min-width: 0;
    flex: 1;

    color: ${props => props.theme.colorV2.colorSet.grey300};

    @media ${MEDIA_QUERY.ONLY_MOBILE} {
      margin-left: ${px2rem(4)};
    }

    @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
      margin-left: ${px2rem(11)};
    }
  }
`;

interface IProps {
  details?: Moim.Commerce.IProductDetail[];
}

const ProductDetailInformation: React.FC<IProps> = ({ details }) => {
  const elems = React.useMemo(() => {
    if (!details) return null;
    return details.map(item => (
      <Item key={item.key}>
        <span className="key">{item.key}</span>
        <span className="value">{item.value}</span>
      </Item>
    ));
  }, [details]);

  if (!details || details.length === 0) return null;
  return (
    <>
      <Title>
        <FormattedMessage id="product_show/product_detail_information" />
      </Title>
      <Wrapper>{elems}</Wrapper>
    </>
  );
};

export default React.memo(ProductDetailInformation);
