import { setCurrSong, toggelIsPlaying } from "../store/player.actions"
import { StationPreview } from "./StationPreview"
import { useSelector } from "react-redux"


export function StationList({ stations }) {

    function onPlaySongFromStation(station, song) {
        if (!song) song = station.songs[0]
        console.log(song)
        setCurrSong(song)
        toggelIsPlaying(false)
    }

    if (!stations) return <h1>Loading...</h1>
    return (
        <ul className="station-list">
            {!stations.length && <h1>No Stations Found</h1>}
            {stations.map(station =>
                <li className="station-preview" key={station._id}>
                    <StationPreview station={station} />
                    <button className="primary-play-button" onClick={() => onPlaySongFromStation(station)}>
                        <img className="primary-play-button-img" src="./../../public/img/play.svg" alt="" />
                    </button>
                </li>
            )}
        </ul>
    )
}