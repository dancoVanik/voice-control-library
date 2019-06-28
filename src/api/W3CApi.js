/**
 * W3C Speech API
 * It enables developers to use scripting to generate text-to-speech output
 * and to use speech recognition as an input for forms, continuous dictation and control.
 */
export default class W3CApi {

    /**
     * Initialization speech recognition and set his attributes like language, continuous and maximal alternatives.
     * @param {Object | null} config W3C Speech API configuration
     */
    constructor(config) {
        this._recognition = null;
        this._initialize(config);
    }

    /**
     *
     * @param {Object} config
     * @private
     */
    _initialize(config) {
        window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
        this._recognition = new SpeechRecognition();
        this._recognition.language = config.lang ? config.lang : undefined;
        // this._recognition.continuous = config.continuous ? config.continuous : false;
        // this._recognition.interimResults = config.interimResults ? config.interimResults : true;
        this._recognition.maxAlternatives = config.maxAlternatives ? config.maxAlternatives : 1;
    }

    /**
     * Begin to listen to the audio.
     */
    dictate() {
        this._recognition.start();
    }

    /**
     * Asynchronous function that return transcript result in text form.
     * @returns {Promise<String>}
     */
    result() {
        return new Promise((resolve) => {
            this._recognition.onresult = (event) => {
                const speechToText = event.results[0][0].transcript;
                if (event.results[0].isFinal) {
                    resolve(speechToText)
                }
            }
        });
    }

    /**
     *  Stop listening to more audio.
     */
    stop() {
        this._recognition.stop();
    }

}