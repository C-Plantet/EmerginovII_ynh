/*
 * PHPConfig - Loads Uniter's PHP configuration
 * Copyright (c) Dan Phillimore (asmblah)
 * https://github.com/uniter/phpconfig/
 *
 * Released under the MIT license
 * https://github.com/uniter/phpconfig/raw/master/MIT-LICENSE.txt
 */

/**
 * Contains all sets of sub-configs for the application, including
 * any root-level config in addition to any installed plugins
 */
export default interface ConfigSetInterface {
    /**
     * Extracts all values for the given setting and concatenates the elements
     * from all of those arrays into one final array, with later installed plugins
     * and finally the root config appearing last in the resulting array.
     *
     * @param {string} settingName
     * @returns {SettingValue[]}
     * @throws {Error} Throws when any setting value is not an array, null or undefined
     */
    concatArrays(settingName: string): SettingValue[];

    /**
     * Extracts all values for the given boolean setting and merges those values into a final one,
     * with later configs' settings taking priority. Object values will always
     * be recursively merged, with values overridden, whereas arrays will always
     * be concatenated together. If the setting has no values specified in any config,
     * the default value will be returned instead. If the setting has a value that is not a boolean,
     * an error will be raised.
     *
     * @param {string} settingName
     * @param {boolean=} defaultValue (Defaults to false)
     * @returns {boolean}
     * @throws {Error} Throws when a non-boolean value is given for the setting
     */
    getBoolean(settingName: string, defaultValue: boolean): boolean;

    /**
     * Merges the settings for all configs into one, with later configs' settings
     * taking priority. Object values will always be recursively merged, with
     * values overridden, whereas arrays will always be concatenated together.
     *
     * @returns {SubConfig}
     */
    mergeAll(): SubConfig;

    /**
     * Extracts all values for the given setting and merges those objects
     * into one final object, with later installed plugins and finally
     * the root config taking precedence.
     *
     * @param {string} settingName
     * @returns {SubConfig}
     * @throws {Error} Throws when any setting value is not an object, null or undefined
     */
    mergeObjects(settingName: string): SubConfig;

    /**
     * Extracts all values for the given setting (if given) and merges those objects
     * into one final object. A property of that object may only be defined
     * with a single value - multiple objects may define the same property,
     * but only if they give it the exact same value.
     * If no setting name is specified, then the entire config is fetched.
     *
     * @param {string=} settingName
     * @returns {SubConfig}
     * @throws {Error} Throws when any setting value is not an object, null or undefined
     *                 or values are not unique
     */
    mergeUniqueObjects(settingName?: string): SubConfig;

    /**
     * Fetches all configs as an array
     *
     * @returns {SubConfig[]}
     */
    toArray(): SubConfig[];
}
