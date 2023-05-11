import * as React from "react";
import { IntlProvider } from "react-intl";
import loadable from "@loadable/component";
import { connect } from "react-redux";
// Import locale setting packages
import { IAppState } from "app/rootReducer";
import { browserLocale as findLocale } from "./";
import moment from "moment";

interface IProps extends ReturnType<typeof mapStateToProps> {
  browserLocale?: string;
  children: React.ReactChild;
}

function mapStateToProps(state: IAppState) {
  return {
    currentLocale: state.app.locale,
  };
}

const LoadableMessage = loadable.lib(async (props: { locale: string }) =>
  import(/* webpackChunkName: "[request]" */ `./assets/${props.locale}.json`),
);

class IntlWrapper extends React.Component<IProps> {
  public componentDidMount() {
    this.setMomentLocale();
  }

  public componentDidUpdate(prevProps: IProps) {
    if (prevProps.currentLocale !== this.props.currentLocale) {
      this.setMomentLocale();
    }
  }
  public render() {
    const { children, currentLocale, browserLocale } = this.props;
    const locale = findLocale(currentLocale || browserLocale);

    return (
      <LoadableMessage locale={locale}>
        {({ default: messages }: { default: Record<string, string> }) => (
          <IntlProvider locale={locale} messages={messages}>
            {children}
          </IntlProvider>
        )}
      </LoadableMessage>
    );
  }

  private readonly setMomentLocale = () => {
    const locale = findLocale(
      this.props.currentLocale || this.props.browserLocale,
    );

    moment.locale(locale);
  };
}

export default connect(mapStateToProps)(IntlWrapper);
