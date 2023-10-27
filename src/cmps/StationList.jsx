import { useNavigate } from "react-router"
import { setCurrSong, setCurrStation, setNextSong, setPrevSong, toggelIsPlaying } from "../store/player.actions"
import { StationPreview } from "./StationPreview.jsx"
import { useSelector } from "react-redux"

export function StationList({ stations, isHideBodyContainer }) {
    const navigate = useNavigate()
    const isPlaying = useSelector(storeState => storeState.playerModule.isPlaying)
    const currStation = useSelector(storeState => storeState.playerModule.currStation)

    function onPlaySongFromStation(station, song, ev) {
        ev.stopPropagation()
        if (isPlaying && currStation._id === station._id) {
            toggelIsPlaying(true)
            return
        }

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
                    <StationPreview station={station} isHideBodyContainer={isHideBodyContainer} onPlaySongFromStation={onPlaySongFromStation} />
                </li>
            )}
        </ul>
    )
}