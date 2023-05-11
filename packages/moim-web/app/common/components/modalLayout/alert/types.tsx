export interface IButton {
  text: React.ReactNode;
  disabled?: boolean;
  textColor?: string;
  onClick: () => void;
}
