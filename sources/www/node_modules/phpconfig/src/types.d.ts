/*
 * PHPConfig - Loads Uniter's PHP configuration
 * Copyright (c) Dan Phillimore (asmblah)
 * https://github.com/uniter/phpconfig/
 *
 * Released under the MIT license
 * https://github.com/uniter/phpconfig/raw/master/MIT-LICENSE.txt
 */

type LibraryConfigShape = {
    libraryName: string;
    topLevelConfig: SubConfig;
    pluginConfigFilePaths: string[];
};

type ExportedLibraryConfig = {
    libraryName: string;
    configs: SubConfig[];
};

type RootConfig =
    | {
          plugins?: PluginConfig[];
          settings: Settings;
      }
    | {
          plugins: PluginConfig[];
          settings?: Settings;
      };

type Settings = {
    [libraryName: string]: SubConfig;
};

type PluginConfig = {
    // Plugins should be specified in their own separate modules,
    // so the value should only ever be a path string (for main library config)
    // or a nested sub-library config if not nullish
    [libraryName: string]: null | string | SubLibraryConfig | undefined;
};

type SubLibraryConfig = {
    // Plugins should be specified in their own separate modules,
    // so the value should only ever be a path string if not nullish
    [libraryName: string]: null | string | undefined;
};

type SubConfig = {
    [settingName: string]: SettingValue;
};

type SettingValue =
    | SettingValue[]
    | SubConfig
    | boolean
    | null
    | number
    | string
    | undefined;
