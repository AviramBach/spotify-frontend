import { SongListOptionMenuContent } from "./SongListOptionMenuContent";
import { StationDetailsOptionMenuContent } from "./StationDetailsOptionMenuContent";
export function StationDetailsOptionMenu({ station, onRemoveStation, onUpdateStation, onUpdateStationName, onUpdateStationImage, onUpdateStationdesc, onRemoveSongFromStation, songId, setIsSongOption, isSongOption, content }) {
    return <div className="station-details-option-menu-container">
        {content === 'option-menu' &&
            <StationDetailsOptionMenuContent
                station={station}
                onRemoveStation={onRemoveStation}
                onUpdateStation={onUpdateStation}
                onUpdateStationName={onUpdateStationName}
                onUpdateStationdesc={onUpdateStationdesc}
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