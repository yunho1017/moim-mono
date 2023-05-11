import styled, { createGlobalStyle } from "styled-components";
import { rgba, lighten } from "polished";
import { px2rem } from "common/helpers/rem";

export const Wrapper = styled.div`
  position: relative;
  max-width: 100%;
`;

export const VideoContainer = styled.video`
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
`;

export const PipWrapper = styled.div`
  cursor: pointer;
  position: absolute;
  bottom: ${px2rem(8)};
  right: ${px2rem(8)};
`;

export const PipButton = styled.button`
  width: ${px2rem(32)};
  height: ${px2rem(32)};
`;

export const Blurhash = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: ${props => props.theme.zIndexes.below};
`;

export const VideoJsGlobalStyle = createGlobalStyle<any>`
  .video-js.vjs-has-started:not(.vjs-controls-disabled) + ${PipWrapper} {
    transform: translateY(-${px2rem(30)}); // fallback for old browser
    transform: translate3d(0, -${px2rem(30)}, 0);
  }

  .video-js.vjs-has-started.vjs-user-inactive.vjs-playing + ${PipWrapper} {
    transform: translateY(0); // fallback for old browser
    transform: translate3d(0, 0, 0);
    transition: transform 1.2s;
  }

  .vjs-fullscreen + ${PipWrapper} {
    display: none;
  }

  .video-js {
    font-size: ${px2rem(10)} !important;
    color: ${props => props.theme.colorV2.colorSet.grey300} !important;
  }

  .vjs-default-skin .vjs-big-play-button {
    font-size: 2.75em !important;
    line-height: 2em !important;
    height: 2em !important;
    width: 2em !important;
    color: ${props => props.theme.colorV2.colorSet.white1000} !important;
    /* 0.06666em = ${px2rem(2)} default */
    border: 0.06666em solid ${props =>
      props.theme.colorV2.colorSet.white1000} !important;
    /* 0.3em = ${px2rem(9)} default */
    border-radius: 50% !important;

    /* Align center */
    left: 50% !important;
    top: 50% !important;
    margin-left: -1em !important;
    margin-top: -1em !important;
  }

  /* The default color of control backgrounds is mostly black but with a little
   bit of blue so it can still be seen on all-black video frames, which are common. */
  .video-js .vjs-control-bar,
  .video-js .vjs-menu-button .vjs-menu-content {
    background-color: ${props =>
      rgba(props.theme.colorV2.colorSet.grey300, 0.9)} !important;
  }

  .vjs-menu-item-text {
    color: white !important;
  }

  .vjs-menu li.vjs-selected,
  .vjs-menu li.vjs-selected:focus,
  .vjs-menu li.vjs-selected:hover {
    background-color: ${props =>
      rgba(props.theme.colorV2.colorSet.grey800, 0.9)} !important;
    color: ${props =>
      rgba(props.theme.colorV2.colorSet.grey800, 0.2)} !important
  }

  .vjs-control-bar::before {
    content: "";
    position: absolute;
    top:0;
    bottom: 0;
    left: 0;
    right:0;
    background-color: ${props =>
      rgba(props.theme.colorV2.colorSet.white1000, 0.9)};
  }

  .video-js .vjs-big-play-button {
    background-color: ${props =>
      rgba(props.theme.colorV2.colorSet.grey800, 0.2)} !important;
  }

  .video-js:hover .vjs-big-play-button,
  .video-js .vjs-big-play-button:focus {
    background-color: ${props =>
      rgba(props.theme.colorV2.colorSet.grey800, 0.2)} !important;
  }

  /* Slider - used for Volume bar and Progress bar */
  .video-js .vjs-load-progress,
  .video-js .vjs-load-progress div,
  .video-js .vjs-slider {
    background-color: ${props =>
      rgba(lighten(0.9, props.theme.colorV2.colorSet.grey50), 0.9)} !important;
  }

  /* The slider bar color is used for the progress bar and the volume bar
   (the first two can be removed after a fix that's coming) */
  .video-js .vjs-volume-level,
  .video-js .vjs-play-progress,
  .video-js .vjs-slider-bar {
    background: ${props => props.theme.colorV2.colorSet.grey300} !important;
  }
`;
