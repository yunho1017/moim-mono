// vendor
import * as React from "react";
import { useToggle } from "react-use";
import { useInView } from "react-intersection-observer";
// component
import {
  CloseIconButton,
  Header,
  HeaderContent,
  HeaderTitle,
  MoreIconButton,
  Wrapper,
  Container,
  ProfileImage,
  Description,
  ButtonGroup,
  ContainerWrapper,
  ButtonItem,
  ActiveButton,
  NormalButton,
  TagWrapper,
  Tag,
  groupProfileImageStyle,
} from "./styledComponents";
import { NativeEmojiSafeText } from "common/components/designSystem/texts";
import GroupProfileImage from "common/components/groupProfileImage";
import ResponsiveMenu from "common/components/responsiveMenu";
import {
  MenuWrapper,
  MenuItem,
} from "common/components/responsiveMenu/components/menu";
import ShavedText from "common/components/shavedText";
import BannerWithFixedSensor from "../bannerWithFixedSensor";
import MoimInfo from "./components/info";
import { useStoreState } from "app/store";

interface IProps {
  name: string;
  domain: string;
  url: string;
  memberCount: number;
  description?: string;
  banner: Moim.IBanner;
  profileImage: Moim.IIcon;
  tags?: Moim.Id[];
  buttons?: {
    text: string;
    onClick?: React.MouseEventHandler;
    disabled?: boolean;
    active?: boolean;
  }[];
  moreMenu?: {
    text: string;
    icon?: React.ReactNode;
    onClick: React.MouseEventHandler;
  }[];
  status?: Moim.Group.GroupPeriodType;
  period?: Moim.Group.IGroupPeriod;
  statusConfig?: Moim.IMoimStatusConfig;
  onClose?(): void;
}

const TagComponent = ({ id }: { id: Moim.Id }) => {
  const tag = useStoreState(state => state.entities.tags[id]);

  if (!tag) {
    return null;
  }
  return (
    <Tag>
      <ShavedText value={tag.name} line={1} />
    </Tag>
  );
};

const CoverComponent: React.FC<IProps> = ({
  name,
  domain,
  url,
  memberCount,
  description,
  profileImage,
  banner,
  tags,
  buttons,
  onClose,
  moreMenu,
  status,
  period,
  statusConfig,
}) => {
  const [open, toggleOpen] = useToggle(false);

  const moreMenuButtonRef = React.useRef<HTMLDivElement>(null);
  const [coverFixedSensorRef, isFixed] = useInView();
  return (
    <Wrapper>
      {/* TODO: Staging 환경에서 Group Entity Banner가 배포되지 않아서, 우선 이렇게 처리합니다. 이후에는 풀어주세요. */}
      {banner && (
        <BannerWithFixedSensor
          ref={coverFixedSensorRef}
          isFixed={isFixed}
          banner={banner}
        />
      )}

      <Header>
        {onClose && <CloseIconButton onClick={onClose} />}
        <HeaderContent show={isFixed}>
          <GroupProfileImage icon={profileImage} title={name} size="s" />
          <HeaderTitle>
            <NativeEmojiSafeText value={name} />
          </HeaderTitle>
        </HeaderContent>
        {moreMenu && (
          <>
            <div ref={moreMenuButtonRef}>
              <MoreIconButton onClick={toggleOpen} />
            </div>
            <ResponsiveMenu
              open={open}
              anchorElement={moreMenuButtonRef.current}
              onCloseRequest={toggleOpen}
            >
              <MenuWrapper>
                {moreMenu.map(menu => (
                  <MenuItem key={menu.text} onClick={menu.onClick}>
                    {menu.icon}
                    {menu.text}
                  </MenuItem>
                ))}
              </MenuWrapper>
            </ResponsiveMenu>
          </>
        )}
      </Header>
      <Container>
        <ContainerWrapper>
          <ProfileImage show={!isFixed}>
            <GroupProfileImage
              styles={groupProfileImageStyle}
              icon={profileImage}
              title={name}
              size="l"
            />
          </ProfileImage>

          <MoimInfo
            name={name}
            url={url}
            domain={domain}
            memberCount={memberCount}
            status={status}
            period={period}
            statusConfig={statusConfig}
          />

          {Boolean(tags?.length) && (
            <TagWrapper>
              {tags && tags.map(tag => <TagComponent key={tag} id={tag} />)}
            </TagWrapper>
          )}
          <Description>
            <NativeEmojiSafeText value={description || ""} />
          </Description>
        </ContainerWrapper>
      </Container>
      {buttons && (
        <ButtonGroup>
          {buttons.map(button => (
            <ButtonItem
              key={JSON.stringify({
                text: button.text,
                active: button.active,
              })}
            >
              {React.createElement(
                button.active ? ActiveButton : NormalButton,
                {
                  disabled: button.disabled,
                  onClick: button.onClick,
                },
                button.text,
              )}
            </ButtonItem>
          ))}
        </ButtonGroup>
      )}
    </Wrapper>
  );
};

export default CoverComponent;
