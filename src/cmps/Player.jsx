import { useState } from 'react'
import { useSelector } from 'react-redux'
// import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
// import { UserMsg } from './UserMsg.jsx'

import { SongPreview } from './SongPreview'
import {setSongProgress, toggelIsPlaying, setCurrSong, setNextSong, setPrevSong  } from '../store/player.actions'


export function Player(duration) {

    // const [songProgress, setProgress] = useState(0)
    const songProgress = useSelector(storeState => storeState.playerModule.songProgress)
    const isPlaying = useSelector(storeState => storeState.playerModule.isPlaying)
    // const nextSong = useSelector(storeState => storeState.playerModule.nextSong)
    const currSong = useSelector(storeState => storeState.playerModule.currSong)
    // const prevSong = useSelector(storeState => storeState.playerModule.prevSong)
    const [volume, setVolume] = useState(50)

    // const [songName, setSongName] = useState('Song Title');
    // const [artistName, setArtistName] = useState('Artist');

    
    function repeatSong() {
        // Implement logic to switch to the next song
    }

    function nextSong() {
        // Implement logic to switch to the next song
    }

    //TODO connect to store
    function playSong() {
        if (audioRef.current.paused) {
            audioRef.current.play()
            toggelIsPlaying(isPlaying) 
        } else {
            audioRef.current.pause()
            toggelIsPlaying(!isPlaying)
        }
    }

    function prevSong() {
        // Implement logic to switch to the next song
    }

    function shuffelSong() {
        // Implement logic to switch to the next song
    }

    function muteSong(){
        handleVolumeChange({target} = 0)
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (isPlaying && songProgress < duration) {
                setProgress(songProgress + 1)
            }
        }, 1000)

        return () => clearInterval(interval)
    }, [isPlaying, songProgress, duration])


    const handleVolumeChange = (event) => {
        const newVolume = parseFloat(event.target.value)
        setVolume(newVolume)
        audioRef.current.volume = newVolume
    }

    const handleProgressChange = (event) => {
        const newProgress = (event.target.value / 100) * audioRef.current.duration
        setSongProgress(newProgress)
        audioRef.current.currentTime = newProgress
    };

    return (
        <footer className="app-player">

            <div className='player-song-preview'>
                <SongPreview props={props}/>
                <button onClick={removeSong}>heart</button>
            </div>

            <div className='player-main'>

                <div className="main-controls">
                    <button onClick={repeatSong}>Repeat</button>
                    <button onClick={nextSong}>Next</button>
                    <button onClick={playSong}>
                        {isPlaying ? 'Pause' : 'Play'}
                    </button>
                    <button onClick={prevSong}>Previous</button>
                    <button onClick={shuffelSong}>Shuffel</button>
                </div>

                <audio ref={audioRef}>
                    <source src={currSong} type="audio/mpeg" />
                </audio>

                <div className="progress-bar">
                    <label htmlFor="progressBar"></label>
                    <input
                        type="range"
                        id="progressBar"
                        name="progressBar"
                        min="0"
                        max="100"
                        step="1"
                        value={(songProgress / duration) * 100}
                        onChange={handleProgressChange}
                    />
                </div>

            </div>

            <div className='player-side-controls'>

                <button onClick={muteSong}>mute</button>
                <div className="volume-bar">
                    <label htmlFor="volumeRange"></label>
                    <input
                        type="range"
                        id="volumeRange"
                        name="volumeRange"
                        min="0"
                        max="100"
                        step="1"
                        value={volume}
                        onChange={handleVolumeChange}
                    />
                </div>

            </div>

        </footer>
    )
}