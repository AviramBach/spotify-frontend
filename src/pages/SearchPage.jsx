import { useSelector } from "react-redux"
import { AddSongInput } from "../cmps/AddSongInput"
import { useState } from "react"
import { getSongs } from "../services/youtube-api.service"
import { SongPreview } from "../cmps/SongPreview"
import { setCurrSong, toggelIsPlaying } from "../store/player.actions"
import { Popover } from "@mui/material";
import { StationsModal } from "../cmps/StationsModal"
import { updateStation } from "../store/station.actions"
import { StationPreview } from "../cmps/StationPreview"
import { StationList } from "../cmps/StationList"
import { SearchSongInput } from "../cmps/SearchSongInput"


export function SearchPage() {
    const isPlaying = useSelector(storeState => storeState.playerModule.isPlaying)
    const currSong = useSelector(storeState => storeState.playerModule.currSong)
    const stations = useSelector(storeState => storeState.stationModule.stations)

    const [songs, setSongs] = useState(null)
    const [ganreStations, setGanreStations] = useState(null)
    const [ganre, setGanre] = useState(null)
    const [anchorEl, setAnchorEl] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    const [songToAdd, setSongToAdd] = useState(null)
    const [filterBy, setFilterBy] = useState('')
    const regex = new RegExp(filterBy, 'i')

    const myStations = stations.filter(station => station.songs.some(song => regex.test(song.title) || regex.test(song.artist)))

    function handleClick(event, song) {
        setAnchorEl(event.currentTarget)
        setSongToAdd(song)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    // const openStations = () => {
    //     setIsOpen(!isOpen)
    // }

    const open = Boolean(anchorEl)
    const id = open ? 'simple-popover' : undefined
    const ganres = ['Pop', 'Rock', 'Hip-hop', 'Chill', 'R&B']
    const colors = ['rgb(20, 138, 8)', 'rgb(233, 20, 41)', 'rgb(80, 55, 80)', 'rgb(0, 100, 80)', 'rgb(186, 93, 7)']
    const imgs = ['Album_cover1.png', 'Album_cover4.jpg', 'Album-cover2.jpg', 'Outkast.jpg', 'Album_cover3.jpg']

    function onSearchGanre(ganre) {
        const stationsByGanre = stations.filter(station => station.tags.includes(ganre))
        setGanreStations(stationsByGanre)
        setGanre(ganre)
        // console.log(ganre, stationsByGanre)
    }

    async function searchSongs(searchKey) {
        setFilterBy(searchKey)
        try {
            const searchSongs = await getSongs(searchKey)
            setSongs(searchSongs.slice(0, 4))
        } catch (error) {
            console.dir(error)
            throw error
        }
    }

    function onPlaySongFromSearch(song, ev) {
        ev.stopPropagation()
        if (isPlaying && currSong.id === song.id) {
            toggelIsPlaying(true)
            return
        }

        setCurrSong(song)
        toggelIsPlaying(false)
    }

    async function onAddSongToStation(station) {
        setAnchorEl(null)
        station.songs.push(songToAdd)
        try {
            await updateStation(station)
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    return (
        <section className="search-page">
            <SearchSongInput onUpdateStation={searchSongs} />
            {songs && <div className="results-container">
                <div className="top-result-container">
                    <h2>Top result</h2>
                    <div className="song-preview-container">
                        <SongPreview song={songs[0]} />
                        <button className={`primary-play-button ${(isPlaying && songs[0].id === currSong.id) ? 'playing' : ''}`} onClick={(ev) => onPlaySongFromSearch(songs[0], ev)}>
                            {(isPlaying && songs[0].id === currSong.id) ? <img className='pause-icon primary-play-button-img' src="./../../public/img/pause.svg" alt="" /> :
                                <img className='play-icon primary-play-button-img' src="./../../public/img/play.svg" alt="" />}
                        </button>
                    </div>
                </div>
                <div className="songs-container">
                    <h2>Songs</h2>
                    <ul className="search-song-list">
                        {songs.map(song =>
                            <li key={song.id}>
                                <div className="side-container">
                                    <SongPreview song={song} />
                                    <button className={`secondary-play-button ${(isPlaying && song.id === currSong.id) ? 'playing' : ''}`} onClick={(ev) => onPlaySongFromSearch(song, ev)}>
                                        {(isPlaying && song.id === currSong.id) ? <img className='pause-icon primary-play-button-img' src="./../../public/img/pause.svg" alt="" /> :
                                            <img className='play-icon primary-play-button-img' src="./../../public/img/play.svg" alt="" />}
                                    </button>
                                </div>
                                <div className="right-container">
                                    <p className="song-list-item-duration">{song.duration}</p>
                                    <button className="options-btn" onClick={(ev) => handleClick(ev, song)}>
                                        <img className="options-btn-img" src="./../../public/img/options.svg" alt="" />
                                    </button>
                                    <Popover
                                        sx={{
                                            "& .MuiPopover-paper": {
                                                backgroundColor: "#2C2C2C"
                                            }
                                        }}
                                        id={id}
                                        open={open}
                                        anchorEl={anchorEl}
                                        onClose={handleClose}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                    >
                                        <StationsModal onAddSongToStation={onAddSongToStation} song={song} />
                                    </Popover>
                                </div>
                            </li>)}
                    </ul>
                </div>
            </div>}
            {!songs && <div className="browse-container">
                {!ganreStations && <h2>Browse all</h2>}
                {!ganreStations && <div className="ganre-container">
                    {ganres.map((ganre, index) =>
                        <article key={index} style={{ background: colors[index] }} className="ganre-card" onClick={() => onSearchGanre(ganre)}>
                            <h3>{ganre}</h3>
                            <img src={`./../../public/img/${imgs[index]}`} alt="" />
                        </article>)}
                </div>}
                {ganreStations && <div>
                    <h2>{ganre}</h2>
                    <StationList stations={ganreStations} isHome={false} isHideBodyContainer={true} />
                </div>
                }
            </div>}
            {songs && <div className="search-stations-container">
                <h2>Featuring</h2>
                <StationList stations={myStations.slice(0, 5)} isHome={false} isHideBodyContainer={true} />
            </div>}
        </section>
    )
}