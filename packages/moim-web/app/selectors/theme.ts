import { IAppState } from "app/rootReducer";
import { createSelector } from "reselect";
import elementTheme2ColorSet from "app/theme/helpers/elementTheme2ColorSet";

/*
Note: 새로운 element가 추가될때
Moim.Group.IElementTheme
Moim.Theme.IElementTheme
element 가져오는 함수 추가하기 (/app/theme/index.tsx)
divier (app/common/components/divider/styled.tsx)
timer (app/common/components/designSystem/timer/styled.ts, app/common/components/designSystem/timer/styled.ts)
profile (app/common/components/userProfileImage/index.tsx)
*/

export const elementThemePaletteGenerator = (
  palette: Moim.Group.IThemePalette,
  element: Moim.Group.IElementTheme,
) => ({
  topArea: {
    background: elementTheme2ColorSet(palette, element.topArea.background),
    moimNameText: elementTheme2ColorSet(palette, element.topArea.moimNameText),
    menuText: elementTheme2ColorSet(palette, element.topArea.menuText),
    others: elementTheme2ColorSet(palette, element.topArea.others),
  },
  topSubArea: {
    background: elementTheme2ColorSet(palette, element.topSubArea.background),
    childMoimNameText: elementTheme2ColorSet(
      palette,
      element.topSubArea.childMoimNameText,
    ),
    menuText: elementTheme2ColorSet(palette, element.topSubArea.menuText),
  },
  sideArea: {
    background: elementTheme2ColorSet(palette, element.sideArea.background),
    childMoimNameText: elementTheme2ColorSet(
      palette,
      element.sideArea.childMoimNameText,
    ),
    categoryTitleText: elementTheme2ColorSet(
      palette,
      element.sideArea.categoryTitleText,
    ),
    menuText: elementTheme2ColorSet(palette, element.sideArea.menuText),
    others: elementTheme2ColorSet(palette, element.sideArea.others),
  },
  alert: {
    alertBadge: elementTheme2ColorSet(palette, element.alert.alertBadge),
  },
  buttons: {
    button: elementTheme2ColorSet(palette, element.buttons.button),
  },
  reactionButtons: {
    like: elementTheme2ColorSet(palette, element.reactionButtons.like),
    dislike: elementTheme2ColorSet(palette, element.reactionButtons.dislike),
  },
});

export const sideNavigationThemePaletteSelector = createSelector(
  (state: IAppState) => state.group.theme,
  (theme): Moim.Theme.IElementThemePalette => {
    const { element, palette } = theme;

    return elementThemePaletteGenerator(palette, element);
  },
);
