
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
        console.log(station);
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
        name: 'New Playlist',
        tags: ['By you'],
        songs: [],
        likedByUsers: [],
        imgUrl: './../../public/img/spotify.png'
    }
}

const sTime = {
    id: utilService.makeId(),
    title: 'Time',
    artist: 'Pink Floyd',
    album: 'Dark side of thr moon',
    url: 'youtube/song.mp4',
    imgUrl: './../../public/img/Album_cover4.jpg',
    addedBy: 'Gilad',
    addedAt: utilService.randomPastTime()
}
const sConsideration = {
    id: utilService.makeId(),
    title: 'Consideration',
    artist: 'Rihanna',
    album: 'Anti',
    url: 'youtube/song.mp4',
    imgUrl: './../../public/img/Album_cover1.png',
    addedBy: 'Guest',
    addedAt: utilService.randomPastTime()
}
const sDang = {
    id: utilService.makeId(),
    title: 'Dang!',
    artist: 'Mac Miller',
    album: 'The Divine Feminine',
    url: 'youtube/song.mp4',
    imgUrl: './../../public/img/Album-cover2.jpg',
    addedBy: 'Guest',
    addedAt: utilService.randomPastTime()
}
const sJuicy = {
    id: utilService.makeId(),
    title: 'Juicy',
    artist: 'B.I.G',
    album: 'Ready to Die.',
    url: 'youtube/song.mp4',
    imgUrl: './../../public/img/Album-cover2.jpg',
    addedBy: 'Gilad',
    addedAt: utilService.randomPastTime()
}
const sZion = {
    id: utilService.makeId(),
    title: 'Zion',
    artist: 'Lauryn Hill',
    album: ' The Miseducation of Lauryn Hill',
    url: 'youtube/song.mp4',
    imgUrl: './../../public/img/Album_cover3.jpg',
    addedBy: 'Guest',
    addedAt: utilService.randomPastTime()
}
const sWork = {
    id: utilService.makeId(),
    title: 'Work',
    artist: 'Rihanna',
    album: ' Anti',
    url: 'youtube/song.mp4',
    imgUrl: './../../public/img/Album_cover1.png',
    addedBy: 'Gilad',
    addedAt: utilService.randomPastTime()
}

function _createStations() {
    return [
        _createStation('Liked Songs', './../../public/img/Album_cover4.jpg', [sTime, sConsideration, sDang, sJuicy], 'Me', ['Yours', 'Playlist']),
        _createStation('ANTI', './../../public/img/Album_cover1.png', [sConsideration, sWork], 'Rihanna', ['Rihanna', 'Album']),
        _createStation('R&B', './../../public/img/Album_cover3.jpg', [sDang, sConsideration, sZion], 'Gilad', ['R&B', 'Vibe', 'Playlist']),
        _createStation('Daily Mix 1', './../../public/img/Album-cover2.jpg', [sDang, sConsideration, sZion, sTime, sWork, sJuicy])
    ]
}

function _createStation(name = 'New Playlist', imgUrl = '', songs = [], createdBy = 'Spotify', tags = []) {
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

