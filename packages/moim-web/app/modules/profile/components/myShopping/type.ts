export interface IMenu {
  key: string;
  label: React.ReactNode;
  icon: React.ReactNode;
  handler: () => void;
}
