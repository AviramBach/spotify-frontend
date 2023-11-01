import { Draggable, Droppable } from "react-beautiful-dnd";
import { SongPreview } from "./SongPreview.jsx"
import { utilService } from "../services/util.service.js";
import moment from "moment";
import { StationDetailsOptionMenu } from "./StationDetailsOptionMenu.jsx";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Popover } from "@mui/material";
import { useEffect } from "react";



export function SongList({ songs, currUser, onRemoveSongFromStation, onPlaySongFromStation, onLikedClicked, currStation }) {
    const isPlaying = useSelector(storeState => storeState.playerModule.isPlaying)
    const currSong = useSelector(storeState => storeState.playerModule.currSong)
    const [isSongOption, setIsSongOption] = useState(false)
    const [songOptionId, setSongOptionId] = useState(null)
    const [anchorEl, setAnchorEl] = useState(null);
    const [isLiked, setIsLiked] = useState(null)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);

    return <div className="song-list-container">
        <div className="info-line">
            <span className="info-line-index">#</span>
            <span className="info-line-title">Title</span>
            <span className="info-line-album">Album</span>
            <span className="info-line-added-at">Date added</span>
            <img className="info-line-duration" src="./../../public/img/duration.svg" alt="" />
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
                                        <p className={`song-list-item-index`}>{isPlaying && song === currSong ? <img src="./../../public/img/download.gif" alt="" /> : idx + 1} </p>
                                        <div className="song-list-item-preview">
                                            <SongPreview song={song} isPlaying={isPlaying} currSong={currSong} />
                                        </div>
                                        <p className="song-list-item-album"> {utilService.getTxtToShow(song.album, 15)}</p>
                                        <p className="song-list-item-added-at" >{moment(song.addedAt).fromNow()}</p>
                                        <div className="song-list-item-duration-container">
                                            <button className={`song-list-item-btn ${currUser && currUser.likedSongs.find((likedSong) => likedSong.id === song.id) ? 'liked-btn' : ''}`} onClick={(ev) => {
                                                ev.stopPropagation()
                                                onLikedClicked(song)
                                                setIsLiked(currUser && currUser.likedSongs.find((likedSong) => likedSong.id === song.id))
                                            }}>
                                                <img className={`song-list-item-btn-img ${currUser && currUser.likedSongs.find((likedSong) => likedSong.id === song.id) ? 'liked' : ''}`}
                                                    src={currUser && currUser.likedSongs.find((likedSong) => likedSong.id === song.id) ? "./../../public/img/selected-heart.svg" : "./../../public/img/heart.svg"} alt="" />
                                            </button>
                                            <p className="song-list-item-duration">{song.duration}</p>
                                            <button className="song-list-item-btn" onClick={(ev) => {
                                                ev.stopPropagation()
                                                setIsSongOption(!isSongOption)
                                                setSongOptionId(song.id)
                                                handleClick(ev);
                                            }}>
                                                <img className="song-list-item-btn-img song-option-menu-btn-img" src="./../../public/img/options.svg" alt="" />
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