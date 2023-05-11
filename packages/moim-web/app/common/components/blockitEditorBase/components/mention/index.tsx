import * as React from "react";
import axios from "axios";
import keycode from "keycode";
import Delta from "quill-delta";
import { connect } from "react-redux";
import Quill, { RangeStatic, Sources } from "quill";
import { bindActionCreators } from "redux";
import debounce from "lodash/debounce";
import { memoize } from "lodash";
import { PopperPlacementType } from "@material-ui/core";
// selector
import { moimMembersSelectorV2 } from "app/selectors/moim";
import { searchedUsersSelectorV2 } from "app/selectors/search";
// interface
import { IAppState } from "app/rootReducer";
import { AppDispatch } from "app/store";
// action
import {
  ActionCreators,
  getUsers,
  getSearchUsers as getSearchUsersAction,
} from "app/actions/user";
// utils
import {
  hasValidChars,
  getMentionCharIndex,
  hasValidMentionCharIndex,
} from "./utils";
import { isiOS } from "common/helpers/browserDetect";
// components
import MentionComponent, { ISuggestion } from "./component";

const Keys = {
  ENTER: "Enter",
  TAB: "Tab",
  UP: keycode("up"),
  DOWN: keycode("down"),
  ESC: keycode("escape"),
  SPACE: keycode("space"),
  BACKSPACE: "Backspace",
};

function mapStateToProps(state: IAppState) {
  return {
    searchedUsers: searchedUsersSelectorV2(state),
    members: moimMembersSelectorV2(state),
    isLoading: state.search.searchUsersLoading,
    currentGroupId: state.app.currentGroupId,
  };
}

function mapDispatchToProps(dispatch: AppDispatch) {
  return bindActionCreators(
    {
      dispatchGetUsers: getUsers,
      getSearchUsers: getSearchUsersAction,
      clearSearchedUsers: ActionCreators.clearSearchedUsers,
    },
    dispatch,
  );
}

interface IProps
  extends ReturnType<typeof mapStateToProps>,
    ReturnType<typeof mapDispatchToProps> {
  quill: Quill;
  groupId?: string;
  denotations?: string[];
  enableSingleLine?: boolean;
  disablePortal?: boolean;
  mentionPortalContainer?: HTMLElement | null;
  mentionPlacement?: PopperPlacementType;
  callbackEditorFocus?(): void;
}

interface IState {
  isOpen: boolean;
  anchor: HTMLElement | null;
  currentIdx: number;
  anchorPosition: { top: number; left: number };
  query: string;
}

class MentionHelper extends React.Component<IProps, IState> {
  public state: IState = {
    isOpen: false,
    anchor: null,
    currentIdx: 0,
    anchorPosition: { top: 0, left: 0 },
    query: "",
  };

  private searchCancelTokenSource = axios.CancelToken.source();
  private isComposing = false;
  private composingTextLength = 1;
  private mentionCharPos = 0;
  private cursorPos = 0;
  private options = {
    allowDenotationPrefixSpace: true,
    denotations: this.props.denotations || ["@"],
    allowedChars: /^[^ \n]*$/,
    minChars: 0,
    maxChars: 32,
  };
  private prevResult: any[] = [];

  public componentDidMount() {
    const { quill, members, dispatchGetUsers } = this.props;
    quill.on("selection-change", this.handleSelectionChange);
    quill.on("text-change", this.handleTextChange);
    quill.root.addEventListener("input", this.handleInputChange);

    quill.keyboard.addBinding(
      {
        key: Keys.TAB,
      },
      this.selectHandler,
    );
    (quill.keyboard as any).bindings[Keys.TAB].unshift(
      (quill.keyboard as any).bindings[Keys.TAB].pop(),
    );

    quill.keyboard.addBinding(
      {
        key: Keys.ENTER,
      },
      this.selectHandler,
    );
    (quill.keyboard as any).bindings[Keys.ENTER].unshift(
      (quill.keyboard as any).bindings[Keys.ENTER].pop(),
    );

    quill.keyboard.addBinding(
      { key: Keys.BACKSPACE },
      { offset: 1 },
      this.backspaceHandler,
    );

    (quill.keyboard as any).bindings[Keys.BACKSPACE].unshift(
      (quill.keyboard as any).bindings[Keys.BACKSPACE].pop(),
    );

    quill.keyboard.addBinding(
      {
        key: Keys.ESC,
      },
      this.escapeHandler,
    );

    quill.keyboard.addBinding(
      {
        key: Keys.UP,
      },
      this.upHandler,
    );

    quill.keyboard.addBinding(
      {
        key: Keys.DOWN,
      },
      this.downHandler,
    );

    if (!members.data.length) {
      dispatchGetUsers({});
    }

    this.getMobileInputWrapperBounding();
  }

  public componentDidUpdate(prevProps: IProps, prevState: IState) {
    const {
      quill,
      enableSingleLine,
      searchedUsers,
      members,
      clearSearchedUsers,
    } = this.props;
    const { isOpen } = this.state;

    if (
      (enableSingleLine &&
        isOpen &&
        (searchedUsers !== prevProps.searchedUsers ||
          members !== prevProps.members)) ||
      (isOpen !== prevState.isOpen && isOpen)
    ) {
      this.updatePosition();
    }

    if (
      quill.isEnabled() &&
      isOpen !== prevState.isOpen &&
      isOpen === false &&
      searchedUsers.data.length > 0
    ) {
      clearSearchedUsers();
    }

    if (isOpen !== prevState.isOpen) {
      this.setState({
        query: "",
      });
    }
  }

  public render() {
    const {
      isLoading,
      enableSingleLine,
      disablePortal,
      mentionPortalContainer,
      mentionPlacement,
    } = this.props;
    const { isOpen, anchor, anchorPosition, currentIdx } = this.state;
    const suggestions = this.getSuggestions();
    return (
      <MentionComponent
        isLoading={isLoading}
        isOpen={isOpen}
        suggestions={suggestions}
        anchor={anchor}
        anchorPosition={anchorPosition}
        focusedItemIdx={currentIdx}
        mentionPlacement={mentionPlacement}
        enableSingleLine={enableSingleLine}
        disablePortal={disablePortal}
        mentionPortalContainer={mentionPortalContainer}
        onSuggestionClick={this.handleSuggestionClick}
      />
    );
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  private readonly createSuggestions = memoize(
    (
      searchedUsers: Moim.User.INormalizedUser[],
      members: Moim.User.INormalizedUser[],
      isLoading: boolean,
      currentGroupId: Moim.Id | null,
      groupId: Moim.Id | undefined,
    ) => {
      const targetList =
        Boolean(this.state.query) || (groupId && currentGroupId !== groupId)
          ? isLoading && Boolean(this.prevResult.length)
            ? this.prevResult
            : searchedUsers
          : members;
      const suggestions: ISuggestion[] = targetList.map(item => ({
        id: item.id,
        text: item.name,
        image: item.avatar_url || "",
        isCommand: Boolean(item.isCommand),
      }));
      if (suggestions.length) {
        this.prevResult = suggestions;
      }
      return suggestions;
    },
  );

  private readonly getSuggestions = () => {
    const {
      searchedUsers,
      members,
      isLoading,
      currentGroupId,
      groupId,
    } = this.props;
    return this.createSuggestions(
      searchedUsers.data,
      members.data,
      isLoading,
      currentGroupId,
      groupId,
    );
  };

  private readonly getTextBeforeCursor = () => {
    const startPos = Math.max(0, this.cursorPos - this.options.maxChars);
    if (this.isComposing) {
      const [blot] = this.props.quill.getLeaf(this.cursorPos - 1);
      return blot.domNode.data;
    } else {
      return this.props.quill.getText(startPos, this.cursorPos - startPos);
    }
  };

  private readonly handleChange = () => {
    const { quill } = this.props;
    const range = quill.getSelection();
    if (!range) return;

    this.cursorPos = range.index;
    const textBeforeCursor = this.getTextBeforeCursor();
    const { mentionChar, mentionCharIndex } = getMentionCharIndex(
      textBeforeCursor,
      this.options.denotations,
    );
    if (
      mentionChar &&
      hasValidMentionCharIndex(
        mentionCharIndex,
        textBeforeCursor,
        this.options.allowDenotationPrefixSpace,
      )
    ) {
      const mentionCharPos =
        this.cursorPos - (textBeforeCursor.length - mentionCharIndex);
      this.mentionCharPos = mentionCharPos;
      const textAfter = textBeforeCursor.substring(
        mentionCharIndex + mentionChar.length,
      );
      if (
        textAfter.length >= this.options.minChars &&
        hasValidChars(textAfter, this.options.allowedChars)
      ) {
        this.showMentionList();
        this.getSearchUser(textAfter);
      } else {
        this.hideMentionList();
      }
    } else {
      this.hideMentionList();
    }
  };

  private readonly showMentionList = () => {
    this.setState({
      isOpen: true,
      currentIdx: 0,
    });
    this.updatePosition();
  };

  private readonly updatePosition = () => {
    const { quill } = this.props;
    const safeCharPos = this.mentionCharPos + this.getComposingTextLength();
    const textPos = quill.getBounds(safeCharPos < 0 ? 0 : safeCharPos);
    const anchor =
      (window.getSelection()?.anchorNode?.nodeType === Node.TEXT_NODE
        ? window.getSelection()?.anchorNode?.parentElement
        : (window.getSelection()?.anchorNode as HTMLElement)) || null;

    const anchorPosition = {
      top: textPos.top,
      left: textPos.left,
    };

    this.setState({
      anchor,
      anchorPosition,
    });
  };

  private readonly hideMentionList = () => {
    if (this.state.isOpen) {
      this.setState({ isOpen: false });
    }
  };

  private readonly handleInputChange = (e: any) => {
    this.setComposing(e.isComposing || false, e.data || "");
    this.handleChange();
  };

  private readonly handleTextChange = (
    delta: Delta,
    _: Delta,
    source: Sources,
  ) => {
    if (
      Boolean(delta.ops.find(op => op.delete)) ||
      (Boolean(delta.ops.find(op => op.insert && op.insert === "@")) &&
        source === "api")
    ) {
      this.handleChange();
    }
  };

  private readonly handleSelectionChange = (range: RangeStatic) => {
    if (range) {
      this.endComposing();
    }

    if (range && range.length === 0) {
      this.handleChange();
    } else {
      this.hideMentionList();
    }
  };

  private readonly selectItem = (suggestion?: ISuggestion) => {
    const { quill, clearSearchedUsers, callbackEditorFocus } = this.props;
    const { currentIdx } = this.state;
    const suggestionItem = suggestion
      ? suggestion
      : this.getSuggestions()[currentIdx];

    const mentionStartOffset =
      (quill.getSelection()?.index ?? this.mentionCharPos) -
      (this.cursorPos - this.mentionCharPos);

    quill.deleteText(
      mentionStartOffset,
      this.cursorPos - this.mentionCharPos,
      "api",
    );

    quill.insertEmbed(
      mentionStartOffset,
      "mention",
      {
        id: suggestionItem.id,
        displayText: suggestionItem.text,
        mentionType: "user",
        // NOTE: dont pass fallbackText to server, it will ignored from server.
        // fallbackText: suggestionItem.text,
      },
      "user",
    );
    quill.insertText(mentionStartOffset + 1, " ", "user");
    quill.setSelection(mentionStartOffset + 2, 0, "user");

    this.setState({
      query: "",
    });
    this.hideMentionList();
    this.endComposing();
    clearSearchedUsers();
    callbackEditorFocus?.();
  };

  private readonly handleSuggestionClick = (suggestion: ISuggestion) => {
    this.selectItem(suggestion);
  };

  private readonly selectHandler = () => {
    if (this.state.isOpen && !this.props.isLoading) {
      this.selectItem();
      return false;
    }
    return true;
  };

  private readonly backspaceHandler = () => {
    this.endComposing();
    if (this.state.isOpen) {
      this.hideMentionList();
    }
    return true;
  };

  private readonly escapeHandler = () => {
    this.endComposing();
    if (this.state.isOpen) {
      this.hideMentionList();
      return false;
    }
    return true;
  };

  private readonly upHandler = () => {
    if (this.state.isOpen) {
      this.prevItem();
      return false;
    }
    return true;
  };

  private readonly downHandler = () => {
    if (this.state.isOpen) {
      this.nextItem();
      return false;
    }
    return true;
  };

  private readonly nextItem = () => {
    const suggestionLength = this.getSuggestions().length;
    const nextIdx = this.state.currentIdx + 1;
    if (nextIdx < suggestionLength) {
      this.setState({
        currentIdx: nextIdx,
      });
    }
  };

  private readonly prevItem = () => {
    const nextIdx = this.state.currentIdx - 1;
    if (nextIdx >= 0) {
      this.setState({
        currentIdx: nextIdx,
      });
    }
  };

  // eslint-disable-next-line @typescript-eslint/member-ordering
  private readonly debouncedSearchUser = debounce(async (query: string) => {
    const { getSearchUsers, groupId } = this.props;
    this.searchCancelTokenSource.cancel();
    const token = axios.CancelToken.source();
    getSearchUsers(
      { query: query.trim(), limit: 100, isEnableCommand: true },
      token.token,
      groupId,
    );
    this.searchCancelTokenSource = token;
  }, 300);

  private readonly getSearchUser = (query: string) => {
    const { isLoading, clearSearchedUsers } = this.props;
    const { query: previousQuery } = this.state;

    if (!query || !query.trim()) {
      this.setState({
        query,
      });
      clearSearchedUsers();
      return;
    }
    if (previousQuery === query || isLoading) {
      return;
    }

    this.debouncedSearchUser(query.trim());
    this.setState({
      query,
    });
  };

  private readonly getMobileInputWrapperBounding = () => {
    const { quill, enableSingleLine } = this.props;
    const isMobile = isiOS();

    if (enableSingleLine && isMobile) {
      return quill.root.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.getBoundingClientRect();
    }
    return null;
  };

  private readonly setComposing = (status: boolean, data: string) => {
    this.isComposing = status;
    this.composingTextLength = data.length;
  };

  private readonly endComposing = () => {
    this.isComposing = false;
    this.composingTextLength = 1;
  };

  private readonly getComposingTextLength = () =>
    this.mentionCharPos < 0 || this.isComposing ? this.composingTextLength : 0;
}

export { ISuggestion };
export default React.memo(
  connect(mapStateToProps, mapDispatchToProps)(MentionHelper),
);
