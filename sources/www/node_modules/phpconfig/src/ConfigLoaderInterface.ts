/*
 * PHPConfig - Loads Uniter's PHP configuration
 * Copyright (c) Dan Phillimore (asmblah)
 * https://github.com/uniter/phpconfig/
 *
 * Released under the MIT license
 * https://github.com/uniter/phpconfig/raw/master/MIT-LICENSE.txt
 */

import ConfigInterface from './ConfigInterface';

/**
 * Attempts to load a config file from the given list of search paths
 */
export default interface ConfigLoaderInterface {
    /**
     * Fetches the config from a file within the given search paths
     *
     * @param {string[]} searchPaths
     * @returns {ConfigInterface}
     */
    getConfig(searchPaths: string[]): ConfigInterface;
}
