declare namespace Moim {
  declare namespace Promote {
    interface IBasePromote {
      status: "active" | "disabled";
      type: "banner" | "bottomSheet";
      backgroundColor: string;
      groupId: Id;
      id: Id;
      userId: Id;
      textSet: Record<
        string,
        Record<string, { singular: string; plural?: string }>
      >;
      image?: {
        web?: IImage;
        mobile?: IImage;
      };
      createdAt: number;
      updatedAt: number;
      targetUrl?: string;
      destinationUrl: string;
    }

    interface IAppDownload extends IBasePromote {
      clickCount: number;
      installCount: number;
      launchCount: number;
      viewCount: number;
      appIcon?: {
        web?: IImage;
        mobile: IImage;
      };
      textSet: {
        title: Record<string, { singular: string; plural?: string }>;
        openAppBtn: Record<string, { singular: string; plural?: string }>;
        closeBtn?: Record<string, { singular: string; plural?: string }>;
      };
    }

    interface IPopupBannerContent {
      id: string;
      image: {
        url: string;
        height?: number;
        width?: number;
        blurhash?: string;
      };
      url?: string;
      clickCount: number;
      showUnsignedUser?: boolean;
      showSignedUser?: boolean;
    }
    interface IPopupBanner {
      id: Id;
      groupId: Id;
      userId: Id;
      type: "dialog" | "bottomSheet";
      status: "active" | "disabled";
      contents: IPopupBannerContent[];
      contents_web: IPopupBannerContent[];
      createdAt: number;
      updatedAt: number;
    }
  }
}
