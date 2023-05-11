import * as React from "react";
import { useEffectOnce } from "react-use";
import { FormattedMessage } from "react-intl";
import { RouteComponentProps } from "react-router-dom";
import { useStoreState, useActions } from "app/store";
import useRedirect from "common/hooks/useRedirect";
import { getInstalledPlugins as getInstalledPluginsAction } from "app/actions/group";
import { MoimURL } from "common/helpers/url";
import { DefaultLoader } from "common/components/loading";
import ListAndDetailLayout from "common/layouts/listAndDetail";
import Menu, { LEFT_WIDTH } from "./components/menus";
import HomePlate from "./components/homePlate";
import { Title, Container, Wrapper, Content } from "./styled";

const MAIN_PANEL_URLS = [MoimURL.Plugins.pattern, MoimURL.PluginShow.pattern];

const Plugins: React.FC<RouteComponentProps<Moim.IMatchParams>> = ({
  match,
}) => {
  const { id } = match.params;
  const { isLoading, plugins, paging } = useStoreState(state => ({
    isLoading: state.plugins.isListLoading,
    plugins: state.plugins.list.data,
    paging: state.plugins.list.paging,
  }));
  const { getInstalledPlugins } = useActions({
    getInstalledPlugins: getInstalledPluginsAction,
  });

  const redirect = useRedirect();

  useEffectOnce(() => {
    getInstalledPlugins();
  });

  React.useEffect(() => {
    if (!id && Boolean(plugins.length)) {
      redirect(new MoimURL.PluginShow({ id: plugins[0].id }).toString());
    }
  }, [id, plugins, redirect]);

  return (
    <Container>
      <Wrapper>
        <Title>
          <FormattedMessage id="plugin_list_title" />
        </Title>
        <Content>
          {isLoading ? (
            <DefaultLoader />
          ) : (
            <ListAndDetailLayout
              mainPanelUrls={MAIN_PANEL_URLS}
              disableListWrapperRightBorder={true}
              listWrapperWidth={LEFT_WIDTH}
              listElement={
                <Menu selectedPluginId={id} plugins={plugins} paging={paging} />
              }
              detailElement={<HomePlate selectedPluginId={id} />}
            />
          )}
        </Content>
      </Wrapper>
    </Container>
  );
};

export default Plugins;
