import React, { useEffect, useRef } from 'react'
import { StationList } from '../cmps/StationList.jsx'
import { useDispatch, useSelector } from 'react-redux'


export function HomePage() {
    // const dispatch = useDispatch()
    const stations = useSelector(storeState => storeState.stationModule.stations)
    let time = new Date().getHours()
    const greeting = (time > 18) ? 'Good Evening' : (time > 12) ? 'Good Afternoon' : 'Good Morning'

    return (
        <section className='homepage'>
            <h1>{greeting}</h1>
            <div className='top-station-list'>
                <StationList stations={stations.slice(0, 6)} isHome={true} isHideBodyContainer={true} />
            </div>
            <h2>Your Top Mixes</h2>
            <div className='bottom-station-list'>
                <StationList stations={stations.slice(6, 11)} isHome={true} isHideBodyContainer={false} />
            </div>
        </section >
    )
}