import * as React from "react";
import { createPortal } from "react-dom";
import Quill from "quill";
import shortid from "shortid";
import { css } from "styled-components";
import { loadEntitiesDirect } from "app/actions/entity";
import { useOpenProfileDialog } from "common/hooks/profileDialog";
import { useStoreState, useActions } from "app/store";
import { SkeletonBox } from "common/components/skeleton";

const Embed = Quill.import("blots/embed");

const DATA_ID_KEY = "data-id";
const DATA_PLACE_ID_KEY = "data-place-id";

interface IBlotData {
  placeId: Moim.Id;
  id: Moim.Id; // NOTE: user id
  displayText: string;
  fallback?: string;
  mentionType: "user" | "channel";
}

const MentionItem = React.memo(
  React.forwardRef<
    { getData: () => any },
    { node: IBlotData; readOnly: boolean }
  >(({ node, readOnly }, ref) => {
    const [loadStatus, setLoadStatus] = React.useState<null | boolean>(null);
    const targetRef = React.useRef<HTMLSpanElement>(null);
    const openProfileDialog = useOpenProfileDialog();

    const userData = useStoreState(state => state.entities.users[node.id]);
    const { dispatchLoadEntitiesDirectly } = useActions({
      dispatchLoadEntitiesDirectly: loadEntitiesDirect,
    });

    const handleClick = React.useCallback(() => {
      if (readOnly && targetRef.current) {
        openProfileDialog(node.id, targetRef);
      }
    }, [node.id, readOnly, openProfileDialog]);

    const getData = React.useCallback(
      () => ({
        ...node,
        placeId: node.placeId,
        displayText: userData?.name ?? node.displayText,
      }),
      [node, userData?.name],
    );

    const mentionPrefix = React.useMemo(() => {
      switch (node.mentionType) {
        case "channel": {
          return "#";
        }
        default:
        case "user": {
          return "@";
        }
      }
    }, [node.mentionType]);

    React.useImperativeHandle(ref, () => ({
      getData,
    }));

    React.useEffect(() => {
      if (loadStatus === null && !userData) {
        setLoadStatus(true);
        dispatchLoadEntitiesDirectly({
          users: [node.id],
        }).finally(() => {
          setLoadStatus(false);
        });
      }
    }, []);

    if (!userData && (loadStatus === null || loadStatus === true)) {
      return (
        <div style={{ display: "inline-block", position: "relative" }}>
          <SkeletonBox
            width="80px"
            height="18px"
            overrideStyle={css`
              position: absolute;
              top: 4px;
              left: 0;
            `}
          />
        </div>
      );
    }

    if (!userData && loadStatus === false) {
      return (
        <span>
          {mentionPrefix}
          {node.fallback ?? node.displayText}
        </span>
      );
    }

    return (
      <span ref={targetRef} onClick={handleClick}>
        {mentionPrefix}
        {userData?.name ?? node.fallback}
      </span>
    );
  }),
);

export class Mention extends Embed {
  public static blotName = "mention";
  public static tagName = "span";
  public static className = "ql-mention";
  public static ref = {};

  public static create(value: any) {
    const node = super.create(value);
    const id = shortid();
    node.setAttribute(DATA_ID_KEY, id);
    node.setAttribute(DATA_PLACE_ID_KEY, value.placeId ?? id);
    Mention.data = {
      ...value,
      placeId: value.placeId ?? id,
    };
    Mention.refs = {
      ...Mention.refs,
      [id]: React.createRef(),
    };

    return node;
  }

  public static value(domNode: Element) {
    const id = domNode.getAttribute(DATA_ID_KEY);
    if (id) {
      const ref = Mention.refs[id];

      return (ref && ref.current && ref.current.getData()) ?? this.data;
    }
    return "";
  }

  public attach() {
    super.attach();
    this.id = this.domNode.getAttribute(DATA_ID_KEY);
    this.placeId = this.domNode.getAttribute(DATA_PLACE_ID_KEY);
    this.data = Mention.data;
    this.scroll.emitter.emit("blot-mount", this);
  }

  public detach() {
    super.detach();
    this.scroll.emitter.emit("blot-unmount", this);
  }

  public renderPortal(id: string) {
    const quill = Quill.find(this.scroll.domNode.parentNode);
    const ref = Mention.refs[id];

    return createPortal(
      <MentionItem
        ref={ref}
        node={this.data}
        readOnly={quill.options.readOnly}
      />,
      this.domNode,
    );
  }
}
