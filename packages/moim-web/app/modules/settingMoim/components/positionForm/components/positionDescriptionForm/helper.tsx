import { IntlShape } from "react-intl";
import { DESCRIPTION_VALIDATION_ERROR_CODE } from "../../constants";

export const getErrorMessage = (
  intl: IntlShape,
  error: Moim.IErrorResponse,
) => {
  switch (error.code) {
    case DESCRIPTION_VALIDATION_ERROR_CODE.DESCRIPTION_LENGTH_TOO_LONG: {
      return intl.formatMessage({
        id:
          "position_settings/create_position/position_description_error_character",
      });
    }

    default: {
      return "";
    }
  }
};
