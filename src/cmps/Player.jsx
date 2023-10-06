import React from 'react'
import ReactPlayer from 'react-player'
import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
// import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
// import { UserMsg } from './UserMsg.jsx'

// import { SongPreview } from './SongPreview.jsx'
import { setSongProgress, toggelIsPlaying, setCurrSong, setNextSong, setPrevSong } from '../store/player.actions'


export function Player() {

    // const songProgress = useSelector(storeState => storeState.playerModule.songProgress)
    const isPlaying = useSelector(storeState => storeState.playerModule.isPlaying)
    const currSong = useSelector(storeState => storeState.playerModule.currSong)
    const [volume, setVolume] = useState(0.5)
    const [prevVolume, setPrevVolume] = useState(volume)
    const [isMuted, setIsMuted] = useState(false)
    const [isLooped, setIsLooped] = useState(false)
    const [isLiked, setIsLiked] = useState(false) // this is cmp state that will be getting the global state of the current song:  const [isLiked, setIsLiked] = useState(currSong.isliked)
    const playerRef = useRef(null)
    const [currentTime, setCurrentTime] = useState(0)

    const [timeElapsed, setTimeElapsed] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(0);

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

    function nextSong() {
        // Implement logic to switch to the next song
    }

    function prevSong() {
        // Implement logic to switch to the prev song
    }

    function playSong() {
        toggelIsPlaying(isPlaying)
    }

    function shuffelSong() {
        // Implement logic to shuffel a song
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
        // if (isLooped) {
            console.log('Song ended');
            setCurrentTime(0)
            playerRef.current.seekTo(0)
            if (isPlaying) {
                playerRef.current.play();
                console.log('Song restarted');
            }
        // }
    }



    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    }

    return (
        <footer className='app-player'>

            <div className='player-song-preview'>
                {/* <SongPreview props={props}/> */}
                <button className='player-btn' onClick={heartSong}>
                    {isLiked ? <img className='full-heart-icon' src="public\img\spotify android icons 24px (Community)\heart-full.svg" alt="" /> :
                        <img className='empty-heart-icon' src="public\img\spotify android icons 24px (Community)\heart-empty.svg" alt="" />}
                </button>
            </div>

            <div className='player-main'>
                <div className='main-controls'>
                    <div className='player-controls-left'>
                        <button className='player-btn' onClick={shuffelSong}>
                            <img className='unshuffeld-icon' src="public\img\spotify android icons 24px (Community)\Shuffle Icon.png" alt="" />
                            {/* {isShuffle ? <img className='shuffeld-icon' src="public\img\spotify android icons 24px (Community)\Shuffle Icon A.png" alt="" /> :
                            <img className='unshuffeld-icon' src="public\img\spotify android icons 24px (Community)\Shuffle Icon.png" alt="" />} */}
                        </button>
                        <button className='player-btn' onClick={prevSong}><img className='prev-song-icon' src="public/img/spotify android icons 24px (Community)/Previous Icon.png" alt="" /></button>
                    </div>

                    <button className='player-btn play-pause-button' onClick={playSong}>
                        {isPlaying ? <img className='pause-icon' src="public\img\spotify android icons 24px (Community)\Pause Button.png" alt="" /> :
                            <img className='play-icon' src="public/img/spotify android icons 24px (Community)/Play Button.png" alt="" />}
                    </button>

                    <div className='player-controls-right'>
                        <button className='player-btn' onClick={nextSong}>  <img className='next-song-icon' src="public/img/spotify android icons 24px (Community)/Next Icon.png" alt="" /></button>
                        <button className='player-btn' onClick={loopSong}>
                            {isLooped ? <img className='looped-icon' src="public\img\spotify android icons 24px (Community)\Repeat Song Icon.png" alt="" /> :
                                <img className='unlooped-icon' src="public\img\spotify android icons 24px (Community)\Repeat.png" alt="" />}
                        </button>
                    </div>

                </div>

                <ReactPlayer
                    className='react-player'
                    ref={playerRef}
                    url={'https://www.youtube.com/watch?v=WYpjUEPbL-o&list=RDWYpjUEPbL-o&start_radio=1'}
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
                    <span className="remaining-time">{formatTime(timeRemaining)}</span>
                </div>

            </div>

            <div className='player-side-controls'>

                <button className='player-btn' onClick={muteSong}>
                    {isMuted ? <img className='mute-icon' src="public\img\spotify android icons 24px (Community)\mute.svg" alt="" /> :
                        <img className='unmute-icon' src="public\img\spotify android icons 24px (Community)\mute1.svg" alt="" />}
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

            </div>

        </footer>
    )
}