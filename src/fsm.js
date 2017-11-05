class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this.arrOfStates = Object.keys(config.states);
        if(this.arrOfStates.indexOf(config.initial) === -1)
            throw Error();
        this.seqOfStates = [];
        this.config = config;
        this.seqOfStates.push(this.config.initial);
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.config.initial;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (this.arrOfStates.indexOf(state) === -1)
            throw Error();
        this.config.initial = state;
        this.seqOfStates.push(this.config.initial);
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        var temp = Object.keys(this.config.states);
        var a = temp.indexOf(this.config.initial);
        var b = Object.values(Object.values(this.config.states)[a].transitions);
        var c = Object.keys(b);
        var d = Object.values(b);
        var i = c.indexOf(event);
        //if (d === -1) throw Error();
        this.config.initial = d[i];
        this.seqOfStates.push(this.config.initial);
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.config.initial = this.seqOfStates[0];
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {

    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {}

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {}

    /**
     * Clears transition history
     */
    clearHistory() {

    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
