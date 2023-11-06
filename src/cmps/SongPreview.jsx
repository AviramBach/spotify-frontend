import { utilService } from "../services/util.service"
import useMediaQuery from '@mui/material/useMediaQuery';

export function SongPreview({ song, isPlaying, currSong, charNumSong, charNumArtist }) {
    const isMobile = useMediaQuery('(max-width:476px)');
    return <div className="song-preview">
        {song?.imgUrl && <img crossorigin="anonymous" className="song-preview-img" src={song.imgUrl} alt={song.title} />}
        <div className="song-preview-details">
            <a href="#"
                className={`song-preview-title ${isPlaying && song === currSong ? 'playing-song' : ''}`}>
                {isMobile && isPlaying && song === currSong ? <img className="mobile-playing-gif" src="https://res.cloudinary.com/dollaguij/image/upload/v1699194219/svg/download_acsgkq.gif" alt="" /> : ''}
                {utilService.getTxtToShow(song.title, charNumSong)}
            </a>
            <a href="#" className="song-preview-artist">{utilService.getTxtToShow(song.artist, charNumArtist)}</a>
        </div>
    </div>
}