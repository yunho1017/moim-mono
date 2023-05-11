import { isEqual } from "lodash";
import * as React from "react";
import ExternalMoimBlockitEditorComponent from "./component_new";
import { useActions } from "app/store";
import { getMoimTheme as getMoimThemeAction } from "app/actions/group";

const EDITOR_ID = "moim-blockit-editor";

const ExternalMoimBlockitEditor: React.FC = ({}) => {
  const [mode, setMode] = React.useState<"new" | "edit">("new");
  const [initialBlocks, setInitialBlocks] = React.useState<
    Moim.Blockit.Blocks[]
  >([]);
  const { getMoimTheme } = useActions({
    getMoimTheme: getMoimThemeAction,
  });

  const groupId = React.useMemo(() => {
    const url = new URL(location.href);
    return url.searchParams.get("groupId");
  }, []);

  const handleClick = React.useCallback((content: Moim.Blockit.Blocks[]) => {
    if (window.opener) {
      window.opener.postMessage(
        {
          type: "moim-blockit-editor",
          payload: {
            content,
          },
        },
        "*",
      );
    }
  }, []);

  const handleMessage = React.useCallback(
    (
      ev: MessageEvent<{
        type: string;
        payload: { content: Moim.Blockit.Blocks[] };
      }>,
    ) => {
      if (
        (ev.origin.includes("https://localhost:3000") ||
          ev.origin.includes("http://localhost:8081") ||
          ev.origin.includes("http://127.0.0.1:8081") ||
          ev.origin.includes("https://can-admin.vingle.network") ||
          ev.origin.includes("https://can-admin.moim.co")) &&
        ev.data.type === "moim-blockit-editor"
      ) {
        setMode("edit");
        setInitialBlocks(state => {
          if (!isEqual(state, ev.data.payload.content)) {
            return ev.data.payload.content;
          }
          return state;
        });
      }
    },
    [],
  );

  React.useEffect(() => {
    window.addEventListener("message", handleMessage, false);
    if (window.opener) {
      setMode("new");
      window.opener.postMessage(
        {
          type: "moim-blockit-editor",
          payload: {
            status: "ready-to-use",
          },
        },
        "*",
      );
    }
    return () => {
      window.removeEventListener("message", handleMessage, false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (groupId) {
      getMoimTheme({ groupId });
    }
  }, [groupId]);

  return (
    <ExternalMoimBlockitEditorComponent
      key={`${EDITOR_ID}_${mode}`}
      id={`${EDITOR_ID}_${mode}`}
      initialBlocks={initialBlocks}
      onSendButton={handleClick}
    />
  );
};

export default ExternalMoimBlockitEditor;
