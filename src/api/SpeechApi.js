import GoogleCloudApi from "./GoogleCloudApi";
import W3CApi from "./W3CApi";

export default class SpeechApi {

    constructor(config) {
        this._speechApi = null;
        this._setApi(config);
    }

    _setApi(config) {
        if (config.W3C) {
            this._speechApi = new W3CApi(config.W3C);
        } else if (config.GoogleCloudApi) {
            this._speechApi = new GoogleCloudApi(config.GoogleCloudApi);
        } else {
            throw new Error('Is not set any global.speechApi configuration');
        }
    }

    dictate() {
        this._speechApi.dictate();
    }

    result() {
        return this._speechApi.result();
    }

    stop() {
        this._speechApi.stop();
    }
}