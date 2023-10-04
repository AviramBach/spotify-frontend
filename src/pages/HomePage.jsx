import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CHANGE_COUNT } from '../store/user.reducer'

import { utilService } from '../services/util.service'
import { Aside } from '../cmps/Aside'
import { Navbar } from "../cmps/Navbar.jsx";
import { StationList } from '../cmps/StationList'


export function HomePage() {
    const dispatch = useDispatch()
    const count = useSelector(storeState => storeState.userModule.count)

    function changeCount(diff) {
        console.log('Changing count by:', diff);
        dispatch({ type: CHANGE_COUNT, diff })
    }

    return (
        <section className='homepage'>
            <Navbar />
            <h2>
                Count {count}
                <button onClick={() => {
                    changeCount(1)
                }}>+</button>
                <button onClick={() => {
                    changeCount(10)
                }}>+10</button>
            </h2 >
            <img src={utilService.getAssetSrc('react.svg')} />
            <Aside />
            <StationList />
        </section >
    )
}