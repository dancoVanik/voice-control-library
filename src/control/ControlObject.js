/**
 * Keeps data configured by user.
 * Find HTMLElement if exists on page.
 * Simplify phrases by putting all the letters in the lowercase and removes accent from them.
 */
export default class ControlObject {
    /**
     * Create data structure with all properties that VCL allow.
     * @param {String} querySelector
     * @param {Object} controlElementValue
     */
    constructor(querySelector, controlElementValue) {
        this.querySelector = querySelector;
        this.domElement = this._setDomElement(querySelector);
        this.phrases = this._setPhrases(controlElementValue);
        this.event = controlElementValue.actions;
        this.listener = controlElementValue.listener;
    }

    /**
     *
     * @param {String} querySelector
     * @returns {Element}
     * @private
     */
    _setDomElement(querySelector) {
        const domElement = document.querySelector(querySelector);
        if (domElement) {
            return domElement;
        } else {
            throw new Error('VCL >> Element ' + querySelector + ' not found on the page.');
        }
    }

    /**
     *
     * @param {Object} controlElementValue
     * @returns {Array<String>}
     * @private
     */
    _setPhrases(controlElementValue) {
        if (controlElementValue.phrases instanceof Array) {
            return this._simplify(controlElementValue.phrases);
        } else {
            throw new Error('VCL >> phrases for ' + this.querySelector + ' is not configured.');
        }
    }

    /**
     *
     * @param {Array<String>} phrases
     * @returns {Array<String>}
     * @private
     */
    _simplify(phrases) {
        const phrasesWithoutAccent = phrases.map(phrase => phrase.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase());
        Array.prototype.push.apply(phrases, phrasesWithoutAccent);
        return phrases;
    }
}