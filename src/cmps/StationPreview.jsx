import { useNavigate } from "react-router-dom";
import { utilService } from "../services/util.service";

export function StationPreview({ station, isHideBodyContainer }) {

    const navigate = useNavigate()
    return (
        <article onClick={() => navigate(`/station/${station._id}`)}>
            {station.imgUrl && <img src={station.imgUrl} alt="" />}
            {!station.imgUrl && <img src="public/img/spotify.png" alt="" />}
            <div className="station-preview-container">
                <h1 className="station-preview-title">{utilService.getTxtToShow(station.name, 12)}</h1>
                <div className={`station-preview-body-container ${isHideBodyContainer ? "hide-div" : ""}`}>
                    <span className="station-preview-songs">{station.songs.length} {(station.songs.length === 1) ? ' song' : ' songs'}- </span>
                    <span className="station-preview-created-by">{station.createdBy}</span>
                </div>
            </div>
        </article>
    )
}