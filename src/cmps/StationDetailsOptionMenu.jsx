import { SongListOptionMenuContent } from "./SongListOptionMenuContent";
import { StationDetailsOptionMenuContent } from "./StationDetailsOptionMenuContent";
export function StationDetailsOptionMenu({ station, onClose, onRemoveStation, onUpdateStation, onUpdateStationDetails, onUpdateStationImage, onRemoveSongFromStation, songId, setIsSongOption, isSongOption, content }) {
    return <div className="station-details-option-menu-container">
        {content === 'option-menu' &&
            <StationDetailsOptionMenuContent
                station={station}
                onClose={onClose}
                onRemoveStation={onRemoveStation}
                onUpdateStation={onUpdateStation}
                onUpdateStationDetails={onUpdateStationDetails}
                onUpdateStationImage={onUpdateStationImage}
            >
            </StationDetailsOptionMenuContent>
        }
        {
            content === 'song-option-menu' &&
            <SongListOptionMenuContent
                onRemoveSongFromStation={onRemoveSongFromStation}
                songId={songId} setIsSongOption={setIsSongOption}
                isSongOption={isSongOption}>
            </SongListOptionMenuContent>
        }
    </div >
}