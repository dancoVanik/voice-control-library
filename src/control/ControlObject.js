export default class ControlObject {
    constructor(querySelector, controlElementValue) {
        this.querySelector = querySelector;
        this.domElement = this._setDomElement(querySelector);
        this.phrases = this._setPhrases(controlElementValue);
        this.event = controlElementValue.actions;
        this.listener = controlElementValue.listener;
    }

    _setDomElement(querySelector) {
        const domElement = document.querySelector(querySelector);
        if (domElement) {
            return domElement;
        } else {
            throw new Error('VCL >> Element ' + querySelector + ' not found on the page.');
        }
    }

    _setPhrases(controlElementValue) {
        if (controlElementValue.phrases instanceof Array) {
            return this._simplify(controlElementValue.phrases);
        } else {
            throw new Error('VCL >> phrases for ' + this.querySelector + ' is not configured.');
        }
    }

    _simplify(phrases) {
        const phrasesWithoutAccent = phrases.map(phrase => phrase.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase());
        Array.prototype.push.apply(phrases, phrasesWithoutAccent);
        return phrases;
    }
}