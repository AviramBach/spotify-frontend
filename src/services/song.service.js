
import { storageService } from './async-storage.service.js'
// import { httpService } from './http.service.js'

import { utilService } from './util.service.js'
// import { userService } from './user.service.js'


const STORAGE_KEY = 'song';
const LIKED_SONGS_KEY = 'likedSongs';

export const songService = {
    query,
    getById,
    save,
    remove,
    getRandomSong,
    getLikedSongs,
    removeFromLikedSongs,
    saveToLikedSongs
    // addSongMsg
}
window.cs = songService


async function query(filterBy = { txt: '' }) {
    let songs = await storageService.query(STORAGE_KEY)
    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        songs = songs.filter(song => regex.test(song.name))
    }
    return songs
    // return httpService.get(STORAGE_KEY, filterBy)
}

function getById(songId) {
    return storageService.get(STORAGE_KEY, songId)
    // return httpService.get(`song/${songId}`)
}

async function remove(songId) {
    await storageService.remove(STORAGE_KEY, songId)
    // return httpService.delete(`song/${songId}`)
}




async function save(song) {
    let savedSong
    if (song._id) {
        savedSong = await storageService.put(STORAGE_KEY, song)
        // savedSong = await httpService.put(`song/${song._id}`, song)

    } else {
        savedSong = await storageService.post(STORAGE_KEY, song)
        // savedSong = await httpService.post('song', song)
    }
    return savedSong
}

async function getLikedSongs(filterBy = isLiked) {
    let likedSongs = await storageService.query(LIKED_SONGS_KEY)
    if (filterBy === isLiked) {
        likedSongs = songsList.filter((song) => song.isLiked)
    }
    return likedSongs
}

async function saveToLikedSongs(song) {
    let likedSongs = await storageService.put(LIKED_SONGS_KEY, song)
    return likedSongs
}

async function removeFromLikedSongs(song) {
    let likedSongs = await storageService.remove(LIKED_SONGS_KEY, song)
    return likedSongs
}

const songsList =
    [
        {
            id: utilService.makeId(),
            title: 'Time',
            artist: 'Pink Floyd',
            album: 'Dark side of thr moon',
            url: 'https://www.youtube.com/watch?v=Qr0-7Ds79zo&ab_channel=PinkFloyd',
            imgUrl: './../../public/img/Album_cover4.jpg',
            addedBy: 'Gilad',
            duration: '3:33',
            addedAt: utilService.randomPastTime(),
            isLiked: false
        },
        {
            id: utilService.makeId(),
            title: 'Consideration',
            artist: 'Rihanna',
            album: 'Anti',
            url: 'https://www.youtube.com/watch?v=WSSShAOKYfo&ab_channel=Rihanna-Topic',
            imgUrl: './../../public/img/Album_cover1.png',
            addedBy: 'Guest',
            duration: '2:41',
            addedAt: utilService.randomPastTime(),
            isLiked: false
        },
        {
            id: utilService.makeId(),
            title: 'Dang!',
            artist: 'Mac Miller',
            album: 'The Divine Feminine',
            url: 'https://www.youtube.com/watch?v=LR3GQfryp9M&ab_channel=MacMiller',
            imgUrl: './../../public/img/Album-cover2.jpg',
            addedBy: 'Guest',
            duration: '4:39',
            addedAt: utilService.randomPastTime(),
            isLiked: false
        },
        {
            id: utilService.makeId(),
            title: 'Juicy',
            artist: 'B.I.G',
            album: 'Ready to Die.',
            url: 'https://www.youtube.com/watch?v=7Y8VPQcPHhY&ab_channel=TheNotoriousB.I.G.-Topic',
            imgUrl: './../../public/img/Album-cover2.jpg',
            addedBy: 'Gilad',
            duration: '4:13',
            addedAt: utilService.randomPastTime(),
            isLiked: false
        },
        {
            id: utilService.makeId(),
            title: 'To Zion',
            artist: 'Lauryn Hill',
            album: ' The Miseducation of Lauryn Hill',
            url: 'https://www.youtube.com/watch?v=1sQjh261rU8&ab_channel=JeNnILoVeSmUsIc',
            imgUrl: './../../public/img/Album_cover3.jpg',
            addedBy: 'Guest',
            duration: '6:09',
            addedAt: utilService.randomPastTime(),
            isLiked: true
        },
        {
            id: utilService.makeId(),
            title: 'Doo Wop',
            artist: 'Lauryn Hill',
            album: ' The Miseducation of Lauryn Hill',
            url: 'https://www.youtube.com/watch?v=T6QKqFPRZSA&ab_channel=laurynhillvevo',
            imgUrl: './../../public/img/Album_cover3.jpg',
            addedBy: 'Guest',
            duration: '3:56',
            addedAt: utilService.randomPastTime(),
            isLiked: true
        },
        {
            id: utilService.makeId(),
            title: 'Work',
            artist: 'Rihanna',
            album: ' Anti',
            url: 'https://www.youtube.com/watch?v=puxjq3p-fU0&ab_channel=Rihanna-Topic',
            imgUrl: './../../public/img/Album_cover1.png',
            addedBy: 'Gilad',
            duration: '3:39',
            addedAt: utilService.randomPastTime(),
            isLiked: false
        },
        {
            id: utilService.makeId(),
            title: 'Wash.',
            artist: 'Bon Iver',
            album: 'Bon Iver',
            url: 'https://www.youtube.com/watch?v=KMfL7rVAu0U&ab_channel=BonIver',
            imgUrl: './../../public/img/Album_cover3.jpg',
            addedBy: 'Spotify',
            duration: '4:54',
            addedAt: utilService.randomPastTime(),
            isLiked: false
        },
        {
            id: utilService.makeId(),
            title: 'Hey Ya!',
            artist: 'Outkast',
            album: 'Speakerboxxx',
            url: 'https://www.youtube.com/watch?v=JzqYDWBkX_Q&ab_channel=AOK',
            imgUrl: './../../public/img/Outkast.jpg',
            addedBy: 'Gilad',
            duration: '3:52',
            addedAt: utilService.randomPastTime(),
            isLiked: true
        },
        {
            id: utilService.makeId(),
            title: 'Roses',
            artist: 'Outkast',
            album: 'Speakerboxxx',
            url: 'https://www.youtube.com/watch?v=sZ1vT0aPcYE&ab_channel=Outkast-Topic',
            imgUrl: './../../public/img/Outkast.jpg',
            addedBy: 'Guest',
            duration: '6:10',
            addedAt: utilService.randomPastTime(),
            isLiked: false
        },
        {
            id: utilService.makeId(),
            title: 'Adorn',
            artist: 'Miguel',
            album: 'Dream',
            url: 'https://www.youtube.com/watch?v=rtHhxrgfOcw&ab_channel=MiguelVEVO',
            imgUrl: './../../public/img/Album_cover4.jpg',
            addedBy: 'Guest',
            duration: '3:15',
            addedAt: utilService.randomPastTime(),
            isLiked: true
        },
        {
            id: utilService.makeId(),
            title: 'Jump',
            artist: 'Van Halen',
            album: '1984',
            url: 'https://www.youtube.com/watch?v=ggJI9dKBk48&ab_channel=VanHalen-Topic',
            imgUrl: './../../public/img/Album_cover4.jpg',
            addedBy: 'Gilad',
            duration: '3:59',
            addedAt: utilService.randomPastTime(),
            isLiked: false
        }
    ]
// async function addSongMsg(songId, txt) {
//     const savedMsg = await httpService.post(`song/${songId}/msg`, {txt})
//     return savedMsg
// }


function getRandomSong(title) {
    return {
        id: utilService.makeId(),
        title,
        artist: utilService.makeLorem(2),
        album: utilService.makeLorem(2),
        url: 'https://www.youtube.com/watch?v=sZ1vT0aPcYE&ab_channel=Outkast-Topic',
        imgUrl: './../../public/img/Album_cover4.jpg',
        addedBy: 'guest',
        duration: '6:10',
        addedAt: utilService.randomPastTime(),
        isLiked: false
    }
}





