import * as React from "react";
import { useRouteMatch } from "react-router-dom";
import useRedirect from "common/hooks/useRedirect";
import { MoimURL } from "common/helpers/url";
import DesktopSearchInput from "../../components/inputBar/desktop";

interface IProps {
  elementPaletteProps?: Moim.Theme.CommonElementThemePaletteProps;
}

const DesktopSearch: React.FC<IProps> = ({ elementPaletteProps }) => {
  const { params } = useRouteMatch<Moim.IMatchParams>();
  const redirect = useRedirect();
  const [value, setValue] = React.useState(params.query ?? "");

  const handleEnter = React.useCallback(() => {
    if (value) {
      if (params.tab) {
        redirect(
          new MoimURL.SearchWithTab({
            query: value,
            tab: params.tab,
          }).toString(),
        );
      } else {
        redirect(new MoimURL.Search({ query: value }).toString());
      }
    }
  }, [params.tab, redirect, value]);

  return (
    <DesktopSearchInput
      value={value}
      elementPaletteProps={elementPaletteProps}
      onChange={setValue}
      onEnter={handleEnter}
    />
  );
};

export default DesktopSearch;
