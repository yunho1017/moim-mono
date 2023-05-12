declare namespace Moim {
  namespace Layout {
    namespace Navigation {
      type ElementType =
        | WrapperElementType
        | CurrentGroupProfileElementType
        | SubMoimProfileElementType
        | MenuElementType
        | SearchElementType
        | CurrentUserElementType;

      interface WrapperElementType {
        type: "wrapperElement";
        size?:
          | {
              type: "ratio";
              value: number;
            }
          | {
              type: "percentage";
              value: number;
            }
          | {
              type: "fixed";
              value: number;
            }
          | {
              type: "fit-contents";
            };
        minWidth?:
          | {
              type: "percentage";
              value: number;
            }
          | {
              type: "fixed";
              value: number;
            };
        maxWidth?:
          | {
              type: "percentage";
              value: number;
            }
          | {
              type: "fixed";
              value: number;
            };
        padding?: {
          left?: number;
          right?: number;
          top?: number;
          bottom?: number;
        };
        align?: "center" | "left" | "right";
        children: TopNaviElement[];
      }
      interface CurrentGroupProfileElementType {
        type: "currentGroupProfileElement";
      }

      interface SubMoimProfileElementType {
        type: "subMoimProfileElement";
      }
      interface MenuElementType {
        type: "menuElement";
      }
      interface SearchElementType {
        type: "searchElement";
      }
      interface CurrentUserElementType {
        type: "currentUserElement";
      }
    }
  }
}
