import React, { useEffect, useRef } from 'react'
import { StationList } from '../cmps/StationList'
import { useDispatch, useSelector } from 'react-redux'
import { SET_HOME_STATIONS } from '../store/station.reducer'


export function HomePage() {
    const dispatch = useDispatch()
    const stations = useSelector(storeState => storeState.stationModule.stations)
    let homeStations = useSelector(storeState => storeState.stationModule.homeStations)
    let time = new Date().getHours()
    const greeting = (time > 18) ? 'Good Evening' : (time > 12) ? 'Good Afternoon' : 'Good Morning'
    if (!homeStations.length) homeStations = stations

    useEffect(() => {
        dispatch({ type: SET_HOME_STATIONS, homeStations })
    }, [])

    return (
        <section className='homepage'>
            <h1>{greeting}</h1>
            <div className='top-station-list'>
                <StationList stations={homeStations.slice(0, 6)} isHome={true} />
            </div>
            <h1>Your Top Mixes</h1>
            <div className='bottom-station-list'>
                <StationList stations={homeStations.slice(6, 11)} isHome={true} />
            </div>
        </section >
    )
}