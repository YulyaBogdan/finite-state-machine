class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this.arrOfStates = Object.keys(config.states);
        if(this.arrOfStates.indexOf(config.initial) === -1)
            throwError();
        this.seqOfStates = [];
        this.initial = config.initial;
        this.states = config.states;
        this.seqOfStates.push(this.initial);
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.initial;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (this.arrOfStates.indexOf(state) === -1)
            throwError();
        this.initial = state;
        this.seqOfStates.push(this.initial);
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        let temp1 =  Object.keys(this.states);
        let i = temp1.indexOf(this.initial);
        temp1 = Object.values(this.states);
        let temp = temp1[i].transitions;
        if(temp.hasOwnProperty(event)) {
            this.initial = temp[event];
            this.seqOfStates.push(this.initial);
        }
        else throwError();
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        let temp = this.seqOfStates[0];
        this.changeState(temp);
        this.seqOfStates = [];
        this.seqOfStates.push(temp)
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
