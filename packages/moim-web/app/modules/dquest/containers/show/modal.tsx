import * as React from "react";
import * as qs from "query-string";
import styled from "styled-components";
import DialogBase from "@material-ui/core/Dialog";
import withStyles from "@material-ui/core/styles/withStyles";
import { Redirect, useLocation } from "react-router";
import { replace, goBack } from "connected-react-router";
import { px2rem } from "common/helpers/rem";
import { IRouteComponentProps } from "app/routes/client";
import { useActions } from "app/store";
import useIsMobile from "common/hooks/useIsMobile";
import useOpenDQuestShowModal from "./hooks/useOpenDQuestShowModal";
import { MODAL_WIDTH, MODAL_GAP } from "common/layouts/listAndModal/constants";
import { getBGLevel2DialogStyle } from "common/components/designSystem/BGLevel/components/BGLevel2";
import { ModalContents as ModalContentsBase } from "common/layouts/listAndModal/components/desktop/modal/styled";
import { MoimURL } from "common/helpers/url";
import { MEDIA_QUERY } from "common/constants/responsive";
import { DQuestShowHeader } from "../../components/show/components";
import DQuestShow from ".";

const ModalContents = styled(ModalContentsBase)`
  display: flex;
  flex-direction: column;
`;

export const Dialog = styled(
  withStyles({
    paper: {
      margin: 0,
      borderRadius: px2rem(8),
      zIndex: 1001,
      width: "100%",
      maxWidth: px2rem(MODAL_WIDTH),

      [`@media ${MEDIA_QUERY.ONLY_DESKTOP}`]: {
        minHeight: px2rem(500),
      },

      [`@media ${MEDIA_QUERY.ONLY_MOBILE}`]: {
        height: "fit-content !important",
        minHeight: "100%",
        borderRadius: "0 !important",
      },
    },
    paperScrollPaper: {
      height: "fit-content",
      maxHeight: "initial",
      margin: `${px2rem(MODAL_GAP)} 0 `,
      borderRadius: px2rem(8),
      overflow: "initial",

      [`@media ${MEDIA_QUERY.ONLY_MOBILE}`]: {
        height: "100%",
        margin: 0,
        borderRadius: 0,
      },
    },
    container: {
      maxHeight: "initial",
      alignItems: "initial",
      overflow: "scroll",
    },
  })(DialogBase),
)`
  .MuiPaper-root {
    height: fit-content;

    @media ${MEDIA_QUERY.ONLY_DESKTOP} {
      border-radius: ${px2rem(8)};
      ${getBGLevel2DialogStyle({ borderRadius: 8 })};
    }

    @media ${MEDIA_QUERY.EXCEPT_DESKTOP} {
      border-radius: 0;
      ${getBGLevel2DialogStyle({ borderRadius: 0 })};
    }
  }
`;

interface IDQuestShowModalQueryParams {
  groupId?: Moim.Id;
  questId?: Moim.Id;
}

export const DQuestShowModalRedirect: React.FC<IRouteComponentProps> = ({
  match,
}) => {
  const openDQuestShowModal = useOpenDQuestShowModal();
  React.useLayoutEffect(() => {
    if (match.params.id) {
      openDQuestShowModal(match.params.id);
    }
  }, []);

  return <Redirect to={new MoimURL.QuestList().toString()} />;
};

const DQuestShowModal: React.FC = ({}) => {
  const isMobile = useIsMobile();
  const location = useLocation<any>();

  const queryParams = qs.parse(location.search, {
    arrayFormat: "bracket",
  }) as IDQuestShowModalQueryParams;
  const questId = queryParams.questId;

  const { dispatchReplace, dispatchGoBack } = useActions({
    dispatchReplace: replace,
    dispatchGoBack: goBack,
  });

  const handleClose = React.useCallback(() => {
    if ((location.state?.index ?? 0) > 1) {
      dispatchGoBack();
    } else {
      dispatchReplace(location.pathname);
    }
  }, [location.pathname, location.state?.index]);

  const handleModalContentsClick: React.MouseEventHandler<HTMLDivElement> = React.useCallback(
    e => {
      e.stopPropagation();
    },
    [],
  );

  return (
    <Dialog open={Boolean(questId)} fullScreen={isMobile} onClose={handleClose}>
      <ModalContents onClick={handleModalContentsClick}>
        <DQuestShowHeader questId={questId} onClose={handleClose} />
        <DQuestShow questId={questId} />
      </ModalContents>
    </Dialog>
  );
};

export default React.memo(DQuestShowModal);
