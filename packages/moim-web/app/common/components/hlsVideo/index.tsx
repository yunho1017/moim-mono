import * as React from "react";
import videojs, { VideoJsPlayerOptions } from "video.js";
import {
  Wrapper,
  VideoContainer,
  VideoJsGlobalStyle,
} from "./styledComponents";
import MediaLazyTransitionWrapper from "../mediaWrapper";
import ErrorBoundary from "common/components/errorBoundary";

const VIDEO_OPTION = {
  preload: "auto",
  html5: {
    nativeControlsForTouch: true,
    nativeAudioTracks: false,
    nativeTextTracks: false,
    nativeVideoTracks: false,
    hls: {
      overrideNative: true,
    },
  },
};

export interface IProps
  extends React.DetailedHTMLProps<
    React.VideoHTMLAttributes<HTMLVideoElement>,
    HTMLVideoElement
  > {
  sources: any; // @TODO: Change to alright source
  height?: number;
  width?: number;
  poster?: string;
  fluid?: boolean;
  previewColor?: string;
  blurHash?: string;
  isAudio?: boolean;
  disableSkeleton?: boolean;
  disableMediaOpacity?: boolean;
}

interface IState {
  pipButtonVisible: boolean;
}

class RawHlsVideo extends React.PureComponent<IProps, IState> {
  public state: IState = {
    pipButtonVisible: this.props.isAudio ? false : true,
  };

  private readonly videoRef = React.createRef<HTMLVideoElement>();
  private player: any = null;

  public componentWillUnmount() {
    if (this.player && this.videoRef.current) {
      this.player.dispose();
    }
  }

  public render() {
    const {
      previewColor,
      blurHash,
      width,
      height,
      style,
      disableSkeleton,
      disableMediaOpacity,
    } = this.props;
    const sources = this.getSources();
    return (
      <ErrorBoundary>
        <VideoJsGlobalStyle />
        <Wrapper style={style}>
          {sources.length && width && height ? (
            <MediaLazyTransitionWrapper
              src={sources[0].src}
              type="video"
              width={width}
              height={height}
              previewColor={previewColor}
              blurHash={blurHash}
              onSuccess={this.handleVideoSuccess}
              disableSkeleton={disableSkeleton}
              disableMediaOpacity={disableMediaOpacity}
            >
              {this.renderVideo()}
            </MediaLazyTransitionWrapper>
          ) : (
            <div>{this.renderVideo(true)}</div>
          )}
        </Wrapper>
      </ErrorBoundary>
    );
  }

  private readonly handleVideoSuccess = () => {
    if (!this.player && this.videoRef.current) {
      this.player = videojs(this.videoRef.current, this.getPlayerOptions());
    }
  };

  private readonly getSources = () => {
    const sources = this.props.sources;
    return sources.filter((v: any): v is NonNullable<typeof v> => Boolean(v));
  };

  private readonly renderSourceNodes = () =>
    this.getSources().map((source: any) => (
      <source src={source.src} type={source.type} key={source.src} />
    ));

  private readonly renderVideo = (afterVideoJSInit?: boolean) => {
    const {
      poster,
      fluid: _fluid,
      ref: _ref,
      style,
      className,
      sources,
      previewColor,
      blurHash,
      ...props
    } = this.props;

    if (afterVideoJSInit && !this.player && this.videoRef.current) {
      setTimeout(() => {
        requestAnimationFrame(() => {
          this.handleVideoSuccess();
        });
      }, 500);
    }

    return (
      <VideoContainer
        className={`video-js vjs-default-skin ${className ? className : ""}`}
        controlsList="nodownload"
        ref={this.videoRef}
        poster={poster}
        {...props}
      >
        {this.renderSourceNodes()}
      </VideoContainer>
    );
  };

  private readonly getPlayerOptions = (): VideoJsPlayerOptions => {
    const { height, width, poster, fluid } = this.props;
    return {
      ...VIDEO_OPTION,
      height,
      width,
      poster,
      fluid: !!fluid,
      playbackRates: [0.25, 0.5, 1, 1.5, 2],
      aspectRatio: width && height ? `${width}:${height}` : "16:9",
    } as VideoJsPlayerOptions;
  };
}
export default RawHlsVideo;
