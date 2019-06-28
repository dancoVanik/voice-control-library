export default class W3CApi {

    constructor(config) {
        this._recognition = null;
        this._initialize(config);
    }

    _initialize(config) {
        window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
        this._recognition = new SpeechRecognition();
        this._recognition.language = config.lang ? config.lang : undefined;
        // this._recognition.continuous = config.continuous ? config.continuous : false;
        // this._recognition.interimResults = config.interimResults ? config.interimResults : true;
        this._recognition.maxAlternatives = config.maxAlternatives ? config.maxAlternatives : 1;
    }

    dictate() {
        this._recognition.start();
    }

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

    stop() {
        this._recognition.stop();
    }

}