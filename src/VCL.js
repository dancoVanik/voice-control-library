import {SpeechApi} from "./api/index";
import ServiceObjects from "./control/ServiceObjects";
import Runner from "./control/Runner";

/**
 * -----------------------------------------------------------------------
 * --------------------  Voice Control Library (VCL)  --------------------
 * -----------------------------------------------------------------------
 *
 * Web application interface in the form of a library for controlling web content via voice commands.
 * Only after a proper voice command from the end user, which must be sequential and distinct for its adequate recognition, can the library handle page content.
 * VCL uses W3C speech api for voice recognition to text form.
 *
 * The VCL class is at the core of the entire library that handles execution controlling web content via voice commands.
 */
export default class VCL {

    /**
     * Moves the configuration to the next implemented package as control for service and api for speech recognition settings.
     * Set debug mode. Listening on key down shortcut Ctrl + Shift + V and then start library.
     * @param {Object} config Can be object, JSON, or external file with object structure. Must contains global part configuration and also at least one querySelector with his properties.
     */
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

    /**
     *
     * @param {Object} config
     * @returns {Object}
     * @private
     */
    _setApiConfig(config) {
        if (typeof config === 'object' && config.global && config.global.speechApi) {
            return config.global.speechApi;
        } else {
            throw new Error('VCL >> global.speechApi is not configured.');
        }
    }

    /**
     *
     * @param config
     * @returns {Object}
     * @private
     */
    _setServiceObjectsConfig(config) {
        if (typeof config === 'object') {
            return config;
        } else {
            throw new Error('VCL >> No element configured for voice control.');
        }
    }

    /**
     * The only user-accessible function.
     * I. Starts recording audio.
     * II. On result from speech API
     *      1. If set debug mode, allow write in web browser console.
     *      2. Search query selector assigned to HTMLElement on page by matching speech recognition and indexed phrases.
     *      3. Start executing listener and actions functions.
     *      4. Stop recording audio.
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

    /**
     *
     * @param {string} recognizeResult
     * @returns {String}
     * @private
     */
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