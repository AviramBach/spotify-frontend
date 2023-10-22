import { useParams, useNavigate } from "react-router"
import { useEffect, useState } from "react"
import { stationService } from '../services/station.service.js'
import { SongList } from "../cmps/SongList.jsx"
import { removeStation, updateStation } from '../store/station.actions.js'
import { songService } from '../services/song.service.js'
import { setCurrSong, toggelIsPlaying } from "../store/player.actions.js"
import { useSelector } from "react-redux"

export function StationDetails() {
  const params = useParams()
  const navigate = useNavigate()
  const [currStation, setCurrStation] = useState(null)
  const isPlaying = useSelector(storeState => storeState.playerModule.isPlaying)

  useEffect(() => {
    const { id } = params
    console.log(params)
    stationService
      .getById(id)
      .then((station) => {
        if (!station) return navigate("/")
        setCurrStation(station)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [params])

  function onPlaySongFromStation(station, song) {
    if (!song) song = station.songs[0]
    console.log(song)
    setCurrSong(song)
    toggelIsPlaying(false)
  }

  async function onRemoveStation() {
    try {
      await removeStation(currStation._id)
      navigate("/")
      showSuccessMsg('Station removed')
    } catch (err) {
      showErrorMsg('Cannot remove station')
    }
  }
  async function onUpdateStation() {
    const title = prompt('Song name?')
    const songToAdd = songService.getRandomSong(title)
    const updatdStation = { ...currStation, songs: [songToAdd, ...currStation.songs] }
    setCurrStation(updatdStation)
    try {
      await updateStation(updatdStation)
      console.log(currStation.songs)
    } catch (err) {
      // showErrorMsg('Cannot update station')
      console.error(err)
    }
  }

  async function onRemoveSongFromStation(songId) {
    const updatedSongs = currStation.songs.filter(song => songId !== song.id)
    const updatdStation = { ...currStation, songs: updatedSongs }
    setCurrStation(updatdStation)
    try {
      await updateStation(updatdStation)
      console.log('Song removed')
    } catch (err) {
      console.error(err)
    }
  }

  async function onUpdateStationDetails() {
    const name = prompt('new name')
    const updatdStation = { ...currStation, name: name }
    setCurrStation(updatdStation)
    try {
      await updateStation(updatdStation)
      console.log(currStation.name)
    } catch (err) {
      console.error(err)
    }
  }

  if (!currStation) return <div>loading...</div>
  const { name, tags, songs, imgUrl } = currStation
  return (
    <div className="station-details">
      <div className="station-details-header-container">
        <img className="station-details-img" src={imgUrl} alt={name} />
        <div className="station-details-header">
          <h1 className="station-details-headline">{name}</h1>
          <p className="station-details-tags">{tags.join()}</p>
          <p className="station-details-count">{songs.length} songs</p>
        </div>
      </div>
      <div className="main-station-details-container">
        <div className="main-station-details">
          <div className="station-details-button-container">
            <button className="primary-play-button" onClick={() => onPlaySongFromStation(currStation)}>
              {isPlaying ? <img className='pause-icon primary-play-button-img' src="./../../public/img/pause.svg" alt="" /> :
                <img className='play-icon primary-play-button-img' src="./../../public/img/play.svg" alt="" />}
            </button>
            <button className="btn-remove" onClick={() => onRemoveStation()}>X</button>
            <button className="btn-add" onClick={() => onUpdateStation()}>Add song</button>
            <button className="btn-edit" onClick={() => onUpdateStationDetails()}>Edit station</button>
          </div>
          <SongList songs={songs} onRemoveSongFromStation={onRemoveSongFromStation} onPlaySongFromStation={onPlaySongFromStation} currStation={currStation}></SongList>
        </div>
      </div>
    </div>
  )
}