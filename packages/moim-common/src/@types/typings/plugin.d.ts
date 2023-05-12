declare namespace Moim {
  namespace Plugin {
    interface IPluginClientInfo {
      id: Id;
      config: {
        endpoints: {
          replace: string;
          action: string;
          home: string;
        };
      };
    }

    interface IPluginApplicationInfo {
      id: string;
      name: string;
      description: string;
    }

    interface IPlugin {
      id: string;
      name: string;
      client: IPluginClientInfo;
      application: IPluginApplicationInfo;
    }
  }
}
