import { utilService } from "../services/util.service"
import useMediaQuery from '@mui/material/useMediaQuery';

export function SongPreview({ song, isPlaying, currSong }) {
    const isMobile = useMediaQuery('(max-width:476px)');
    return <div className="song-preview">
        {song?.imgUrl && <img className="song-preview-img" src={song.imgUrl} alt={song.title} />}
        <div className="song-preview-details">
            <a href="#"
                className={`song-preview-title ${isPlaying && song === currSong ? 'playing-song' : ''}`}>
                {isMobile && isPlaying && song === currSong ? <img className="mobile-playing-gif" src="./../../public/img/download.gif" alt="" /> : ''}
                {utilService.getTxtToShow(song.title, 18)}
            </a>
            <a href="#" className="song-preview-artist">{utilService.getTxtToShow(song.artist, 15)}</a>
        </div>
    </div>
}