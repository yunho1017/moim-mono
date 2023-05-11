import React from "react";
import styled, { css } from "styled-components";
import { FormattedMessage } from "react-intl";
// helper
import { MEDIA_QUERY } from "common/constants/responsive";
import { px2rem } from "common/helpers/rem";
import useIsMobile from "common/hooks/useIsMobile";
// components
import ShavedText from "common/components/blockitEditorBase/components/blockitRenderer/components/shavedText";
import { Spacer } from "common/components/designSystem/spacer";
// style
import { B3RegularStyle } from "common/components/designSystem/typos";
import { SectionTitle } from "../../styled";

export const DescWrapper = styled.div`
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    padding: ${px2rem(24)};
    background-color: ${props => props.theme.colorV2.colorSet.grey10};
    border-radius: ${px2rem(8)};
  }

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    padding: ${px2rem(2)} ${px2rem(16)} ${px2rem(8)};
  }
`;

const DescTxtStyle = css`
  width: 100%;

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    height: ${px2rem(190)};
    color: ${props => props.theme.colorV2.colorSet.grey600};
    white-space: pre-line;
    padding: 0;
    margin: 0;
    background-color: unset;
    ${B3RegularStyle}
  }

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    color: ${props => props.theme.colorV2.colorSet.grey300};
    white-space: pre-line;
    padding: 0;
    margin: 0;
    background-color: unset;
    ${B3RegularStyle}
  }
`;

interface PropsType {
  value: string;
}
const Description: React.FC<PropsType> = ({ value }) => {
  const isMobile = useIsMobile();
  const descTxt = React.useMemo(() => value.split("\\n").join("<br />"), [
    value,
  ]);

  if (!descTxt.length) return null;

  if (isMobile) {
    return (
      <DescWrapper>
        <ShavedText
          shaveLine={2}
          content={descTxt ?? ""}
          wrapperStyle={DescTxtStyle}
        />
      </DescWrapper>
    );
  }

  return (
    <DescWrapper>
      <SectionTitle>
        <FormattedMessage id="nft_show_description_title" />
      </SectionTitle>
      <Spacer value={15} />
      <ShavedText
        shaveLine={10}
        content={descTxt ?? ""}
        wrapperStyle={DescTxtStyle}
      />
    </DescWrapper>
  );
};

export default React.memo(Description);
