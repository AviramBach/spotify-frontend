import { stationService } from "../services/station.service.js";
import { userService } from "../services/user.service.js";
import { store } from '../store/store.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { ADD_STATION, REMOVE_STATION, SET_STATIONS, UNDO_REMOVE_STATION, UPDATE_STATION } from "./station.reducer.js";

// Action Creators:
export function getActionRemoveStation(stationId) {
    return {
        type: REMOVE_STATION,
        stationId
    }
}
export function getActionAddStation(station) {
    return {
        type: ADD_STATION,
        station
    }
}
export function getActionUpdateStation(station) {
    return {
        type: UPDATE_STATION,
        station
    }
}

export async function loadStations() {
    // const { filterBy } = store.getState().stationModule
    // const { sortBy } = filterBy
    try {
        const stations = await stationService.query()
        // stations.sort((station1, station2) => {
        //     if (sortBy === 'createdAt') return station2[sortBy] - station1[sortBy]
        //     if (station2[sortBy] < station1[sortBy]) return 1
        //     return -1
        // })
        console.log('Stations from DB:', stations)
        store.dispatch({
            type: SET_STATIONS,
            stations
        })

    } catch (err) {
        console.log('Cannot load stations', err)
        throw err
    }

}

export async function removeStation(stationId) {
    try {
        await stationService.remove(stationId)
        store.dispatch(getActionRemoveStation(stationId))
    } catch (err) {
        console.log('Cannot remove station', err)
        throw err
    }
}

export async function addStation(station) {
    try {
        const savedStation = await stationService.save(station)
        console.log('Added Station', savedStation)
        store.dispatch(getActionAddStation(savedStation))
        return savedStation
    } catch (err) {
        console.log('Cannot add station', err)
        throw err
    }
}

export async function updateStation(station) {
    try {
        const savedStation = await stationService.save(station)
        store.dispatch(getActionUpdateStation(savedStation))
        return savedStation
    }
    catch (err) {
        console.log('Cannot save station', err)
        throw err
    }
}




// Demo for Optimistic Mutation 
// (IOW - Assuming the server call will work, so updating the UI first)
export function onRemoveStationOptimistic(stationId) {
    store.dispatch({
        type: REMOVE_STATION,
        stationId
    })
    showSuccessMsg('Station removed')

    stationService.remove(stationId)
        .then(() => {
            console.log('Server Reported - Deleted Succesfully');
        })
        .catch(err => {
            showErrorMsg('Cannot remove station')
            console.log('Cannot load stations', err)
            store.dispatch({
                type: UNDO_REMOVE_STATION,
            })
        })
}
