import * as React from "react";
import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
// hooks
import { useCommonFactoryProps } from "../hooks";
// components
import ShavedText from "common/components/shavedText";
import { NativeEmojiSafeText } from "common/components/designSystem/texts";
import { B4RegularStyle } from "common/components/designSystem/typos";
import { IBaseProps } from "..";
import Header from "../components/header";
import Factory, { Row } from "../components/factory";
import { QuestionContent } from "../components/questions";
import Engage from "../components/engage";
import WithPositionChip from "common/components/withPositionChip/new";

const TitleWrapper = styled.div`
  color: ${props => props.theme.colorV2.colorSet.grey800};
  ${B4RegularStyle}
`;

const ReviewHiddenReactionArea = styled.div`
  height: ${px2rem(6)};
`;

interface IQuestionProps extends IBaseProps {
  questionId: Moim.Id;
  type?: "question" | "answer";
  engage?: React.ComponentProps<typeof Engage>;
  onEditContent?(newContent: Moim.Blockit.Blocks[]): void;
}

const Question = React.forwardRef<HTMLDivElement | null, IQuestionProps>(
  (
    {
      engage,
      questionId,
      type = "question",
      disableHoverStyle,
      onEditContent,
      ...baseProps
    },
    ref,
  ) => {
    const {
      size = "m",
      user,
      title,
      userId,
      createdAt,
      reverse,
      mediaProps,
      hover,
      contents,
      menus,
      selected,
      editState,
      handleTitleClick,
    } = useCommonFactoryProps(baseProps);

    const handleEditThread = React.useCallback(
      (newContents: Moim.Blockit.Blocks[]) => {
        onEditContent?.(newContents);
        editState?.onEnter();
      },
      [editState, onEditContent],
    );

    const headerProps: React.ReactNode = React.useMemo(() => {
      const props: React.ComponentProps<typeof Header> = {
        title,
        userId,
        createdAt,
        reverse,
      };

      return (
        <Header
          {...props}
          title={
            <TitleWrapper>
              <WithPositionChip positions={user?.positions ?? []}>
                <ShavedText
                  onClick={handleTitleClick}
                  value={<NativeEmojiSafeText value={title!} />}
                  line={1}
                />
              </WithPositionChip>
            </TitleWrapper>
          }
        />
      );
    }, [createdAt, reverse, title, user, userId, handleTitleClick]);

    const engageProps: React.ReactNode = React.useMemo(
      () =>
        engage ? (
          <Engage {...engage} withoutVotePermissionCheck={true} />
        ) : (
          <ReviewHiddenReactionArea />
        ),
      [engage],
    );

    return (
      <Factory
        ref={ref}
        type="question"
        size={size}
        hover={hover}
        menus={menus}
        selected={selected || editState.isEditMode}
        isFullWidthRight={true}
        disableHoverStyle={disableHoverStyle}
        header={headerProps}
      >
        <Row key={`${type}_content-row`}>
          <QuestionContent
            id={questionId}
            type={type}
            contents={contents || []}
            editState={{
              isEditMode: editState.isEditMode,
              onEnter: handleEditThread,
              // eslint-disable-next-line @typescript-eslint/unbound-method
              onCancel: editState.onCancel,
            }}
          />
        </Row>
        {!editState.isEditMode && mediaProps && (
          <Row key={`${type}-media-row`}>{mediaProps}</Row>
        )}
        {engageProps && <Row key={`${type}-engage-row`}>{engageProps}</Row>}
      </Factory>
    );
  },
);

export default React.memo(Question);
