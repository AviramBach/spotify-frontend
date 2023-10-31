import { store } from './store.js'
import { SET_CURR_COLOR, SET_PLAYER_CURR_COLOR } from "./color.reducer.js";


// Action Creators:
export function getActionCurrColor(currColor) {
    return {
        type: SET_CURR_COLOR,
        currColor
    }
}
export function getActionPlayerCurrColor(playerCurrColor) {
    return {
        type: SET_PLAYER_CURR_COLOR,
        playerCurrColor
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


export function setPlayerCurrColor(color) {
    try {
        store.dispatch(getActionPlayerCurrColor(color))
        return color
    } catch (err) {
        console.log('cannot change header color', err)
        throw err
    }
}
