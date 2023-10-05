import { SongPreview } from "./SongPreview"
export function SongList({ songs }) {
    return <div>
        <div className="info-line">
            <span className="info-line-index">#</span>
            <span className="info-line-title">Title</span>
            <span className="info-line-album">Album</span>
            <span className="info-line-added-at">Date added</span>
            <img className="info-line-duration" src="./../../public/img/duration.svg" alt="" />
        </div>
        {songs &&
            <ul className="song-list clean-list">
                {songs.reverse().map((song, idx) =>
                    <li key={idx} className="song-list-item">
                        <p className="song-list-item-index">{idx + 1}</p>
                        <div className="song-list-item-preview">
                            <SongPreview song={song}></SongPreview>
                        </div>
                        <p className="song-list-item-album">album</p>
                        <p className="song-list-item-added-at" >X time ago</p>
                        <div className="song-list-item-duration-container">
                            <button className="song-list-item-like-btn">like</button>
                            <p className="song-list-item-duration">duration</p>
                        </div>
                    </li>)}
            </ul>}
    </div>
}