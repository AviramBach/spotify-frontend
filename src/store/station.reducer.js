export const SET_STATIONS = 'SET_STATIONS'
export const REMOVE_STATION = 'REMOVE_STATION'
export const ADD_STATION = 'ADD_STATION'
export const UPDATE_STATION = 'UPDATE_STATION'
export const UNDO_REMOVE_STATION = 'UNDO_REMOVE_STATION'

export const SET_FILTER_BY = 'SET_FILTER_BY'

const initialState = {
    stations: [],
    lastRemovedStation: null,
    filterBy: { txt: '', sortBy: 'createdAt' },
}

export function stationReducer(state = initialState, action) {
    var newState = state
    var stations
    switch (action.type) {
        case SET_STATIONS:
            newState = { ...state, stations: action.stations }
            break
        case REMOVE_STATION:
            const lastRemovedStation = state.stations.find(station => station._id === action.stationId)
            stations = state.stations.filter(station => station._id !== action.stationId)
            newState = { ...state, stations, lastRemovedStation }
            break
        case ADD_STATION:
            newState = { ...state, stations: [...state.stations, action.station] }
            break
        case UPDATE_STATION:
            stations = state.stations.map(station => (station._id === action.station._id) ? action.station : station)
            newState = { ...state, stations }
            break
        case SET_FILTER_BY:
            newState = { ...state, filterBy: { ...action.filterBy } }
            break
        case UNDO_REMOVE_STATION:
            if (state.lastRemovedStation) {
                newState = { ...state, stations: [...state.stations, state.lastRemovedStation], lastRemovedStation: null }
            }
            break
        default:
    }
    return newState
}
