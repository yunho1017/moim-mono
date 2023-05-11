import * as React from "react";
import * as ReactDOM from "react-dom";
import memoize from "lodash/memoize";
import {
  FormattedMessage,
  FormattedDate,
  FormattedTime,
  injectIntl,
  WrappedComponentProps,
} from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import keycode from "keycode";
// interfaces
import { AppDispatch } from "app/store";
import { IAppState } from "app/rootReducer";
// helper
import Freeze from "app/common/helpers/freeze";
import * as EnvChecker from "common/helpers/envChecker";
// actions
import { ActionCreators as ImageBrochureActionCreators } from "./actions";
// components
import ResponsiveMenu from "common/components/responsiveMenu";
import {
  MenuWrapper as ResponsiveMenuWrapper,
  MenuItem,
} from "common/components/responsiveMenu/components/menu";
import AppBar from "common/components/appBar";
import MenuWrapper from "common/components/appBar/components/menuWrapper";
import ZNDImage from "./components/zoomAndDragImage";
import { userSelector } from "app/selectors/user";
import { fileSelector } from "app/selectors/file";
import Share from "common/components/share";
import DownloadButton from "common/components/downloadButton";
import {
  BrochureWrapper,
  AppBarStickyWrapperStyle,
  AppBarWrapperStyle,
  Header,
  LeftWrapper,
  TitleInnerWrapper,
  TitleWrapper,
  Title,
  SubTitle,
  ContentWrapper,
  Background,
  CloseButton,
  ShareButton,
  DownloadIconButton,
  MenuDownloadButton,
  MenuShareButton,
  ZoomInButton,
  ZoomOutButton,
  LeftArrowContainer,
  RightArrowContainer,
  ArrowWrapper,
  ArrowIcon,
  PageIndex,
} from "./styledComponents";
import IsMobileViewport, {
  IRefHandler,
} from "common/components/isMobileViewport";

const ZOOM_SCOPE_RATE = 0.1;

const HEADER_HEIGHT = 70;

function mapStateToProps(state: IAppState) {
  const user = userSelector(state, state.imageBrochure.currentAssetOwnerId);
  return {
    isOpen: state.imageBrochure.isOpen,
    initialSrc: state.imageBrochure.initialSrc,
    owner: user,
    state,
  };
}

function mapDispatchToProps(dispatch: AppDispatch) {
  return bindActionCreators(
    {
      closeBrochure: ImageBrochureActionCreators.closeImageBrochure,
    },
    dispatch,
  );
}

interface IProps
  extends ReturnType<typeof mapStateToProps>,
    ReturnType<typeof mapDispatchToProps>,
    WrappedComponentProps {}

interface IState {
  currentMedia: HTMLImageElement | HTMLVideoElement | null;
  mediaType: string | null;
  fileDatum: Moim.Upload.IDenormalizedFile | null;
  currentMediaIndex: number;
  openResponsiveMenu: boolean;
  zoomRate: number;
}

class ImageBrochureContainer extends React.PureComponent<IProps, IState> {
  public state: IState = {
    currentMedia: null,
    fileDatum: null,
    mediaType: null,
    currentMediaIndex: 0,
    openResponsiveMenu: false,
    zoomRate: 0,
  };
  private medias: (HTMLImageElement | HTMLVideoElement)[] = [];
  private readonly freezer: Freeze = new Freeze();
  private readonly refResponsiveMenuWrapper = React.createRef<
    HTMLUListElement
  >();
  private readonly refIsMobile = React.createRef<IRefHandler>();

  public componentDidUpdate(prevProps: IProps) {
    if (EnvChecker.isBrowser()) {
      this.preventScrollByOpenState();
      const stateFromCloseToOpen = !prevProps.isOpen && this.props.isOpen;
      const stateFromOpenToClose = prevProps.isOpen && !this.props.isOpen;

      if (stateFromCloseToOpen) {
        const selectedImageElement = document.querySelector<HTMLImageElement>(
          "img[data-brochure-selected=true]",
        );
        const selectedVideoElement = document.querySelector<HTMLVideoElement>(
          "video[data-brochure-selected=true]",
        );

        const selectedElement = selectedImageElement || selectedVideoElement;

        if (selectedElement) {
          selectedElement.dataset.brochureSelected = undefined;
          this.medias = Array.from(
            document.querySelectorAll<HTMLImageElement | HTMLVideoElement>(
              `img[data-role="${selectedElement.dataset.role}"], video[data-role="${selectedElement.dataset.role}"]`,
            ),
          );

          this.setState({
            mediaType: selectedImageElement ? "image" : "animated-image",
            currentMedia: selectedElement,
            fileDatum: fileSelector(
              this.props.state,
              selectedElement.dataset.fileId!,
            ),
            currentMediaIndex: this.medias.findIndex(
              imageElement => imageElement === selectedElement,
            ),
          });
        }
      } else if (stateFromOpenToClose) {
        this.setState({
          currentMedia: null,
          mediaType: null,
          currentMediaIndex: 0,
          openResponsiveMenu: false,
        });
      }
    }
  }

  public render() {
    return this.props.isOpen
      ? ReactDOM.createPortal(
          <BrochureWrapper>
            {this.renderHeader()}
            {this.renderContent()}
            <IsMobileViewport ref={this.refIsMobile} />
          </BrochureWrapper>,
          document.body,
        )
      : null;
  }

  private readonly preventScrollByOpenState = () => {
    if (this.props.isOpen) {
      this.freezer.on();
      window.addEventListener("keydown", this.handleKeyDown);
    } else {
      this.freezer.off();
      window.removeEventListener("keydown", this.handleKeyDown);
    }
  };

  private readonly handleKeyDown: React.EventHandler<any> = e => {
    if (e.keyCode === keycode("esc")) {
      // ESC
      this.handleCloseBrochure();
    } else if (e.keyCode === keycode("left")) {
      // LEFT
      this.movePrevImage();
    } else if (e.keyCode === keycode("right")) {
      // RIGHT
      this.moveNextImage();
    }
  };

  private readonly handleZoomIn = () => {
    this.setState({ zoomRate: this.state.zoomRate + ZOOM_SCOPE_RATE });
  };
  private readonly handleZoomOut = () => {
    const val = this.state.zoomRate - ZOOM_SCOPE_RATE;
    if (val > -0.9) {
      this.setState({ zoomRate: this.state.zoomRate - ZOOM_SCOPE_RATE });
    }
  };

  private readonly renderHeader = () => {
    const { initialSrc } = this.props;
    const { openResponsiveMenu, fileDatum, currentMedia } = this.state;
    const owner = fileDatum?.user ?? this.props.owner;

    const createdAt = fileDatum?.created_at
      ? new Date(fileDatum.created_at)
      : null;
    const isMobile = this.isMobile();
    const fileUrl =
      fileDatum?.url_private ?? currentMedia?.src ?? initialSrc ?? "";
    const canDownload = fileUrl && new URL(fileUrl).pathname !== "/";
    const fileName =
      currentMedia?.src.split("/").pop() ??
      fileDatum?.title ??
      initialSrc.split("/").pop() ??
      "";
    const hideActionButton =
      this.state.currentMedia?.dataset.hideActionButton === "true";
    return (
      <Header>
        <AppBar
          wrapperStyle={AppBarWrapperStyle}
          wrapperStickyStyle={AppBarStickyWrapperStyle}
          leftButton={
            isMobile && (
              <LeftWrapper>
                <CloseButton onClick={this.handleCloseBrochure} />
              </LeftWrapper>
            )
          }
          titleElement={
            owner &&
            owner.id && (
              <TitleWrapper>
                <TitleInnerWrapper>
                  <Title>{owner.name}</Title>
                  <SubTitle>
                    {createdAt && (
                      <>
                        <FormattedDate value={createdAt} />{" "}
                        <FormattedTime value={createdAt} />
                      </>
                    )}
                  </SubTitle>
                </TitleInnerWrapper>
              </TitleWrapper>
            )
          }
          rightButton={
            !hideActionButton ? (
              <MenuWrapper
                onClickMoreMenu={this.openResponsiveMenu}
                enableSmartShorten={true}
                moreIconColor="white"
              >
                <ZoomInButton role="button" onClick={this.handleZoomIn} />
                <ZoomOutButton role="button" onClick={this.handleZoomOut} />

                <DownloadButton
                  key="download_button"
                  resourceUrl={fileUrl}
                  fileName={fileName}
                  disable={!canDownload}
                >
                  <DownloadIconButton disable={!canDownload} />
                </DownloadButton>
                <Share
                  displayText={<ShareButton key="share_button" />}
                  copyValue={fileUrl}
                />

                {!isMobile && (
                  <CloseButton onClick={this.handleCloseBrochure} />
                )}
              </MenuWrapper>
            ) : (
              !isMobile && <CloseButton onClick={this.handleCloseBrochure} />
            )
          }
        />
        <ResponsiveMenu
          open={openResponsiveMenu}
          minHeight={this.getContentHeight(
            this.refResponsiveMenuWrapper.current,
          )}
          onCloseRequest={this.closeResponsiveMenu}
        >
          <ResponsiveMenuWrapper ref={this.refResponsiveMenuWrapper}>
            <MenuItem key="download_button">
              <MenuDownloadButton
                key="download_button"
                resourceUrl={fileUrl}
                fileName={fileName}
              >
                <FormattedMessage id="media_detail/more_menu_save" />
              </MenuDownloadButton>
            </MenuItem>
            <MenuItem key="share_button">
              <Share
                displayText={
                  <FormattedMessage id="media_detail/more_menu_share" />
                }
                displayTextWrapper={MenuShareButton}
                copyValue={fileUrl}
              />
            </MenuItem>
          </ResponsiveMenuWrapper>
        </ResponsiveMenu>
      </Header>
    );
  };

  private readonly openResponsiveMenu = () => {
    this.setState({ openResponsiveMenu: true });
  };
  private readonly closeResponsiveMenu = () => {
    this.setState({ openResponsiveMenu: false });
  };

  private readonly renderContent = () => {
    const { mediaType } = this.state;
    return (
      <ContentWrapper>
        <Background onClick={this.handleCloseBrochure} />
        {mediaType === "image"
          ? this.renderImage()
          : this.renderAnimatedImage()}
        {!this.isFirstImage() && (
          <LeftArrowContainer>
            <ArrowWrapper>
              <ArrowIcon onClick={this.movePrevImage} />
            </ArrowWrapper>
          </LeftArrowContainer>
        )}
        {!this.isLastImage() && (
          <RightArrowContainer>
            <ArrowWrapper>
              <ArrowIcon onClick={this.moveNextImage} />
            </ArrowWrapper>
          </RightArrowContainer>
        )}
        {this.medias.length > 1 && (
          <PageIndex>
            <span>
              {this.state.currentMediaIndex + 1}/{this.medias.length}
            </span>
          </PageIndex>
        )}
      </ContentWrapper>
    );
  };

  private readonly handleZoomChange = (inZoom: boolean) => {
    if (!inZoom) {
      this.setState({
        zoomRate: 0,
      });
    }
  };

  private readonly renderImage = () => {
    const targetMedia = this.state.currentMedia as HTMLImageElement;

    if (!targetMedia) {
      return;
    }
    return (
      <ZNDImage
        src={targetMedia.src}
        srcSet={targetMedia.srcset}
        adjustZoomOffset={this.state.zoomRate}
        onZoomChange={this.handleZoomChange}
        onClickDragWrapper={this.handleCloseBrochure}
      />
    );
  };

  private readonly renderAnimatedImage = () => {
    const targetMedia: HTMLVideoElement = this.state
      .currentMedia as HTMLVideoElement;

    if (!targetMedia) {
      return;
    }

    const { width, height } = this.getCalculatedRatioSize(
      targetMedia.videoWidth,
      targetMedia.videoHeight,
    );

    return (
      <video
        className={"video-js vjs-default-skin"}
        style={{ width, height }}
        autoPlay={true}
        muted={true}
        loop={true}
        src={targetMedia.src}
      />
    );
  };

  private readonly isMobile = () => Boolean(this.refIsMobile.current?.isMobile);

  private readonly handleCloseBrochure = () => {
    this.setState({ zoomRate: 0 });
    this.props.closeBrochure();
  };

  private readonly isLastImage = () =>
    this.state.currentMediaIndex ===
    (this.medias.length !== 0 ? this.medias.length - 1 : 0);

  private readonly isFirstImage = () => this.state.currentMediaIndex === 0;

  private readonly movePrevImage = () => {
    if (this.isFirstImage()) {
      return;
    }

    const prevIndex = this.state.currentMediaIndex - 1;
    this.setState({
      currentMedia: this.medias[prevIndex],
      currentMediaIndex: prevIndex,
      zoomRate: 0,
      fileDatum: fileSelector(
        this.props.state,
        this.medias[prevIndex].dataset.fileId!,
      ),
    });
  };

  private readonly moveNextImage = () => {
    if (this.isLastImage()) {
      return;
    }
    const nextIndex = this.state.currentMediaIndex + 1;
    this.setState({
      currentMedia: this.medias[nextIndex],
      currentMediaIndex: nextIndex,
      zoomRate: 0,
      fileDatum: fileSelector(
        this.props.state,
        this.medias[nextIndex].dataset.fileId!,
      ),
    });
  };

  private readonly getCalculatedRatioSize = (width: number, height: number) => {
    let reWidth = width;
    let reHeight = height;
    if (reWidth > innerWidth) {
      reHeight = (reHeight / reWidth) * innerWidth;
      reWidth = innerWidth;
    }

    if (reHeight > innerHeight - HEADER_HEIGHT) {
      reWidth = (reWidth / reHeight) * (innerHeight - HEADER_HEIGHT);
      reHeight = innerHeight - HEADER_HEIGHT;
    }

    return {
      width: reWidth,
      height: reHeight,
    };
  };

  // eslint-disable-next-line @typescript-eslint/member-ordering
  private readonly getContentHeight = memoize((elem: Element | null) =>
    elem ? elem.clientHeight : undefined,
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(ImageBrochureContainer));
