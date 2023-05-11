import * as React from "react";
import Radio from "@material-ui/core/Radio";
import FormGroup from "@material-ui/core/FormGroup";
import { makeStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import {
  Wrapper,
  Title,
  CustomInput,
  CustomTextArea,
  Footer,
  SubmitButton,
} from "../styledComponents";
import InputForm from "common/components/inputForm";
import { px2rem } from "common/helpers/rem";

const useCheckboxStyle = makeStyles({
  root: {
    padding: `${px2rem(8)} ${px2rem(16)}`,
  },
  label: {
    fontSize: `${px2rem(16)}`,
  },
});

export default function CreateChannelComponent() {
  const { label, root } = useCheckboxStyle();
  const [type, setType] = React.useState<"conversation" | "Forum" | "Link">(
    "conversation",
  );
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [access, setAccess] = React.useState<"Public" | "Private">("Public");

  const onChannelTypeChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const channelType = e.target.value;
      if (
        channelType === "conversation" ||
        channelType === "Forum" ||
        channelType === "Link"
      ) {
        setType(channelType);
      }
    },
    [],
  );
  const onChannelNameChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
    },
    [],
  );
  const onChannelDescriptionChange = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setDescription(e.target.value);
    },
    [],
  );
  const onAccessChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const accessValue = e.target.value;
      if (accessValue === "Public" || accessValue === "Private") {
        setAccess(accessValue);
      }
    },
    [],
  );

  return (
    <Wrapper>
      <Title>Edit Channel</Title>
      <InputForm title="CHANNEL TYPE" titleType="GREY">
        <FormGroup classes={{ root }}>
          <FormControlLabel
            control={
              <Radio
                checked={type === "conversation"}
                onChange={onChannelTypeChange}
                value="conversation"
              />
            }
            label="conversation"
            classes={{ label }}
          />
          <FormControlLabel
            control={
              <Radio
                checked={type === "Forum"}
                onChange={onChannelTypeChange}
                value="Forum"
              />
            }
            label="Forum"
            classes={{ label }}
          />
          <FormControlLabel
            control={
              <Radio
                checked={type === "Link"}
                onChange={onChannelTypeChange}
                value="Link"
              />
            }
            label="Link"
            classes={{ label }}
          />
        </FormGroup>
      </InputForm>
      <InputForm
        title="CHANNEL NAME"
        titleType="WHITE"
        description="Names can’t be longer than 60 characters."
      >
        <CustomInput type="text" value={name} onChange={onChannelNameChange} />
      </InputForm>
      <InputForm title="CHANNEL DESCRIPTION (Optional)" titleType="WHITE">
        <CustomTextArea
          value={description}
          onChange={onChannelDescriptionChange}
        />
      </InputForm>
      <InputForm
        title="PUBLIC/PRIVATE"
        titleType="GREY"
        description="Anyone in your group can see this channel"
      >
        <FormGroup classes={{ root }}>
          <FormControlLabel
            control={
              <Radio
                checked={access === "Public"}
                onChange={onAccessChange}
                value="Public"
              />
            }
            label="Public"
            classes={{ label }}
          />
          <FormControlLabel
            control={
              <Radio
                checked={access === "Private"}
                onChange={onAccessChange}
                value="Private"
              />
            }
            label="Private"
            classes={{ label }}
          />
        </FormGroup>
      </InputForm>
      <Footer>
        {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
        <SubmitButton handleClick={() => {}} />
      </Footer>
    </Wrapper>
  );
}
