import { SongPreview } from "./SongPreview"
export function SongList({ songs, onRemoveSongFromStation }) {
    return <div>
        {songs &&
            <ul className="clean-list">
                {songs.reverse().map((song, idx) =>
                    <li key={idx}>
                        <SongPreview song={song}></SongPreview>
                        <button className="btn-remove-song" onClick={()=> onRemoveSongFromStation(song.id)}>X</button>
                    </li>)}
            </ul>}
    </div>
}