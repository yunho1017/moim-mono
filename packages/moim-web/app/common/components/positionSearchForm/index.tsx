import * as React from "react";
import Popper from "common/components/designSystem/popper";
import PositionChip from "common/components/chips/preset/positionChip";
import PositionItemBase from "app/modules/settingMoim/components/position/components/positionItem/item/base";
import { DefaultLoader as Loader } from "common/components/loading";
import InfiniteScroller from "common/components/infiniteScroller";
import {
  IProps,
  IRefHandler,
  IChipData,
  useProps,
  useHandlers,
} from "./useHooks";

import {
  Wrapper,
  SearchIcon,
  InputContainer,
  PositionChipContainer,
  ChipWrapper,
  Inner,
  ItemContainerStyle,
  Input,
  PopperWrapperStyle,
} from "./styled";

const PositionSuggestion: React.FC<{
  suggestion: IChipData;
  selected?: boolean;
  onClick?(suggestion: IChipData): void;
}> = ({ suggestion, selected, onClick }) => {
  const refThis = React.useRef<HTMLDivElement>(null);

  const handleClick = React.useCallback(() => {
    onClick?.(suggestion);
  }, [onClick, suggestion]);

  React.useLayoutEffect(() => {
    if (selected) {
      refThis.current?.scrollIntoView({
        block: "center",
      });
    }
  }, [selected]);

  return (
    <div ref={refThis}>
      <PositionItemBase
        positionId={suggestion.id}
        selected={selected}
        name={suggestion.text}
        color={suggestion.color}
        overrideWrapperStyled={ItemContainerStyle}
        onClick={handleClick}
      />
    </div>
  );
};

const PositionSearchForm = React.forwardRef<IRefHandler, IProps>(
  (props, ref) => {
    const {
      readonly,
      wrapRef,
      inputRef,
      chips,
      name,
      paging,
      loading,
      isPositionChipsLoading,
      placeholder,
      suggestionOpen,
      filteredSuggestion,
      anchorPosition,
      isOriginalDataSource,
      clear,
      handleMouseEnter,
      handleMouseLeave,
      handleChipDeleteClick,
      handleInputFocus,
      handleInputBlur,
      handleChangeInput,
      handleKeyDown,
      selectSuggestion,
      handlePositionLoadMore,
    } = useHandlers(useProps(props));

    const chipElements = React.useMemo(
      () =>
        chips.length > 0 && (
          <>
            <PositionChipContainer>
              {chips.map(chip => (
                <ChipWrapper key={`${name}_${chip.id}`}>
                  <PositionChip
                    size="large"
                    showDeleteButton={!readonly}
                    id={chip.id}
                    color={chip.color}
                    name={chip.text}
                    onDeleteClick={handleChipDeleteClick}
                  />
                </ChipWrapper>
              ))}
              {isPositionChipsLoading && <Loader />}
            </PositionChipContainer>
          </>
        ),
      [chips, isPositionChipsLoading, name, readonly, handleChipDeleteClick],
    );

    const suggestions = React.useMemo(
      () =>
        filteredSuggestion.map((suggestion, index) => (
          <PositionSuggestion
            key={`${name}_${suggestion.id}`}
            suggestion={suggestion}
            selected={anchorPosition === index}
            onClick={selectSuggestion}
          />
        )),
      [anchorPosition, filteredSuggestion, name, selectSuggestion],
    );

    const suggestionElements = React.useMemo(
      () => (
        <Inner onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {isOriginalDataSource ? (
            <InfiniteScroller
              useInitialScroll={true}
              paging={paging}
              isLoading={loading}
              itemLength={suggestions.length}
              loader={<Loader />}
              loadMore={handlePositionLoadMore}
            >
              {suggestions}
            </InfiniteScroller>
          ) : (
            suggestions
          )}
        </Inner>
      ),
      [
        paging,
        loading,
        suggestions,
        isOriginalDataSource,
        handleMouseEnter,
        handleMouseLeave,
        handlePositionLoadMore,
      ],
    );

    React.useImperativeHandle(ref, () => ({
      clear,
    }));

    return (
      <Wrapper>
        <InputContainer ref={wrapRef}>
          <label htmlFor={`${name}_input`}>
            <SearchIcon />
          </label>

          <Input
            ref={inputRef}
            id={`${name}_input`}
            autoComplete="off"
            readOnly={readonly}
            placeholder={placeholder}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onChange={handleChangeInput}
            onKeyDown={handleKeyDown}
          />
        </InputContainer>
        {chipElements}

        <Popper
          placement="bottom-start"
          open={suggestionOpen && Boolean(filteredSuggestion.length)}
          anchorEl={wrapRef.current}
          modifiers={{
            preventOverflow: {
              enabled: true,
              boundariesElement: "scrollParent",
            },
          }}
          overrideStyle={PopperWrapperStyle}
          data-needscroll={Boolean(filteredSuggestion.length > 3)}
        >
          {suggestionElements}
        </Popper>
      </Wrapper>
    );
  },
);

export default PositionSearchForm;
export { IRefHandler };
