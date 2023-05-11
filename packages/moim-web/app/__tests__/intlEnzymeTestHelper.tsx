import * as React from "react";
import * as ReactIntl from "react-intl";
import moment from "moment";
import { History } from "history";
import { Route, MemoryRouter } from "react-router-dom";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import { renderHook } from "@testing-library/react-hooks";
import { generateMockStore } from "app/__mocks__/mockStore";
import { initialState as defaultInitialState, IAppState } from "../rootReducer";
import { mount, shallow } from "enzyme";
import { Provider } from "react-redux";
import { Store } from "redux";
import polyfillIntlInNode from "app/__tests__/polyfillIntl";
import { ThemeProvider } from "styled-components";
import makeTheme from "app/theme";
import {
  generateDefaultElementThemeColorSet,
  generateDefaultPalette,
} from "app/theme/constants/palette";
import { DEFAULT_LANGUAGE } from "app/intl";
import { ThemeMode } from "app/enums";

export function getIntl(locale: string) {
  polyfillIntlInNode();
  return ReactIntl.createIntl({
    locale,
    messages: {},
  });
}

function MockComponent() {
  return <div />;
}
interface IIntlEnzymeHelperOptions {
  locale: string;
  initialState?: IAppState;
  attachTo?: HTMLElement;
  initialEntries?: History.LocationDescriptor[];
  path?: string;
}

const themeData = {
  locale: DEFAULT_LANGUAGE,
  palette: generateDefaultPalette(),
  darkPalette: generateDefaultPalette(),
  themeMode: ThemeMode.LIGHT,
  elementThemePalette: generateDefaultElementThemeColorSet(),
};

export function mountWithTheme<P, S = {}>(children: React.ReactNode) {
  return mount<P, S>(
    <ThemeProvider theme={makeTheme(themeData)}>
      {children as any}
    </ThemeProvider>,
  );
}
function MountWithThemeAndStoreWrapper({
  children,
  store,
}: React.PropsWithChildren<{
  store: Store;
}>) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={makeTheme(themeData)}>{children}</ThemeProvider>
    </Provider>
  );
}

export function mountWithThemeAndStore<P, S = {}>(
  node: React.ReactElement,
  { initialState, attachTo }: IIntlEnzymeHelperOptions,
) {
  const store = generateMockStore(
    initialState ? initialState : defaultInitialState,
  );

  return mount<P, S>(node, {
    wrappingComponent: MountWithThemeAndStoreWrapper,
    wrappingComponentProps: {
      store,
    },
    attachTo,
  });
}

function MountWithThemeAndStoreAndRouterWrapper({
  children,
  path,
  initialEntries,
  store,
}: React.PropsWithChildren<{
  path: string;
  initialEntries: string[];
  store: Store;
}>) {
  return (
    <MemoryRouter initialEntries={initialEntries} initialIndex={0}>
      <Provider store={store}>
        <ThemeProvider theme={makeTheme(themeData)}>
          <Route path={path} render={() => children} />
        </ThemeProvider>
      </Provider>
    </MemoryRouter>
  );
}

export function mountWithThemeAndStoreAndRouter<P, S = {}>(
  node: React.ReactElement,
  { initialState, initialEntries, path, attachTo }: IIntlEnzymeHelperOptions,
) {
  const store = generateMockStore(
    initialState ? initialState : defaultInitialState,
  );
  return mount<P, S>(node, {
    wrappingComponent: MountWithThemeAndStoreAndRouterWrapper,
    wrappingComponentProps: {
      path,
      initialEntries,
      store,
    },
    attachTo,
  });
}

function MountWithIntlWrapper({
  children,
  locale,
}: React.PropsWithChildren<{
  locale: string;
}>) {
  moment.locale(locale);
  const intl = getIntl(locale);
  return (
    <ReactIntl.RawIntlProvider value={intl}>
      <ThemeProvider theme={makeTheme(themeData)}>
        {children as any}
      </ThemeProvider>
    </ReactIntl.RawIntlProvider>
  );
}

export function mountWithIntl<P, S = {}>(
  node: React.ReactElement,
  { locale = "en", attachTo }: IIntlEnzymeHelperOptions,
) {
  return mount<P, S>(node, {
    wrappingComponent: MountWithIntlWrapper,
    wrappingComponentProps: {
      locale,
    },
    attachTo,
  });
}

function MountWithIntlAndRouterWrapper({
  children,
  locale,
  path,
  initialEntries,
}: React.PropsWithChildren<{
  locale: string;
  path: string;
  initialEntries: string[];
}>) {
  moment.locale(locale);
  const intl = getIntl(locale);
  return (
    <MemoryRouter initialEntries={initialEntries} initialIndex={0}>
      <ReactIntl.RawIntlProvider value={intl}>
        <ThemeProvider theme={makeTheme(themeData)}>
          <Route path={path} render={() => children} />
        </ThemeProvider>
      </ReactIntl.RawIntlProvider>
    </MemoryRouter>
  );
}

export function mountWithIntlAndRouter<P, S = {}>(
  node: React.ReactElement,
  { locale = "en", initialEntries, path, attachTo }: IIntlEnzymeHelperOptions,
) {
  return mount<P, S>(node, {
    wrappingComponent: MountWithIntlAndRouterWrapper,
    wrappingComponentProps: {
      locale,
      path,
      initialEntries,
    },
    attachTo,
  });
}

function MountWithIntlAndStoreWrapper({
  children,
  locale,
  store,
}: React.PropsWithChildren<{
  locale: string;
  store: Store;
}>) {
  moment.locale(locale);
  const intl = getIntl(locale);
  return (
    <Provider store={store}>
      <ThemeProvider theme={makeTheme(themeData)}>
        <ReactIntl.RawIntlProvider value={intl}>
          {children}
        </ReactIntl.RawIntlProvider>
      </ThemeProvider>
    </Provider>
  );
}

export function mountWithIntlAndStore<P, S = {}>(
  node: React.ReactElement,
  { locale = "en", initialState, attachTo }: IIntlEnzymeHelperOptions,
) {
  const store = generateMockStore(
    initialState ? initialState : defaultInitialState,
  );
  // Inject Css context
  return mount<P, S>(node, {
    wrappingComponent: MountWithIntlAndStoreWrapper,
    wrappingComponentProps: {
      store,
      locale,
    },
    attachTo,
  });
}

function MountWithIntlAndRouterAndStoreWrapper({
  children,
  locale,
  path,
  initialEntries,
  store,
}: React.PropsWithChildren<{
  locale: string;
  path: string;
  initialEntries: string[];
  store: Store;
}>) {
  moment.locale(locale);
  const intl = getIntl(locale);
  return (
    <Provider store={store}>
      <MemoryRouter initialEntries={initialEntries} initialIndex={0}>
        <ReactIntl.RawIntlProvider value={intl}>
          <ThemeProvider theme={makeTheme(themeData)}>
            <AlertProvider
              template={MockComponent}
              position={positions.BOTTOM_LEFT}
              timeout={5000}
              offset="0"
              transition={transitions.FADE}
              containerStyle={{
                zIndex: 99999,
              }}
            >
              <Route path={path} render={() => children} />
            </AlertProvider>
          </ThemeProvider>
        </ReactIntl.RawIntlProvider>
      </MemoryRouter>
    </Provider>
  );
}

export function mountWithIntlAndRouterAndStore<P, S = {}>(
  node: React.ReactElement,
  {
    locale = "en",
    initialState,
    attachTo,
    initialEntries,
    path,
  }: IIntlEnzymeHelperOptions,
) {
  const store = generateMockStore(
    initialState ? initialState : defaultInitialState,
  );
  // Inject Css context
  return mount<P, S>(node, {
    wrappingComponent: MountWithIntlAndRouterAndStoreWrapper,
    wrappingComponentProps: {
      locale,
      path,
      initialEntries,
      store,
    },
    attachTo,
  });
}

export function shallowWithIntl<P, S = {}>(
  node: React.ReactElement,
  { locale = "en", initialState }: IIntlEnzymeHelperOptions,
) {
  const store = generateMockStore(
    initialState ? initialState : defaultInitialState,
  );
  // Inject Css context
  return shallow<P, S>(node, {
    lifecycleExperimental: true,
    wrappingComponent: MountWithIntlAndStoreWrapper,
    wrappingComponentProps: {
      locale,
      store,
    },
  });
}

export function renderHookWithStoreAndIntl<R>({
  hook,
  initialState,
  locale = "en",
}: {
  hook: () => R;
  initialState?: IAppState;
  locale?: string;
}) {
  const mockStore = generateMockStore(
    initialState ? initialState : defaultInitialState,
  );

  const renderResult = renderHook(hook, {
    wrapper: ({ children }) =>
      MountWithIntlAndStoreWrapper({ store: mockStore, locale, children }),
  });

  return {
    mockStore,
    renderResult,
  };
}
