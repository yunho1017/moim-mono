import styled, { css, FlattenInterpolation } from "styled-components";
import { px2rem } from "common/helpers/rem";
import { rgba } from "polished";
import { H4BoldStyle } from "common/components/designSystem/typos";
import {
  buttonHeightMap,
  buttonPaddingMap,
} from "common/components/designSystem/buttons/data";
import { LoadingIcon } from "common/components/loading";
import { MEDIA_QUERY } from "common/constants/responsive";
import { useSingleLineStyle } from "common/components/designSystem/styles";
import { marginToPadding } from "../helper/blockitStyleHelpers";

export const Wrapper = styled.div<{
  width?: number;
  overrideStyle?: FlattenInterpolation<any>;
  margin?: Moim.Blockit.IBlockitMargin;
}>`
  ${props => marginToPadding(props.margin)};
  ${props => props.overrideStyle};
  position: relative;

  .fc-daygrid-body {
    ${props =>
      props.width &&
      css`
        width: ${props.width}px !important;
      `}
  }

  .fc-header-toolbar {
    margin: ${px2rem(20)} 0 !important;
    padding: 0 ${px2rem(16)} !important;
  }

  .fc-toolbar-title {
    ${H4BoldStyle};
    color: ${props => props.theme.colorV2.colorSet.grey800} !important;
  }

  .fc-today-button {
    font-size: ${px2rem(14)} !important;
    font-weight: ${props => props.theme.font.bold} !important;
    line-height: 1.36 !important;
    color: ${props => props.theme.colorV2.colorSet.grey800} !important;
    background-color: ${props =>
      props.theme.colorV2.colorSet.white1000} !important;
    border-radius: ${px2rem(4)} !important;
    padding: 0 ${px2rem(buttonPaddingMap.get("s")!)} !important;
    height: ${px2rem(buttonHeightMap.get("s")!)} !important;
    border: solid ${px2rem(1)} ${props => props.theme.colorV2.colorSet.grey300} !important;

    &:disabled {
      opacity: 0.4 !important;
    }
  }

  .fc-button-group {
    border-radius: ${px2rem(4)} !important;
    height: ${px2rem(buttonHeightMap.get("s")!)} !important;
    border: solid ${px2rem(1)} ${props => props.theme.colorV2.colorSet.grey300} !important;
  }

  .fc-prev-button {
    color: ${props => props.theme.colorV2.colorSet.grey800} !important;
    background-color: ${props =>
      props.theme.colorV2.colorSet.white1000} !important;
    border: none;
    border-right: solid ${px2rem(1)}
      ${props => props.theme.colorV2.colorSet.grey100} !important;
    padding: 0 ${px2rem(6)} !important;

    & .fc-icon {
      font-size: ${px2rem(14)};
    }
  }
  .fc-next-button {
    color: ${props => props.theme.colorV2.colorSet.grey800} !important;
    background-color: ${props =>
      props.theme.colorV2.colorSet.white1000} !important;
    border: none;
    border-left: solid ${px2rem(1)}
      ${props => props.theme.colorV2.colorSet.grey100} !important;
    padding: 0 ${px2rem(6)} !important;
    & .fc-icon {
      font-size: ${px2rem(14)};
    }
  }

  .fc-scrollgrid {
    border: solid ${px2rem(1)} ${props => props.theme.colorV2.colorSet.grey50} !important;
  }

  .fc-day-today {
    background-color: ${props =>
      rgba(props.theme.colorV2.accent, 0.06)} !important;

    & .fc-daygrid-day-number {
      color: ${props => props.theme.colorV2.colorSet.grey800} !important;
    }
  }

  .fc-more-popover {
    background-color: ${props =>
      props.theme.colorV2.colorSet.white1000} !important;
    @media ${MEDIA_QUERY.ONLY_MOBILE} {
      max-width: ${px2rem(230)} !important;
    }

    .fc-event-title {
      ${useSingleLineStyle}
    }
  }

  .fc-col-header-cell {
    border: solid ${px2rem(1)} ${props => props.theme.colorV2.colorSet.grey50} !important;
    border-bottom: none !important;

    & .fc-col-header-cell-cushion {
      color: ${props => props.theme.colorV2.colorSet.grey600} !important;
      font-size: ${px2rem(14)} !important;
      font-weight: ${props => props.theme.font.bold} !important;
      line-height: 1.36 !important;
    }
  }

  .fc-daygrid-day {
    border: solid ${px2rem(1)} ${props => props.theme.colorV2.colorSet.grey50} !important;
  }
  .fc-daygrid-day-number {
    color: ${props => props.theme.colorV2.colorSet.grey300} !important;
    font-size: ${px2rem(12)}!important;
    font-weight: ${props => props.theme.font.regular} !important;
    line-height: 1.33 !important;
    padding-right: ${px2rem(12)} !important;
    padding-top: ${px2rem(12)} !important;
  }

  .fc-daygrid-day-bottom {
    overflow: hidden !important;
    margin: ${px2rem(2)} ${px2rem(8)} ${px2rem(2)} ${px2rem(14)} !important;
  }

  .fc-daygrid-more-link {
    font-weight: ${props => props.theme.font.bold} !important;
    white-space: nowrap !important;
    overflow: hidden;
  }
  .fc-daygrid-block-event {
    margin-left: ${px2rem(4)} !important;
    margin-right: ${px2rem(4)} !important;
    padding: 0 ${px2rem(8)} 0 ${px2rem(10)} !important;
    height: ${px2rem(20)} !important;

    & .fc-event-time,
    & .fc-event-title {
      padding-left: 0 !important;
    }

    & * {
      line-height: ${px2rem(20)} !important;
      padding-top: 0 !important;
      padding-bottom: 0 !important;
      margin-top: 0 !important;
      margin-bottom: 0 !important;
    }
  }
  .fc-daygrid-dot-event {
    overflow: hidden;
    margin-left: ${px2rem(0)} !important;
  }
  .fc-daygrid-event {
    .fc-event-title {
      @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
        ${useSingleLineStyle}
      }
    }
  }
  .fc-daygrid-event-dot {
    margin: 0 ${px2rem(4)} !important;
    border-width: ${px2rem(3)};
  }

  .fc-day-sat,
  .fc-day-sun {
    background-color: ${props => props.theme.colorV2.colorSet.grey10};
  }
  .fc-theme-standard td,
  .fc-theme-standard th {
    border: none;
  }

  .fc-daygrid-dot-event {
    transition: opacity 300ms ease-in-out;
    &:hover {
      background-color: transparent !important;
      opacity: 0.6 !important;
    }
  }

  .fc-daygrid-block-event {
    transition: opacity 300ms ease-in-out;
    &:hover {
      opacity: 0.6 !important;
    }
  }
`;

export const Loader = styled(LoadingIcon)`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(-50);
`;
