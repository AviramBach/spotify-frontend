export function AddSongInput({ onUpdateStation }) {
    return <div className="song-search-input-container">
        <h1 className="song-search-input-headline">
            Let's find something for your playlist
        </h1>
        <div className="song-search-input" >
            <img className="song-search-input-img" src="./../../public/img/search.svg" alt="" />
            <input className="song-search-input-search-box" type="text" placeholder="Search for songs" onChange={onUpdateStation} />
        </div>
    </div>
}