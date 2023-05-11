import * as React from "react";
import {
  Wrapper,
  Title,
  CustomInput,
  Footer,
  SubmitButton,
} from "../styledComponents";
import InputForm from "common/components/inputForm";

export default function EditCategory() {
  const [name, setName] = React.useState("");
  const onCategoryNameChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
    },
    [],
  );

  return (
    <Wrapper>
      <Title>Edit Category</Title>
      <InputForm
        title="CATEGROY NAME"
        titleType="WHITE"
        description="Names can’t be longer than 60 characters."
      >
        <CustomInput type="text" value={name} onChange={onCategoryNameChange} />
      </InputForm>
      <Footer>
        {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
        <SubmitButton handleClick={() => {}} />
      </Footer>
    </Wrapper>
  );
}
