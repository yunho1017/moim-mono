import * as React from "react";
import Quill from "quill";
import * as qs from "query-string";
import { createPortal } from "react-dom";
import { v4 } from "uuid";
import useRedirect from "common/hooks/useRedirect";
import { SEARCH_FIELD_FILTER } from "../constants";

const Inline = Quill.import("blots/inline");

const DATA_ID_KEY = "data-id";
const DATA_PLACE_ID_KEY = "data-place-id";

interface IBlotData {
  needLinkPreview?: boolean;
  hasLinkPreview: boolean;
  link: string;
  placeId: Moim.Id;
}

const LinkItem = React.memo(
  React.forwardRef<
    { getData: () => any },
    {
      node: IBlotData;
      readOnly: boolean;
      parentElement: HTMLElement;
    }
  >(({ node, readOnly, parentElement }, ref) => {
    const { link } = node;
    const redirect = useRedirect();

    const handleClick = React.useCallback(
      (e: any) => {
        e.preventDefault();
        if (!readOnly) return;

        const nl = new URL(link);

        if (nl.hostname === location.hostname) {
          const nlQuery = qs.parse(nl.search, {
            arrayFormat: "bracket",
          });

          const currentLocationQuery = qs.parse(location.search, {
            arrayFormat: "bracket",
          });

          const nextLocationQuery = qs.parse(nl.search, {
            arrayFormat: "bracket",
          });

          SEARCH_FIELD_FILTER.forEach(key => {
            delete currentLocationQuery[key];
          });

          nl.search = qs.stringify({
            ...nlQuery,
            ...currentLocationQuery,
            ...nextLocationQuery,
          });
        }

        redirect(nl.toString());
      },
      [redirect, link, readOnly],
    );

    React.useImperativeHandle(ref, () => ({
      getData: () => ({
        ...node,
        placeId: node.placeId,
      }),
    }));

    React.useLayoutEffect(() => {
      parentElement.addEventListener("click", handleClick);
      return () => {
        parentElement.removeEventListener("click", handleClick);
      };
    }, [parentElement, handleClick]);

    return null;
  }),
);

export class Link extends Inline {
  public static blotName = "link";
  public static tagName = "a";
  public static className = "ql-link";
  public static ref = {};

  public static create(value: any) {
    const node = super.create(value);
    const id = v4();

    node.setAttribute(DATA_ID_KEY, id);
    node.setAttribute(DATA_PLACE_ID_KEY, value.placeId ?? id);
    node.setAttribute("data-needLinkPreview", value.needLinkPreview ?? true);
    node.setAttribute("data-hasLinkPreview", value.hasLinkPreview);
    // NOTE: dont remove this. Quill recognize to link by href property
    node.setAttribute("href", typeof value === "string" ? value : value.link);
    Link.data = {
      ...value,
      placeId: value.placeId ?? id,
    };
    Link.refs = {
      ...Link.refs,
      [id]: React.createRef(),
    };

    return node;
  }

  public static formats(domNode: any) {
    return {
      link: domNode.getAttribute("href"),
      needLinkPreview: Boolean(domNode.dataset.needlinkpreview === "true"),
      hasLinkPreview: Boolean(domNode.dataset.haslinkpreview === "true"),
      placeId: domNode.dataset.placeId,
    };
  }

  public attach() {
    super.attach();
    this.id = this.domNode.getAttribute(DATA_ID_KEY);
    this.placeId = this.domNode.getAttribute(DATA_PLACE_ID_KEY);
    this.data = Link.data;
    this.scroll.emitter.emit("blot-mount", this);
  }

  public detach() {
    super.detach();
    this.scroll.emitter.emit("blot-unmount", this);
  }

  public renderPortal(id: string) {
    const quill = Quill.find(this.scroll.domNode.parentNode);
    const ref = Link.refs[id];

    return createPortal(
      <LinkItem
        ref={ref}
        node={this.data}
        readOnly={quill.options.readOnly}
        parentElement={this.domNode}
      />,
      this.domNode,
    );
  }
}
