import VCLEvent from "./VCLEvent";

export default class Runner {
    constructor() { }

    run(recognizeResult, controlObject) {
        const vclEvent = new VCLEvent(recognizeResult, controlObject);
        this.executeListener(vclEvent);
        this.executeEvents(vclEvent);
    }

    _invoke(event, vclEvent) {
        if ('on' + event in vclEvent.element) {
            vclEvent.element.dispatchEvent(new Event(event, {"bubbles": true, "cancelable": false}));
        } else {
            throw new Error('VCL >> actions.' + event + ' event is not supported on element.');
        }
    }

    _performFunction(nameEvent, func, vclEvent) {
        if (typeof func === 'boolean') {
            return func;
        } else if (typeof func === 'function') {
            return func(vclEvent);
        } else {
            throw new Error('VCL >> actions.' + nameEvent + ' type of value is not recognized.');
        }
    }

    executeEvents(vclEvent) {
        Object.keys(vclEvent.actions).forEach(event => {
            const functionPerformed = this._performFunction(event, vclEvent.actions[event], vclEvent);
            if (functionPerformed) {
                this._invoke(event, vclEvent);
            } else if (functionPerformed === 'undefined') {
                throw new Error('VCL >> actions.' + event + ' value must return true or false.');
            }
        });
    }

    executeListener(vclEvent) {
        if (vclEvent.listener) {
            if (typeof vclEvent.listener === 'function') {
                vclEvent.listener(vclEvent);
            } else {
                throw new Error('VCL >> type of listener value must be a function.');
            }
        }
    }
}