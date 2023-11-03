export function TagsSelect(station) {
    const ganres = ["Made For You", 'Pop', 'vibe', 'Rock', 'Hip-hop', 'Chill', 'R&B', 'Mood', 'Indie', 'Soul', 'Latin', 'Alternative', 'Glow', 'Divas', 'Trending']
    return <ul className="clean-list station-details-option-menu">
        {ganres.map((ganre, idx) => {
            <li key={idx}
            >
                {ganre}
            </li>
        })}

    </ul>

}