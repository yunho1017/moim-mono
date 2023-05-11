// vendor
import * as React from "react";
import { FormattedMessage, useIntl } from "react-intl";
// component
import { DefaultDivider } from "common/components/divider";
import { Container } from "./styled";
import { Wrapper } from "../styledComponents";
import SettingPageTitle from "../settingPageTitle";
import ExecutionLog from "../executionLog";
import { ButtonWrapper, ExecuteButton } from "../../styled";
import NameInput from "./components/nameInput";
import IconInput from "./components/iconInput";
// helper
import { useHandlers, useProps } from "./hooks";
import UrlPrefixInput from "./components/urlPrefixInput";
import DescriptionInput from "./components/descriptionInput";
import { MAX_MOIM_DESCRIPTION_LENGTH } from "common/hooks/useMoimDescriptionState";
import { ISubmitGroupData } from "app/modules/settingMoim/container/overview/types";

export interface IProps {
  name: string;
  icon: Moim.IIcon;
  coverImageUrl: string;
  urlPrefix: string;
  isLoadingSubmit: boolean;
  description?: string;
  onSubmit: (groupData: ISubmitGroupData) => void;
}

function Overview(props: IProps) {
  const hookProps = useProps(props);
  const hookHandlers = useHandlers(hookProps);

  const {
    name,
    nameError,
    setName,
    description,
    setDescription,
    descriptionError,
    urlPrefix,
    setUrlPrefix,
    icon,
    isLoadingSubmit,
    submittable,
    isImageUploadLoading,
    handleSuccessImageUpload,
    handleEndImageLoading,
    handleStartImageLoading,
  } = hookProps;
  const { handleClickLogs, handleClickSubmitButton } = hookHandlers;

  const intl = useIntl();

  return (
    <Wrapper>
      <Container>
        <SettingPageTitle
          title={intl.formatMessage({ id: "overview_settings/page_title" })}
        />
      </Container>

      {/* TODO: 추후 Excution Log 기능을 추가할때 주석을 풀고 사용해주세요. */}
      {false && (
        <Container>
          <ExecutionLog onClickButton={handleClickLogs} />
        </Container>
      )}

      <DefaultDivider />

      <IconInput
        icon={icon}
        title={intl.formatMessage({ id: "overview_settings/icon_title" })}
        label={intl.formatMessage({
          id: "overview_settings/icon_text",
        })}
        guideMessage={intl.formatMessage({
          id: "create_moim/moim_icon/guide",
        })}
        onSucceed={handleSuccessImageUpload}
        onFailed={handleEndImageLoading}
        onStartLoading={handleStartImageLoading}
        isLoading={isImageUploadLoading}
      />

      <NameInput
        name={name}
        title={intl.formatMessage({ id: "overview_settings/name_title" })}
        placeholder={intl.formatMessage({
          id: "overview_settings/name_placeholder",
        })}
        errorMessage={
          nameError &&
          intl.formatMessage({
            id: "overview_settings/name_error",
          })
        }
        onChange={setName}
      />

      {/* TODO: 추후에 URL 설정 기능이 추가되면 주석을 풀고 사용해주세요. */}
      {false && (
        <UrlPrefixInput
          title={intl.formatMessage({ id: "overview_settings/url_title" })}
          prefix={urlPrefix}
          suffix={intl.formatMessage({
            id: "create_moim/moim_url/service_url",
          })}
          placeholder={intl.formatMessage({
            id: "create_moim/moim_url/placeholder",
          })}
          onChange={setUrlPrefix}
        />
      )}

      <DescriptionInput
        description={description}
        title={intl.formatMessage({
          id: "overview_settings/description_title",
        })}
        placeholder={intl.formatMessage({
          id: "overview_settings/description_placeholder",
        })}
        guideMessage={intl.formatMessage({
          id: "overview_settings/description_guide",
        })}
        errorMessage={
          descriptionError &&
          intl.formatMessage(
            {
              id: "error_character_number_limit",
            },
            { count: MAX_MOIM_DESCRIPTION_LENGTH },
          )
        }
        onChange={setDescription}
      />

      <ButtonWrapper>
        <ExecuteButton
          size="l"
          onClick={handleClickSubmitButton}
          waiting={isLoadingSubmit}
          disabled={!submittable}
        >
          <FormattedMessage id="save_button" />
        </ExecuteButton>
      </ButtonWrapper>
    </Wrapper>
  );
}

export default Overview;
