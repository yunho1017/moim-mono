import * as React from "react";
import uuid from "uuid";
// hooks
import useCurrentGroup from "common/hooks/useCurrentGroup";
// components
import LinkTexts from "./components/linkText";
import SocialMedias from "./components/socialMedias";
import BlockitRenderer from "common/components/blockitEditorBase/components/blockitRenderer";
import { Wrapper, blockWrapStyle } from "./styled";

const Footer: React.FC = ({}) => {
  const currentMoim = useCurrentGroup();

  const contactElement = React.useMemo(
    () =>
      currentMoim?.footer?.contact && (
        <BlockitRenderer
          block={{
            type: "text",
            subType: "caption",
            content: currentMoim?.footer?.contact,
            background: "none",
          }}
          key={`footer_block_${uuid()}`}
          wrapperStyle={blockWrapStyle}
        />
      ),
    [currentMoim],
  );

  const copyrightElement = React.useMemo(
    () =>
      currentMoim?.footer?.copyright && (
        <BlockitRenderer
          block={{
            type: "text",
            subType: "caption",
            content: currentMoim?.footer?.copyright,
            background: "none",
          }}
          key={`footer_block_${uuid()}`}
          wrapperStyle={blockWrapStyle}
        />
      ),
    [currentMoim],
  );

  // NOTE: below this two moim is TBD, it should be delete after footer data ready.
  if (!currentMoim || !currentMoim.footer) {
    return null;
  }

  return (
    <Wrapper>
      <LinkTexts linkObjects={currentMoim.footer?.content || []} />
      {contactElement}
      <SocialMedias socialMedias={currentMoim.footer?.socialMedia || []} />
      {copyrightElement}
    </Wrapper>
  );
};

export default Footer;
