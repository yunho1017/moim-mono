declare namespace Moim {
  declare namespace Setting {
    interface ISettingMenu {
      text: string;
      location: string;
      color?: string;
      openNewTab?: boolean;
      isParentMenu?: boolean;
      isChildMenu?: boolean;
      childMenus?: ISettingMenu[];
    }
  }
}
