import { utilService } from "../services/util.service";

export function SongPreview({ song }) {
    return <div className="song-preview">
        {song.imgUrl && <img className="song-preview-img" src={song.imgUrl} alt={song.title} />}
        <div className="song-preview-details">
            <a href="#" className="song-preview-title"> {song.title}</a>
            <a href="#" className="song-preview-artist">{song.artist}</a>
        </div>
    </div>
}