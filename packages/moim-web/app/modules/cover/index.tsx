import * as React from "react";
import { CSSTransition } from "react-transition-group";

import CoverHelmet from "./helmet";
import DefaultCoverPage from "./components/default";
import ImageCoverPage from "./components/image";
import IFrameCoverPage from "./components/iframe";
import { DefaultLoader as Loader } from "common/components/loading";
import { FadeTransitionGroup, TRANSITION_DURATION } from "./styled";

import useNavigationModalClose from "common/hooks/useNavigationModalClose";
import useIsModal from "common/hooks/useIsModal";
import useHooks from "./hooks";

export default function CoverPage() {
  const { cover, getCoverLoading } = useHooks();

  const handleClose = useNavigationModalClose();
  const isModal = useIsModal();

  const coverContents = React.useMemo(() => {
    if (getCoverLoading) {
      return <Loader />;
    }

    switch (cover?.content.type) {
      case "url":
      case "html":
        return <IFrameCoverPage data={cover.content} onClose={handleClose} />;
      case "image":
        return (
          <ImageCoverPage
            title={cover.group_id}
            cover={cover.content}
            onClose={handleClose}
          />
        );
    }
    return <DefaultCoverPage isModal={isModal} onClose={handleClose} />;
  }, [cover, getCoverLoading, handleClose, isModal]);

  return (
    <>
      <CoverHelmet />
      <FadeTransitionGroup>
        <CSSTransition
          unmountOnExit={true}
          timeout={TRANSITION_DURATION}
          classNames="fade"
        >
          {coverContents}
        </CSSTransition>
      </FadeTransitionGroup>
    </>
  );
}
