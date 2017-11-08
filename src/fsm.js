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
        let i = Object.keys(this.states).indexOf(this.initial);
        let temp = Object.values(this.states);
        if(temp[i].transitions.hasOwnProperty(event)) {
            this.initial = temp[i].transitions[event];
            this.seqOfStates.push(this.initial);
        }
        else throw Error();
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
        let resArr = []
        let temp = Object.values(this.states);
        let temp1 = Object.keys(this.states);
        if(arguments.length === 0)
            return temp1;
        for (let i = 0; i < temp.length; i++) {
            if(temp[i].transitions.hasOwnProperty(event)) {
                resArr.push(temp1[i])
            }
        }
        return resArr;
    }



    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.seqOfStates.length === 2 ||
            (this.seqOfStates.length === 3 &&
                this.seqOfStates[this.seqOfStates.length-1] !== this.seqOfStates[this.seqOfStates.length-3]) ||
            (this.seqOfStates.length >= 4 &&
                (this.seqOfStates[this.seqOfStates.length-1] !== this.seqOfStates[this.seqOfStates.length-3] ||
                    this.seqOfStates[this.seqOfStates.length-4] !== this.seqOfStates[this.seqOfStates.length-2]))){
            this.changeState(this.seqOfStates[this.seqOfStates.length - 2]);
            return true;
        }
        return false;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.seqOfStates.length === 2 ||
            (this.seqOfStates.length === 3 &&
                this.seqOfStates[this.seqOfStates.length-1] === this.seqOfStates[this.seqOfStates.length-3]) ||
            (this.seqOfStates.length >= 4 &&
                this.seqOfStates[this.seqOfStates.length-1] === this.seqOfStates[this.seqOfStates.length-3] &&
                this.seqOfStates[this.seqOfStates.length-4] !== this.seqOfStates[this.seqOfStates.length-2])){
            this.changeState(this.seqOfStates[this.seqOfStates.length - 2]);
            return true;
        }
        return false;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        let temp = this.seqOfStates.shift();
        this.seqOfStates = []
        this.seqOfStates.push(temp);

    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
