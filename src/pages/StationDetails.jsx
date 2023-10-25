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
import { DragDropContext } from "react-beautiful-dnd"


export function StationDetails() {
  const params = useParams()
  const navigate = useNavigate()
  const [mycurrStation, setMyCurrStation] = useState(null)
  const [isOption, setIsOption] = useState(false)
  const [gradientColor, setGradientColor] = useState('0,0,0')
  const isPlaying = useSelector(storeState => storeState.playerModule.isPlaying)
  const currSong = useSelector(storeState => storeState.playerModule.currSong)


  useEffect(() => {
    getColor()
  }, [mycurrStation])

  async function getColor() {
    try {
      const color = await imageService.getColorFromImage(mycurrStation.imgUrl)
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
    const updatdStation = { ...mycurrStation, songs: [songToAdd, ...mycurrStation.songs] }
    setMyCurrStation(updatdStation)
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
    const updatedSongs = mycurrStation.songs.filter(song => songId !== song.id)
    const updatdStation = { ...mycurrStation, songs: updatedSongs }
    setMyCurrStation(updatdStation)
    try {
      await updateStation(updatdStation)
    } catch (err) {
      console.error(err)
    }
  }

  async function onUpdateStationDetails() {
    setIsOption(false)
    const name = prompt('new name')
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
  const { name, tags, songs, imgUrl } = mycurrStation
  return (
    <div className="station-details" style={{
      background: `linear-gradient(
      0deg,
      rgba(0, 0, 0, 1) 0%,
      rgba(${gradientColor}, 1) 100%
    )` }}>
      <div className="station-details-header-container">
        <img className="station-details-img" src={imgUrl} alt={name} />
        <div className="station-details-header">
          <h1 className="station-details-headline">{name}</h1>
          <p className="station-details-tags">{tags.join()}</p>
          <p className="station-details-count">{songs.length} songs</p>
        </div>
      </div>
      <div className="main-station-details-container">
        <div className="main-station-details-black">
          <div className="station-details-button-container">
            <button className="primary-play-button" onClick={() => onPlaySongFromStation(mycurrStation)}>
              {isPlaying ? <img className='pause-icon primary-play-button-img' src="./../../public/img/pause.svg" alt="" /> :
                <img className='play-icon primary-play-button-img' src="./../../public/img/play.svg" alt="" />}
            </button>
            <button className="station-details-svg-btn station-details-options-btn" onClick={() => setIsOption(!isOption)}>
              <img className="station-details-svg-btn-img" src="./../../public/img/options.svg" alt="" />
            </button>
          </div>
          {isOption && <StationDetailsOptionMenu onRemoveStation={onRemoveStation} onUpdateStation={onUpdateStation} onUpdateStationDetails={onUpdateStationDetails} ></StationDetailsOptionMenu>}
          <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
            <SongList songs={songs} onRemoveSongFromStation={onRemoveSongFromStation} onPlaySongFromStation={onPlaySongFromStation} onLikedClicked={onLikedClicked} currStation={mycurrStation}></SongList>
          </DragDropContext>
        </div>
      </div>
    </div>
  )
}