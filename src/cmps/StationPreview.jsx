import { useNavigate } from "react-router-dom";
import { utilService } from "../services/util.service";
import { useSelector } from "react-redux";

export function StationPreview({ station, isHideBodyContainer, onPlaySongFromStation }) {
    const isPlaying = useSelector(storeState => storeState.playerModule.isPlaying)
    const currStation = useSelector(storeState => storeState.playerModule.currStation)
    const currUser = useSelector(storeState => storeState.userModule.user)
    const navigate = useNavigate()
    const isLikedSongsStation = () => {
        return currUser && station._id === '654643569f85a653d6c444fa'
    }
    const isSongsOrSong = (numOfSongs) => {
        return numOfSongs === 0 || numOfSongs > 1 ? `${numOfSongs} songs` : '1 song'
    }
    return (
        <article onClick={() => navigate(`/station/${station._id}`)}>
            <div className="img-container">
                {station.imgUrl && <img src={station.imgUrl} alt="" />}
                {!station.imgUrl && <img src="https://res.cloudinary.com/dollaguij/image/upload/v1699199706/no-img-new-playlist_r07sfz.png" alt="" />}
                <button className={`primary-play-button ${(isPlaying && currStation._id === station._id) ? 'playing' : ''}`} onClick={(ev) => onPlaySongFromStation(station, null, ev)}>
                    {(isPlaying && currStation._id === station._id) ? <img className='pause-icon primary-play-button-img' src="https://res.cloudinary.com/dollaguij/image/upload/v1699194273/svg/pause_qemiyb.svg" alt="" /> :
                        <img className='play-icon primary-play-button-img' src="https://res.cloudinary.com/dollaguij/image/upload/v1699194275/svg/play_ttonbb.svg" alt="" />}                </button>
            </div>
            <div className="station-preview-container">
                <h1 className="station-preview-title">{utilService.getTxtToShow(station.name, 12)}</h1>
                <div className={`station-preview-body-container ${isHideBodyContainer ? "hide-div" : ""}`}>
                    <span className="station-preview-created-by">{station.createdBy} • </span>
                    <span className="station-preview-songs">
                        {isSongsOrSong(isLikedSongsStation() ? currUser.likedSongs.length : station.songs.length)}
                    </span>
                    <p className="station-preview-songs-titles">
                        <span>{station.songs[0] && station.songs[0].artist}</span>, <span>{station.songs[1] && station.songs[1].artist}</span>
                    </p>
                </div>

            </div>
        </article>
    )
}