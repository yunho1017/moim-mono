import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { FlatButton } from "common/components/designSystem/buttons";
import {
  B4RegularStyle,
  H8BoldStyle,
} from "common/components/designSystem/typos";
import { MEDIA_QUERY } from "common/constants/responsive";

export const TOOLBAR_HEIGHT = 88;

interface IProps {
  showRoster: boolean;
  showChat: boolean;
}

export const RootContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;

  > div {
    width: 100%;
    height: 100%;
  }

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    height: ${window.visualViewport
      ? px2rem(window.visualViewport.height)
      : "100%"};
  }
`;

export const StyledLayout = styled.div<IProps>`
  width: 100%;
  height: 100%;
  display: flex;

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    flex-direction: row;

    .mobile-toggle {
      display: none;
    }
  }

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    flex-direction: column;
  }

  .controls-menu {
    position: relative;
    width: 100%;
    height: ${px2rem(TOOLBAR_HEIGHT)};
    border-radius: inherit;
    overflow-x: auto;

    div[data-testid="control-bar-item"] {
      grid-template-columns: ${px2rem(75)} ${`minmax(${px2rem(5)}, auto)`};
      grid-template-rows: ${px2rem(24)} ${px2rem(16)};
    }

    .inner {
      display: inline-flex;
      width: 100%;
      flex: 1;
      min-width: 0;
    }

    .ch-control-bar-item-caret {
      // audio, video 옆 더보기 버튼
      width: ${px2rem(24)};
      height: ${px2rem(24)};
    }

    .ch-control-bar-item-iconButton {
      .ch-icon {
        width: ${px2rem(24)};
        height: ${px2rem(24)};
      }

      .ch-label {
      }
    }

    .ch-popover-menu {
      .ch-check {
        width: ${px2rem(24)};
        height: ${px2rem(24)};
      }

      .ch-content {
        ${B4RegularStyle}
      }
    }

    @media ${MEDIA_QUERY.ONLY_MOBILE} {
      .inner {
        height: 100%;
        overflow-x: auto;
        align-items: center;
      }
    }
    @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
      .inner {
        justify-content: center;
      }
    }
  }
`;

export const StyledContent = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
  flex: 1;

  .videos {
    width: 100%;
    height: 100%;
    min-width: 0;
    min-height: 0;
    flex: 1;
  }
  .controls {
  }
`;

export const LeaveButton = styled(FlatButton).attrs({ size: "m" })`
  background-color: ${props => props.theme.color.red700};
`;

export const GuideMessage = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: pre-wrap;
  flex-direction: column;
  ${H8BoldStyle}
`;
