import * as React from "react";
import { useIntl } from "react-intl";
import { useStoreState } from "app/store";
import { userDenormalizer } from "app/models";
import UserProfileImage from "common/components/userProfileImage";
import { UserPlaceholder } from "common/components/userProfileImage/styledComponents";
import { useOpenProfileDialog } from "common/hooks/profileDialog";
import WithPositionChip from "common/components/withPositionChip";
import ShavedText from "common/components/shavedText";
import { NativeEmojiSafeText } from "common/components/designSystem/texts";
import CurrencyFormatter from "common/components/currencyFormatter";
import CreateDayOMeter from "common/components/createDayOMeter";
import ShavedTextBlock from "common/components/blockitEditorBase/components/blockitRenderer/components/shavedText";
import {
  Wrapper,
  Left,
  Center,
  Right,
  OptionContainer,
  DonatePrice,
  Username,
  UserInfo,
  MessageContainer,
  ShaveTextWrapperStyle,
} from "./styled";

const EMPTY_ARRAY: any[] = [];

interface IProps {
  userId: Moim.Id;
  currency: string;
  price: number;
  buyerName: string;
  userName: string;
  isMine: boolean;
  userAvatar?: string;
  option?: string;
  createdAt?: number;
  comment?: string;
  anonymous?: boolean;
}

const PeopleItem: React.FC<IProps> = ({
  userId,
  anonymous,
  currency,
  isMine,
  userName,
  price,
  userAvatar,
  option,
  comment,
  createdAt,
}) => {
  const intl = useIntl();
  const openProfileDialog = useOpenProfileDialog();
  const { user } = useStoreState(state => ({
    user: userDenormalizer(userId, state.entities),
  }));
  const handleClick = React.useCallback(
    e => {
      if (!anonymous && user && user.group_id !== "empty") {
        openProfileDialog(userId, { current: e.currentTarget });
      }
    },
    [openProfileDialog, anonymous, user, userId],
  );

  const optionAndDate = React.useMemo(
    () => (
      <>
        {option}
        {option && createdAt ? " · " : null}
        {createdAt ? <CreateDayOMeter givenDate={createdAt} /> : null}
      </>
    ),
    [createdAt, option],
  );

  const positions = React.useMemo(
    () => (anonymous ? EMPTY_ARRAY : user?.positions ?? EMPTY_ARRAY),
    [anonymous, user?.positions],
  );

  return (
    <Wrapper isMine={isMine}>
      <UserInfo>
        <Left
          role={user && user.group_id !== "empty" ? "button" : undefined}
          onClick={handleClick}
        >
          {userAvatar ? (
            <UserProfileImage
              size="l"
              shape="round"
              src={userAvatar}
              userId={userId}
              canOpenProfileDialog={false}
            />
          ) : (
            <UserPlaceholder size="l" />
          )}
        </Left>
        <Center>
          <WithPositionChip positions={positions}>
            <Username
              role={user && user.group_id !== "empty" ? "button" : undefined}
              onClick={handleClick}
            >
              <ShavedText
                value={
                  <NativeEmojiSafeText
                    value={
                      anonymous
                        ? intl.formatMessage({ id: "username_anonymous" })
                        : userName ?? ""
                    }
                  />
                }
                line={1}
              />
            </Username>
          </WithPositionChip>
          <OptionContainer>{optionAndDate}</OptionContainer>
        </Center>
        <Right>
          <DonatePrice>
            <CurrencyFormatter currency={currency} value={price} />
          </DonatePrice>
        </Right>
      </UserInfo>
      {comment && (
        <MessageContainer>
          <ShavedTextBlock
            wrapperStyle={ShaveTextWrapperStyle}
            content={comment}
          />
        </MessageContainer>
      )}
    </Wrapper>
  );
};

export default React.memo(PeopleItem);
