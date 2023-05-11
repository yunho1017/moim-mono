import * as React from "react";
import { px2rem } from "common/helpers/rem";
import useIsMobile from "common/hooks/useIsMobile";
import { ThemeType } from "../component";

interface IProps {
  selectedTheme: ThemeType;
}

const OrSvgConnector: React.FC<IProps> = ({ selectedTheme }) => {
  const isMobile = useIsMobile();

  return isMobile ? (
    <svg width={px2rem(32)} height={px2rem(24)} viewBox="0 0 34 24">
      <g
        id="Symbol"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="Quest/mission/bar_or_M"
          transform="translate(-171.000000, 0.000000)"
          fill={selectedTheme === "black" ? "black" : "white"}
        >
          <g id="Group-2" transform="translate(171.000000, 1.000000)">
            <path
              d="M18.0130536,0.708484856 L31.2663273,9.32311277 C32.1924466,9.92509028 32.4552154,11.1638575 31.8532379,12.0899767 C31.7007957,12.3245031 31.5008538,12.524445 31.2663273,12.6768872 L18.0130536,21.2915151 C17.3502582,21.7223322 16.4958956,21.7223322 15.8331002,21.2915151 L2.57982651,12.6768872 C1.65370727,12.0749097 1.39093847,10.8361425 1.99291598,9.9100233 C2.14535817,9.67549686 2.34530007,9.47555495 2.57982651,9.32311277 L15.8331002,0.708484856 C16.4958956,0.277667833 17.3502582,0.277667833 18.0130536,0.708484856 Z"
              id="Polygon"
              stroke-opacity="0.16"
              stroke={selectedTheme === "black" ? "black" : "white"}
              fillOpacity="0.1"
            ></path>
            <g
              id="Group"
              transform="translate(9.923077, 5.000000)"
              fontFamily="SFProDisplay-Bold, SF Pro Display"
              fontSize="10"
              fontWeight="bold"
            >
              <text id="OR">
                <tspan x="0.037109375" y="10">
                  OR
                </tspan>
              </text>
            </g>
          </g>
        </g>
      </g>
    </svg>
  ) : (
    <svg width={px2rem(40)} height={px2rem(28)} viewBox="0 0 40 28">
      <g
        id="Symbol"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="Quest/mission/bar_or"
          transform="translate(-214.000000, -2.000000)"
          fill={selectedTheme === "black" ? "black" : "white"}
        >
          <g id="Group-2" transform="translate(214.000000, 3.000000)">
            <path
              d="M21.0899767,0.708484856 L37.4201735,11.3231128 C38.3462927,11.9250903 38.6090615,13.1638575 38.007084,14.0899767 C37.8546418,14.3245031 37.6546999,14.524445 37.4201735,14.6768872 L21.0899767,25.2915151 C20.4271813,25.7223322 19.5728187,25.7223322 18.9100233,25.2915151 L2.57982651,14.6768872 C1.65370727,14.0749097 1.39093847,12.8361425 1.99291598,11.9100233 C2.14535817,11.6754969 2.34530007,11.475555 2.57982651,11.3231128 L18.9100233,0.708484856 C19.5728187,0.277667833 20.4271813,0.277667833 21.0899767,0.708484856 Z"
              id="Polygon"
              stroke-opacity="0.24"
              stroke={selectedTheme === "black" ? "black" : "white"}
              fillOpacity="0.06"
            ></path>
            <g
              id="Group"
              transform="translate(11.500000, 6.000000)"
              fillOpacity="0.86"
              fontFamily="SFProDisplay-Bold, SF Pro Display"
              fontSize="12"
              fontWeight="bold"
              line-spacing="16"
            >
              <text id="OR">
                <tspan x="0.14453125" y="11">
                  OR
                </tspan>
              </text>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

export default OrSvgConnector;
