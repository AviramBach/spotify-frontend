import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addStation, loadStations, removeStation, updateStation } from '../store/station.actions.js'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { StationList } from "./StationList"
import { stationService } from '../services/station.service.js'
import { LibraryFilter } from './LibraryFilter.jsx'
import { SET_FILTER_BY } from '../store/station.reducer.js'

export function Library() {
    const dispatch = useDispatch()
    const filterBy = useSelector(storeState => storeState.stationModule.filterBy)
    const stations = useSelector(storeState => storeState.stationModule.stations)

    useEffect(() => {
        loadStations()
    }, [filterBy])

    async function onAddStation() {
        const station = stationService.getEmptyStation()
        station.name = prompt('Playlist name?')
        station.createdAt = Date.now()
        try {
            const savedStation = await addStation(station)
            showSuccessMsg(`Station added (id: ${savedStation._id})`)
        } catch (err) {
            showErrorMsg('Cannot add station')
        }

    }
    function onSetFilter(filterBy) {
        dispatch({ type: SET_FILTER_BY, filterBy })
        // console.log(filterBy)
    }

    return <section className='library'>
        <div className='library-header'>
            <h1>Your Library</h1>
            <button onClick={onAddStation}>+</button>
        </div>
        <LibraryFilter filterBy={filterBy} onSetFilter={onSetFilter} />
        <StationList stations={stations} />
    </section>
}