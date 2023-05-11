import Axios from "axios";
import { getAnalyticsApiDomain } from "common/helpers/domainMaker";
import { useEffect, useState } from "react";

const apiUrl = getAnalyticsApiDomain();

const useAnalyticsToken = (group: string | null, token: string | null) => {
  const [analytics, setAnalytics] = useState<string | null>(null);

  useEffect(() => {
    if (token && group) {
      Axios.get(`${apiUrl}/auth`, {
        params: {
          groupId: group,
          token,
        },
      }).then(res => {
        setAnalytics(res.data.token);
      });
    }
  }, [group, token]);

  return analytics;
};

export default useAnalyticsToken;
