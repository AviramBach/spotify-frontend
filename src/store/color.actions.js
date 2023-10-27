import { store } from './store.js'
import { SET_CURR_COLOR } from "./color.reducer.js";


// Action Creators:
export function getActionCurrColor(currColor) {
    return {
        type: SET_CURR_COLOR,
        currColor
    }
}

export function setCurrColor(color) {
    try {
        store.dispatch(getActionCurrColor(color))
        return color
    } catch (err) {
        console.log('cannot change header color', err)
        throw err
    }
}
