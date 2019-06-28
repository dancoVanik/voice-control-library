import Trie from "../indexes/trie/Trie";
import ControlObject from "./ControlObject";

/**
 * Services input configuration settings related to page elements and their properties.
 * Phrases are indexed to the associated selector using the Trie class
 */
export default class ServiceObjects {

    /**
     *
     * @param {Object} config
     */
    constructor(config) {
        this._controlObjects = {};
        this._trie = new Trie();
        this.divideControlObjects(config);
    }

    /**
     * Get Trie.
     * @returns {Trie}
     */
    get trie() {
        return this._trie;
    }

    /**
     * Get map all control objects.
     * @returns {Map}
     */
    get controlObjects() {
        return this._controlObjects;
    }

    /**
     *
     * @param {Object} config
     * @returns {Object} Configuration without global sets.
     * @private
     */
    _unsetGlobalConfig(config) {
        if (config.global) {
            return (({global, ...others}) => ({...others}))(config);
        } else return config;
    }

    /**
     * In Map on key position set querySelector from configuration and as his value set instance of ControlObject with his attributes.
     * Insert all phrases from the configuration into the trie that indexes to their querySelectors.
     * @param {Object} config
     */
    divideControlObjects(config) {
        Object.keys(this._unsetGlobalConfig(config)).forEach(key => {
            this._controlObjects[key] = new ControlObject(key, config[key]);
            this._controlObjects[key].phrases.forEach(phrase => this._trie.insert(phrase, key));
        });
    }

}