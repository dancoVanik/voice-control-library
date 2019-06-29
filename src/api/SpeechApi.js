import GoogleCloudApi from "./GoogleCloudApi";
import W3CApi from "./W3CApi";

/**
 * Facade that separates API functionality for speech recognition from control and others VCL services.
 * Provides the isolation of what a library user can and where they should not be accessed.
 */
export default class SpeechApi {

    /**
     * Set speechApi on W3CApi or GoogleCloudApi by configuration.
     * @param {Object} config SpeechApi configuration.
     */
    constructor(config) {
        this._speechApi = null;
        this._setApi(config);
    }

    /**
     *
     * @param {Object} config
     * @private
     */
    _setApi(config) {
        if (config.W3C) {
            this._speechApi = new W3CApi(config.W3C);
        } else if (config.GoogleCloudApi) {
            this._speechApi = new GoogleCloudApi(config.GoogleCloudApi);
        } else {
            throw new Error('Is not set any global.speechApi configuration');
        }
    }

    /**
     * Calls the configured function
     */
    dictate() {
        this._speechApi.dictate();
    }

    /**
     *
     * @returns {Promise}
     */
    result() {
        return this._speechApi.result();
    }

    /**
     * Calls the configured function
     */
    stop() {
        this._speechApi.stop();
    }
}