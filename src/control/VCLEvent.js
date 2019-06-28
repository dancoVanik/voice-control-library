export default class VCLEvent {
    constructor(recognizeResult, controlObject) {
        this._recognizeResult = recognizeResult;
        this._controlObject = controlObject;
    }

    get actions() {
        return this._controlObject.event;
    }

    get phrases() {
        return this._controlObject.phrases;
    }

    get element() {
        return this._controlObject.domElement;
    }

    get result() {
        return this._recognizeResult;
    }

    get listener() {
        return this._controlObject.listener;
    }



}