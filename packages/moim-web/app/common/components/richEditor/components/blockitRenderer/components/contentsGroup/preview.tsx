import * as React from "react";
import { FlattenInterpolation } from "styled-components";

import { withPlacement } from "../../hoc/withPlacement";
import ContentGroupPreviewWithResourceId from "common/components/blockitEditorBase/components/blockitRenderer/components/contentsGroup/components/resourceId";
import ContentGroupPreviewWithQueries from "common/components/blockitEditorBase/components/blockitRenderer/components/contentsGroup/components/query";

interface IProps extends Omit<Moim.Blockit.IContentGroupPreviewBlock, "type"> {
  wrapperStyle?: FlattenInterpolation<any>;
}

const ContentGroupPreview: React.FC<IProps> = props => {
  if (props.resourceId) {
    return (
      <ContentGroupPreviewWithResourceId
        {...props}
        resourceId={props.resourceId}
      />
    );
  }
  if (props.query) {
    return <ContentGroupPreviewWithQueries {...props} query={props.query} />;
  }
  return null;
};

export default withPlacement(React.memo(ContentGroupPreview));
