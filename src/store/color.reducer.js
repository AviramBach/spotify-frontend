
export const SET_CURR_COLOR = 'SET_CURR_COLOR'



const initialState = {
    currColor: undefined
}

export function colorReducer(state = initialState, action) {
    var newState = state
    switch (action.type) {

        case SET_CURR_COLOR:
            newState = { ...state, currColor: action.currColor }
        default:
    }

    // For debug:
    // window.songState = newState
    // console.log('State:', newState)
    return newState

}
