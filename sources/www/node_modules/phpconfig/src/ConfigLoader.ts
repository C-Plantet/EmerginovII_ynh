/*
 * PHPConfig - Loads Uniter's PHP configuration
 * Copyright (c) Dan Phillimore (asmblah)
 * https://github.com/uniter/phpconfig/
 *
 * Released under the MIT license
 * https://github.com/uniter/phpconfig/raw/master/MIT-LICENSE.txt
 */

import Config from './Config';
import ConfigExporterInterface from './ConfigExporterInterface';
import ConfigInterface from './ConfigInterface';
import ConfigLoaderInterface from './ConfigLoaderInterface';
import ConfigSet from './ConfigSet';
import LoaderInterface from './LoaderInterface';
import RequirerInterface from './RequirerInterface';

/**
 * A type predicate for determining at runtime whether a valid root config was given.
 *
 * @param {RootConfig | SubConfig} config
 * @returns {boolean}
 */
function isValidConfig(config: RootConfig | SubConfig): config is RootConfig {
    return (
        Object.keys(config).filter((settingName: string) => {
            // Only the keys "plugins" and/or "settings" are allowed
            return settingName !== 'plugins' && settingName !== 'settings';
        }).length === 0
    );
}

/**
 * @inheritDoc
 */
export default class ConfigLoader implements ConfigLoaderInterface {
    constructor(
        private requirer: RequirerInterface,
        private loader: LoaderInterface,
        private exporter: ConfigExporterInterface,
        private ConfigClass: typeof Config,
        private ConfigSetClass: typeof ConfigSet
    ) {}

    /**
     * @inheritDoc
     */
    getConfig(searchPaths: string[]): ConfigInterface {
        const rootConfig = this.loader.load(searchPaths);

        if (!isValidConfig(rootConfig)) {
            throw new Error(
                'Given root config is invalid: may only specify "plugins" or "settings" or both'
            );
        }

        return new this.ConfigClass(
            this.requirer,
            this.exporter,
            rootConfig,
            this.ConfigSetClass
        );
    }
}
