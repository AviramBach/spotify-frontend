import { songService } from "../services/song.service.js";
import { stationService } from "../services/station.service.js";
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { store } from '../store/store.js'
import { SET_CURR_SONG, IS_PLAYING, SET_NEXT_SONG, SET_PREV_SONG, REMOVE_SONG, SET_SONG_PROGRESS, SET_CURR_STATION } from "./player.reducer.js";


// Action Creators:
export function getActionIsPlaying(isPlaying) {
    return {
        type: IS_PLAYING,
        isPlaying
    }
}

export function getActionCurrSong(currSong) {
    return {
        type: SET_CURR_SONG,
        currSong
    }
}

export function getActionCurrStation(currStation) {
    return {
        type: SET_CURR_STATION,
        currStation
    }
}

export function getActionNextSong(nextSong) {
    return {
        type: SET_NEXT_SONG,
        nextSong
    }
}

export function getActionPrevSong(prevSong) {
    return {
        type: SET_PREV_SONG,
        prevSong
    }
}

export function getActionRemoveSong(songId) {
    return {
        type: REMOVE_SONG,
        songId
    }
}

export function getActionSetSongProgress(songProgress) {
    return {
        type: SET_SONG_PROGRESS,
        songProgress
    }
}


export async function toggelIsPlaying(isPlaying) {
    try {
        store.dispatch(getActionIsPlaying(!isPlaying))
        return !isPlaying
    } catch (err) {
        console.log('cannot play or pause', err)
        throw err
    }
}

export async function setCurrSong(song) {
    try {
        localStorage.setItem("lastSong", song.id)
        console.log(song);
        store.dispatch(getActionCurrSong(song))
        return song
    } catch (err) {
        console.log('cannot play or pause', err)
        throw err
    }
}

export async function setCurrStation(station) {
    try {
        store.dispatch(getActionCurrStation(station))
        return station
    } catch (err) {
        console.log('cannot set station', err)
        throw err
    }
}

export async function setNextSong(song, station) {
    try {
        const songIdx = station.songs.findIndex(s => s.id === song.id)
        const nextSong = (songIdx + 1 < station.songs.length) ? station.songs[songIdx + 1] : station.songs[0]
        store.dispatch(getActionNextSong(nextSong))
        return nextSong
    } catch (err) {
        console.log('cannot set next song', err)
        throw err
    }
}

export async function setPrevSong(song, station) {
    try {
        const songIdx = station.songs.findIndex(s => s.id === song.id)
        const prevSong = (songIdx - 1 < 0) ? station.songs[station.songs.length - 1] : station.songs[songIdx - 1]
        store.dispatch(getActionPrevSong(prevSong))
        return prevSong
    } catch (err) {
        console.log('cannot set prev song', err)
        throw err
    }
}

export async function removeSong(songId) {
    try {
        await stationService.remove(songId)
        store.dispatch(getActionRemoveSong(songId))
    } catch (err) {
        console.log('Cannot remove song from player', err)
        throw err
    }
}

export async function setSongProgress(songProgress) {
    try {
        store.dispatch(getActionSetSongProgress(songProgress))
    } catch (err) {
        console.log('Cannot change song progress', err)
        throw err
    }
}

