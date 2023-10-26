import { useNavigate } from "react-router-dom";
import { utilService } from "../services/util.service";

export function StationPreview({ station, isHideBodyContainer, onPlaySongFromStation }) {

    const navigate = useNavigate()
    return (
        <article onClick={() => navigate(`/station/${station._id}`)}>
            <div className="img-container">
                {station.imgUrl && <img src={station.imgUrl} alt="" />}
                {!station.imgUrl && <img src="public/img/spotify.png" alt="" />}
                <button className="primary-play-button" onClick={(ev) => onPlaySongFromStation(station, null, ev)}>
                    <img className="primary-play-button-img" src="./../../public/img/play.svg" alt="" />
                </button>
            </div>
            <div className="station-preview-container">
                <h1 className="station-preview-title">{utilService.getTxtToShow(station.name, 12)}</h1>
                <div className={`station-preview-body-container ${isHideBodyContainer ? "hide-div" : ""}`}>
                    <span className="station-preview-created-by">{station.createdBy} • </span>
                    <span className="station-preview-songs">{station.songs.length} {(station.songs.length === 1) ? ' song' : ' songs'} </span>
                    <p className="station-preview-songs-titles">
                        <span>{station.songs[0].artist}</span>, <span>{station.songs[1].artist}</span>
                    </p>
                </div>

            </div>
        </article>
    )
}