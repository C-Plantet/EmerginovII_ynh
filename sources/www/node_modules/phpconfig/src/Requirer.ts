/*
 * PHPConfig - Loads Uniter's PHP configuration
 * Copyright (c) Dan Phillimore (asmblah)
 * https://github.com/uniter/phpconfig/
 *
 * Released under the MIT license
 * https://github.com/uniter/phpconfig/raw/master/MIT-LICENSE.txt
 */

import RequirerInterface from './RequirerInterface';

/**
 * @inheritDoc
 */
export default class Requirer implements RequirerInterface {
    constructor(private nodeRequire: Function) {}

    /**
     * @inheritDoc
     */
    require(path: string): RootConfig | SubConfig {
        return this.nodeRequire(path);
    }
}
