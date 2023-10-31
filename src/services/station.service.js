
import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'

import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { songService } from './song.service.js'


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
    url: 'https://www.youtube.com/watch?v=Qr0-7Ds79zo&ab_channel=PinkFloyd',
    imgUrl: './../../public/img/Album_cover4.jpg',
    addedBy: 'Gilad',
    duration: '3:33',
    addedAt: utilService.randomPastTime(),

}
const sConsideration = {
    id: utilService.makeId(),
    title: 'Consideration',
    artist: 'Rihanna',
    album: 'Anti',
    url: 'https://www.youtube.com/watch?v=WSSShAOKYfo&ab_channel=Rihanna-Topic',
    imgUrl: './../../public/img/Album_cover1.png',
    addedBy: 'Guest',
    duration: '2:41',
    addedAt: utilService.randomPastTime(),

}
const sDang = {
    id: utilService.makeId(),
    title: 'Dang!',
    artist: 'Mac Miller',
    album: 'The Divine Feminine',
    url: 'https://www.youtube.com/watch?v=LR3GQfryp9M&ab_channel=MacMiller',
    imgUrl: './../../public/img/Album-cover2.jpg',
    addedBy: 'Guest',
    duration: '4:39',
    addedAt: utilService.randomPastTime(),

}
const sJuicy = {
    id: utilService.makeId(),
    title: 'Juicy',
    artist: 'B.I.G',
    album: 'Ready to Die.',
    url: 'https://www.youtube.com/watch?v=7Y8VPQcPHhY&ab_channel=TheNotoriousB.I.G.-Topic',
    imgUrl: './../../public/img/Album-cover2.jpg',
    addedBy: 'Gilad',
    duration: '4:13',
    addedAt: utilService.randomPastTime(),

}
const sZion = {
    id: utilService.makeId(),
    title: 'To Zion',
    artist: 'Lauryn Hill',
    album: ' The Miseducation of Lauryn Hill',
    url: 'https://www.youtube.com/watch?v=1sQjh261rU8&ab_channel=JeNnILoVeSmUsIc',
    imgUrl: './../../public/img/Album_cover3.jpg',
    addedBy: 'Guest',
    duration: '6:09',
    addedAt: utilService.randomPastTime(),

}
const sDooWop = {
    id: utilService.makeId(),
    title: 'Doo Wop',
    artist: 'Lauryn Hill',
    album: ' The Miseducation of Lauryn Hill',
    url: 'https://www.youtube.com/watch?v=T6QKqFPRZSA&ab_channel=laurynhillvevo',
    imgUrl: './../../public/img/Album_cover3.jpg',
    addedBy: 'Guest',
    duration: '3:56',
    addedAt: utilService.randomPastTime(),

}
const sWork = {
    id: utilService.makeId(),
    title: 'Work',
    artist: 'Rihanna',
    album: ' Anti',
    url: 'https://www.youtube.com/watch?v=puxjq3p-fU0&ab_channel=Rihanna-Topic',
    imgUrl: './../../public/img/Album_cover1.png',
    addedBy: 'Gilad',
    duration: '3:39',
    addedAt: utilService.randomPastTime(),

}
const sWash = {
    id: utilService.makeId(),
    title: 'Wash.',
    artist: 'Bon Iver',
    album: 'Bon Iver',
    url: 'https://www.youtube.com/watch?v=KMfL7rVAu0U&ab_channel=BonIver',
    imgUrl: './../../public/img/Album_cover3.jpg',
    addedBy: 'Spotify',
    duration: '4:54',
    addedAt: utilService.randomPastTime(),

}
const sHeyYa = {
    id: utilService.makeId(),
    title: 'Hey Ya!',
    artist: 'Outkast',
    album: 'Speakerboxxx',
    url: 'https://www.youtube.com/watch?v=JzqYDWBkX_Q&ab_channel=AOK',
    imgUrl: './../../public/img/Outkast.jpg',
    addedBy: 'Gilad',
    duration: '3:52',
    addedAt: utilService.randomPastTime(),

}
const sRoses = {
    id: utilService.makeId(),
    title: 'Roses',
    artist: 'Outkast',
    album: 'Speakerboxxx',
    url: 'https://www.youtube.com/watch?v=sZ1vT0aPcYE&ab_channel=Outkast-Topic',
    imgUrl: './../../public/img/Outkast.jpg',
    addedBy: 'Guest',
    duration: '6:10',
    addedAt: utilService.randomPastTime(),

}
const sAdorn = {
    id: utilService.makeId(),
    title: 'Adorn',
    artist: 'Miguel',
    album: 'Dream',
    url: 'https://www.youtube.com/watch?v=rtHhxrgfOcw&ab_channel=MiguelVEVO',
    imgUrl: './../../public/img/Album_cover4.jpg',
    addedBy: 'Guest',
    duration: '3:15',
    addedAt: utilService.randomPastTime(),

}
const sJump = {
    id: utilService.makeId(),
    title: 'Jump',
    artist: 'Van Halen',
    album: '1984',
    url: 'https://www.youtube.com/watch?v=ggJI9dKBk48&ab_channel=VanHalen-Topic',
    imgUrl: './../../public/img/Album_cover4.jpg',
    addedBy: 'Gilad',
    duration: '3:59',
    addedAt: utilService.randomPastTime(),

}




function _createStations() {
    return [
        _createStation('My Favs', './../../public/img/Album_cover4.jpg', [sTime, sConsideration, sDang, sJuicy, sWash, sRoses, sDooWop, sAdorn, sHeyYa, sJump], 'Me', ['Yours', 'Playlist']),
        _createStation('ANTI', './../../public/img/Album_cover1.png', [sConsideration, sWork], 'Rihanna', ['Rihanna', 'Album']),
        _createStation('R&B', './../../public/img/Album_cover3.jpg', [sZion, sWork, sDooWop, sConsideration], 'Gilad', ['R&B', 'Vibe', 'Playlist']),
        _createStation('Daily Mix 1', './../../public/img/daily_mix_1.jpg', [sWash, sTime, sZion, sConsideration], 'Songify',),
        _createStation('Hip hop', './../../public/img/Album-cover2.jpg', [sJuicy, sDang, sRoses, sWork], 'Gilad', ['Hip hop', 'Rap', 'Playlist']),
        _createStation('Daily Mix 3', './../../public/img/daily_mix_3.jpg', [sDang, sConsideration, sWork, sJuicy], 'Songify', ['daily mix', 'Vibe', 'Playlist']),
        _createStation('Soul Mix', './../../public/img/Album_cover3.jpg', [sDooWop, sConsideration, sWash], 'Songify', ['Mix']),
        _createStation('Rock', './../../public/img/Album_cover4.jpg', [sJump, sTime, sWash], 'Gilad', ['Rock', 'Playlist']),
        _createStation('On Repeat', './../../public/img/Outkast.jpg', [sRoses, sWork, sDooWop], 'Gilad', ['Playlist']),
        _createStation('2010s Mix', './../../public/img/Album_cover1.png', [sWork, sWash, sConsideration, sDang,], 'Songify', ['daily mix', 'Vibe', 'Playlist']),
        _createStation('Chill Mix', './../../public/img/Album-cover2.jpg', [sJuicy, sAdorn, sDang, sRoses, sWork], 'Gilad', ['Hip hop', 'Rap', 'Playlist']),
        _createStation('Outkast Mix', './../../public/img/Outkast.jpg', [sHeyYa, sJuicy, sRoses, sDang], 'Songify', ['chill', 'Vibe', 'Playlist']),
        _createStation('Todays Top Hits', './../../public/img/Album_cover1.png', [sWork, sDang, sHeyYa, sConsideration,], 'Songify', ['pop', 'hits', 'Playlist']),
        _createStation('Rock Classics', './../../public/img/Album_cover4.jpg', [sTime, sJump, sDang,], 'Songify', ['rock', 'Vibe', 'Playlist']),
        _createStation('Chill Hits', './../../public/img/Outkast.jpg', [sRoses, sJump, sTime, sDang,], 'Songify', ['chill', 'Vibe', 'Playlist']),
        _createStation('All Out 2010s', './../../public/img/Album_cover1.png', [sWork, sDang, sConsideration,], 'Songify', ['2010', 'hits', 'Playlist']),
        _createStation('Rap Caviar', './../../public/img/Album-cover2.jpg', [sAdorn, sDang, sJuicy, sRoses, sHeyYa], 'Songify', ['Hip hop', 'Rap', 'Playlist'])
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
        createdAt: utilService.randomPastTime()
    }
}

