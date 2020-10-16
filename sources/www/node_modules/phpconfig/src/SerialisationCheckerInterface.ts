/*
 * PHPConfig - Loads Uniter's PHP configuration
 * Copyright (c) Dan Phillimore (asmblah)
 * https://github.com/uniter/phpconfig/
 *
 * Released under the MIT license
 * https://github.com/uniter/phpconfig/raw/master/MIT-LICENSE.txt
 */

/**
 * Determines whether an object is serialisable
 */
export default interface SerialisationCheckerInterface {
    /**
     * Determines whether an object is serialisable
     *
     * @param {Object} object
     * @returns {boolean}
     */
    isSerialisable(object: object): boolean;
}
