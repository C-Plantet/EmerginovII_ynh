/*
 * PHPConfig - Loads Uniter's PHP configuration
 * Copyright (c) Dan Phillimore (asmblah)
 * https://github.com/uniter/phpconfig/
 *
 * Released under the MIT license
 * https://github.com/uniter/phpconfig/raw/master/MIT-LICENSE.txt
 */

import ConfigExporterInterface from './ConfigExporterInterface';
import ConfigInterface from './ConfigInterface';
import ConfigSet from './ConfigSet';
import ConfigSetInterface from './ConfigSetInterface';
import RequirerInterface from './RequirerInterface';

function isEmpty(subConfig: SubConfig): boolean {
    return Object.keys(subConfig).length === 0;
}

/**
 * @inheritDoc
 */
export default class Config implements ConfigInterface {
    constructor(
        private requirer: RequirerInterface,
        private exporter: ConfigExporterInterface,
        private rootConfig: RootConfig,
        private ConfigSetClass: typeof ConfigSet
    ) {}

    /**
     * @inheritDoc
     */
    exportLibrary(
        mainLibraryName: string,
        subLibraryName?: string
    ): LibraryConfigShape {
        return this.exporter.exportLibrary(
            this.rootConfig,
            mainLibraryName,
            subLibraryName
        );
    }

    /**
     * @inheritDoc
     */
    getConfigsForLibrary(
        mainLibraryName: string,
        subLibraryName?: string
    ): ConfigSetInterface {
        const libraryConfig = this.exporter.exportLibrary(
            this.rootConfig,
            mainLibraryName,
            subLibraryName
        );
        const configs = libraryConfig.pluginConfigFilePaths.map((path) => {
            const pluginConfig = this.requirer.require(path) ?? {};

            if (typeof pluginConfig !== 'object') {
                throw new Error(
                    subLibraryName
                        ? `Imported config for sub-library "${subLibraryName}" under main library "${mainLibraryName}" should be an object`
                        : `Imported config for main library "${mainLibraryName}" should be an object`
                );
            }

            return pluginConfig;
        });

        if (!isEmpty(libraryConfig.topLevelConfig)) {
            configs.push(libraryConfig.topLevelConfig);
        }

        return new this.ConfigSetClass(configs);
    }
}
