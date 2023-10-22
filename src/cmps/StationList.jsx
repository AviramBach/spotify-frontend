import { setCurrSong, toggelIsPlaying } from "../store/player.actions"
import { StationPreview } from "./StationPreview"
import { useSelector } from "react-redux"


export function StationList({ stations, isHome }) {

    function onPlaySongFromStation(station, song) {
        if (!song) song = station.songs[0]
        console.log(song)
        setCurrSong(song)
        toggelIsPlaying(false)
    }

    // if (isHome) stations = stations.slice(0, 6)
    if (!stations) return <h1>Loading...</h1>
    return (
        <ul className="station-list">
            {!stations.length && <h1>No Stations Found</h1>}
            {stations.map(station =>
                <li className="station-preview" key={station._id}>
                    <StationPreview station={station} />
                    <button onClick={() => onPlaySongFromStation(station)} className="btn-play-station">
                        <img className='play-button-icon' src="public/img/spotify android icons 24px (Community)/Play Button.png" alt="" />
                    </button>
                </li>
            )}
        </ul>
    )
}