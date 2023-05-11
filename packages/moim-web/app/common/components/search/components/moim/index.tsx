import * as React from "react";
import ShavedText from "common/components/shavedText";
import GroupProfileImage from "common/components/groupProfileImage";
import ParsedText from "../parsedText";
import { Container } from "../styled";
import { Wrapper, AvatarHolder, Right, MoimName, MoimDesc } from "./styled";

interface IProps {
  moim: Moim.Group.ISearchedMoimBody;
}

const SearchMoim: React.FC<IProps> = ({ moim }) => {
  return (
    <Container>
      <Wrapper>
        <AvatarHolder>
          <GroupProfileImage size="l" icon={moim.icon} title={moim.name} />
        </AvatarHolder>
        <Right>
          <MoimDesc>
            <ShavedText
              value={<ParsedText content={moim.description || ""} />}
              line={1}
            />
          </MoimDesc>
          <MoimName>
            <ShavedText value={<ParsedText content={moim.name} />} line={1} />
          </MoimName>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default SearchMoim;
