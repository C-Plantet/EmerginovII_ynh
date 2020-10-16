/*
 * PHPConfig - Loads Uniter's PHP configuration
 * Copyright (c) Dan Phillimore (asmblah)
 * https://github.com/uniter/phpconfig/
 *
 * Released under the MIT license
 * https://github.com/uniter/phpconfig/raw/master/MIT-LICENSE.txt
 */

import ConfigSetInterface from './ConfigSetInterface';

/**
 * Imports the config for a specific main- or sub-library to a ConfigSet
 */
export default interface ConfigImporterInterface {
    /**
     * Imports the exported library config
     *
     * @param {ExportedLibraryConfig} exportedLibraryConfig
     * @returns {ConfigSetInterface}
     */
    importLibrary(
        exportedLibraryConfig: ExportedLibraryConfig
    ): ConfigSetInterface;
}
