import * as React from "react";
import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import { SkeletonBox } from "common/components/skeleton";
import { DEFAULT_ITEM_STYLE } from ".";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: ${px2rem(225)};
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
  border-radius: ${px2rem(7)};
  order: solid 1px #dce2e6;
  box-shadow: 0 ${px2rem(2)} ${px2rem(6)} 1px
    ${props => props.theme.colorV2.colorSet.grey50};

  .footerBox {
    display: flex;
    width: 100%;
    height: ${px2rem(32)};
    border-bottom: 1px solid ${props => props.theme.colorV2.colorSet.grey50};
    padding: ${px2rem(7)} ${px2rem(6)};

    .left {
      flex: 1;
    }
    .center {
      display: flex;
      align-items: center;
      flex: 1;
      margin: 0 ${px2rem(10)};
    }
    .right {
      display: flex;
      justify-content: flex-end;
      flex: 1;
    }
  }
  .footerBox:last-child {
    border-bottom: none;
  }
`;

const QuestPreviewSkeleton: React.FC<{
  itemStyleConfig?: Moim.Blockit.IDquestGroupItemStyle;
}> = ({ itemStyleConfig }) => {
  const itemStyle = React.useMemo(() => itemStyleConfig ?? DEFAULT_ITEM_STYLE, [
    itemStyleConfig,
  ]);
  return (
    <Wrapper>
      <SkeletonBox
        className="image"
        width="100%"
        height={px2rem(128)}
        overrideStyle={css`
          border-radius: inherit;
        `}
      />

      {itemStyle.isShowOutcomeRow ? (
        <div className="footerBox">
          <div className="left">
            <SkeletonBox
              width={px2rem(52)}
              height={px2rem(18)}
              overrideStyle={css`
                border-radius: ${px2rem(9)};
              `}
            />
          </div>
        </div>
      ) : null}

      {itemStyle.isShowPeriodRow ? (
        <div className="footerBox">
          <div className="left">
            <SkeletonBox
              width={px2rem(41)}
              height={px2rem(18)}
              overrideStyle={css`
                border-radius: ${px2rem(2)};
              `}
            />
          </div>

          <SkeletonBox
            width={px2rem(59)}
            height={px2rem(18)}
            overrideStyle={css`
              border-radius: ${px2rem(2)};
            `}
          />
        </div>
      ) : null}

      {itemStyle.isShowProgressRow ? (
        <div className="footerBox">
          <SkeletonBox
            width={px2rem(33)}
            height={px2rem(18)}
            overrideStyle={css`
              border-radius: ${px2rem(2)};
            `}
          />

          <div className="center">
            <SkeletonBox
              width="100%"
              height={px2rem(6)}
              overrideStyle={css`
                border-radius: ${px2rem(2)};
              `}
            />
          </div>

          <SkeletonBox
            width={px2rem(30)}
            height={px2rem(18)}
            overrideStyle={css`
              border-radius: ${px2rem(2)};
            `}
          />
        </div>
      ) : null}
    </Wrapper>
  );
};

export default QuestPreviewSkeleton;
