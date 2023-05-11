import * as React from "react";
import styled from "styled-components";

import ShavedText from "common/components/shavedText/v2";
import UserProfileImage from "common/components/userProfileImage";
import { SpacerVertical } from "common/components/designSystem/spacer";

import { px2rem } from "common/helpers/rem";
import { textAlignStyle } from "common/components/thread/styles";

import { useStoreState } from "app/store";
import useGroupTexts, {
  useCurrentUserLocale,
} from "common/hooks/useGroupTexts";

interface IProps {
  author: Moim.Id;
  showAvatar: boolean;
  showAuthor: boolean;
  textAlign?: Moim.Forum.ForumListConfigTextAlignment;
  anonymousData?: Moim.Forum.IAnonymousData;
  disableAnonymousSuffix?: boolean;
}

const AuthorWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  padding: 0 ${px2rem(16)};
  ${textAlignStyle}
`;

const StyledShavedText = styled(ShavedText)<{ showAvatar: boolean }>`
  max-width: ${props => {
    return props.showAvatar ? `calc(100% - ${px2rem(32)})` : "100%";
  }};
`;

function Author({
  author: authorId,
  showAvatar,
  showAuthor,
  textAlign,
  anonymousData,
  disableAnonymousSuffix,
}: IProps) {
  const author = useStoreState(state => state.entities.users[authorId]);
  const anonymousTextKey = useGroupTexts("anonymous_member");
  const locale = useCurrentUserLocale();
  return (
    <AuthorWrapper textAlign={textAlign}>
      {showAvatar && (
        <UserProfileImage
          size="s"
          src={author?.avatar_url}
          userId={author?.id}
          canOpenProfileDialog={false}
        />
      )}
      {showAvatar && showAuthor && <SpacerVertical value={8} />}
      {showAuthor && (
        <StyledShavedText showAvatar={showAvatar} line={1}>
          {anonymousData
            ? `${anonymousTextKey?.singular}${
                !disableAnonymousSuffix
                  ? anonymousData.authorSuffix?.[locale]
                  : ""
              }`
            : author?.name ?? authorId}
        </StyledShavedText>
      )}
    </AuthorWrapper>
  );
}

export default React.memo(Author);
