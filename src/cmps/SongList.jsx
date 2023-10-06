import { SongPreview } from "./SongPreview"
export function SongList({ songs, onRemoveSongFromStation }) {
    console.log(songs);
    return <div>
        <div className="info-line">
            <span className="info-line-index">#</span>
            <span className="info-line-title">Title</span>
            <span className="info-line-album">Album</span>
            <span className="info-line-added-at">Date added</span>
            <img className="info-line-duration" src="./../../public/img/duration.svg" alt="" />
        </div>
        {songs &&
            <ul className="song-list">
                {songs.reverse().map((song, idx) =>
                    <li key={idx} className="song-list-item">
                        <p className="song-list-item-index">{idx + 1}</p>
                        <div className="song-list-item-preview">
                            <SongPreview song={song}></SongPreview>
                        </div>
                        <p className="song-list-item-album">{song.album}</p>
                        <p className="song-list-item-added-at" >X time ago</p>
                        <div className="song-list-item-duration-container">
                            <button className="song-list-item-btn">
                                <img className="song-list-item-btn-img" src="./../../public/img/heart.svg" alt="" />
                            </button>
                            <p className="song-list-item-duration">3:39</p>
                            <button className="song-list-item-btn" onClick={() => onRemoveSongFromStation(song.id)}>
                                <img className="song-list-item-btn-img" src="./../../public/img/options.svg" alt="" />
                            </button>
                        </div>
                    </li>)}
            </ul>}
    </div>
}