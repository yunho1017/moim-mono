const LOCAL_STORAGE_KEY = "NOTIFICATION_REQUEST_BANNER_VISIBLE";

export function getVisibleFromLocalStorage() {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "true");
}

export function setVisibleFromLocalStorage(visible: boolean) {
  localStorage.setItem(LOCAL_STORAGE_KEY, `${visible}`);
}
