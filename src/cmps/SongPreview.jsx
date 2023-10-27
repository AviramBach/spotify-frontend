export function SongPreview({ song, isPlaying, currSong }) {
    return <div className="song-preview">
        {song?.imgUrl && <img className="song-preview-img" src={song.imgUrl} alt={song.title} />}
        <div className="song-preview-details">
            <a href="#" className={`song-preview-title ${isPlaying && song === currSong ? 'playing-song' : ''}`}> {song.title}</a>
            <a href="#" className="song-preview-artist">{song.artist}</a>
        </div>
    </div>
}