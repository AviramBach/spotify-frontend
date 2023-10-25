import { SongPreview } from "./SongPreview.jsx"
import moment from "moment";
export function SongList({ songs, onRemoveSongFromStation, onPlaySongFromStation, onLikedClicked, currStation }) {
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
                {songs.map((song, idx) =>
                    <li key={idx} className="song-list-item" onClick={() => onPlaySongFromStation(currStation, song)}>
                        <p className="song-list-item-index">{idx + 1}</p>
                        <div className="song-list-item-preview">
                            <SongPreview song={song}></SongPreview>
                        </div>
                        <p className="song-list-item-album">{song.album}</p>
                        <p className="song-list-item-added-at" >{moment(song.addedAt).fromNow()}</p>
                        <div className="song-list-item-duration-container">
                            <button className="song-list-item-btn" onClick={(ev) => {
                                ev.stopPropagation()
                                onLikedClicked(song)
                            }}>
                                <img className={`song-list-item-btn-img ${song.isLiked ? 'liked' : ''}`} src={song.isLiked ? "./../../public/img/selected-heart.svg" : "./../../public/img/heart.svg"} alt="" />
                            </button>
                            <p className="song-list-item-duration">{song.duration}</p>
                            <button className="song-list-item-btn" onClick={(ev) => {
                                ev.stopPropagation()
                                onRemoveSongFromStation(song.id)
                            }}>
                                <img className="song-list-item-btn-img" src="./../../public/img/options.svg" alt="" />
                            </button>
                        </div>
                    </li>)}
            </ul>}
    </div>
}