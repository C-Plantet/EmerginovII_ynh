/*
 * PHPConfig - Loads Uniter's PHP configuration
 * Copyright (c) Dan Phillimore (asmblah)
 * https://github.com/uniter/phpconfig/
 *
 * Released under the MIT license
 * https://github.com/uniter/phpconfig/raw/master/MIT-LICENSE.txt
 */

import { existsSync as existsSyncForType } from 'fs';
import Config from './Config';
import ConfigExporter from './ConfigExporter';
import ConfigImporter from './ConfigImporter';
import ConfigLoader from './ConfigLoader';
import ConfigSet from './ConfigSet';
import Loader from './Loader';
import Requirer from './Requirer';
import SerialisationChecker from './SerialisationChecker';
import ConfigLoaderInterface from './ConfigLoaderInterface';

const UNIFIED_CONFIG_FILE_NAME = 'uniter.config.js';

const requirer = new Requirer(require);

const createConfigLoader = (
    existsSync: typeof existsSyncForType
): ConfigLoaderInterface =>
    new ConfigLoader(
        requirer,
        new Loader(existsSync, requirer, UNIFIED_CONFIG_FILE_NAME),
        new ConfigExporter(new SerialisationChecker()),
        Config,
        ConfigSet
    );

const configImporter = new ConfigImporter(ConfigSet);

export { configImporter, createConfigLoader };
