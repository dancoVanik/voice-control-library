import VCLEvent from "./VCLEvent";

/**
 * At first verify configured event can be execute.
 * Then execute all listener function and event functions configured by user.
 */
export default class Runner {
    constructor() { }

    /**
     * If listener exist, first execute listener and then all others events.
     * @param {String} recognizeResult
     * @param {ControlObject} controlObject
     */
    run(recognizeResult, controlObject) {
        const vclEvent = new VCLEvent(recognizeResult, controlObject);
        this.executeListener(vclEvent);
        this.executeEvents(vclEvent);
    }

    /**
     * Invoke event if possible.
     * @param event
     * @param vclEvent
     * @private
     */
    _invoke(event, vclEvent) {
        if ('on' + event in vclEvent.element) {
            vclEvent.element.dispatchEvent(new Event(event, {"bubbles": true, "cancelable": false}));
        } else {
            throw new Error('VCL >> actions.' + event + ' event is not supported on element.');
        }
    }

    /**
     *
     * @param {String} nameEvent
     * @param {function} func
     * @param {VCLEvent} vclEvent
     * @returns {function | boolean} If action is boolean return her value. If action is function, return called value.
     * @private
     */
    _performFunction(nameEvent, func, vclEvent) {
        if (typeof func === 'boolean') {
            return func;
        } else if (typeof func === 'function') {
            return func(vclEvent);
        } else {
            throw new Error('VCL >> actions.' + nameEvent + ' type of value is not recognized.');
        }
    }

    /**
     * Execute all configured actions.
     * First check if action is function or boolean and then is execute only if return value from action function is true.
     * @param {VCLEvent} vclEvent
     */
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

    /**
     * If listener is function, execute it.
     * @param {VCLEvent} vclEvent
     */
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