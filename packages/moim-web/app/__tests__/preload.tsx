import { configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

configure({ adapter: new Adapter() });

if (typeof window !== "undefined") {
  require("intersection-observer");
}

/**
 * Jest의 기본 environment가 JSDOM으로 설정되어서, global 객체에 XMLHttpRequest 객체가 설정됩니다.
 * 이로 인해 Axios는 Browser에서 동작한다고 생각하여, XMLHttpRequest Adapter를 선택하게 됩니다.
 * 이를 회피하기 위해 아래와 같이 XMLHttpRequest property를 undefined로 설정합니다.
 *
 * [axios adapter logic]
 * https://github.com/axios/axios/blob/9a6abd789f91a87d701116c0d86f1cfbc3295d66/lib/defaults.js#L16-L26
 */
(global as any).XMLHttpRequest = undefined;
