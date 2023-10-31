
export const SET_CURR_COLOR = 'SET_CURR_COLOR'
export const SET_PLAYER_CURR_COLOR = 'SET_PLAYER_CURR_COLOR'

const initialState = {
    currColor: undefined
}

export function colorReducer(state = initialState, action) {
    var newState = state
    switch (action.type) {
        case SET_CURR_COLOR:
            newState = { ...state, currColor: action.currColor }
            break;
        case SET_PLAYER_CURR_COLOR:
            newState = { ...state, playerCurrColor: action.playerCurrColor }
            break;
        default:
    }

    // For debug:
    // window.songState = newState
    // console.log('State:', newState)
    return newState

}
