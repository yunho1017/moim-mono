import Quill from "quill";
import shortId from "shortid";
const Parchment = Quill.import("parchment");

/**
 * NOTE: 이 Attribute 클래스는 Quill이 가지고 있는 blot.format 속성에 attr:{} 을 유지 시켜주기 위한 목적으로 추가됐습니다.
 */
class AttrAttributor extends Parchment.ClassAttributor {
  private tmpValue: Record<string, any> = {};

  public constructor(attrName: string, keyName: string, options: any) {
    super(attrName, keyName, options);
  }

  public add(node: HTMLElement, value: any) {
    const id = shortId();
    this.tmpValue[id] = value;
    node.setAttribute("data-id", id);

    return true;
  }

  public value(node: HTMLElement) {
    const id = node.dataset.id;
    return id ? this.tmpValue[id] ?? undefined : undefined;
  }
}
const AttrClassAttribute = new AttrAttributor("attr", "ql-attr", {
  scope: Parchment.Scope.INLINE,
});

export default AttrClassAttribute;
