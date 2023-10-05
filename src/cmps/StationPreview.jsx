import { Link, useNavigate } from "react-router-dom";

export function StationPreview({ station }) {
    const navigate = useNavigate()
    return (
        <article onClick={() => navigate(`/station-details/${station._id}`)}>
            {station.imgUrl && <img src={station.imgUrl} alt="" />}
            {!station.imgUrl && <img src="public/img/spotify.png" alt="" />}
            <div>
                <h1>{station.name}</h1>
                <p>{station.songs.length} {(station.songs.length === 1) ? ' song' : ' songs'} <span>- {station.createdBy}</span> </p>
            </div>
        </article>
    )
}