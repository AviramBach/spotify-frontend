import { Draggable, Droppable } from "react-beautiful-dnd";
import { SongPreview } from "./SongPreview.jsx"
import { utilService } from "../services/util.service.js";
import moment from "moment";
import { StationDetailsOptionMenu } from "./StationDetailsOptionMenu.jsx";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Popover } from "@mui/material";

export function SongList({ songs, onRemoveSongFromStation, onPlaySongFromStation, onLikedClicked, currStation }) {
    const isPlaying = useSelector(storeState => storeState.playerModule.isPlaying)
    const currSong = useSelector(storeState => storeState.playerModule.currSong)
    const currUser = useSelector(storeState => storeState.userModule.user)
    const [isSongOption, setIsSongOption] = useState(false)
    const [songOptionId, setSongOptionId] = useState(null)
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);

    // useEffect(() => {
    //     console.log(currUser.likedSongs);
    // }, [currUser])

    return <div className="song-list-container">
        <div className="info-line">
            <span className="info-line-index">#</span>
            <span className="info-line-title">Title</span>
            <span className="info-line-album">Album</span>
            <span className="info-line-added-at">Date added</span>
            <img className="info-line-duration" src="https://res.cloudinary.com/dollaguij/image/upload/v1699194259/svg/duration_gfi5de.svg" alt="" />
        </div>
        {songs &&
            <Droppable droppableId="station-details">
                {(provided) => (

                    <ul className="song-list"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {songs.map((song, idx) =>
                            <Draggable draggableId={song.id} key={song.id} index={idx}>
                                {(provided) => (
                                    <li
                                        key={idx}
                                        className="song-list-item"
                                        onClick={() => onPlaySongFromStation(currStation, song)}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        ref={provided.innerRef}
                                    >
                                        <div className={`song-list-item-index-contaioner`}>
                                            <p className={`song-list-item-index`}>
                                                {isPlaying && song === currSong ? <img src="https://res.cloudinary.com/dollaguij/image/upload/v1699194219/svg/download_acsgkq.gif" alt="" /> : idx + 1}
                                            </p>
                                            <span className="song-list-item-index-is-playing">
                                                {isPlaying && song === currSong ? <img src="https://res.cloudinary.com/dollaguij/image/upload/v1699194273/svg/pause_qemiyb.svg" alt="" /> : <img src="https://res.cloudinary.com/dollaguij/image/upload/v1699194275/svg/play_ttonbb.svg" alt="" />}
                                            </span>
                                        </div>
                                        <div className="song-list-item-preview">
                                            <SongPreview song={song} isPlaying={isPlaying} currSong={currSong} charNumSong={14} charNumArtist={18} />
                                        </div>
                                        <p className="song-list-item-album"> {utilService.getTxtToShow(song.album, 15)}</p>
                                        <p className="song-list-item-added-at" >{moment(song.addedAt).fromNow()}</p>
                                        <div className="song-list-item-duration-container">
                                            <button className={`song-list-item-btn ${currUser && currUser.likedSongs.find((likedSong) => likedSong.id === song.id) ? 'liked-btn' : ''}`} onClick={(ev) => {
                                                ev.stopPropagation()
                                                onLikedClicked(song)
                                            }}>
                                                <img className={`song-list-item-btn-img ${currUser && currUser.likedSongs.find((likedSong) => likedSong.id === song.id) ? 'liked' : ''}`}
                                                    src={currUser && currUser.likedSongs.find((likedSong) => likedSong.id === song.id) ? "https://res.cloudinary.com/dollaguij/image/upload/v1699194282/svg/selected-heart_f2qfi3.svg" : "https://res.cloudinary.com/dollaguij/image/upload/v1699194263/svg/heart_khtwal.svg"} alt="" />
                                            </button>
                                            <p className="song-list-item-duration">{song.duration}</p>
                                            <button className="song-list-item-btn" onClick={(ev) => {
                                                ev.stopPropagation()
                                                setIsSongOption(!isSongOption)
                                                setSongOptionId(song.id)
                                                handleClick(ev);
                                            }}>
                                                <img className="song-list-item-btn-img song-option-menu-btn-img" src="https://res.cloudinary.com/dollaguij/image/upload/v1699194271/svg/options_k7ygv8.svg" alt="" />
                                            </button>
                                            <Popover
                                                sx={{
                                                    "& .MuiPopover-paper": {
                                                        backgroundColor: "transparent"
                                                    }
                                                }}
                                                onClick={ev => ev.stopPropagation()}
                                                className={"song-list-popover"}
                                                open={open}
                                                anchorEl={anchorEl}
                                                onClose={handleClose}
                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'left',
                                                }}
                                            >
                                                <StationDetailsOptionMenu
                                                    onRemoveSongFromStation={onRemoveSongFromStation}
                                                    songId={songOptionId} content={'song-option-menu'}
                                                    setIsSongOption={setIsSongOption} isSongOption={isSongOption}>
                                                </StationDetailsOptionMenu>
                                            </Popover>
                                        </div>
                                    </li>
                                )}
                            </Draggable>
                        )}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>
        }
    </div >
}