
import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'

import { utilService } from './util.service.js'
import { userService } from './user.service.js'


const STORAGE_KEY = 'station'


export const stationService = {
    query,
    getById,
    save,
    remove,
    getEmptyStation,
    // addStationMsg
}
window.cs = stationService


async function query(filterBy = { txt: '', tags: [] }) {
    let stations = await storageService.query(STORAGE_KEY)
    if (!stations || !stations.length) {
        stations = _createStations()
        utilService.saveToStorage(STORAGE_KEY, stations)
    }
    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        stations = stations.filter(station => regex.test(station.name))
    }
    return stations
    // return httpService.get(STORAGE_KEY, filterBy)
}

function getById(stationId) {
    return storageService.get(STORAGE_KEY, stationId)
    // return httpService.get(`station/${stationId}`)
}

async function remove(stationId) {
    await storageService.remove(STORAGE_KEY, stationId)
    // return httpService.delete(`station/${stationId}`)
}
async function save(station) {
    let savedStation
    if (station._id) {
        savedStation = await storageService.put(STORAGE_KEY, station)
        // savedStation = await httpService.put(`station/${station._id}`, station)

    } else {
        savedStation = await storageService.post(STORAGE_KEY, station)
        // savedStation = await httpService.post('station', station)
    }
    return savedStation
}



// async function addStationMsg(stationId, txt) {
//     const savedMsg = await httpService.post(`station/${stationId}/msg`, {txt})
//     return savedMsg
// }


function getEmptyStation() {
    return {
        name: '',
        tags: [],
        songs: [],
        likedByUsers: [],
    }
}

function _createStations() {
    return [
        _createStation('Liked songs', 'public/img/Album_cover4.jpg', [{title: 'Time', id: utilService.makeId(), length: '3:58'},{title: 'Ex-factor', id: utilService.makeId(), length: '4:08'},{title: 'Consideration', id: utilService.makeId(), length: '2:43'}, {title: 'Juicy', id: utilService.makeId(), length: '3:36'}], 'Me'),
        _createStation('ANTI', 'public/img/Album_cover1.png', [{title: "Consideration", id: "v1gLJa", length: "2:43"}, {title: "Work", id: utilService.makeId(), length: "3:47"},{title: "Woo", id: utilService.makeId(), length: "2:43"}]),
        _createStation('R&B', 'public/img/Album_cover3.jpg', [{title: "Ex-factor", id: "5ldxtw", length: "4:08"},{title: "In My Room", id: utilService.makeId(), length: "2:12"}]),
        _createStation('Hip hop', 'public/img/Album-cover2.jpg', [{title: "Juicy", id: "vMHAPE", length: "3:36"}, 'Everday', 'Dang!'], 'Gilad')
    ]
}

function _createStation(name = '', imgUrl = '', songs = [], createdBy = 'Spotify', tags = []) {
    return {
        _id: utilService.makeId(),
        name,
        tags,
        songs,
        likedByUsers: [],
        imgUrl,
        createdBy,
    }
}





