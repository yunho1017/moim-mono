import * as React from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import { DefaultDivider } from "common/components/divider";
import { TextButton } from "common/components/designSystem/buttons";
import { B1Regular, B4Regular } from "common/components/designSystem/typos";
import { DefaultLoader } from "common/components/loading";
import ListItem from "../listItem";

import useRedirect from "common/hooks/useRedirect";
import { useActions, useStoreState } from "app/store";
import useCancelToken from "common/hooks/useCancelToken";
import { useScrollStyle } from "common/components/designSystem/styles";
import { postTemplateListSelector } from "app/selectors/postTemplate";
import { px2rem } from "common/helpers/rem";
import { PostTemplateContext } from "../../context";
import { MoimURL } from "common/helpers/url";
import { getPostTemplate } from "app/actions/postTemplate";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Header = styled(B4Regular)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${px2rem(8)} 0 ${px2rem(16)};
  height: ${px2rem(39)};
  color: ${props => props.theme.colorV2.colorSet.grey300};
`;

const Body = styled.div`
  min-width: 0;
  flex: 1;
  ${useScrollStyle}
`;
const CenterTemplate = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Empty = styled(B1Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey300};
`;

export default function List() {
  const cancelToken = useCancelToken();
  const redirect = useRedirect();
  const { currentPostTemplate } = React.useContext(PostTemplateContext);
  const { templates, isLoading } = useStoreState(state => ({
    templates: postTemplateListSelector(state),
    isLoading: state.postTemplate.getPostTemplatesLoading,
  }));
  const { dispatchGetPostTemplate } = useActions({
    dispatchGetPostTemplate: getPostTemplate,
  });

  const handleClickCreate = React.useCallback(() => {
    redirect(new MoimURL.PostTemplateEditor().toString());
  }, [redirect]);

  React.useEffect(() => {
    dispatchGetPostTemplate(cancelToken.current.token);
  }, []);

  const bodyElement = React.useMemo(() => {
    if (isLoading) {
      return (
        <CenterTemplate>
          <DefaultLoader />
        </CenterTemplate>
      );
    }
    if (!templates.data.length) {
      return (
        <CenterTemplate>
          <Empty>
            <FormattedMessage id="admin_post_template/list_empty" />
          </Empty>
        </CenterTemplate>
      );
    }

    return templates.data.map(template => (
      <ListItem
        key={template.id}
        selected={template.id === currentPostTemplate?.id}
        template={template}
      />
    ));
  }, [isLoading, currentPostTemplate, templates]);

  return (
    <Wrapper>
      <Header>
        <FormattedMessage
          id="admin_post_template/list_number_of_templates"
          values={{ count: templates?.data.length ?? 0 }}
        />
        <TextButton size="s" onClick={handleClickCreate}>
          <FormattedMessage id="admin_post_template/create_button" />
        </TextButton>
      </Header>
      <DefaultDivider />
      <Body>{bodyElement}</Body>
    </Wrapper>
  );
}
