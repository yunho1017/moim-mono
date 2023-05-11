// 프리셋 추가 방벙
// - presets 폴더에 추가하고자 하는 preset을 다른 preset과 같은 구조로 만들고 컴포넌트 작성
// - 그 안에서 action/reducer의 이름 / 타입을 수정함
// - base 안에있는 actions.ts reducer.ts 에 만든 preset action/reducer를 추가

import GlobalUserReportDialog from "./presets/user";
import GlobalPostReportDialog from "./presets/post";

export { GlobalPostReportDialog, GlobalUserReportDialog };
