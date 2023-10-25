import { useNavigate } from "react-router"
import { setCurrSong, setCurrStation, setNextSong, setPrevSong, toggelIsPlaying } from "../store/player.actions"
import { StationPreview } from "./StationPreview.jsx"

export function StationList({ stations, isHideBodyContainer }) {
    const navigate = useNavigate()

    function onPlaySongFromStation(station, song, ev) {
        ev.stopPropagation()

        if (!song) song = station.songs[0]
        setCurrStation(station)
        setCurrSong(song)
        setNextSong(song, station)
        setPrevSong(song, station)
        toggelIsPlaying(false)
    }

    if (!stations) return <h1>Loading...</h1>
    return (
        <ul className="station-list">
            {!stations.length && <h1>No Stations Found</h1>}
            {stations.map(station =>
                <li className="station-preview" key={station._id} onClick={() => navigate(`/station/${station._id}`)}>
                    <StationPreview station={station} isHideBodyContainer={isHideBodyContainer} />
                    <button className="primary-play-button" onClick={(ev) => onPlaySongFromStation(station, null, ev)}>
                        <img className="primary-play-button-img" src="./../../public/img/play.svg" alt="" />
                    </button>
                </li>
            )}
        </ul>
    )
}