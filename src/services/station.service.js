
import { httpService } from './http.service.js'

import { utilService } from './util.service.js'
import { userService } from './user.service.js'


const STORAGE_KEY = 'station'
const LIKED_SONGS_STATION_ID = '65464ee83c4481ad60530116'


export const stationService = {
    query,
    getById,
    save,
    remove,
    getEmptyStation,
    LIKED_SONGS_STATION_ID,
    getJointStation,
    // addStationMsg
}
window.cs = stationService


async function query(filterBy = { txt: '', tags: [], likedByUsers: 'Songify' }) {
    // let stations = await storageService.query(STORAGE_KEY)
    // if (!stations || !stations.length) {
    //     stations = _createStations()
    //     utilService.saveToStorage(STORAGE_KEY, stations)
    // }
    // if (filterBy.txt) {
    //     const regex = new RegExp(filterBy.txt, 'i')
    //     stations = stations.filter(station => regex.test(station.name))
    // }
    // return stations
    console.log(JSON.stringify(_createStations()));
    const user = userService.getLoggedinUser()
    if (user) {
        filterBy.likedByUsers = `Songify,${user.email}`
        return httpService.get(STORAGE_KEY, filterBy)
    }
    return httpService.get(STORAGE_KEY, filterBy)
}

function getById(stationId) {
    // return storageService.get(STORAGE_KEY, stationId)
    return httpService.get(`station/${stationId}`)
}

async function remove(stationId) {
    // await storageService.remove(STORAGE_KEY, stationId)
    return httpService.delete(`station/${stationId}`)
}
async function save(station) {
    let savedStation
    if (station._id) {
        // savedStation = await storageService.put(STORAGE_KEY, station)
        savedStation = await httpService.put(STORAGE_KEY, station)

    } else {
        // savedStation = await storageService.post(STORAGE_KEY, station)
        savedStation = await httpService.post(STORAGE_KEY, station)
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
        imgUrl: 'https://res.cloudinary.com/dollaguij/image/upload/v1699199706/no-img-new-playlist_r07sfz.png'
    }
}

function getJointStation(user1, user2) {
    return {
        name: 'New Blend Playlist',
        tags: ['Blend', 'Made For You'],
        songs: [],
        likedByUsers: [user1.email, user2.email],
        imgUrl: 'https://res.cloudinary.com/dollaguij/image/upload/v1699199706/no-img-new-playlist_r07sfz.png',
        createdBy: `${utilService.getFirstName(user1.fullname)} & ${utilService.getFirstName(user2.fullname)}`
    }
}

const sTime = {
    id: utilService.makeId(),
    title: 'Time',
    artist: 'Pink Floyd',
    album: 'Dark side of thr moon',
    url: 'https://www.youtube.com/watch?v=Qr0-7Ds79zo&ab_channel=PinkFloyd',
    imgUrl: 'https://res.cloudinary.com/dollaguij/image/upload/v1699194250/Album_cover4_tblibx.jpg',
    addedBy: 'Gilad',
    duration: '3:33',
    addedAt: utilService.randomPastTime(),
}
const sMoney = {
    id: utilService.makeId(),
    title: 'Money',
    artist: 'Pink Floyd',
    album: 'Dark side of thr moon',
    url: 'https://www.youtube.com/watch?v=rwPM01cbQBc&list=PL3PhWT10BW3Urh8ZXXpuU9h526ChwgWKy&index=6',
    imgUrl: 'https://res.cloudinary.com/dollaguij/image/upload/v1699194250/Album_cover4_tblibx.jpg',
    addedBy: 'Gilad',
    duration: '3:33',
    addedAt: utilService.randomPastTime(),
}
const sGreatGig = {
    id: utilService.makeId(),
    title: 'The Great Gig In The Sky',
    artist: 'Pink Floyd',
    album: 'Dark side of thr moon',
    url: 'https://www.youtube.com/watch?v=mPGv8L3a_sY&list=PL3PhWT10BW3Urh8ZXXpuU9h526ChwgWKy&index=5',
    imgUrl: 'https://res.cloudinary.com/dollaguij/image/upload/v1699194250/Album_cover4_tblibx.jpg',
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
    imgUrl: 'https://res.cloudinary.com/dollaguij/image/upload/v1699194247/Album_cover1_ebopdz.png',
    addedBy: 'Guest',
    duration: '2:41',
    addedAt: utilService.randomPastTime(),

}
const sWork = {
    id: utilService.makeId(),
    title: 'Work',
    artist: 'Rihanna',
    album: ' Anti',
    url: 'https://www.youtube.com/watch?v=puxjq3p-fU0&ab_channel=Rihanna-Topic',
    imgUrl: 'https://res.cloudinary.com/dollaguij/image/upload/v1699194247/Album_cover1_ebopdz.png',
    addedBy: 'Gilad',
    duration: '3:39',
    addedAt: utilService.randomPastTime(),

}
const sLoveOnTheBrain = {
    id: utilService.makeId(),
    title: 'Love On The Brain',
    artist: 'Rihanna',
    album: ' Anti',
    url: 'https://www.youtube.com/watch?v=Ni7rKJpQReU&list=PLVP1nukhQ7IkYT9Juzxp5rHlLLPiXzMw8&index=11',
    imgUrl: 'https://res.cloudinary.com/dollaguij/image/upload/v1699194247/Album_cover1_ebopdz.png',
    addedBy: 'Gilad',
    duration: '3:39',
    addedAt: utilService.randomPastTime(),

}
const sBohemianRhapsody = {
    id: utilService.makeId(),
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    album: ' A Night At the Opera',
    url: 'https://www.youtube.com/watch?v=kZVH8Q2UqaA&list=PLBnJv6rImVe9XXPLwK2CvysVd_CnrYB81&index=11',
    imgUrl: 'https://res.cloudinary.com/dollaguij/image/upload/v1699194232/Queen_Album_yt1hwf.png',
    addedBy: 'Gilad',
    duration: '3:39',
    addedAt: utilService.randomPastTime(),

}
const sLoveOfMyLife = {
    id: utilService.makeId(),
    title: 'Love Of My Life',
    artist: 'Queen',
    album: ' A Night At the Opera',
    url: 'https://www.youtube.com/watch?v=2bqm4gRY3mA&list=PLBnJv6rImVe9XXPLwK2CvysVd_CnrYB81&index=9',
    imgUrl: 'https://res.cloudinary.com/dollaguij/image/upload/v1699194232/Queen_Album_yt1hwf.png',
    addedBy: 'Gilad',
    duration: '3:39',
    addedAt: utilService.randomPastTime(),

}

const sOhDarling = {
    id: utilService.makeId(),
    title: 'Oh! Darling!',
    artist: 'The Beatles',
    album: 'Abby Road',
    url: 'https://www.youtube.com/watch?v=erMgpfiOMSU&list=OLAK5uy_k2JcEE3_maNjnVBKU2s1JjhaZ4rxwgaME&index=5',
    imgUrl: 'https://res.cloudinary.com/dollaguij/image/upload/v1699207125/abby_road_wue6vz.jpg',
    addedBy: 'Guest',
    duration: '4:39',
    addedAt: utilService.randomPastTime(),
}
const sComeTogether = {
    id: utilService.makeId(),
    title: 'Come Together!',
    artist: 'The Beatles',
    album: 'Abby Road',
    url: 'https://www.youtube.com/watch?v=45cYwDMibGo&list=OLAK5uy_k2JcEE3_maNjnVBKU2s1JjhaZ4rxwgaME&index=2',
    imgUrl: 'https://res.cloudinary.com/dollaguij/image/upload/v1699207125/abby_road_wue6vz.jpg',
    addedBy: 'Guest',
    duration: '4:39',
    addedAt: utilService.randomPastTime(),
}
const sIWantYou = {
    id: utilService.makeId(),
    title: 'I Want You',
    artist: 'The Beatles',
    album: 'Abby Road',
    url: 'https://www.youtube.com/watch?v=wNL6bd7SpDE&list=OLAK5uy_k2JcEE3_maNjnVBKU2s1JjhaZ4rxwgaME&index=7',
    imgUrl: 'https://res.cloudinary.com/dollaguij/image/upload/v1699207125/abby_road_wue6vz.jpg',
    addedBy: 'Guest',
    duration: '4:39',
    addedAt: utilService.randomPastTime(),
}
const sDang = {
    id: utilService.makeId(),
    title: 'Dang!',
    artist: 'Mac Miller',
    album: 'The Divine Feminine',
    url: 'https://www.youtube.com/watch?v=LR3GQfryp9M&ab_channel=MacMiller',
    imgUrl: 'https://res.cloudinary.com/dollaguij/image/upload/v1699205675/mac_miller_jgyzun.jpg',
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
    imgUrl: 'https://res.cloudinary.com/dollaguij/image/upload/v1699194251/Album-cover2_llwqpw.jpg',
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
    imgUrl: 'https://res.cloudinary.com/dollaguij/image/upload/v1699194248/Album_cover3_rmsuaj.jpg',
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
    imgUrl: 'https://res.cloudinary.com/dollaguij/image/upload/v1699194248/Album_cover3_rmsuaj.jpg',
    addedBy: 'Guest',
    duration: '3:56',
    addedAt: utilService.randomPastTime(),

}

const sWash = {
    id: utilService.makeId(),
    title: 'Wash.',
    artist: 'Bon Iver',
    album: 'Bon Iver',
    url: 'https://www.youtube.com/watch?v=KMfL7rVAu0U&ab_channel=BonIver',
    imgUrl: 'https://res.cloudinary.com/dollaguij/image/upload/v1699205676/wash_bon_iver_i8fjta.jpg',
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
    imgUrl: 'https://res.cloudinary.com/dollaguij/image/upload/v1699194272/Outkast_in3z3w.jpg',
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
    imgUrl: 'https://res.cloudinary.com/dollaguij/image/upload/v1699194272/Outkast_in3z3w.jpg',
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
    imgUrl: 'https://res.cloudinary.com/dollaguij/image/upload/v1699205675/adorn_miguel_nnaldq.jpg',
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
    imgUrl: 'https://res.cloudinary.com/dollaguij/image/upload/v1699205676/jump_van_halen_wectxk.jpg',
    addedBy: 'Gilad',
    duration: '3:59',
    addedAt: utilService.randomPastTime(),

}
const songs = [sTime, sMoney, sGreatGig, sConsideration, sWork, sLoveOnTheBrain, sBohemianRhapsody, sLoveOfMyLife, sOhDarling, sComeTogether, sIWantYou, sDang, sJuicy, sZion, sDooWop, sWash, sHeyYa, sRoses, sAdorn, sJump]

function _createStations() {
    return [
        _createStation('Daily Mix 1', "", 'https://res.cloudinary.com/dollaguij/image/upload/v1699194255/daily_mix_1_ckdbid.jpg', [sGreatGig, sBohemianRhapsody, sLoveOnTheBrain, sOhDarling, sDooWop], 'Songify', ['Made For You']),
        _createStation('Daily Mix 2', "", 'https://res.cloudinary.com/dollaguij/image/upload/v1699194213/daily-mix-2_s9gddo.jpg', [sComeTogether, sLoveOfMyLife, sTime, sWash], 'Songify', ['Made For You']),
        _createStation('Daily Mix 3', "", 'https://res.cloudinary.com/dollaguij/image/upload/v1699194256/daily_mix_3_cplkwz.jpg', [sLoveOfMyLife, sOhDarling, sComeTogether, sIWantYou, sDang, sJuicy, sZion, sDooWop, sWash, sHeyYa, sRoses, sAdorn,], 'Songify', ['Made For You']),
        _createStation('Daily Mix 4', "", 'https://res.cloudinary.com/dollaguij/image/upload/v1699194214/daily-mix-4_odfsdk.jpg', [sMoney, sGreatGig, sConsideration, sWork, sLoveOnTheBrain, sBohemianRhapsody,], 'Songify', ['Made For You']),
        _createStation('Daily Mix 5', "", 'https://res.cloudinary.com/dollaguij/image/upload/v1699194215/daily-mix-5_c7cgnx.jpg', [sDooWop, sConsideration, sWash], 'Songify', ['Made For You']),
        _createStation('Daily Mix 6', "", 'https://res.cloudinary.com/dollaguij/image/upload/v1699194217/daily-mix-6_ejocvp.jpg', [sIWantYou, sDang, sJuicy, sZion, sDooWop, sWash, sHeyYa,], 'Songify', ['Made For You']),
        _createStation('Daily Mix 1', "", 'https://res.cloudinary.com/dollaguij/image/upload/v1699194571/daily-mix-1-_2_wmapjq.jpg', [sBohemianRhapsody, sLoveOnTheBrain, sOhDarling, sWash, sTime, sZion, sConsideration], 'Songify', ['Made For You']),
        _createStation('Daily Mix 2', "", 'https://res.cloudinary.com/dollaguij/image/upload/v1699194571/daily-mix-2-_2_xe6pc2.jpg', [sTime, sJump, sGreatGig, sConsideration, sDang,], 'Songify', ['Made For You']),
        _createStation('Daily Mix 3', "", 'https://res.cloudinary.com/dollaguij/image/upload/v1699194571/daily-mix-3-_2_tjslky.jpg', [sDang, sConsideration, sWork, sJuicy], 'Songify', ['Made For You']),
        _createStation('Daily Mix 4', "", 'https://res.cloudinary.com/dollaguij/image/upload/v1699194571/daily-mix-4-_2_aepfbd.jpg', [sWash, sTime, sZion, sConsideration], 'Songify', ['Made For You']),
        _createStation('Daily Mix 5', "", 'https://res.cloudinary.com/dollaguij/image/upload/v1699194571/daily-mix-5-_2_dtops9.jpg', [sDooWop, sConsideration, sWash], 'Songify', ['Made For You']),
        _createStation('Daily Mix 6', "", 'https://res.cloudinary.com/dollaguij/image/upload/v1699194571/daily-mix-6-_2_j896jd.jpg', [ssLoveOfMyLife, sOhDarling, sComeTogether, sIWantYou, sDang, sJuicy, sZion, sDooWop, sWash, sHeyYa, sRoses, sAdorn,], 'Songify', ['Made For You']),
        _createStation('R&B', "", 'https://res.cloudinary.com/dollaguij/image/upload/v1699195202/asset_5_eua8e7.jpg', [sZion, sWork, sDooWop, sConsideration], 'Gilad', ['Mood', 'Pop', 'Chill', 'Indie']),
        _createStation('Rap Caviar', "", 'https://res.cloudinary.com/dollaguij/image/upload/v1699194235/RapCaviar_cnw5eb.jpg', [sDang, sJuicy, sWash, sHeyYa, sRoses, sAdorn, sJump], 'Songify', ['Mood', 'Rock', 'Soul', 'Glow']),
        _createStation('Soul Mix', "", 'https://res.cloudinary.com/dollaguij/image/upload/v1699195203/asset_36_ulmkuq.jpg', [sDooWop, sConsideration, sWash], 'Songify', ['Mood', 'Trending', 'Rock', 'R&B', 'Glow']),
        _createStation('Rock Legends', "", 'https://res.cloudinary.com/dollaguij/image/upload/v1699195202/asset_3_aq0u4v.jpg', [sJump, sTime, sWash], 'Gilad', ['vibe', 'Latin', 'Alternative', 'Glow']),
        _createStation('2010s Mix', "", 'https://res.cloudinary.com/dollaguij/image/upload/v1699194236/Rihanna_Loud_ewyyod.pngg', [sWork, sWash, sConsideration, sDang,], 'Songify', ['Mood', 'Pop', 'Hip-hop']),
        _createStation('Soft Pop Hits', "", 'https://res.cloudinary.com/dollaguij/image/upload/v1699195202/asset_6_lqp40j.jpg', [sJuicy, sAdorn, sDang, sRoses, sWork], 'Gilad', ['vibe', 'Trending', 'Rock', 'Divas']),
        _createStation('Outkast Mix', "", 'https://res.cloudinary.com/dollaguij/image/upload/v1699194272/Outkast_in3z3w.jpg', [sHeyYa, sJuicy, sRoses, sDang], 'Songify', ['Mood', 'Rock', 'Hip-hop', 'R&B']),
        _createStation('Party Hits', "", 'https://res.cloudinary.com/dollaguij/image/upload/v1699194229/party_ht7t5h.jpg', [sWork, sDang, sHeyYa, sConsideration,], 'Songify', ['vibe', 'Pop', 'Latin']),
        _createStation('On Repeat', "", 'https://res.cloudinary.com/dollaguij/image/upload/v1699194228/On_Repeat_lvgcoz.jpg', [sRoses, sWork, sDooWop], 'Gilad', ['vibe', 'Rock', 'R&B', 'Latin', 'Alternative']),
        _createStation('Chill Hits', "", 'https://res.cloudinary.com/dollaguij/image/upload/v1699194243/vibe_uxko8k.jpg', [sRoses, sJump, sTime, sDang,], 'Songify', ['Mood', 'Pop', 'Indie', 'Glow', 'Divas']),
        _createStation('Songs To Scream In The Car', "", 'https://res.cloudinary.com/dollaguij/image/upload/v1699195205/asset_42_sjtxeg.jpg', [sWork, sDang, sConsideration,], 'Songify', ['vibe', 'Trending', 'Chill', 'Indie']),
        _createStation('ANTI', "", 'https://res.cloudinary.com/dollaguij/image/upload/v1699194247/Album_cover1_ebopdz.png', [sConsideration, sWork, sLoveOnTheBrain], 'Rihanna', ['vibe', 'Trending', 'R&B', 'Soul', 'Divas']),
        _createStation('Hip hop', "", 'https://res.cloudinary.com/dollaguij/image/upload/v1699195203/asset_38_nsjm8m.jpg', [sJuicy, sDang, sRoses, sWork], 'Gilad', ['vibe', 'Pop', 'Chill', 'Indie', 'Soul', 'Glow', 'Divas']),
        _createStation('Rock Classics', "", 'https://res.cloudinary.com/dollaguij/image/upload/v1699195202/asset_7_nhlje2.jpg', [sTime, sMoney, sGreatGig, sBohemianRhapsody, sLoveOfMyLife, sOhDarling, sComeTogether, sIWantYou,], 'Songify', ['Mood', 'Trending', 'Hip-hop', 'Soul', 'Glow']),
    ]
}

function _createStation(name = 'New Playlist', desc = "", imgUrl = '', songs = [], createdBy = 'Songify', tags = []) {
    return {
        // _id: utilService.makeId(),
        name,
        tags,
        desc,
        songs,
        likedByUsers: [],
        imgUrl,
        createdBy,
        createdAt: utilService.randomPastTime()
    }
}

