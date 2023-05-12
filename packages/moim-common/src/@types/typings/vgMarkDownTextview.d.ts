declare namespace Moim {
  declare namespace VGMarkDownTextView {
    type MENTION_TYPE = "@" | "#";

    interface ISelectionState {
      selectionStart: number;
      selectionEnd: number;
    }

    interface ILinkerToken {
      origin: string;
      offset: number;
      length: number;
      type: "link";
      data: {
        value: string;
        href: string;
        isPreview?: boolean;
      };
    }

    interface IMentionToken {
      origin: string;
      offset: number;
      length: number;
      type: "mention";
      data: {
        id: string;
        display: string;
        fallback?: string;
        type: "channel" | "user";
      };
    }
    interface IStyleTextToken {
      origin: string;
      offset: number;
      length: number;
      type:
        | "bold"
        | "italic"
        | "codeBlock"
        | "inlineCode"
        | "emoji"
        | "nativeEmoji"
        | "mark"
        | "highlight";
      data: {
        value: string;
        innerStyles: IToken[];
      };
    }

    interface ITextToken {
      offset: number;
      length: number;
      type: "text";
      data: {
        value: string;
      };
    }

    interface IAttrTagShard {
      offset: number;
      length: number;
      matchText: string;
      innerStyles?: IToken[];
    }

    interface IAttrProperty {
      "font-color"?: string;
      "background-color"?: string;
      "font-weight"?: number;
      "font-size"?: Blockit.TEXT_SUB_TYPE | number;
      italic?: boolean;
      code?: boolean;
      [string]?: any;
    }

    interface IAttrTextToken {
      origin: string;
      offset: number;
      length: number;
      type: "attr";
      data: {
        value: string;
        properties: IAttrProperty;
        innerStyles?: IToken[];
      };
    }

    type IStyledToken =
      | IStyleTextToken
      | IAttrTextToken
      | ILinkerToken
      | IMentionToken;

    type IToken = ITextToken | IStyledToken;
  }
}
