import * as React from "react";
import { UserProfileMaskWrapper } from "./styledComponents";
function UserProfileMask() {
  return (
    <UserProfileMaskWrapper>
      <svg width="0%" height="0%">
        <defs>
          <clipPath id="userProfile-xl">
            <path d="M40 0c22.091 0 40 17.909 40 40 0 3.246-.387 6.401-1.116 9.423-.778 3.222-1.946 6.291-3.451 9.156C73.388 56.964 70.807 56 68 56c-6.627 0-12 5.373-12 12 0 2.807.964 5.388 2.578 7.432C53.028 78.35 46.706 80 40 80 17.909 80 0 62.091 0 40S17.909 0 40 0z" />
          </clipPath>
        </defs>
      </svg>
      <svg width="0%" height="0%">
        <defs>
          <clipPath id="userProfile-l">
            <path d="M24 0c13.255 0 24 10.745 24 24 0 1.947-.232 3.84-.67 5.654-.395 1.636-.958 3.207-1.669 4.693C44.213 32.897 42.211 32 40 32c-4.418 0-8 3.582-8 8 0 2.211.897 4.213 2.347 5.66C31.215 47.16 27.705 48 24 48 10.745 48 0 37.255 0 24S10.745 0 24 0z" />
          </clipPath>
        </defs>
      </svg>
      <svg width="0%" height="0%">
        <defs>
          <clipPath id="userProfile-m">
            <path d="M18 0c9.941 0 18 8.059 18 18 0 1.46-.174 2.88-.502 4.24-.297 1.228-.719 2.406-1.252 3.521C33.16 24.673 31.658 24 30 24c-3.314 0-6 2.686-6 6 0 1.658.673 3.16 1.76 4.246C23.411 35.37 20.78 36 18 36 8.059 36 0 27.941 0 18S8.059 0 18 0z" />
          </clipPath>
        </defs>
      </svg>
      <svg width="0%" height="0%">
        <defs>
          <clipPath id="userProfile-s">
            <path d="M12 0c6.627 0 12 5.373 12 12 0 .974-.116 1.92-.335 2.827-.198.819-.48 1.605-.835 2.348C22.106 16.45 21.106 16 20 16c-2.21 0-4 1.79-4 4 0 1.106.449 2.106 1.174 2.83C15.608 23.58 13.854 24 12 24 5.373 24 0 18.627 0 12S5.373 0 12 0z" />
          </clipPath>
        </defs>
      </svg>
      <svg width="0%" height="0%">
        <defs>
          <clipPath id="userProfile-xs">
            <path d="M9 0c4.97 0 9 4.03 9 9 0 .73-.087 1.44-.251 2.12-.148.613-.36 1.202-.626 1.76C16.58 12.335 15.83 12 15 12c-1.657 0-3 1.343-3 3 0 .83.337 1.58.88 2.123-1.175.562-2.49.877-3.88.877-4.97 0-9-4.03-9-9s4.03-9 9-9z" />
          </clipPath>
        </defs>
      </svg>
    </UserProfileMaskWrapper>
  );
}

export default React.memo(UserProfileMask);
