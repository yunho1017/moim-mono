import * as React from "react";
import { isHubDomain } from "common/helpers/envChecker";
import MoimGlobalTermsAndPolicy from "./container/moimGlobal";
import MoimUserTermsAndPolicy from "./container/moimUser";

const TermsAndPolicy = () =>
  isHubDomain() ? <MoimGlobalTermsAndPolicy /> : <MoimUserTermsAndPolicy />;

export default TermsAndPolicy;
