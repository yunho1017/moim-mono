import React from "react";
import { Link } from "react-router-dom";
import { Wrapper, Header, KeywordList, Keyword } from "./styled";
import { MoimURL } from "common/helpers/url";
import Empty from "./empty";
import { useIntlShort } from "common/hooks/useIntlShort";

const SearchKeywordBlock: React.FC<{
  block: Moim.Group.ISearchKeywordsBlock;
  onClose?(): void;
}> = ({ block, onClose }) => {
  const intl = useIntlShort();
  return (
    <Wrapper>
      <Header>
        {block.header?.title ?? intl("search_recommend_keyword_title")}
      </Header>
      {block.contents.length ? (
        <KeywordList>
          {block.contents?.map((content, index) => (
            <Link
              key={`${content}_${index}`}
              to={new MoimURL.Search({ query: content }).toString()}
              onClick={onClose}
            >
              <Keyword shape="round" size="large">
                {content}
              </Keyword>
            </Link>
          ))}
        </KeywordList>
      ) : (
        <Empty />
      )}
    </Wrapper>
  );
};

export default SearchKeywordBlock;
