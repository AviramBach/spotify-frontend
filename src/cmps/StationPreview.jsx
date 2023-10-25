import { Link, useNavigate } from "react-router-dom";

export function StationPreview({ station }) {

    const navigate = useNavigate()
    return (
        <article onClick={() => navigate(`/station/${station._id}`)}>
            {station.imgUrl && <img src={station.imgUrl} alt="" />}
            {!station.imgUrl && <img src="public/img/spotify.png" alt="" />}
            <div className="station-preview-container">
                <h1 className="station-preview-title">{station.name}</h1>
                <div className="station-preview-body-container">
                    <span className="station-preview-songs">{station.songs.length} {(station.songs.length === 1) ? ' song' : ' songs'}- </span>
                    <span className="station-preview-created-by">{station.createdBy}</span>
                </div>
            </div>
        </article>
    )
}