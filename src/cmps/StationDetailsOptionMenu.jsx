import { SongListOptionMenuContent } from "./SongListOptionMenuContent";
import { StationDetailsOptionMenuContent } from "./StationDetailsOptionMenuContent";
export function StationDetailsOptionMenu({ onRemoveStation, onUpdateStation, onUpdateStationDetails, onRemoveSongFromStation, songId, setIsSongOption, isSongOption, content }) {

    return <div className="station-details-option-menu-container">
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