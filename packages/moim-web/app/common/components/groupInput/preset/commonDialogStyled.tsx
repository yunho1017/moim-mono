import styled from "styled-components";
// component
import CloseIconBase from "@icon/24-close-b.svg";
import { px2rem } from "common/helpers/rem";
import {
  GhostGeneralButton,
  FlatButton,
} from "common/components/designSystem/buttons";
import { MEDIA_QUERY } from "common/constants/responsive";
export { GroupInputDialog as Dialog } from "app/common/components/basicResponsiveDialog/styled";

export const Wrapper = styled.div`
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    width: 100%;
    height: 100%;
  }

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    padding: 0 ${px2rem(24)};
  }
`;

export const Inner = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  padding: 0 ${px2rem(16)} ${px2rem(36)};

  > :first-child {
    height: 100%;
    min-height: 0;
    flex: 1;
  }

  div[class^="AttachmentPreview"] {
    padding: 0 ${px2rem(8)};
  }

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    padding: 0 ${px2rem(16)} ${px2rem(16)};

    div[class^="AttachmentCellWrapper"][data-type="file"] {
      width: ${`calc(100% - ${px2rem(8)})`};
      min-width: 0;
    }
  }
`;

export const ButtonContainer = styled.div`
  display: flex;

  margin-top: ${px2rem(12)};

  button {
    flex: 1;
    width: 100%;
  }

  button + button {
    margin-left: ${px2rem(8)};
  }
`;

export const CancelButton = styled(GhostGeneralButton).attrs({ size: "m" })``;
export const PostButton = styled(FlatButton).attrs({ size: "m" })``;

export const CloseButton = styled(CloseIconBase).attrs(props => ({
  size: "s",
  touch: 44,
  iconColor: props.theme.colorV2.colorSet.grey800,
}))``;
