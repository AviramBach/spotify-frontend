import { utilService } from "../services/util.service"
export function SongPreview({ song, isPlaying, currSong }) {
    return <div className="song-preview">
        {song?.imgUrl && <img className="song-preview-img" src={song.imgUrl} alt={song.title} />}
        <div className="song-preview-details">
            <a href="#"
                className={`song-preview-title ${isPlaying && song === currSong ? 'playing-song' : ''}`}>
                {utilService.getTxtToShow(song.title, 18)}
            </a>
            <a href="#" className="song-preview-artist">{utilService.getTxtToShow(song.artist, 15)}</a>
        </div>
    </div>
}