import {SpeechApi} from "./api/index";
import ServiceObjects from "./control/ServiceObjects";
import Runner from "./control/Runner";

/**
 * @class
 */
export default class VCL {

    constructor(config) {
        this._speechApi = new SpeechApi(this._setApiConfig(config));
        this._serviceObjects = new ServiceObjects(this._setServiceObjectsConfig(config));
        this._runner = new Runner();
        this._logging = config.global.speechApi.debug;
        window.addEventListener('keydown', key => {
            if (key.ctrlKey && key.shiftKey && key.key === 'V') {
                this.execute();
            }
        });
    }

    _setApiConfig(config) {
        if (typeof config === 'object' && config.global && config.global.speechApi) {
            return config.global.speechApi;
        } else {
            throw new Error('VCL >> global.speechApi is not configured.');
        }
    }

    _setServiceObjectsConfig(config) {
        if (typeof config === 'object') {
            return config;
        } else {
            throw new Error('VCL >> No element configured for voice control.');
        }
    }

    /**
     * @memberof VCL#
     */
    execute() {
        this._speechApi.dictate();
        this._speechApi.result()
            .then(recognizeResult => {
                if (this._logging) {
                    console.log('VCL >> Recognize result : ' + recognizeResult);
                }
                const recognizeSelector = this._searchSelector(recognizeResult);
                if (recognizeSelector) {
                    this._runner.run(recognizeResult, this._serviceObjects.controlObjects[recognizeSelector]);
                } else {
                    throw new Error('VCL >> Voice command does not match any phrase for the voice control element');
                }
                this._speechApi.stop();
            });
    }

    _searchSelector(recognizeResult) {
        const modifiers = [phrase => phrase, phrase => phrase.toLowerCase(), phrase => phrase.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()];
        let recognizeSelector = undefined;
        modifiers.some(modifier => {
            const find = this._serviceObjects.trie.search(modifier(recognizeResult));
            if(find){
                recognizeSelector = find;
                return true;
            }
            return false;
        });
        if (recognizeSelector != null)
            return recognizeSelector;
    }
}