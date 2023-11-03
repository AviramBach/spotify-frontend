import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addStation, loadStations } from '../store/station.actions.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { StationList } from "./StationList.jsx"
import { stationService } from '../services/station.service.js'
import { LibraryFilter } from './LibraryFilter.jsx'
import { SET_FILTER_BY } from '../store/station.reducer.js'
import { useNavigate } from 'react-router'

export function Library() {
    const dispatch = useDispatch()
    const filterBy = useSelector(storeState => storeState.stationModule.filterBy)
    const stationsFromStore = useSelector(storeState => storeState.stationModule.stations)
    const currUser = useSelector(storeState => storeState.userModule.user)
    const regex = new RegExp(filterBy.txt, 'i')
    const stations = stationsFromStore.filter(station => regex.test(station.name))
    const { sortBy } = filterBy
    const navigate = useNavigate()

    stations.sort((station1, station2) => {
        if (sortBy === 'createdAt') return station2[sortBy] - station1[sortBy]
        if (sortBy === 'name') {
            if (station2[sortBy] < station1[sortBy]) return 1
            return -1
        }
        if (station2.createdBy < station1.createdBy) return 1
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
        <StationList stations={currUser ? stations : stations.filter((station) => !station.name.toLowerCase().includes('daily mix'))} isHideBodyContainer={false} />
    </section>
}