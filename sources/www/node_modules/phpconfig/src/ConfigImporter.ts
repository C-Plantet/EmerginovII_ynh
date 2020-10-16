/*
 * PHPConfig - Loads Uniter's PHP configuration
 * Copyright (c) Dan Phillimore (asmblah)
 * https://github.com/uniter/phpconfig/
 *
 * Released under the MIT license
 * https://github.com/uniter/phpconfig/raw/master/MIT-LICENSE.txt
 */

import ConfigImporterInterface from './ConfigImporterInterface';
import ConfigSetInterface from './ConfigSetInterface';
import ConfigSet from './ConfigSet';

/**
 * @inheritDoc
 */
export default class ConfigImporter implements ConfigImporterInterface {
    constructor(private ConfigSetClass: typeof ConfigSet) {}

    /**
     * @inheritDoc
     */
    importLibrary(
        exportedLibraryConfig: ExportedLibraryConfig
    ): ConfigSetInterface {
        return new this.ConfigSetClass(exportedLibraryConfig.configs);
    }
}
