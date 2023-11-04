import { useParams, useNavigate } from "react-router"
import { useEffect, useState } from "react"
import { stationService } from '../services/station.service.js'
import { SongList } from "../cmps/SongList.jsx"
import { getActionUpdateStation, removeStation, updateStation } from '../store/station.actions.js'
import { setCurrSong, setCurrStation, setNextSong, setPrevSong, toggelIsPlaying } from "../store/player.actions.js"
import { useSelector } from "react-redux"
import { StationDetailsOptionMenu } from "../cmps/StationDetailsOptionMenu.jsx"
import moment from "moment";
import { DragDropContext } from "react-beautiful-dnd"
import { Popover } from "@mui/material";
import { setCurrColor } from "../store/color.actions.js"
import { AddSongInput } from "../cmps/AddSongInput.jsx"
import { useColorFromImage } from "../customHooks/useColorFromImage.js"
import { getSongs } from "../services/youtube-api.service.js"
import { SongPreview } from "../cmps/SongPreview.jsx"
import { userService } from "../services/user.service.js"
import { updateUser } from "./../store/user.actions.js"
import { Loader } from "../cmps/Loader.jsx"
import { SOCKET_EMIT_PAUSE_STATION, SOCKET_EMIT_PLAY_STATION, SOCKET_EVENT_STATION_PAUSED, SOCKET_EVENT_STATION_PLAYING, SOCKET_EVENT_STATION_UPDATED, socketService } from "../services/socket.service.js"
import { store } from "../store/store.js"


export function StationDetails() {
  const stations = useSelector(storeState => storeState.stationModule.stations)
  const isPlaying = useSelector(storeState => storeState.playerModule.isPlaying)
  const currSong = useSelector(storeState => storeState.playerModule.currSong)
  const currUser = useSelector(storeState => storeState.userModule.user)
  const params = useParams()
  const navigate = useNavigate()
  const [mycurrStation, setMyCurrStation] = useState(null)
  const [isOption, setIsOption] = useState(false)
  const { color, setImageUrl } = useColorFromImage()
  const [searchSongs, setSearchSongs] = useState([])
  const [isLikedSongs, setIsLikedSongs] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (mycurrStation) {
      setImageUrl(mycurrStation.imgUrl)
    }
  }, [mycurrStation])

  useEffect(() => {
    setCurrColor(color)
  }, [color])

  useEffect(() => {
    getStation()
  }, [params])

  useEffect(() => {
    setCurrSongFromLocalStorage();
  }, [stations])

  useEffect(() => {
    socketService.on(SOCKET_EVENT_STATION_UPDATED, (station) => {
      setMyCurrStation(station)
      store.dispatch(getActionUpdateStation(station))
    })
    socketService.on(SOCKET_EVENT_STATION_PLAYING, (data) => {
      const { station, song } = data
      const { id } = params
      console.log(data, 'from socket')
      if (station._id !== id) return
      setCurrStation(station)
      setCurrSong(song)
      setNextSong(song, station)
      setPrevSong(song, station)
      toggelIsPlaying(false)
    })
    socketService.on(SOCKET_EVENT_STATION_PAUSED, (data) => {
      const { station, song } = data
      const { id } = params
      if (station._id !== id) return
      toggelIsPlaying(true)
    })
  }, [])

  const setCurrSongFromLocalStorage = async () => {
    if (stations && stations.length) {
      const songId = localStorage.getItem('lastSong')
      await setCurrSong(stations.map(x => x.songs).reduce((prev, curr) => [...prev, ...curr], []).filter((v, i, a) => a.findIndex(v2 => (v2.id === v.id)) === i).find(x => x.id === songId))
    }
  }

  async function getStation() {
    try {
      const { id } = params
      const station = await stationService.getById(id)
      if (!station) return navigate("/")
      const likedSongsStation = station._id === '654643569f85a653d6c444fa'
      if (currUser && likedSongsStation) {
        setMyCurrStation({ ...station, songs: currUser.likedSongs })
        setIsLikedSongs(true)
      } else {
        setMyCurrStation(station)
        setIsLikedSongs(false)
      }
    } catch (err) {
      console.log(err);
    }
  }
  function onPlaySongFromStation(station, song) {
    if (isPlaying && mycurrStation._id === station._id) {
      const res = { station, song, user: currUser }
      toggelIsPlaying(true)
      socketService.emit(SOCKET_EMIT_PAUSE_STATION, res)
      return
    }
    if (!song) song = station.songs[0]
    setCurrStation(station)
    setCurrSong(song)
    setNextSong(song, station)
    setPrevSong(song, station)
    toggelIsPlaying(false)
    const res = { station, song, user: currUser }
    socketService.emit(SOCKET_EMIT_PLAY_STATION, res)
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
  async function onLikedClicked(song) {
    try {
      const updatedLikedSongs = await userService.addToLikedSongs(song)
      await updateUser({ ...currUser, likedSongs: updatedLikedSongs })
    }
    catch (err) {
      console.error(err)
    }
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
  async function onUpdateStationDetails(stationNewName, stationNewDesc) {
    const updatedStation = { ...mycurrStation, name: stationNewName, desc: stationNewDesc }
    console.log(updatedStation);
    setMyCurrStation(updatedStation)
    try {
      await updateStation(updatedStation)
      console.log("updated name");

    } catch (err) {
      console.error(err)
    }
  }

  async function onUpdateStationImage(image) {
    const updatedStation = { ...mycurrStation, imgUrl: image }
    console.log(updatedStation);
    setMyCurrStation(updatedStation)

    try {
      await updateStation(updatedStation)
      console.log("updated img");
    } catch (err) {
      console.error(err);
    }
  }
  async function onUpdateStationLikedByUser(user) {
    console.log(mycurrStation);
    let updatedStation = { ...mycurrStation }
    updatedStation.likedByUsers.includes(user.email) ?
      updatedStation.likedByUsers.splice(updatedStation.likedByUsers.findIndex(email => email === user.email), 1) :
      updatedStation = { ...updatedStation, likedByUsers: [...updatedStation.likedByUsers, user.email] }
    setMyCurrStation(updatedStation)
    try {
      await updateStation(updatedStation)
    } catch (err) {
      console.error(err);
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

  async function onSearchSongs(searchKey) {
    try {
      const songsFromSearch = await getSongs(searchKey)
      setSearchSongs(songsFromSearch)
    } catch (error) {
      console.dir(error)
      throw error
    }
  }

  function onPlaySongFromSearch(song, ev) {
    ev.stopPropagation()
    if (isPlaying && currSong.id === song.id) {
      toggelIsPlaying(true)
      return
    }
    setCurrSong(song)
    toggelIsPlaying(false)
  }

  async function addSongToStation(song, station = mycurrStation) {
    const songsCopy = station.songs.filter((s) => s.id !== song.id)
    songsCopy.push(song)
    const updatedStation = { ...station, songs: songsCopy }
    if (station === mycurrStation || mycurrStation === likedSongsStation) {
      setMyCurrStation(updatedStation)
    }
    try {
      await updateStation(updatedStation)
    } catch (err) {
      console.error(err)
    }
  }

  if (!mycurrStation) return <Loader />
  const { name, tags, songs, imgUrl, createdBy, createdAt } = mycurrStation
  return (
    <div className="station-details" style={{
      background: `linear-gradient(
      0deg,
      rgba(0, 0, 0, 1) 40%,
      rgba(${color}, 1) 100%
    )` }}>
      <div className="station-details-header-container">
        <img className="station-details-img" src={imgUrl} alt={name} />
        <div className="station-details-header">
          <span className="station-details-tags">playlist</span>
          <h1 className="station-details-headline">{name}</h1>
          <span className="station-details-created-at">{mycurrStation.desc}</span>
          <div className="station-details-header-info-container">
            <a className="station-details-created-by" href="#">{createdBy}</a>
            <span className="dot">•</span>
            <span className="station-details-tags">{tags.join(", ")}</span>
            <span className="dot">•</span>
            {songs.length > 0 && <span className="station-details-count">{songs.length} songs, </span>}
            <span className="station-details-created-at">{moment(createdAt).fromNow()}</span>
          </div>
        </div>
      </div>
      <div className="main-station-details-container">
        <div className="main-station-details-black">
          <div className="station-details-button-container">
            <button className="primary-play-button station-details-play-button" onClick={() => onPlaySongFromStation(mycurrStation)}>
              {isPlaying ? <img className='pause-icon primary-play-button-img' src="./../../public/img/pause.svg" alt="" /> :
                <img className='play-icon primary-play-button-img' src="./../../public/img/play.svg" alt="" />}
            </button>
            {!isLikedSongs && <div className="secondary-btn-container">
              <button className={`station-details-svg-btn liked-station-btn`}
                onClick={() => {
                  onUpdateStationLikedByUser(currUser)
                }}>
                <img className={`station-details-svg-btn-img ${currUser && mycurrStation.likedByUsers.includes(currUser.email) ? "liked" : ""}`} src={currUser && mycurrStation.likedByUsers.includes(currUser.email) ? "./../../public/img/selected-heart.svg" : "./../../public/img/heart.svg"} alt="" />
              </button >

              <button className="station-details-svg-btn station-details-options-btn" onClick={(ev) => {
                setIsOption(!isOption)
                handleClick(ev);
              }}>
                <img className="station-details-svg-btn-img" src="./../../public/img/options.svg" alt="" />
              </button>
            </div>}

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
              onUpdateStationImage={onUpdateStationImage}
              content={'option-menu'}>
            </StationDetailsOptionMenu>
          </Popover>
          <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
            <SongList songs={songs} currUser={currUser} onRemoveSongFromStation={onRemoveSongFromStation} onPlaySongFromStation={onPlaySongFromStation} onLikedClicked={onLikedClicked} currStation={mycurrStation}></SongList>
            {!isLikedSongs && <AddSongInput onUpdateStation={onSearchSongs} />}
          </DragDropContext>
        </div>
        <ul className="station-details-search-song-list">
          {searchSongs.map(song =>
            <li key={song.id}>
              <div className="side-container">
                <SongPreview song={song} charNumSong={20} charNumArtist={18} />
                <button className={`secondary-play-button ${(isPlaying && song.id === currSong.id) ? 'playing' : ''}`} onClick={(ev) => onPlaySongFromSearch(song, ev)}>
                  {(isPlaying && song.id === currSong.id) ? <img className='pause-icon primary-play-button-img' src="./../../public/img/pause.svg" alt="" /> :
                    <img className='play-icon primary-play-button-img' src="./../../public/img/play.svg" alt="" />}
                </button>
              </div>
              <div className="right-container">
                <button className="add-to-station-btn" onClick={() => addSongToStation(song)}>
                  <p>Add</p>
                </button>
              </div>
            </li>)}
        </ul>
      </div>
    </div >
  )
}