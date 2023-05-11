import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import OptionItem, {
  ITEM_WRAPPER_CLASS_NAME,
} from "common/components/commerce/optionItem";

export const StyledOptionItem = styled(OptionItem)`
  padding: ${px2rem(8)} 0;

  .${ITEM_WRAPPER_CLASS_NAME} {
    margin: 0;
  }
`;
