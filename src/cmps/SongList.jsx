import { SongPreview } from "./SongPreview"
export function SongList({ songs }) {
    return <div>
        {songs &&
            <ul className="clean-list">
                {songs.reverse().map((song, idx) =>
                    <li key={idx}>
                        <SongPreview song={song}></SongPreview>
                    </li>)}
            </ul>}
    </div>
}