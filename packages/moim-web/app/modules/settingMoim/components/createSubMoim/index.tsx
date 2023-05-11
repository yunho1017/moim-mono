// vendor
import * as React from "react";
import { FormattedMessage, useIntl } from "react-intl";
// component
import { Wrapper } from "../styledComponents";
import { ButtonWrapper, ExecuteButton } from "../../styled";
import NameInput from "../overview/components/nameInput";
import IconInput from "../overview/components/iconInput";
import DescriptionInput from "../overview/components/descriptionInput";
import TagInput from "./components/tagInput";
// helper
import { useHandlers, useProps } from "./hook";
import { MAX_MOIM_DESCRIPTION_LENGTH } from "common/hooks/useMoimDescriptionState";

export interface IProps {
  isLoadingSubmit: boolean;
  tags: Moim.Tag.IDenormalizedTag[];
  onSubmit: (groupData: Moim.Group.ICreateSubGroupRequestBody) => void;
}

function CreateSubMoim(props: IProps) {
  const hookProps = useProps(props);
  const hookHandlers = useHandlers(hookProps);

  const {
    tags,
    name,
    nameError,
    setName,
    description,
    setDescription,
    descriptionError,
    domain,
    setDomain,
    domainError,
    icon,
    selectedTags,
    setSelectedTags,
    isLoadingSubmit,
    submittable,
    isImageUploadLoading,
    handleSuccessImageUpload,
    handleEndImageLoading,
    handleStartImageLoading,
  } = hookProps;
  const { handleClickSubmitButton } = hookHandlers;

  const intl = useIntl();

  return (
    <Wrapper>
      <IconInput
        icon={icon}
        moimName={name}
        title="액션 아이콘을 등록해주세요"
        label="아이콘 업데이트"
        guideMessage="아이콘은 액션의 멤버들이 당신의 액션을 쉽게 인지할 수 있도록 도와줄 수 있어요"
        onSucceed={handleSuccessImageUpload}
        onFailed={handleEndImageLoading}
        onStartLoading={handleStartImageLoading}
        isLoading={isImageUploadLoading}
      />

      <NameInput
        key="moim-name"
        name={name}
        title="만들고 싶은 액션의 이름은 무엇인가요?"
        placeholder="이름(20자 이내)"
        errorMessage={
          nameError &&
          intl.formatMessage({
            id: "overview_settings/name_error",
          })
        }
        guideMessage={`베이크 "함께 액션하기"에 있는 다양한 액션 이름들을 참고하세요.`}
        onChange={setName}
      />

      <NameInput
        key="moim-domain"
        name={domain}
        title="액션의 고유주소(URL)를 작성해주세요"
        placeholder="URL (10자 이내, 영문이나 숫자)"
        guideMessage="https://( ).vake.io 고유주소는 다음과 같이 표시됩니다."
        errorMessage={domainError?.message}
        onChange={setDomain}
      />

      <DescriptionInput
        description={description}
        title="만들어질 액션을 간단히 소개해주시겠어요?"
        placeholder="액션 소개 (1,000자 이내)"
        hasDivider={true}
        guideMessage="액션 소개는 커버페이지에 노출됩니다. 다른 베이커들이 보고 이해하기 쉽게 액션을 설명해주세요."
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

      <TagInput
        tags={tags}
        selectedTags={selectedTags}
        title="당신이 만드는 액션은 어떤 Value[가치]와 관련이 있나요?"
        label="Value 목록 선택"
        guideMessage={`"Vake 베이크"의 가치는 지속가능발전목표(Sustainable Development Goals, SDGs)를 기반으로 디자인 되었습니다. 당신이 만들고 싶은 변화와 가치는 어떤 것인지 선택하고, 더 큰 공동체와 Value + Make, Vake 하세요! Value 목록에서 최대 2~3가지 내로 선택해주세요.`}
        onChange={setSelectedTags}
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

export default CreateSubMoim;
