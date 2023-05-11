import uniq from "lodash/uniq";
import {
  MY_MOIM_LIST_KEY,
  MAXIMUM_COOKIE_EXPIRED_TIME,
} from "common/constants/keys";
import * as CookieHandler from "common/helpers/cookieHandler";
import safeParseJSON from "common/helpers/safeParseJSON";

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class MyMoimManager {
  public static getUserMoim(): Moim.Group.IMyMoim[] {
    const encodeItem = CookieHandler.get(MY_MOIM_LIST_KEY);

    if (encodeItem) {
      return safeParseJSON(encodeItem, []);
    }

    return [];
  }

  public static addUserMoim(moims: Moim.Group.IMyMoim[]) {
    const newUserMoim = uniq([...MyMoimManager.getUserMoim(), ...moims]);

    CookieHandler.set(MY_MOIM_LIST_KEY, JSON.stringify(newUserMoim), {
      expires: MAXIMUM_COOKIE_EXPIRED_TIME,
    });
  }

  public static deleteUserMoim(moims: string[]) {
    const newUserMoim = MyMoimManager.getUserMoim().filter(
      ({ id }) => !moims.includes(id),
    );

    CookieHandler.set(MY_MOIM_LIST_KEY, JSON.stringify(newUserMoim));
  }

  public static compareUserMoim(moims: string[]) {
    const newUserMoim = MyMoimManager.getUserMoim().filter(({ id }) =>
      moims.includes(id),
    );

    CookieHandler.set(MY_MOIM_LIST_KEY, JSON.stringify(newUserMoim));
  }
}

export function generateMyMoim(
  moim: Moim.Group.IGroupWithUser,
): Moim.Group.IMyMoim {
  return {
    id: generateMyMoimKey(moim),
    name: moim.group.name,
    domain: moim.group.domain,
  };
}

export function generateMyMoimKey(moim: Moim.Group.IGroupWithUser) {
  return `${moim.group.id}_${moim.user.id}`;
}
