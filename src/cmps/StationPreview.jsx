import { Link, useNavigate } from "react-router-dom";

export function StationPreview({ station }) {
    const navigate = useNavigate()
    return (
        <article onClick={() => navigate('/station-details/')}>
            <h1>{station.name}</h1>
            <p>{station.songs.length} {(station.songs.length === 1) ? ' song' : ' songs'}</p>
        </article>
    )
}