// TODO: 일정이 촉박해서 일단 새로운 컴포넌트로 만듬 추후에 기존 Vertical Footer랑 통합해서 관리 필요
import * as React from "react";
// hooks
import useCurrentGroup from "common/hooks/useCurrentGroup";
// components
import LinkTexts from "./components/linkText";
import BlockitRenderer from "common/components/blockitEditorBase/components/blockitRenderer";
import {
  Wrapper,
  ContactElementWrapper,
  CopyrightElementWrapper,
  blockWrapStyle,
  contactBlockWrapStyle,
} from "./styled";

const BottomFooter: React.FC = ({}) => {
  const currentMoim = useCurrentGroup();

  const contactElement = React.useMemo(
    () =>
      currentMoim?.footer?.bottomContact && (
        <BlockitRenderer
          block={{
            type: "text",
            subType: "caption",
            content: currentMoim?.footer?.bottomContact,
            background: "none",
          }}
          key="bottom_footer_contact_block"
          wrapperStyle={contactBlockWrapStyle}
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
          key="bottom_footer_copyright_block"
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
      <ContactElementWrapper title={currentMoim?.footer?.bottomContact}>
        {contactElement}
      </ContactElementWrapper>
      <CopyrightElementWrapper>{copyrightElement}</CopyrightElementWrapper>
    </Wrapper>
  );
};

export default BottomFooter;
