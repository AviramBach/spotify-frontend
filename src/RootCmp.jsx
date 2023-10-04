import React from 'react'
import { Routes, Route } from 'react-router'

import routes from './routes'

import { AppHeader } from './cmps/AppHeader'
import { Aside } from './cmps/Aside'
import { StationDetails } from './pages/StationDetails'

export function RootCmp() {

    return (
        <div className='root flex'>
            <Aside />
            <div className='root-main'>
                <AppHeader />
                <main>
                    <Routes>
                        {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)}
                        <Route path="user/:id" element={<StationDetails />} />
                    </Routes>
                </main>
            </div>
        </div>
    )
}


