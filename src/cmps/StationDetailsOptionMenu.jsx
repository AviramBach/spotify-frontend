import { useEffect, useState } from "react";
import { SongListOptionMenuContent } from "./SongListOptionMenuContent";
import { StationDetailsOptionMenuContent } from "./StationDetailsOptionMenuContent";
export function StationDetailsOptionMenu({ onRemoveStation, onUpdateStation, onUpdateStationDetails, onRemoveSongFromStation, songId, setIsSongOption, isSongOption, content }) {
    const [menuLocation, setMenuLocation] = useState('translate3d(248 %, 182 %, 0px)')
    useEffect(() => {
        setMenuLocation(getMenuLocation())
    }, [])
    function getMenuLocation() {
        if (content === 'song-option-menu') 'translate3d(421 %, 378 %, 0px)'
        else { 'translate3d(248 %, 182 %, 0px)' }
    }
    return <div className="station-details-option-menu-container"
        style={{
            transform: `${menuLocation}`
        }}
    >
        {content === 'option-menu' && <StationDetailsOptionMenuContent onRemoveStation={onRemoveStation}
            onUpdateStation={onUpdateStation} onUpdateStationDetails={onUpdateStationDetails}>
        </StationDetailsOptionMenuContent>
        }

        {
            content === 'song-option-menu' &&
            <SongListOptionMenuContent onRemoveSongFromStation={onRemoveSongFromStation} songId={songId} setIsSongOption={setIsSongOption} isSongOption={isSongOption}>
            </SongListOptionMenuContent>
        }
    </div >
}