import * as React from "react";

export function getTitle(param: {
  title: React.ReactNode;
  mobileTitle: React.ReactNode;
  isSettingListPage: boolean;
  isMobile?: boolean;
}) {
  const { title, isSettingListPage, isMobile } = param;

  if (isMobile) {
    if (isSettingListPage) {
      return null;
    }

    // Todo: 앱바 구조 변경 되면 삭제
    // return mobileTitle;
  }

  return title;
}
