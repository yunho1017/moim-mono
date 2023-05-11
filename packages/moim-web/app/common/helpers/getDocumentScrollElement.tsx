import getParentScrollElement from "common/helpers/getParentScrollElement";

export default function getDocumentScrollElement(element: HTMLElement | null) {
  return (
    getParentScrollElement(element) ||
    (document.scrollingElement as HTMLElement) ||
    document.documentElement
  );
}
