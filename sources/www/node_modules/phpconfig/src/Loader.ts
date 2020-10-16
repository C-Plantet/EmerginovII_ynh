/*
 * PHPConfig - Loads Uniter's PHP configuration
 * Copyright (c) Dan Phillimore (asmblah)
 * https://github.com/uniter/phpconfig/
 *
 * Released under the MIT license
 * https://github.com/uniter/phpconfig/raw/master/MIT-LICENSE.txt
 */

import { join } from 'path';
import LoaderInterface from './LoaderInterface';
import RequirerInterface from './RequirerInterface';

/**
 * @inheritDoc
 */
export default class Loader implements LoaderInterface {
    constructor(
        private existsSync: (path: string) => boolean,
        private requirer: RequirerInterface,
        private fileName: string
    ) {}

    /**
     * @inheritDoc
     */
    load(searchDirectories: string[]): RootConfig | SubConfig {
        for (const searchDirectory of searchDirectories) {
            const searchPath = join(searchDirectory, this.fileName);

            if (this.existsSync(searchPath)) {
                return this.requirer.require(searchPath);
            }
        }

        return {};
    }
}
