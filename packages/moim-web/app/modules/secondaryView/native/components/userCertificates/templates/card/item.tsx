import React from "react";
import styled, { css } from "styled-components";

import ShavedText from "common/components/shavedText";
import { B4Regular, H9Bold } from "common/components/designSystem/typos";
import { SkeletonBox } from "common/components/skeleton";

import useRedirect from "common/hooks/useRedirect";
import { px2rem } from "common/helpers/rem";
import { MoimURL } from "common/helpers/url";
import { useNativeSecondaryView } from "common/hooks/useSecondaryView";
import useIsMobile from "common/hooks/useIsMobile";

const Name = styled(H9Bold)``;
const Description = styled(B4Regular)``;

const Wrapper = styled.div<{
  backgroundColor: string | null;
  textColor: string | null;
}>`
  border-radius: ${px2rem(12)};
  padding: ${px2rem(12)} ${px2rem(16)};
  display: flex;
  align-items: center;
  gap: ${px2rem(12)};
  ${props =>
    props.backgroundColor &&
    css`
      background-color: ${props.backgroundColor};
    `}
  ${props =>
    props.textColor &&
    css`
      & ${Name} {
        color: ${props.textColor};
      }
      & ${Description} {
        color: ${props.textColor === "#000000"
          ? props.theme.themeMode.lightPalette.colorSet.grey600
          : props.theme.themeMode.lightPalette.colorSet.white600};
      }
    `}
`;

const Image = styled.img`
  width: ${px2rem(80)};
  height: ${px2rem(80)};
  object-fit: contain;
  filter: drop-shadow(0 ${px2rem(12)} ${px2rem(15)} rgba(0, 0, 0, 0.25));
`;

const Texts = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
`;

interface PropsType {
  textColor: string | null;
  backgroundColor: string | null;
  icon: string;
  name: string;
  description: string;
  certificateId: string;
}

export const CertificateItem: React.FC<PropsType> = React.memo(
  ({ certificateId, icon, name, description, backgroundColor, textColor }) => {
    const isMobile = useIsMobile();
    const redirect = useRedirect();
    const { close } = useNativeSecondaryView();
    const handleClick = React.useCallback(() => {
      if (isMobile) {
        close();
      }
      redirect(new MoimURL.CertificateShow({ certificateId }).toString());
    }, [redirect, certificateId, isMobile, close]);
    return (
      <Wrapper
        role="button"
        onClick={handleClick}
        backgroundColor={backgroundColor}
        textColor={textColor}
      >
        <Image src={icon} alt={name} />

        <Texts>
          <Name>{name}</Name>
          <Description>
            <ShavedText value={description} line={2} />
          </Description>
        </Texts>
      </Wrapper>
    );
  },
);

export const Skeleton = styled(SkeletonBox).attrs({
  width: "100%",
  height: px2rem(100),
})``;
