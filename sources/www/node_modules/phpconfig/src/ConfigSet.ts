/*
 * PHPConfig - Loads Uniter's PHP configuration
 * Copyright (c) Dan Phillimore (asmblah)
 * https://github.com/uniter/phpconfig/
 *
 * Released under the MIT license
 * https://github.com/uniter/phpconfig/raw/master/MIT-LICENSE.txt
 */

import ConfigSetInterface from './ConfigSetInterface';

const hasOwn = {}.hasOwnProperty;

/**
 * @inheritDoc
 */
export default class ConfigSet implements ConfigSetInterface {
    constructor(private configs: SubConfig[]) {}

    /**
     * @inheritDoc
     */
    concatArrays(settingName: string): SettingValue[] {
        const concatenatedArray: SettingValue[] = [];

        for (const { [settingName]: rawSettingValue } of this.configs) {
            const settingValue = rawSettingValue ?? [];

            if (!Array.isArray(settingValue)) {
                throw new Error(
                    `Invalid value for setting ${settingName}: all values must be arrays but ${typeof settingValue} (${settingValue}) given`
                );
            }

            concatenatedArray.push(...settingValue);
        }

        return concatenatedArray;
    }

    /**
     * @inheritDoc
     */
    getBoolean(settingName: string, defaultValue = false): boolean {
        // TODO: Optimise by only extracting values for this specific setting from each config.
        //       For now this is assumed to be efficient enough (as deep and complex config trees
        //       are unlikely)
        const mergedSettingValues = this.mergeAll();

        if (!hasOwn.call(mergedSettingValues, settingName)) {
            // Setting has no value specified in any config
            return defaultValue;
        }

        const settingValue = mergedSettingValues[settingName];

        if (typeof settingValue !== 'boolean') {
            throw new Error(
                `Expected value for setting "${settingName}" to be a boolean but it was a ${typeof settingValue}`
            );
        }

        return settingValue;
    }

    /**
     * @inheritDoc
     */
    mergeAll(): SubConfig {
        const mergedConfig: SubConfig = {};

        const doMerge = (config: SubConfig): void => {
            for (const settingName of Object.keys(config)) {
                const settingValue = config[settingName];

                if (settingValue === null || typeof settingValue !== 'object') {
                    // Latest setting is not a non-null object: this one should replace any value completely
                    mergedConfig[settingName] = settingValue;
                    continue;
                }

                if (Array.isArray(settingValue)) {
                    // Latest setting value is an array

                    if (Array.isArray(mergedConfig[settingName])) {
                        // Setting in work area is also an array: just concatenate onto the end
                        (mergedConfig[settingName] as SettingValue[]).push(
                            ...settingValue
                        );
                    } else {
                        // Setting in work area is not an array: this one should replace the value completely
                        mergedConfig[settingName] = settingValue;
                    }
                } else {
                    // Latest setting is an object: merge it onto the existing one (if any)
                    Object.assign(
                        mergedConfig[settingName] ??
                            (mergedConfig[settingName] = {}),
                        settingValue
                    );
                }
            }
        };

        for (const config of this.configs) {
            doMerge(config);
        }

        return mergedConfig;
    }

    /**
     * @inheritDoc
     */
    mergeObjects(settingName: string): SubConfig {
        const mergedConfig: SubConfig = {};

        for (const { [settingName]: rawSettingValue } of this.configs) {
            const settingValue = rawSettingValue ?? {};

            if (typeof settingValue !== 'object') {
                throw new Error(
                    `Invalid value for setting ${settingName}: all values must be objects but ${typeof settingValue} (${settingValue}) given`
                );
            }

            Object.assign(mergedConfig, settingValue);
        }

        return mergedConfig;
    }

    /**
     * @inheritDoc
     */
    mergeUniqueObjects(settingName?: string): SubConfig {
        const mergedConfig: SubConfig = {};

        for (const config of this.configs) {
            let settingValue: SubConfig;

            if (settingName) {
                // A setting was specified: merge all values for that setting
                const rawSettingValue = config[settingName];

                settingValue = (rawSettingValue as SubConfig) ?? {};

                if (typeof settingValue !== 'object') {
                    throw new Error(
                        `Invalid value for setting ${settingName}: all values must be objects but ${typeof settingValue} (${settingValue}) given`
                    );
                }
            } else {
                // No setting was specified: merge the configs themselves
                settingValue = config;
            }

            for (const propertyName of Object.keys(settingValue)) {
                if (
                    hasOwn.call(mergedConfig, propertyName) &&
                    // Allow a setting to be overridden with the exact same value
                    // (eg. where multiple plugins are used that define the same flag setting)
                    mergedConfig[propertyName] !== settingValue[propertyName]
                ) {
                    const newValue = settingValue[propertyName];
                    const propertyOrSettingName = settingName ?? propertyName;
                    const propertyOrSetting = settingName
                        ? `property "${propertyName}"`
                        : 'setting';

                    throw new Error(
                        `Invalid value for setting ${propertyOrSettingName}: all objects \
must be unique but ${propertyOrSetting} has both value \
(${mergedConfig[propertyName]}) and value (${newValue})`
                    );
                }
            }

            Object.assign(mergedConfig, settingValue);
        }

        return mergedConfig;
    }

    /**
     * @inheritDoc
     */
    toArray(): SubConfig[] {
        return this.configs;
    }
}
