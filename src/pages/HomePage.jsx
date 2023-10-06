import React, { useEffect, useRef } from 'react'
import { StationList } from '../cmps/StationList'
import { useSelector } from 'react-redux'
import { loadStations } from '../store/station.actions'


export function HomePage() {
    const stations = useSelector(storeState => storeState.stationModule.stations)
    const homeStations = useRef(stations)
    homeStations.current = (!homeStations.current.length) ? stations : homeStations.current

    return (
        <section className='homepage'>
            <StationList stations={homeStations.current} isHome={true} />
        </section >
    )
}