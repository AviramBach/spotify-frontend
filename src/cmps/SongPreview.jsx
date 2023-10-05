export function SongPreview({ song }) {
    return <div>
        {song.imgUrl && <img height={'40px'} src={song.imgUrl} alt="" />}
        <div>
            <h3>{song.title}</h3>
            <p>{song.artist}</p>
        </div>
    </div>
}