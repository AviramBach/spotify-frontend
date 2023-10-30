import { useParams, useNavigate } from "react-router"
import { useEffect, useState } from "react"
import { stationService } from '../services/station.service.js'
import { SongList } from "../cmps/SongList.jsx"
import { removeStation, updateStation } from '../store/station.actions.js'
import { songService } from '../services/song.service.js'
import { setCurrSong, setCurrStation, setNextSong, setPrevSong, toggelIsPlaying } from "../store/player.actions.js"
import { useSelector } from "react-redux"
import { imageService } from "../services/image.service.js"
import { StationDetailsOptionMenu } from "../cmps/StationDetailsOptionMenu.jsx"
import moment from "moment";
import { DragDropContext } from "react-beautiful-dnd"
import { Popover } from "@mui/material";
import { setCurrColor } from "../store/color.actions.js"
import { AddSongInput } from "../cmps/AddSongInput.jsx"



export function StationDetails() {
  const isPlaying = useSelector(storeState => storeState.playerModule.isPlaying)
  const currSong = useSelector(storeState => storeState.playerModule.currSong)
  const params = useParams()
  const navigate = useNavigate()
  const [mycurrStation, setMyCurrStation] = useState(null)
  const [isOption, setIsOption] = useState(false)
  const [gradientColor, setGradientColor] = useState('35, 35, 35')
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  useEffect(() => {
    getColor()
  }, [mycurrStation])

  useEffect(() => {
    getStation()
  }, [params])


  async function getColor() {
    try {
      const color = await imageService.getColorFromImage(mycurrStation.imgUrl)
      const formattedColor = color.join(',')
      setGradientColor(formattedColor);
      setCurrColor(formattedColor)
      return color
    } catch (ex) {
      console.log('error', ex)
    }
  }
  async function getStation() {
    try {
      const { id } = params
      const station = await stationService.getById(id)
      if (!station) return navigate("/")
      setMyCurrStation(station)
    } catch (err) {
      console.log(err);
    }
  }
  function onPlaySongFromStation(station, song) {
    if (!song) song = station.songs[0]
    setCurrStation(station)
    setCurrSong(song)
    setNextSong(song, station)
    setPrevSong(song, station)
    toggelIsPlaying(false)
  }
  async function onRemoveStation() {
    setIsOption(false)
    try {
      await removeStation(mycurrStation._id)
      setCurrColor('18, 18, 18')
      navigate("/")
      showSuccessMsg('Station removed')
    } catch (err) {
      showErrorMsg('Cannot remove station')
    }
  }
  async function onUpdateStation(songTitle) {
    const title = songTitle
    const songToAdd = songService.getRandomSong(title)
    const updatdStation = { ...mycurrStation, songs: [songToAdd, ...mycurrStation.songs] }
    setMyCurrStation(updatdStation)
    try {
      await updateStation(updatdStation)
    } catch (err) {
      console.error(err)
    }
  }
  async function onLikedClicked(song) {
    !song.isLiked ? await songService.saveToLikedSongs(song) : await songService.removeFromLikedSongs(song);
  }
  async function onRemoveSongFromStation(songId) {
    const updatedSongs = mycurrStation.songs.filter(song => songId !== song.id)
    const updatdStation = { ...mycurrStation, songs: updatedSongs }
    setMyCurrStation(updatdStation)
    try {
      await updateStation(updatdStation)
    } catch (err) {
      console.error(err)
    }
  }
  async function onUpdateStationDetails(stationNewName) {
    const name = stationNewName
    const updatdStation = { ...mycurrStation, name: name }
    setMyCurrStation(updatdStation)
    try {
      await updateStation(updatdStation)
    } catch (err) {
      console.error(err)
    }
  }
  async function onDragEnd(result) {
    if (!result.destination) return
    const { source, destination } = result
    const copiedItems = [...mycurrStation.songs]
    const [removed] = copiedItems.splice(source.index, 1)
    copiedItems.splice(destination.index, 0, removed)
    const updatedStation = { ...mycurrStation, songs: copiedItems }
    setCurrStation(updatedStation)
    setMyCurrStation(updatedStation)
    try {
      await updateStation(updatedStation)
    } catch (err) {
      console.error(err)
    }
    if (currSong) {
      setNextSong(currSong, updatedStation)
      setPrevSong(currSong, updatedStation)
    }
  }

  if (!mycurrStation) return <div>loading...</div>
  const { name, tags, songs, imgUrl, createdBy, createdAt } = mycurrStation
  return (
    <div className="station-details" style={{
      background: `linear-gradient(
      0deg,
      rgba(0, 0, 0, 1) 40%,
      rgba(${gradientColor}, 1) 100%
    )` }}>
      <div className="station-details-header-container">
        <img className="station-details-img" src={imgUrl} alt={name} />
        <div className="station-details-header">
          <span className="station-details-tags">playlist</span>
          <h1 className="station-details-headline">{name}</h1>
          <div className="station-details-header-info-container">
            <a className="station-details-created-by" href="#">{createdBy}</a>
            <span className="dot">•</span>
            <span className="station-details-tags">{tags.join()}</span>
            <span className="dot">•</span>
            <span className="station-details-count">{songs.length} songs,</span>
            <span className="station-details-created-at">{moment(createdAt).fromNow()}</span>
          </div>
        </div>
      </div>
      <div className="main-station-details-container">
        <div className="main-station-details-black">
          <div className="station-details-button-container">
            <button className="primary-play-button" onClick={() => onPlaySongFromStation(mycurrStation)}>
              {isPlaying ? <img className='pause-icon primary-play-button-img' src="./../../public/img/pause.svg" alt="" /> :
                <img className='play-icon primary-play-button-img' src="./../../public/img/play.svg" alt="" />}
            </button>
            <button className="station-details-svg-btn station-details-options-btn" onClick={(ev) => {
              setIsOption(!isOption)
              handleClick(ev);
            }}>
              <img className="station-details-svg-btn-img" src="./../../public/img/options.svg" alt="" />
            </button>
          </div>
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
              station={mycurrStation}
              onRemoveStation={onRemoveStation}
              onUpdateStationDetails={onUpdateStationDetails}
              content={'option-menu'}>
            </StationDetailsOptionMenu>
          </Popover>
          <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
            <SongList songs={songs} onRemoveSongFromStation={onRemoveSongFromStation} onPlaySongFromStation={onPlaySongFromStation} onLikedClicked={onLikedClicked} currStation={mycurrStation}></SongList>
            <AddSongInput onUpdateStation={onUpdateStation} />
          </DragDropContext>
        </div>
      </div>
    </div>
  )
}