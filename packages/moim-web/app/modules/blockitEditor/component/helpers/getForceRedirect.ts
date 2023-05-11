import { Location } from "history";
import { MoimURL } from "common/helpers/url";

export default function getForceRedirect(location: Location<any>) {
  return (
    MoimURL.SettingMoim.isSame(location.pathname) ||
    MoimURL.SettingSectionMoim.isSame(location.pathname) ||
    MoimURL.PersonalSettingMoim.isSame(location.pathname) ||
    MoimURL.PersonalSettingSectionMoim.isSame(location.pathname)
  );
}
