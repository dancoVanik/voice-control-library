/**
 *  All attributes user can access using and are apply only to their particular selector.
 *  VCLEvent class contains attributes like :
 *      listener - is function execute as first,
 *      element  - representing HTMLElement on the page,
 *      actions  - are events that configured by user,
 *      phrases  - thanks to which we can use speech to recognize what the library should do on which element,
 *      result   - string of recognize result from speech API.
 */
export default class VCLEvent {
    /**
     * Constructor of specific event explicitly for Voice Control Library with own properties that can be using in user configuration.
     * Also keeps the properties set by the user.
     * @param {String} recognizeResult Recognize text result from speech API.
     * @param {ControlObject} controlObject Object contains configured properties for one HTMLElement.
     */
    constructor(recognizeResult, controlObject) {
        this._recognizeResult = recognizeResult;
        this._controlObject = controlObject;
    }

    /**
     * Get array of event function.
     * @returns {Array<function>}
     */
    get actions() {
        return this._controlObject.event;
    }

    /**
     * Get array strings of all phrases set one querySelector
     * @returns {Array<string>}
     */
    get phrases() {
        return this._controlObject.phrases;
    }

    /**
     * Get HTMLElement
     * @returns {HTMLElement}
     */
    get element() {
        return this._controlObject.domElement;
    }

    /**
     * Get string of recognize result from speech API.
     * @returns {String}
     */
    get result() {
        return this._recognizeResult;
    }

    /**
     * Get listener function.
     * @returns {function}
     */
    get listener() {
        return this._controlObject.listener;
    }



}