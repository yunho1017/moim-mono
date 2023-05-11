import { IChipOption } from "common/components/designSystem/selection/base/chip";

export interface IFontStyleOption extends IChipOption {
  value:
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
}

export const FONT_STYLE_ALIAS_OPTIONS: IFontStyleOption[] = [
  {
    label: "Heading 1",
    value: "h1",
  },
  {
    label: "Heading 2",
    value: "h2",
  },
  {
    label: "Heading 3",
    value: "h3",
  },
  {
    label: "Heading 4",
    value: "h4",
  },
  {
    label: "Heading 5",
    value: "h5",
  },
  {
    label: "Heading 6",
    value: "h6",
  },
  {
    label: "Heading 7",
    value: "h7",
  },
  {
    label: "Body 1(default)",
    value: "body1",
  },
  {
    label: "Body 2",
    value: "body2",
  },
  {
    label: "Body 3",
    value: "body3",
  },
  {
    label: "Caption",
    value: "caption",
  },
];

export interface IFontSizeOption extends IChipOption {
  value: "32" | "24" | "17" | "16" | "15" | "14" | "12";
}

export const FONT_SIZE_ALIAS_OPTIONS: IFontSizeOption[] = [
  {
    label: "32",
    value: "32",
  },
  {
    label: "24",
    value: "24",
  },
  {
    label: "16",
    value: "16",
  },
  {
    label: "14",
    value: "14",
  },
  {
    label: "12",
    value: "12",
  },
];
