import * as React from "react";
import keycode from "keycode";
import memoize from "lodash/memoize";
import { useActions, useStoreState } from "app/store";
import {
  positionsSelector,
  positionStateSelector,
} from "app/selectors/position";
import { getPositions } from "app/actions/position";

export interface IChipData {
  id: Moim.Id;
  color: string;
  text: string;
}

export interface IProps {
  chips: IChipData[];
  name?: string;
  readonly?: boolean;
  placeholder?: string;
  isPositionChipsLoading?: boolean;
  onChangeChips?(chip: IChipData[]): void;
}

export interface IRefHandler {
  clear(): void;
}

const positionToSuggestion = memoize(
  (positions: Moim.Position.INormalizePosition[]) =>
    positions.map(pos => ({
      id: pos.id,
      color: pos.color,
      text: pos.name,
    })),
);

export function useProps(props: IProps) {
  const { originalSuggestion, loading, paging } = useStoreState(state => {
    const positions = positionsSelector(state);
    const positionState = positionStateSelector(state);
    return {
      originalSuggestion: positionToSuggestion(positions),
      loading: positionState.getPositionsLoading,
      paging: positionState.positions.paging,
    };
  });
  const { dispatchGetPositions } = useActions({
    dispatchGetPositions: getPositions,
  });

  const wrapRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isOriginalDataSource, setIsOriginalDataSource] = React.useState(true);
  const [preventBlur, setPreventBlur] = React.useState(false);
  const [initialFetched, setInitialFetched] = React.useState(false);
  const [suggestionOpen, setSuggestionOpen] = React.useState(false);
  const [anchorPosition, setAnchorPosition] = React.useState(0);
  const [filteredSuggestion, setFilteredSuggestion] = React.useState<
    IChipData[]
  >([]);

  React.useEffect(() => {
    if (!originalSuggestion.length && !initialFetched) {
      setInitialFetched(true);
      dispatchGetPositions({});
    }
  }, [dispatchGetPositions, initialFetched, originalSuggestion.length]);

  React.useEffect(() => {
    if (isOriginalDataSource) {
      setFilteredSuggestion(originalSuggestion);
    }
  }, [isOriginalDataSource, originalSuggestion]);

  return {
    ...props,
    wrapRef,
    inputRef,
    originalSuggestion,
    loading,
    paging,

    suggestionOpen,
    anchorPosition,
    filteredSuggestion,
    preventBlur,
    isOriginalDataSource,
    setSuggestionOpen,
    setAnchorPosition,
    setFilteredSuggestion,
    setPreventBlur,
    dispatchGetPositions,
    setIsOriginalDataSource,
  };
}

export function useHandlers(props: ReturnType<typeof useProps>) {
  const {
    inputRef,
    readonly,
    chips,
    loading,
    paging,
    anchorPosition,
    originalSuggestion,
    filteredSuggestion,
    preventBlur,
    onChangeChips,
    setSuggestionOpen,
    setAnchorPosition,
    setFilteredSuggestion,
    setPreventBlur,
    setIsOriginalDataSource,
    dispatchGetPositions,
  } = props;

  const updateChips = React.useCallback(
    (newChips: IChipData[]) => {
      onChangeChips?.(newChips);
    },
    [onChangeChips],
  );

  const clear = React.useCallback(() => {
    updateChips([]);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }, [inputRef, updateChips]);

  const handleChipDeleteClick = React.useCallback(
    chipId => {
      updateChips(chips.filter(item => item.id !== chipId));
    },
    [chips, updateChips],
  );

  const handleMouseEnter = React.useCallback(() => {
    setPreventBlur(true);
  }, [setPreventBlur]);
  const handleMouseLeave = React.useCallback(() => {
    setPreventBlur(false);
  }, [setPreventBlur]);

  const filterSuggestion = React.useCallback(
    (keyword: string) => {
      setAnchorPosition(0);

      setFilteredSuggestion(
        originalSuggestion.filter(item =>
          item.text.toLowerCase().includes(keyword.toLowerCase()),
        ),
      );
      setIsOriginalDataSource(keyword.length <= 0);
    },
    [
      originalSuggestion,
      setAnchorPosition,
      setFilteredSuggestion,
      setIsOriginalDataSource,
    ],
  );

  const handleChangeInput: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    e => {
      const keyword = e.currentTarget.value;
      filterSuggestion(keyword);
      setSuggestionOpen(true);
    },
    [filterSuggestion, setSuggestionOpen],
  );

  const handleInputFocus = React.useCallback(
    e => {
      const keyword = e.currentTarget.value;
      filterSuggestion(keyword);
      if (!readonly) setSuggestionOpen(true);
    },
    [filterSuggestion, readonly, setSuggestionOpen],
  );

  const handleInputBlur = React.useCallback(() => {
    if (!preventBlur) {
      setSuggestionOpen(false);
    }
  }, [preventBlur, setSuggestionOpen]);

  const selectSuggestion = React.useCallback(
    (suggestion: IChipData) => {
      // add to suggestions
      if (!chips.find(item => item.id === suggestion.id)) {
        updateChips(chips.concat(suggestion));
        setFilteredSuggestion(originalSuggestion);
        setIsOriginalDataSource(true);
        setSuggestionOpen(false);
        if (inputRef.current) {
          inputRef.current.value = "";
        }
      }
    },
    [
      chips,
      updateChips,
      setFilteredSuggestion,
      originalSuggestion,
      setIsOriginalDataSource,
      setSuggestionOpen,
      inputRef,
    ],
  );

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = React.useCallback(
    e => {
      switch (e.keyCode) {
        case keycode("enter"): {
          e.preventDefault();
          selectSuggestion(filteredSuggestion[anchorPosition]);
          break;
        }
        case keycode("up"): {
          e.preventDefault();
          const pos = anchorPosition - 1;
          if (pos >= 0) setAnchorPosition(pos);
          break;
        }
        case keycode("down"): {
          e.preventDefault();
          const pos = anchorPosition + 1;
          if (pos < filteredSuggestion.length) setAnchorPosition(pos);
          break;
        }
      }
    },
    [anchorPosition, filteredSuggestion, selectSuggestion, setAnchorPosition],
  );

  const handlePositionLoadMore = React.useCallback(() => {
    if (!loading && paging.after) {
      dispatchGetPositions({ after: paging.after });
    }
  }, [dispatchGetPositions, loading, paging]);

  return {
    ...props,
    clear,
    handleMouseEnter,
    handleMouseLeave,
    handleChipDeleteClick,
    handleInputFocus,
    handleInputBlur,
    handleChangeInput,
    handleKeyDown,
    handlePositionLoadMore,
    selectSuggestion,
  };
}
