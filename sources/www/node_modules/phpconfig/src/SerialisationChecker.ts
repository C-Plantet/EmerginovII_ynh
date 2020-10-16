/*
 * PHPConfig - Loads Uniter's PHP configuration
 * Copyright (c) Dan Phillimore (asmblah)
 * https://github.com/uniter/phpconfig/
 *
 * Released under the MIT license
 * https://github.com/uniter/phpconfig/raw/master/MIT-LICENSE.txt
 */

import SerialisationCheckerInterface from './SerialisationCheckerInterface';

/**
 * @inheritDoc
 */
export default class SerialisationChecker
    implements SerialisationCheckerInterface {
    /**
     * @inheritDoc
     */
    isSerialisable(object: Record<string, unknown>): boolean {
        return this.isObjectSerialisable(object);
    }

    private isObjectSerialisable(
        object: Record<string, unknown>,
        objectsSeen: unknown[] = []
    ): boolean {
        if (objectsSeen.includes(object)) {
            return false;
        }

        objectsSeen = objectsSeen.concat([object]);

        if (object instanceof Function || object instanceof RegExp) {
            return false;
        }

        if (Array.isArray(object)) {
            for (const element of object) {
                if (!this.isValueSerialisable(element, objectsSeen)) {
                    return false;
                }
            }
        }

        for (const settingName of Object.keys(object)) {
            if (!this.isValueSerialisable(object[settingName], objectsSeen)) {
                return false;
            }
        }

        return true;
    }

    private isValueSerialisable(
        value: unknown,
        objectsSeen: unknown[] = []
    ): boolean {
        if (
            value == null ||
            typeof value === 'boolean' ||
            typeof value === 'number' ||
            typeof value === 'string'
        ) {
            return true;
        }

        if (typeof value === 'object') {
            return this.isObjectSerialisable(
                value as Record<string, unknown>,
                objectsSeen
            );
        }

        return false;
    }
}
