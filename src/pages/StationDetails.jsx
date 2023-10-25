import { useParams, useNavigate } from "react-router"
import { useEffect, useState } from "react"
import { stationService } from '../services/station.service.js'
import { SongList } from "../cmps/SongList.jsx"
import { removeStation, updateStation } from '../store/station.actions.js'
import { songService } from '../services/song.service.js'
import { setCurrSong, setNextSong, setPrevSong, toggelIsPlaying } from "../store/player.actions.js"
import { useSelector } from "react-redux"
import { imageService } from "../services/image.service.js"
import { StationDetailsOptionMenu } from "../cmps/StationDetailsOptionMenu.jsx"
import moment from "moment";


export function StationDetails() {
  const params = useParams()
  const navigate = useNavigate()
  const [currStation, setCurrStation] = useState(null)
  const [isOption, setIsOption] = useState(false)
  const [gradientColor, setGradientColor] = useState('35, 35, 35')
  const isPlaying = useSelector(storeState => storeState.playerModule.isPlaying)

  useEffect(() => {
    getColor()
  }, [currStation])

  async function getColor() {
    try {
      const color = await imageService.getColorFromImage(currStation.imgUrl)
      const formattedColor = color.join(',')
      setGradientColor(formattedColor);
      return color
    } catch (ex) {
      console.log('error', ex)
    }
  }
  useEffect(() => {
    getStation()
  }, [params])

  async function getStation() {
    try {
      const { id } = params
      const station = await stationService.getById(id)
      if (!station) return navigate("/")
      setCurrStation(station)
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
      await removeStation(currStation._id)
      navigate("/")
      showSuccessMsg('Station removed')
    } catch (err) {
      showErrorMsg('Cannot remove station')
    }
  }
  async function onUpdateStation() {
    setIsOption(false)
    const title = prompt('Song name?')
    const songToAdd = songService.getRandomSong(title)
    const updatdStation = { ...currStation, songs: [songToAdd, ...currStation.songs] }
    setCurrStation(updatdStation)
    try {
      await updateStation(updatdStation)
    } catch (err) {
      // showErrorMsg('Cannot update station')
      console.error(err)
    }
  }

  async function onLikedClicked(song) {
    !song.isLiked ? await songService.saveToLikedSongs(song) : await songService.removeFromLikedSongs(song);
  }

  async function onRemoveSongFromStation(songId) {
    const updatedSongs = currStation.songs.filter(song => songId !== song.id)
    const updatdStation = { ...currStation, songs: updatedSongs }
    setCurrStation(updatdStation)
    try {
      await updateStation(updatdStation)
    } catch (err) {
      console.error(err)
    }
  }

  async function onUpdateStationDetails() {
    setIsOption(false)
    const name = prompt('new name')
    const updatdStation = { ...currStation, name: name }
    setCurrStation(updatdStation)
    try {
      await updateStation(updatdStation)
    } catch (err) {
      console.error(err)
    }
  }

  if (!currStation) return <div>loading...</div>
  const { name, tags, songs, imgUrl, createdBy, createdAt } = currStation
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
          <h1 className="station-details-headline">{name}</h1>
          <a className="station-details-created-by" href="#">{createdBy}</a>
          <span className="dot">•</span>
          <span className="station-details-tags">{tags.join()}</span>
          <span className="dot">•</span>
          <span className="station-details-count">{songs.length} songs,  <span className="station-details-created-at">{moment(createdAt).fromNow()}</span></span>
        </div>
      </div>
      <div className="main-station-details-container">
        <div className="main-station-details-black">
          <div className="station-details-button-container">
            <button className="primary-play-button" onClick={() => onPlaySongFromStation(currStation)}>
              {isPlaying ? <img className='pause-icon primary-play-button-img' src="./../../public/img/pause.svg" alt="" /> :
                <img className='play-icon primary-play-button-img' src="./../../public/img/play.svg" alt="" />}
            </button>
            <button className="station-details-svg-btn station-details-options-btn" onClick={() => setIsOption(!isOption)}>
              <img className="station-details-svg-btn-img" src="./../../public/img/options.svg" alt="" />
            </button>
          </div>
          {isOption && <StationDetailsOptionMenu onRemoveStation={onRemoveStation} onUpdateStation={onUpdateStation} onUpdateStationDetails={onUpdateStationDetails} ></StationDetailsOptionMenu>}
          <SongList songs={songs} onRemoveSongFromStation={onRemoveSongFromStation} onPlaySongFromStation={onPlaySongFromStation} onLikedClicked={onLikedClicked} currStation={currStation}></SongList>
        </div>
      </div>
    </div>
  )
}