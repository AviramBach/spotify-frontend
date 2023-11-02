import React from 'react'
import ReactPlayer from 'react-player'
import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { SongPreview } from './SongPreview.jsx'
import { toggelIsPlaying, setCurrSong, setNextSong, setPrevSong } from '../store/player.actions'
import { utilService } from '../services/util.service.js'
import { useColorFromImage } from "./../customHooks/useColorFromImage.js"
import useMediaQuery from '@mui/material/useMediaQuery';


export function Player() {
    const isPlaying = useSelector(storeState => storeState.playerModule.isPlaying)
    const currSong = useSelector(storeState => storeState.playerModule.currSong)
    const currStation = useSelector(storeState => storeState.playerModule.currStation)
    const nextSong = useSelector(storeState => storeState.playerModule.nextSong)
    const prevSong = useSelector(storeState => storeState.playerModule.prevSong)


    const [volume, setVolume] = useState(0.5)
    const [prevVolume, setPrevVolume] = useState(volume)
    const [isMuted, setIsMuted] = useState(false)
    const [isLooped, setIsLooped] = useState(false)
    const [isShuffle, setIsShuffle] = useState(false)
    const [isLiked, setIsLiked] = useState(false) // this is cmp state that will be getting the global state of the current song:  const [isLiked, setIsLiked] = useState(currSong.isliked)
    const playerRef = useRef(null)
    const [currentTime, setCurrentTime] = useState(0)
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(0);

    const { color, setImageUrl } = useColorFromImage()
    const isMobile = useMediaQuery('(max-width:476px)');

    useEffect(() => {
        if (currSong) {
            setImageUrl(currSong.imgUrl)
        }
    }, [currSong])

    const handleProgress = (state) => {
        if (!state.loaded) return
        setCurrentTime(state.playedSeconds)

        const totalDuration = playerRef.current ? playerRef.current.getDuration() : 0;
        setTimeElapsed(state.playedSeconds);
        setTimeRemaining(totalDuration);
    }

    const handleSeek = (e) => {
        const seekTime = e.target.value
        setCurrentTime(seekTime)
        playerRef.current.seekTo(seekTime)
    }

    function getRandSong(song) {
        const mySongs = currStation.songs.filter(s => s.id !== song.id)
        const randIdx = utilService.getRandomIntInclusive(0, mySongs.length - 1)
        const randSong = mySongs[randIdx]
        return randSong
    }

    function goToNextSong() {
        if (!currSong.title || !currStation._id) return
        if (isShuffle) {
            const randSong = getRandSong(currSong)
            setCurrSong(randSong)
            setNextSong(randSong, currStation)
            setPrevSong(randSong, currStation)
            return
        }
        setCurrSong(nextSong)
        setNextSong(nextSong, currStation)
        setPrevSong(nextSong, currStation)
    }

    function goToPrevSong() {
        if (!currSong.title || !currStation._id) return
        if (isShuffle) {
            const randSong = getRandSong(currSong)
            setCurrSong(randSong)
            setNextSong(randSong, currStation)
            setPrevSong(randSong, currStation)
            return
        }
        setCurrSong(prevSong)
        setNextSong(prevSong, currStation)
        setPrevSong(prevSong, currStation)
    }

    function playSong() {
        if (!currSong.title) return
        toggelIsPlaying(isPlaying)
    }

    function shuffelSong() {
        setIsShuffle(!isShuffle)
    }

    function muteSong() {
        setIsMuted(!isMuted)
        setPrevVolume(volume)
        !isMuted ? setVolume(0) : setVolume(prevVolume)
    }

    function loopSong() {
        setIsLooped(!isLooped)
    }

    function heartSong() {
        setIsLiked(!isLiked)
    }

    const handleVolumeChange = (event) => {
        const newVolume = parseFloat(event.target.value)
        setVolume(newVolume)
    }

    const handleEnded = () => {
        if (isLooped || !currStation._id) {
            setCurrentTime(0)
            playerRef.current.seekTo(0)
            if (isPlaying) {
                playerRef.current.play();
            }
        } else goToNextSong()
    }



    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    }
    return (
        <div className='app-player' style={{
            backgroundColor: isMobile ? `rgb(${color})` : 'black'
        }}>

            <div className='player-song-preview'>
                {currSong.id && <div className='player-song-preview-comp'>
                    <SongPreview song={currSong} isCurrSongPlaying={false} charNumSong={15} charNumArtist={18} />
                </div>}
                <button className='player-btn' onClick={heartSong}>
                    {isLiked ? <img className='full-heart-icon' src="./../../public/img/selected-heart.svg" alt="" /> :
                        <img className='empty-heart-icon player-btn-img' src="./../../public/img/heart.svg" alt="" />}
                </button>
            </div>

            <div className='player-main'>
                <div className='main-controls'>
                    <div className='player-controls-left'>
                        <button className='player-btn' onClick={shuffelSong}>
                            <img className={`shuffle-icon player-btn-img ${isShuffle ? 'active-shuffle-btn' : ''}`} src="./../../public/img/shuffle.svg" alt="" />
                        </button>
                        <button className='player-btn player-btn-img' onClick={goToPrevSong}>
                            <img className='prev-song-icon' src="./../../public/img/prev-song.svg" alt="" />
                        </button>
                    </div>

                    <button className='player-play-btn secondary-play-button' onClick={playSong}>
                        {isPlaying ? <img className='pause-icon secondary-play-button-img' src="./../../public/img/pause.svg" alt="" /> :
                            <img className='play-icon secondary-play-button-img' src="./../../public/img/play.svg" alt="" />}
                    </button>

                    <div className='player-controls-right'>
                        <button className='player-btn player-btn-img' onClick={goToNextSong}>
                            <img className='next-song-icon' src="./../../public/img/next-song.svg" alt="" /></button>
                        <button className='player-btn ' onClick={loopSong}>
                            <img className={`looped-icon player-btn-img ${isLooped ? 'active-loop-btn' : ''}`} src="./../../public/img/repeat.svg" alt="" /> :
                        </button>
                    </div>
                </div>

                <ReactPlayer
                    className='react-player'
                    ref={playerRef}
                    url={currSong.url}
                    config={{
                        youtube: {
                            playerVars: {
                                showinfo: 1,
                            }
                        }
                    }}
                    width='0%'
                    height='0%'
                    playing={isPlaying}
                    volume={volume}
                    muted={isMuted}
                    // loop={isLooped}
                    onProgress={handleProgress}
                    onEnded={handleEnded}
                />

                <div className="progress-bar">
                    <span className="elapsed-time">{formatTime(timeElapsed)}</span>
                    <label htmlFor="progressBar"></label>
                    <input
                        className="bar"
                        type="range"
                        id="progressBar"
                        name="progressBar"
                        min={0}
                        max={playerRef.current ? playerRef.current.getDuration() : 0}
                        value={currentTime}
                        step={0.1}
                        onChange={handleSeek}
                    />
                    <div className="progress-elapsed" style={{ width: `${0.84 * (timeElapsed / timeRemaining) * 100}%` }}>
                    </div>
                    <span className="remaining-time">{formatTime(timeRemaining)}</span>
                </div>
            </div>
            <div className='player-side-controls'>
                <button className='player-btn player-btn-img' onClick={muteSong}>
                    {isMuted ? <img className='mute-icon' src="./../../public/img/mute.svg" alt="" /> :
                        <img className='unmute-icon' src="./../../public/img/unmute.svg" alt="" />}
                </button>
                <div className="volume-bar">
                    <label htmlFor="volumeRange"></label>
                    <input
                        className="bar"
                        type="range"
                        id="volumeRange"
                        name="volumeRange"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={handleVolumeChange}
                    />
                </div>
                <div className="volume-level" style={{ width: `${0.78 * volume * 100}%` }}>
                </div>
            </div>
        </div>
    )
}