import * as React from "react";
import { css } from "styled-components";
import { HorizontalTagList } from "common/components/horizontalTagList";
import { Spacer } from "common/components/designSystem/spacer";

const CoinShowListStyle = css`
  position: relative !important;
  top: 0 !important;
`;

interface PropsType {}

const CoinFilter: React.FC<PropsType> = ({}) => {
  return (
    <>
      <Spacer value={8} />
      <HorizontalTagList
        tags={{
          Recently: ["CANDIDATE"],
          "3month": ["CANDIDATE"],
          filter03: ["CANDIDATE"],
          filter04: ["CANDIDATE"],
        }}
        sectionStyle={CoinShowListStyle}
        selectedTags={{}}
        disableFilterButton={true}
        // eslint-disable-next-line no-console
        onChangeSelectedTags={() => console.log("!!")}
      />
    </>
  );
};

export default React.memo(CoinFilter);
