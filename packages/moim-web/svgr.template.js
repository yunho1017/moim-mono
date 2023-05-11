// 18 xs / 24 s / 36 m / 48 l
// touch 48 42
// app/typings/icon.d.ts
module.exports = ({ template }, opts, { componentName, props, jsx }) => {
  return template.ast`
  import React, { useContext } from "react";
  import { ThemeContext } from "styled-components";
  import { TouchWrapper, SizeWrapper } from "common/icons/styledComponents";
  import { px2rem } from "common/helpers/rem";
  const ${componentName} = React.memo((${props}) => {
    const theme = useContext(ThemeContext);
    const iconColor = ${props}.iconColor;

    let component = ${jsx};
    if (${props}.size) {
      component = React.createElement(
        SizeWrapper,
        {
          size: ${props}.size,
          disabled: ${props}.disabled
        },
        component,
      );
    }
    if (${props}.touch) {
      component = React.createElement(
        TouchWrapper,
        {
          disabled: ${props}.disabled,
          style: {
            width: px2rem(${props}.touch),
            height: px2rem(${props}.touch),
          }
        },
        component,
      );
    }
    return component;
  });
  export default ${componentName};
`;
};
