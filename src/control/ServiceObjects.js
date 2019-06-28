import Trie from "../indexes/trie/Trie";
import ControlObject from "./ControlObject";

export default class ServiceObjects {

    constructor(config) {
        this._controlObjects = {};
        this._trie = new Trie();
        this.divideControlObjects(config);
    }

    get trie() {
        return this._trie;
    }

    get controlObjects() {
        return this._controlObjects;
    }


    _unsetGlobalConfig(config) {
        if (config.global) {
            return (({global, ...others}) => ({...others}))(config);
        } else return config;
    }


    divideControlObjects(config) {
        Object.keys(this._unsetGlobalConfig(config)).forEach(key => {
            this._controlObjects[key] = new ControlObject(key,config[key]);
            this._controlObjects[key].phrases.forEach(phrase => this._trie.insert(phrase, key));
        });
    }

}