import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addStation, loadStations, removeStation, updateStation } from '../store/station.actions.js'
import { DragDropContext, Draggable } from "react-beautiful-dnd"

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { StationList } from "./StationList"
import { stationService } from '../services/station.service.js'
import { LibraryFilter } from './LibraryFilter.jsx'
import { SET_FILTER_BY, SET_STATIONS } from '../store/station.reducer.js'
import { useNavigate } from 'react-router'
import { useState } from 'react'

export function Library() {
    const dispatch = useDispatch()
    const filterBy = useSelector(storeState => storeState.stationModule.filterBy)
    const stationsFromStore = useSelector(storeState => storeState.stationModule.stations)
    const regex = new RegExp(filterBy.txt, 'i')
    // const [stations, setstations] = useState(stationsFromStore)
    const stations = stationsFromStore.filter(station => regex.test(station.name))
    // const [lStations, setLStations] = useState(stations)
    const { sortBy } = filterBy
    const navigate = useNavigate()

    if (sortBy) stations.sort((station1, station2) => {
        if (sortBy === 'createdAt') return station2[sortBy] - station1[sortBy]
        if (station2[sortBy] < station1[sortBy]) return 1
        return -1
    })


    useEffect(() => {
        loadStations()
    }, [])

    async function onAddStation() {
        const station = stationService.getEmptyStation()
        station.createdAt = Date.now()
        station.createdBy = 'Me'
        try {
            const savedStation = await addStation(station)
            navigate(`/station/${savedStation._id}`)
            showSuccessMsg(`Station added (id: ${savedStation._id})`)
        } catch (err) {
            showErrorMsg('Cannot add station')
        }

    }
    function onSetFilter(filterBy) {
        dispatch({ type: SET_FILTER_BY, filterBy })

    }

    function onDragEnd(result) {
        if (!result.destination) return
        if (filterBy.txt) return
        const { source, destination } = result
        const copiedItems = (stations.length) ? [...stations] : [...stationsFromStore]
        const [removed] = copiedItems.splice(source.index, 1)
        copiedItems.splice(destination.index, 0, removed)
        // stations = copiedItems
        // setstations(copiedItems)
        const newFilter = filterBy
        newFilter.sortBy = ''
        dispatch({ type: SET_FILTER_BY, filterBy: newFilter })
        dispatch({ type: SET_STATIONS, stations: copiedItems })
    }

    return <section className='library'>
        <div className='library-header'>
            <div>
                <img className='library-icon' src="./../../public/img/library.svg" alt="" />
                <h1>Your Library</h1>
            </div>
            <button onClick={onAddStation}>
                <img className='add-icon' src="./../../public/img/plus.svg" alt="" />
            </button>
        </div>
        <LibraryFilter filterBy={filterBy} onSetFilter={onSetFilter} />
        <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
            {/* <StationList stations={(stations.length) ? stations : stationsFromStore} dropId={'library'} /> */}
            <StationList stations={stations} dropId={'library'} />
            {/* <StationList stations={(lStations.length) ? lStations : stationsFromStore} dropId={'library'} /> */}
        </DragDropContext>
    </section>
}