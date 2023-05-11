import * as History from "history";

export interface ISettingLink {
  title: string;
  link: History.Location<Moim.IMatchParams>;
}
