import * as React from "react";
import { useHandlers, useProps } from "./hooks";
import PositionForm from "../../components/positionForm";

function PositionFormContainer() {
  const hookProps = useProps();
  const hookHandlers = useHandlers(hookProps);

  const { mode, position } = hookProps;
  const { handleSubmit } = hookHandlers;

  return (
    <PositionForm
      mode={mode!}
      positionId={position?.id}
      name={position?.name}
      description={position?.description}
      onSubmit={handleSubmit}
    />
  );
}

export default PositionFormContainer;
