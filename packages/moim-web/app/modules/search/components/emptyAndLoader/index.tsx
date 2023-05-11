import * as React from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";
// icon
import SearchIconBase from "@icon/18-search-placeholder-g.svg";
import LoadingIcon from "common/components/loading/icon";
import { B1Regular } from "common/components/designSystem/typos";

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    margin-top: 30%;
  }
`;

const EmptyWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    transform: translate(0, 100%);
  }
`;

const SearchIcon = styled(SearchIconBase).attrs({ size: "s" })``;
const IconWrapper = styled.div`
  width: ${px2rem(48)};
  height: ${px2rem(48)};
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 100%;
  background-color: ${props => props.theme.colorV2.colorSet.grey50};
  margin-bottom: ${px2rem(6)};
`;

const TitleMessage = styled(B1Regular)`
  margin: 0 ${px2rem(16)};
  text-align: center;
  white-space: pre-line;
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const SearchEmpty: React.FC<{ query?: string }> = React.memo(({}) => (
  <EmptyWrapper>
    <IconWrapper>
      <SearchIcon />
    </IconWrapper>
    <TitleMessage>
      <FormattedMessage id="search_results/no_results" />
    </TitleMessage>
  </EmptyWrapper>
));

export const SearchLoader = React.memo(() => (
  <LoadingWrapper>
    <LoadingIcon />
  </LoadingWrapper>
));
