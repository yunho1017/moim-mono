import { IntlShape } from "react-intl";
import { NAME_VALIDATION_ERROR_CODE } from "../../constants";

export const getErrorMessage = (
  intl: IntlShape,
  error: Moim.IErrorResponse,
) => {
  switch (error.code) {
    case NAME_VALIDATION_ERROR_CODE.NAME_LENGTH_TOO_LONG: {
      return intl.formatMessage({
        id: "position_settings/create_position/position_name_error_character",
      });
    }

    case NAME_VALIDATION_ERROR_CODE.CONTAIN_NOT_ALLOW_CHAR: {
      return intl.formatMessage(
        {
          id:
            "position_settings/create_position/position_name_error_substrings",
        },
        { substring: error.metadata?.char ?? "" },
      );
    }

    default: {
      return "";
    }
  }
};
