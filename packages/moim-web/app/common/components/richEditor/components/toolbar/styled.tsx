import styled from "styled-components";

export const ToolBarContainer = styled.div.attrs({ id: "toolbar" })`
  button + button {
    margin-left: 10px;
  }
  .ql-active {
    color: green;
  }

  .ql-bold {
  }
  .ql-italic {
  }
  .ql-link {
  }
  .ql-mention {
  }
  .ql-emoji {
  }
`;
