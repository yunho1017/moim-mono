import {
  pB3BoldStyle,
  pB3RegularStyle,
} from "common/components/designSystem/typos";
import { MEDIA_QUERY } from "common/constants/responsive";
import { px2rem } from "common/helpers/rem";
import { isEmpty } from "lodash";
import React from "react";
import styled from "styled-components";
import { getPropertiesObjectToArray } from "../utils";

export const PropertiesWrapper = styled.div<{ textColor: string }>`
  color: ${props => props.textColor};
  opacity: 86%;
  ${pB3RegularStyle};
  .propertyValue {
    ${pB3BoldStyle};
  }
  ul {
    li {
      color: ${props => props.textColor};
      height: 40px;
      padding: ${px2rem(20)};
      margin-bottom: ${px2rem(10)};
      border-radius: 5px;
      border: solid 1px ${props => props.textColor}1f;
      list-style: none;
      display: flex;
      align-items: center;
      justify-content: space-between;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  @media ${MEDIA_QUERY.ONLY_DESKTOP} {
    color: ${props => props.textColor};
    margin-bottom: ${px2rem(24)};
    ul {
      display: block;
      li {
        height: 54px;
        width: calc(50% - 10px);
        margin-right: 20px;
        display: inline-flex;
        &:nth-child(2n) {
          margin-right: 0;
        }
      }
    }
  }
`;

export interface IProperty {
  name: string;
  value: string;
}

export const Properties: React.FC<{
  properties: Record<string, IProperty>;
  textColor: string;
}> = ({ properties, textColor }) => {
  const propertiesArray = React.useMemo(
    () => (properties ? getPropertiesObjectToArray(properties) : []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [properties],
  );

  return (
    <>
      {propertiesArray && !isEmpty(propertiesArray) && (
        <PropertiesWrapper textColor={textColor}>
          <ul>
            {propertiesArray.map(item => (
              <li key={item.name}>
                <span>{item.name}</span> <span>{item.value}</span>
              </li>
            ))}
          </ul>
        </PropertiesWrapper>
      )}
    </>
  );
};
