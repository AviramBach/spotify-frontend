import { useState } from "react"

export function AddSongInput({ onUpdateStation }) {
    const [input, setInput] = useState("")
    return <div className="song-search-input-container">
        <h1 className="song-search-input-headline">
            Let's find something for your playlist
        </h1>
        <div className="song-search-input" >
            <img className="song-search-input-img" src="https://res.cloudinary.com/dollaguij/image/upload/v1699194280/search_icsjot.svg" alt="" />
            <form onSubmit={(ev) => {
                ev.preventDefault()
                setInput("")
                onUpdateStation(input)
            }}>
                <input className="song-search-input-search-box" type="text" placeholder="Search for songs" value={input} onInput={(ev) => setInput(ev.target.value)} />
            </form>
        </div>
    </div>
}