import * as React from "react";
import useRedirect from "common/hooks/useRedirect";
import useCurrentGroup from "common/hooks/useCurrentGroup";
import { Wrapper, IFrame, CloseIconButton, CloseButtonWrapper } from "./styled";

interface IProps {
  data: Moim.Group.IHTMLCover | Moim.Group.IURLCover;
  onClose(): void;
}

const IFrameCoverPage: React.FC<IProps> = ({ data, onClose }) => {
  const currentGroup = useCurrentGroup();
  const redirect = useRedirect();
  let srcDoc: string | undefined;
  let src: string | undefined;

  const groupUrlHostname = React.useMemo(() => {
    if (currentGroup) {
      return new URL(currentGroup.url).hostname;
    }
    return location.hostname;
  }, [currentGroup]);

  const handleReceiveMessage = React.useCallback(
    (e: MessageEvent) => {
      if (
        e.origin === location.origin ||
        (e.data.unicorn && e.data.unicorn === "moim-unicorn-command")
      ) {
        redirect(e.data.url);
      }
    },
    [groupUrlHostname, redirect],
  );

  const clickHook = React.useMemo(
    () => `
  <script type="text/javascript">
  document.addEventListener("DOMContentLoaded", function(){
    if (self !== top) {
      const aTags = document.getElementsByTagName("a");
      for(let tag of aTags) {
        if (tag.href) {
          tag.addEventListener("click", function(e){
            e.preventDefault();
            e.stopPropagation();
            self.parent.postMessage({ url: tag.href, unicorn: "moim-unicorn-command"}, self.parent.origin);
          })
        }
      }
    }
  });
  </script>
  `,
    [],
  );

  if (data.type === "html") {
    srcDoc = `${data.data.html} ${clickHook} <style type="text/css">${data.data.css}</style>`;
  } else {
    src = data.data.url;
  }

  React.useEffect(() => {
    window.addEventListener("message", handleReceiveMessage);
    return () => {
      window.removeEventListener("message", handleReceiveMessage);
    };
  }, [handleReceiveMessage]);

  return (
    <Wrapper>
      <IFrame srcDoc={srcDoc} src={src} />
      <CloseButtonWrapper>
        <CloseIconButton onClick={onClose} />
      </CloseButtonWrapper>
    </Wrapper>
  );
};

export default IFrameCoverPage;
