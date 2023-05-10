export interface ISelectionConfig {
  type: "static" | "member" | "position" | "badge";
  useChip: boolean;
}

export interface IOption {
  value: Moim.Id;
  label: string;
  prefix?: {
    touch: number;
    leftMargin: number;
    rightMargin: number;
    element: React.ReactNode;
  };
  suffix?: React.ReactNode;
  chipColor?: string;
  isDisabled?: boolean;
}

export interface ISelectedOption extends Omit<IOption, "suffix" | "prefix"> {
  chipColor?: string;
}
