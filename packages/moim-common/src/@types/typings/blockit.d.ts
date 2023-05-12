declare namespace Moim {
  declare namespace Blockit {
    type BLOCKIT_SIZE_ALIAS = "large" | "medium" | "small";
    type ColorValue =
      | "primary_main"
      | "primary_light"
      | "primary_dark"
      | "secondary_main"
      | "secondary_light"
      | "secondary_dark"
      | "BLACK"
      | "WHITE"
      | string;
    type TEXT_SUB_TYPE =
      | "h1"
      | "h2"
      | "h3"
      | "h4"
      | "h5"
      | "h6"
      | "h7"
      | "body1"
      | "body2"
      | "body3"
      | "caption";

    interface IItemCellConfig {
      thumbnailPosition: "top" | "left" | "right" | "bottom";
      thumbnailPosition_web: "top" | "left" | "right" | "bottom";
    }

    interface IListStyleElement {
      // 이전 버전 호환
      type?: "grid" | "scroll";
      type_web?: "grid" | "scroll";

      scrollable?: boolean; // default: false
      scrollable_web?: boolean; // default: false
      itemStackDirection?: "horizontal" | "vertical";
      itemStackDirection_web?: "horizontal" | "vertical";
      scrollDirection?: "horizontal" | "vertical";
      scrollDirection_web?: "horizontal" | "vertical";
      rowCount: number; // default: 1
      rowCount_web: number; // default: 1
      columnCount: number; // default: 1
      columnCount_web: number; // default: 1
      maxDisplayedItemsCount?: number; // default: undefined
      maxDisplayedItemsCount_web?: number; // default: undefined
      itemGutterSize?: number; // TBD px unit
      itemGutterSize_web?: number; // TBD px unit
    }

    interface ImageMetadata {
      blur_hash?: string; // NOTE: temporary
      blurHash?: string;
      width: number;
      height: number;
      ratio?: string;
      imageHref?: string; // NOTE: for imageBlock
      mimetype?: string;
    }

    interface ImageSrcProps {
      src: string;
      srcXs?: string;
      srcSm?: string;
      srcMd?: string;
      srcLg?: string;
      srcXl?: string;
      srcSet?: string;
      fallbackSrc?: string;
    }

    type ImageProps = ImageMetadata & ImageSrcProps;

    interface IBlockitStyle {
      border?: {
        color?: string;
        width: number; // default 0
        radius: number; // default 0
      };
    }

    interface IButtonBlockElement {
      type: "flat" | "ghost" | "text";
      style: "primary" | "general" | "custom";
      content: string;
      size?: BLOCKIT_SIZE_ALIAS;
      status?: "enabled" | "disabled" | "activated";
      textColor?: string;
      backgroundColor?: string;
      outlineColor?: string;
    }

    interface BaseInputBlock {
      required?: boolean;
      placeholder?: string;
      initialValue?: string | number;
      validationExpression?: string;
      validationErrorMessage?: string;
    }

    interface IInputTextBlock extends BaseInputBlock {
      type: "text-input";
      isRichText?: boolean;
      isMultiline?: boolean;
      minLength?: number;
      maxLength?: number;
    }

    interface IInputNumberBlock extends BaseInputBlock {
      type: "number-input";
      minValue?: number;
      maxValue?: number;
      decimalPlaces?: number;
    }

    interface IInputCheckBoxBlock extends BaseInputBlock {
      type: "check-box-input";
      initialChecked?: boolean;
    }

    interface ISelectOption {
      value: string | number;
      label: string;
      description?: string;
      url?: string;
    }

    interface IInputStaticSelectBlock extends BaseInputBlock {
      type: "static-select-input";
      options: ISelectOption[];
    }

    interface IInputUserSelectBlock extends BaseInputBlock {
      type: "user-select-input";
      valueType?: "id" | "canId" | "canUsername";
    }

    interface IInputChannelSelectBlock extends BaseInputBlock {
      type: "channel-select-input";
    }

    interface IInputPositionSelectBlock extends BaseInputBlock {
      type: "position-select-input";
    }

    interface IInputDateSelectBlock extends BaseInputBlock {
      type: "date-select-input";
      format?: string;
    }

    interface PluginParams {
      [key: string]: string | number | any;
    }

    interface IBlockitMargin {
      left?: number;
      right?: number;
      top?: number;
      bottom?: number;
    }

    type BlockitBackgroundType = "default" | "brand-colored" | "image" | "none";

    interface IBlockitBorder {
      color?: string;
      thickness?: number;
      radius?: number;
    }

    interface IBaseHeader {
      title?: string;
      description?: string;
      showTitle: boolean;
      showDescription: boolean;
      showMoreButton: boolean;
      titleElement?: Omit<ITextBlock, "type">;
      descriptionElement?: Omit<ITextBlock, "type">;
    }

    interface IBaseFooter {
      moreButtonText?: string;
      showMoreButton: boolean;
      moreTextButtonElement?: Omit<ITextBlock, "type">;
    }

    interface BaseBlock {
      botId?: string;
      margin?: IBlockitMargin;
      actionId?: Id; // 해당 블럭 click 시 action 호출
      params?: PluginParams;
      sectionWidth?: "fit-container" | number; // Default: fit-container, unix: %
      sectionMaxWidth?: number; // Default: undefined, unix: px
      sectionMinWidth?: number; // Default: undefined, unix: px
      header?: IBaseHeader; // 블럭 header에 들어 갈 title, description, on/off 값
      footer?: IBaseFooter; // 블럭 footer(더보기 버튼)에 들어갈 text, on/off 값
      // TO BE DELETED
      contentWidth?: "fit-container" | number; // Default: fit-container, unix: %
    }

    type IBlockAlignment = "left" | "center" | "right";
    interface ITextBlock extends BaseBlock {
      type: "text";
      content: string;
      align?: IBlockAlignment;
      color?: string;
      background?: BlockitBackgroundType;
      padding?: IBlockitMargin;
      border?: IBlockitBorder;
      textSets?: Record<string, Moim.Group.IGroupTextSet>;
      subType?: TEXT_SUB_TYPE;
    }

    interface ITagSetBlock extends BaseBlock {
      type: "tagSet";
      setId: Id;
      valueId: Id;
      content: string;
    }

    interface IFileBlock extends BaseBlock {
      type: "file";
      files: IFileItem[];
    }

    interface IFileItem {
      id: Id;
      title: string;
      preview?: ImageMetadata;
    }

    interface ILinkPreviewBlock extends BaseBlock, Optional<ImageMetadata> {
      type: "link-preview";
      url: string; // https://bit.ly/2BHWJ2n
      canonical_url: string; // https://www.youtube.com/watch?v=IWJUPY-2EIM
      title: string; // Red Velvet 레드벨벳 'RBB (Really Bad Boy)' MV
      fallback: string; // Youtube: Red Velvet 레드벨벳 'RBB (Really Bad Boy)' MV
      description?: string; // Red Velvet's the 5th mini album "RBB" is out! Listen and download on iTunes & Apple Music, Spotify, and Google Play Music http://smarturl.it/RBB [Tracklist] ...
      published_at?: number; // 1583102069052
      site: {
        name: string; // Youtube
        icon?: string; // https://a.slack-edge.com/80588/img/unfurl_icons/youtube.png
        url?: string; // https://youtube.com/
      };
      author?: {
        name: string; // SMTOWN
        url?: string; // https://www.youtube.com/user/SMTOWN
      };
      embed?: {
        html: string; // <iframe width="400" height="225" src="https://www.youtube.com/embed/IWJUPY-2EIM?feature=oembed&autoplay=1&iv_load_policy=3" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        url: string; // https://www.youtube.com/embed/IWJUPY-2EIM?feature=oembed&autoplay=1&iv_load_policy=3
        width: number; // 400
        height: number; // 225
      };
      thumb?: {
        blurhash: string;
        preview_color: string;
        url: string; // https://i.ytimg.com/vi/IWJUPY-2EIM/hqdefault.jpg
        width: number;
        height: number;
      };
    }

    interface IButtonBlock extends BaseBlock {
      type: "button";
      element: IButtonBlockElement;
    }

    interface IContextBlock extends BaseBlock {
      type: "context";
      headline?: {
        content: string;
        color?: string;
      };
      body?: {
        content: string;
        color?: string;
      };
      caption: {
        content: string;
        color?: string;
      };
    }

    interface ISectionBlock extends BaseBlock {
      type: "section";
      columnCount?: number;
      blocks?: Blocks[];
    }

    interface IFormBlock extends BaseBlock {
      type: "form";
      buttons: {
        submit: IButtonBlockElement;
        cancel?: IButtonBlockElement;
      };
      blocks: Blocks[];
      confirm?: {
        message: string;
        showCancelButton: boolean;
      };
    }

    type IInputBlockChangeEvent = (
      value: string | number | boolean,
      validation: string | undefined,
      e: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
    ) => void;

    interface IInputBlock extends BaseBlock {
      type: "input";
      name: string;
      label: string;
      element: InputBlockElements;
      description?: string;
      onChange?: IInputBlockChangeEvent;
    }

    interface ILineBlock extends BaseBlock {
      type: "line";
      backgroundColor: string;
      fillColor: string;
      fillWidth: number;
      height: number;
    }

    interface IReferenceBlock extends BaseBlock {
      type: "reference";
      blockId: Id;
      replaceId: Id;
      params: PluginParams;
      isReplaceHome?: boolean; // NOTE: this is front-web use only
    }

    interface IListBlock extends BaseBlock {
      type: "list";
      blockId: Id;
      actionId: Id;
      params: PluginParams;
      paging?: {
        after: PagingValue;
      };
      blocks: Blocks[];
      headerBlocks?: Blocks[];
    }

    interface IListItemBase {
      avatarType: "square" | "round";
      size: BLOCKIT_SIZE_ALIAS;
      align: "left" | "right";
      title?: Omit<ITextBlock, "type">;
      bottomDescription?: Omit<ITextBlock, "type">;
      rightDescription?: Omit<ITextBlock, "type">;
      rightTitleDescription?: Omit<ITextBlock, "type">;
    }

    interface IItemCellBlock extends BaseBlock, IListItemBase {
      type: "itemCell";
      title: Omit<ITextBlock, "type">;
      avatarUrl?: string;
    }

    interface IBiTextItemCellBlock extends BaseBlock {
      type: "binaryTextItemCell";
      ratio: "1:1" | "1:2"; // default: 1:2
      left: Omit<ITextBlock, "type">;
      right: Omit<ITextBlock, "type">;
    }

    interface IProfileBlock extends BaseBlock, IListItemBase {
      type: "profile";
      userId?: Id;
      canUserId?: Id;
    }

    interface IShavedText extends BaseBlock {
      type: "shavedText";
      content: string;
    }

    interface ITimerBlock extends BaseBlock {
      type: "timer";
      style: "default" | "brand-colored" | "image";
      imageUrl?: string; // required when style is image
      textSets?: Record<string, Moim.Group.IGroupTextSet>;
      beforeStart?: {
        chips?: string; // if empty, Date Time of startDateTime
        content?: string;
        scope?: "days" | "hours" | "minutes" | "seconds";
      };

      onGoing?: {
        chips?: string; // if empty, Date Time of startDateTime
        scope?: "days" | "hours" | "minutes" | "seconds";
      };

      afterEnd?: {
        chips?: string; // if empty, Date Time of endDateTime
        content?: string;
      };

      startDateTime: string; // ISO8601 Date time
      endDateTime: string;
    }

    interface ILoadingBlock {
      type: "loading";
    }

    interface IPositionsBlock {
      type: "positions";
      chipSize: BLOCKIT_SIZE_ALIAS;
      maxLine?: number;
    }

    interface ICryptoBadgesBlock {
      type: "badges";
      badgeSize: BLOCKIT_SIZE_ALIAS;
      showTitle: boolean;
      maxLine?: number;
    }

    interface IProfileDQuestBlock {
      type: "DQuest-list-preview";
    }

    interface ICalendarBlockEvent {
      id: string;
      start: string;
      end: string;
      title: string;
      isAllDay: boolean;
      location?: string;
      description?: string;
      attendees: {
        accepted: { name: string; email: string }[];
        declined: { name: string; email: string }[];
        needsAction: { name: string; email: string }[];
      };
      eventLink?: string;
      meetLink?: string;
      zoomLink?: string;
    }

    interface ICalendarBlock extends BaseBlock {
      type: "calendar";
      events?: ICalendarBlockEvent[];
      eventSource?: string;
      width?: number;
      height?: number;
    }
    interface IGridBlock extends BaseBlock {
      type: "grid";
      minColumn: number;
      maxColumn: number;
      blocks: Block[];
      backgroundColor?: string;
      borderColor?: string;
    }

    interface IChipBlock extends BaseBlock {
      type: "chip";
      content: string;
      style: "square" | "round";
      size: BLOCKIT_SIZE_ALIAS;
      color: string;
    }

    interface IImageBlock extends BaseBlock, ImageProps {
      type: "image";
      imageHref?: string;
      fileId?: string;
    }

    interface ICarouselImage extends ImageProps {
      imageSrc?: string; // NOTE: deprecated soon
      href?: string;
    }

    interface ICarouselBlock extends BaseBlock {
      type: "carousel";
      images: ICarouselImage[];
      images_web: ICarouselImage[];
      style: {
        width: number; // base unit is px
        height: number; // base unit is px
        showBottomIndicate: boolean;
        showSideArrowButton: boolean;
      };
      interval: number; // milliseconds, default 3000ms
      style_web: {
        width: number; // base unit is px
        height: number; // base unit is px
        showBottomIndicate: boolean;
        showSideArrowButton: boolean;
      };
      interval_web: number; // milliseconds, default 3000ms
    }

    interface HorizontalBlock extends BaseBlock {
      blocks: Block[];
      align?: IBlockAlignment;
    }

    interface ISingleLineHorizontalBlock extends HorizontalBlock {
      type: "single-line-horizontal-block";
    }

    interface IMultiLineHorizontalBlock extends HorizontalBlock {
      type: "multi-line-horizontal-block";
    }

    interface IMenuBlock extends BaseBlock {
      title: string;
      caption?: string;
      icon?: string;
      badgeCount?: number;
      hasMore?: boolean;
      style: "default" | "strong";
      subType?: TEXT_SUB_TYPE; // default: body2
    }

    interface IMenuWrapBlock extends BaseBlock {
      type: "menu";
      menus: IMenuBlock[];
    }

    interface IMeetingBlock extends BaseBlock {
      type: "meeting";
      name: string;
      previewAttendees: Id[];
      attendeesCount: number;
      status: "open" | "end";
      meetingId: Id;
      startAt?: number;
      endAt?: number;
      blocks: Block[]; // Note: always have a button as Join
    }

    interface IBannerBlock extends BaseBlock {
      type: "banner";

      text?: {
        content: string;
        subType: TextSubTypes;
        align?: IBlockAlignment;
      };

      background: {
        type: "none" | ColorValue | "image";
      } & ImageProps;

      href?: string;
      border: boolean; // on/off fixed style border
    }

    interface ContentGroupElement extends BaseBlock {
      title?: string;
      description?: string;
      resourceId: string;
    }

    interface IPostListShowConfig {
      showAuthor: boolean;
      showAuthorAvatar: boolean;
      showCommentCount: boolean;
      showDate: boolean;
      showReaction: boolean;
      reactionType: "up" | "updown";
      showThumbnail: boolean;
      showTitle: boolean;
      showText: boolean;
      textAlignment: Forum.ForumListConfigTextAlignment;
      thumbnailConfig: {
        type: "ratio";
        value: string;
        position: "left" | "right" | "top" | "bottom";
      };
      tagSets?: string[];
      tagSetFilterType?: "ICON" | "NAVIGATION";
      columnCount?: number;
      mobileColumnCount?: number;
      convertibleColumnCount?: number[];
      mobileConvertibleColumnCount?: number[];
      viewType?:
        | "post" // default
        | "compact-conversation"
        | "magazine" // TBD
        | "comment" // TBD
        | "message-bubble"; // TBD
      viewType_web?:
        | "post" // default
        | "compact-conversation"
        | "magazine" // TBD
        | "comment" // TBD
        | "message-bubble"; // TBD
    } // Note: data from forum(channel)'s list_config field.

    interface IContentGroupPreviewBlock extends ContentGroupElement {
      type: "content-group-preview";
      listElement: IListStyleElement & { maxDisplayedItemsCount: number };
      listShowConfig: IPostListShowConfig;
      resourceId?: string;
      query?: ContentsGroup.IQuery;
    }

    interface IContentGroupBlock extends ContentGroupElement {
      type: "content-group";
      listElement: IListStyleElement;
      listShowConfig: IPostListShowConfig;
    }

    interface IContentGroupPreviewBlock extends ContentGroupElement {
      type: "content-group-preview";
    }

    interface ChildMoimGroupElement extends BaseBlock {
      title: string;
      description?: string;
      resourceId: string;
      query?: Moim.ContentsGroup.IQuery;
    }

    interface IChildMoimGroupListPreviewBlock extends ChildMoimGroupElement {
      type: "child-moim-group-preview";
      listElement: IListStyleElement & { maxDisplayedItemsCount: number };
    }

    interface IChildMoimGroupListBlock extends ChildMoimGroupElement {
      type: "child-moim-group";
      listElement: IListStyleElement;
    }

    interface IDquestGroupItemStyle {
      isShowOutcomeRow: boolean;
      isShowPeriodRow: boolean;
      isShowProgressRow: boolean;
    }

    interface IDQuestGroupListPreviewBlock extends BaseBlock {
      type: "dquest-group-preview";
      resourceId: string;
      listElement: IListStyleElement & { maxDisplayedItemsCount: number };
      itemStyle: IDquestGroupItemStyle;
      itemStyle_web?: IDquestGroupItemStyle;
    }

    interface IBlocks {
      blocks: Blocks[];
      isLoading?: boolean;
      params?: PluginParams;
      paging?: {
        after?: PagingValue;
      };
    }

    type INormalizedReferenceBlockBlocks = INormalizedEntities<IBlocks>;

    interface INormalizedFileBlock {
      type: "file";
      files: Id[];
    }

    interface IQuickLinkItem {
      title: string;
      href: string;
      priority: number; // Initial value: 9999999
      image?: ImageProps;
      description?: string;
    }

    interface IQuickLinkNavigationBlock extends BaseBlock {
      type: "quick-link-navigation";
      listElement: IListStyleElement;
      navigationItems: IQuickLinkItem[];
      itemStyle?: {
        border?: {
          color?: ColorValue;
          width: number; // default 0
          radius: number; // default 0
        };
      };
      itemStyle_web?: {
        border?: {
          color?: ColorValue;
          width: number; // default 0
          radius: number; // default 0
        };
      }; // TBD
    }

    interface INftSetPreview extends BaseBlock {
      type: "nft-set-preview";
      title: string;
      description?: string;
      resourceId: string;
      listElement: IListStyleElement;
      listShowConfig: NFT.INftItemShowConfig;
    }

    interface INftCollectionItem extends BaseBlock {
      type: "nft-collection-item";
      resourceId: string;
      showConfig: NFT.INftCollectionItemShowConfig;
    }
    interface INftSummary extends BaseBlock {
      type: "nft-summary";
      resourceId: string;
      showConfig: NFT.INftSummaryShowConfig;
    }

    interface IUserNftPreview {
      type: "nft-list-preview";
    }

    interface ITreasuryItemBlock extends BaseBlock {
      type: "treasury-item";
      resourceId: string;
      showConfig: Treasury.ITreasuryItemShowConfig;
    }

    interface ICryptobadgeGroupPreview extends BaseBlock {
      type: "cryptobadge-group-preview";
      title: string;
      description?: string;
      resourceId: string;
      listElement: IListStyleElement;
      listShowConfig: Cryptobadge.ICryptobadgeGroupPreviewConfig;
    }

    interface IEmbedProductListBlock extends BaseBlock {
      type: "embed-product-list";
      productIds: string[];
    }

    type InputBlockElements =
      | IInputTextBlock
      | IInputNumberBlock
      | IInputCheckBoxBlock
      | IInputStaticSelectBlock
      | IInputUserSelectBlock
      | IInputChannelSelectBlock
      | IInputPositionSelectBlock
      | IInputDateSelectBlock;

    type Blocks =
      | ITextBlock
      | ITagSetBlock
      | IFileBlock
      | ILinkPreviewBlock
      | IButtonBlock
      | IContextBlock
      | ISectionBlock
      | IFormBlock
      | IInputBlock
      | ILineBlock
      | IReferenceBlock
      | ITimerBlock
      | ILoadingBlock
      | IListBlock
      | IProfileBlock
      | IItemCellBlock
      | IShavedText
      | IPositionsBlock
      | ICryptoBadgesBlock
      | IProfileDQuestBlock
      | ICalendarBlock
      | IGridBlock
      | IChipBlock
      | IImageBlock
      | ICarouselBlock
      | ISingleLineHorizontalBlock
      | IMultiLineHorizontalBlock
      | IMenuWrapBlock
      | IMeetingBlock
      | IBannerBlock
      | Commerce.ICategoryBlock
      | Commerce.IProductListBlock
      | Commerce.IProductListPreviewBlock
      | Commerce.IDownloadableCouponList
      | Campaign.ICampaignSummaryPreviewBlock
      | Campaign.ICampaignRequestFundPreviewBlock
      | IQuickLinkNavigationBlock
      | IContentGroupPreviewBlock
      | IContentGroupBlock
      | IBiTextItemCellBlock
      | IEmbedProductListBlock
      | IChildMoimGroupListPreviewBlock
      | IChildMoimGroupListBlock
      | IDQuestGroupListPreviewBlock
      | INftSetPreview
      | IUserNftPreview
      | INftSummary
      | INftCollectionItem
      | ITreasuryItemBlock
      | ICryptobadgePreviewBlock;

    type NormalizedBlocks =
      | ITextBlock
      | ITagSetBlock
      | INormalizedFileBlock
      | ILinkPreviewBlock
      | IButtonBlock
      | IContextBlock
      | ISectionBlock
      | IFormBlock
      | IInputBlock
      | ILineBlock
      | IReferenceBlock
      | ITimerBlock
      | IImageBlock
      | ILoadingBlock;

    interface IOnCloseActionBehavior {
      actionId: string;
      params: PluginParams;
    }

    interface IReplaceActionResponse {
      actionType: "replace";
      actionData: {
        blockId: Id;
        botId: Id;
        blocks: Blocks[];
      }[];
    }

    interface IOpenModalActionResponse {
      actionType: "open-modal";
      actionData: {
        title: string;
        blocks: Blocks[];
        modalId?: Id;
        onClose?: IOnCloseActionBehavior;
      };
    }

    interface ICloseModalActionResponse {
      actionType: "close-modal";
      actionData: {
        modalId?: Id;
      };
    }

    interface IShowToastActionResponse {
      actionType: "show-toast";
      actionData: {
        toastType: "success" | "alert";
        toastMessage: string;
      };
    }

    interface IAlertDialogActionResponse {
      actionType: "show-alert-dialog";
      actionData: {
        alertMessage: string;
      };
    }

    interface INewWindowActionResponse {
      actionType: "new-window";
      actionData: {
        url: string;
        width?: number;
        height?: number;
        onClose?: IOnCloseActionBehavior;
      };
    }

    interface IAppendActionResponse {
      actionType: "append";
      actionData: {
        blockId: Id;
        blocks: Blocks[];
      }[];
    }

    interface IUpdateActionResponse {
      actionType: "update";
      actionData: {
        blockId: Id;
        properties: { [key: string]: any };
      }[];
    }

    interface IPushRightPanelActionResponse {
      actionType: "push-right-panel";
      actionData: {
        title: string;
        blocks: Blocks[];
        modalId?: Id;
        onClose?: IOnCloseActionBehavior;
      };
    }

    interface ICloseRightPanelActionResponse {
      actionType: "close-right-panel";
      actionData: {
        modalId?: Id;
      };
    }

    type IBlockActionResponse =
      | IReplaceActionResponse
      | IOpenModalActionResponse
      | ICloseModalActionResponse
      | IShowToastActionResponse
      | IAlertDialogActionResponse
      | INewWindowActionResponse
      | IAppendActionResponse
      | IUpdateActionResponse
      | IPushRightPanelActionResponse
      | ICloseRightPanelActionResponse;
  }
}
