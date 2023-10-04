import { songService } from "../services/song.service.js";
import { stationService } from "../services/station.service.js";
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { store } from '../store/store.js'
import { SET_CURR_SONG, IS_PLAYING, SET_NEXT_SONG, SET_PREV_SONG, REMOVE_SONG, SET_SONG_PROGRESS } from "./player.reducer.js";


// Action Creators:
export function getActionIsPlaying(isPlaying) {
    return {
        type: IS_PLAYING,
        isPlaying
    }
}

export function getActionCurrSong(song) {
    return {
        type: SET_CURR_SONG,
        song
    }
}

export function getActionNextSong(song) {
    return {
        type: SET_NEXT_SONG,
        song
    }
}

export function getActionPrevSong(song) {
    return {
        type: SET_PREV_SONG,
        song
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
        store.dispatch(getActionCurrSong(song))
        return song
    } catch (err) {
        console.log('cannot play or pause', err)
        throw err
    }
}

export async function setNextSong(song) {
    try {
        const nextSong = await stationService.query(song)
        store.dispatch(getActionNextSong(nextSong))
        return nextSong
    } catch (err) {
        console.log('cannot play next song', err)
        throw err
    }
}

export async function setPrevSong(song) {
    try {
        const prevSong = await stationService.query(song)
        store.dispatch(getActionPrevSong(prevSong))
        return prevSong
    } catch (err) {
        console.log('cannot play next song', err)
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

