/*
 * PHPConfig - Loads Uniter's PHP configuration
 * Copyright (c) Dan Phillimore (asmblah)
 * https://github.com/uniter/phpconfig/
 *
 * Released under the MIT license
 * https://github.com/uniter/phpconfig/raw/master/MIT-LICENSE.txt
 */

import ConfigExporterInterface from './ConfigExporterInterface';
import SerialisationCheckerInterface from './SerialisationCheckerInterface';

const hasOwn = {}.hasOwnProperty;

/**
 * Fetches the config for the given library from the root config
 *
 * @param {RootConfig} allConfig
 * @param {string} mainLibraryName
 * @param {string=} subLibraryName
 * @returns {SubConfig}
 */
function getLibraryConfigFromRoot(
    allConfig: RootConfig,
    mainLibraryName: string,
    subLibraryName?: string
): SubConfig {
    const mainConfig: string | SubConfig =
        (allConfig.settings ?? {})[mainLibraryName] ?? {};

    if (typeof mainConfig !== 'object') {
        throw new Error(
            `Config for main library "${mainLibraryName}" should be an object`
        );
    }

    if (subLibraryName == null) {
        return mainConfig;
    }

    let subConfig: SubConfig =
        (allConfig.settings ?? {})[subLibraryName] ?? null;

    if (subConfig === null) {
        subConfig = {};
    }

    // Config for the sub-library that is specified under the main library
    // should override settings for the sub-library that are set outside
    return Object.assign(
        {},
        subConfig,
        mainConfig[subLibraryName]
    ) as SubConfig;
}

/**
 * Fetches the config for the given main library from a plugin config
 *
 * @param {PluginConfig} pluginConfig
 * @param {string} mainLibraryName
 * @returns {string[]}
 */
function getMainLibraryConfigPathsFromPlugin(
    pluginConfig: PluginConfig,
    mainLibraryName: string
): string[] {
    const mainConfig: null | string | SubConfig =
        pluginConfig[mainLibraryName] ?? null;

    if (mainConfig === null) {
        // No config is specified for the main library by this plugin
        return [];
    }

    if (typeof mainConfig === 'string') {
        // Main config is provided via the simple path-string syntax;
        // the main library config should be required from the given path
        return [mainConfig];
    }

    if (typeof mainConfig === 'object') {
        // Main config is provided via the extended object syntax;
        // the main library config (if given) should be required from the path
        // given as a property of this object with the main library's name
        const pathToMainConfig = mainConfig[mainLibraryName] ?? null;

        if (pathToMainConfig === null) {
            // Main library's extended syntax does not specify anything for itself
            return [];
        }

        if (typeof pathToMainConfig !== 'string') {
            throw new Error(
                `Value for main library extended config path "${mainLibraryName}.${mainLibraryName}" should be a path`
            );
        }

        return [pathToMainConfig];
    }

    throw new Error(
        `Value for main library "${mainLibraryName}" should be a path or object`
    );
}

/**
 * Fetches the config for the given sub-library from a plugin config
 *
 * @param {PluginConfig} pluginConfig
 * @param {string} mainLibraryName
 * @param {string} subLibraryName
 * @returns {string[]}
 */
function getSubLibraryConfigPathsFromPlugin(
    pluginConfig: PluginConfig,
    mainLibraryName: string,
    subLibraryName: string
): string[] {
    const isolatedPathToSubLibraryConfig: string | SubLibraryConfig | null =
        pluginConfig[subLibraryName] ?? null;
    let pathToSubLibraryConfigUnderMain: string | null = null;
    const mainLibraryConfig = pluginConfig[mainLibraryName] ?? {};

    if (hasOwn.call(pluginConfig, subLibraryName)) {
        if (typeof isolatedPathToSubLibraryConfig !== 'string') {
            throw new Error(
                `Isolated value for sub-library "${subLibraryName}" should be a path`
            );
        }
    }

    if (typeof mainLibraryConfig === 'object') {
        // Main config is provided via the extended object syntax;
        // the sub-library config (if given) should be required from the path
        // given as a property of this object with the sub-library's name
        if (hasOwn.call(mainLibraryConfig, subLibraryName)) {
            if (typeof mainLibraryConfig[subLibraryName] !== 'string') {
                throw new Error(
                    `Value for sub-library under "${mainLibraryName}.${subLibraryName}" should be a path`
                );
            }

            pathToSubLibraryConfigUnderMain = mainLibraryConfig[
                subLibraryName
            ] as string;
        }
    } else if (typeof mainLibraryConfig !== 'string') {
        throw new Error(
            `Value for main library extended config path "${mainLibraryName}.${mainLibraryName}" should be a path or object`
        );
    }

    const paths = [];

    if (isolatedPathToSubLibraryConfig !== null) {
        paths.push(isolatedPathToSubLibraryConfig as string);
    }

    // Sub-library config given under main should take precedence,
    // so that defaults may be specified in the "isolated" config
    // and then overridden here
    if (pathToSubLibraryConfigUnderMain !== null) {
        paths.push(pathToSubLibraryConfigUnderMain);
    }

    return paths;
}

/**
 * Fetches the paths to plugins for a given library from a single plugin config
 *
 * @param {PluginConfig} pluginConfig
 * @param {string} mainLibraryName
 * @param {string=} subLibraryName
 * @returns {string[]}
 */
function getLibraryConfigPathsFromPlugin(
    pluginConfig: PluginConfig,
    mainLibraryName: string,
    subLibraryName?: string
): string[] {
    return subLibraryName
        ? getSubLibraryConfigPathsFromPlugin(
              pluginConfig,
              mainLibraryName,
              subLibraryName
          )
        : getMainLibraryConfigPathsFromPlugin(pluginConfig, mainLibraryName);
}

/**
 * Fetches the paths to plugins for a given library from a set of plugin configs
 *
 * @param {PluginConfig[]} pluginConfigs
 * @param {string} mainLibraryName
 * @param {string} subLibraryName
 * @returns {string[]}
 */
function getLibraryConfigPathsFromPlugins(
    pluginConfigs: PluginConfig[],
    mainLibraryName: string,
    subLibraryName?: string
): string[] {
    const libraryConfigPaths = [];

    for (const pluginConfig of pluginConfigs) {
        const pluginSubLibraryConfigPaths = getLibraryConfigPathsFromPlugin(
            pluginConfig,
            mainLibraryName,
            subLibraryName
        );

        libraryConfigPaths.push(...pluginSubLibraryConfigPaths);
    }

    return libraryConfigPaths;
}

/**
 * @inheritDoc
 */
export default class ConfigExporter implements ConfigExporterInterface {
    constructor(private serialisationChecker: SerialisationCheckerInterface) {}

    /**
     * @inheritDoc
     */
    exportLibrary(
        rootConfig: RootConfig,
        mainLibraryName: string,
        subLibraryName?: string
    ): LibraryConfigShape {
        const libraryName = subLibraryName ?? mainLibraryName;
        const topLevelConfig = getLibraryConfigFromRoot(
            rootConfig,
            mainLibraryName,
            subLibraryName
        );

        if (!this.serialisationChecker.isSerialisable(topLevelConfig)) {
            throw new Error(
                `Top-level config for library "${libraryName}" is not serialisable`
            );
        }

        return {
            libraryName: libraryName,
            topLevelConfig: topLevelConfig,
            pluginConfigFilePaths: rootConfig.plugins
                ? getLibraryConfigPathsFromPlugins(
                      rootConfig.plugins,
                      mainLibraryName,
                      subLibraryName
                  )
                : [],
        };
    }
}
