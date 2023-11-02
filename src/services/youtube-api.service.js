import Axios from 'axios'
import { utilService } from './util.service'


const KEY = 'SongsDB'
const API_KEY = import.meta.env.VITE_API_KEY

export async function getSongs(term) {
    const termSongssMap = utilService.loadFromStorage(KEY) || {}
    if (termSongssMap[term]) return Promise.resolve(termSongssMap[term])

    console.log('Getting from Network')

    try {
        const res = await Axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&videoCategoryId=10&videoDuration=medium&type=video&key=${API_KEY}&q=${term}`)
        const videos = res.data.items
        const myVideos = videos.map(video => {
            video.snippet.title = video.snippet.title.replaceAll('&#39;', `'`)
            video.snippet.title = video.snippet.title.replaceAll('&quot;', `"`)
            video.snippet.title = video.snippet.title.split('- ')[1] || video.snippet.title
            video.snippet.title = video.snippet.title.split('(Official')[0]
            video.snippet.title = video.snippet.title.split('[Official')[0]
            video.snippet.title = video.snippet.title.split('(ft')[0]
            video.snippet.title = video.snippet.title.split('(Feat')[0]
            video.snippet.title = video.snippet.title.split('(Ex')[0]
            video.snippet.title = video.snippet.title.split('(Vi')[0]
            video.snippet.title = video.snippet.title.split('(')[0]
            video.snippet.channelTitle = video.snippet.channelTitle.split('VEVO')[0]
            video.snippet.channelTitle = video.snippet.channelTitle.split('vevo')[0]
            video.snippet.channelTitle = video.snippet.channelTitle.split('Official')[0]
            return video
        })
        const videoIds = videos.map(video => video.id.videoId)
        const idsStr = videoIds.join(',')
        const newRes = await Axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${idsStr}&part=contentDetails&key=${API_KEY}`)
        const myRes = newRes.data.items
        const durs = myRes.map(res => res.contentDetails.duration.split('PT')[1].split('M'))
        const myDurs = durs.map(dur => `${dur[0]}:${(dur[1].length < 3) ? `0${dur[1][0]}` : dur[1][0] + dur[1][1]}`)

        const mySongs = myVideos.map((video, index) => ({
            id: video.id.videoId,
            title: video.snippet.title,
            artist: video.snippet.channelTitle,
            album: utilService.getRandomAlbumName(),
            url: `https://www.youtube.com/watch?v=${video.id.videoId}`,
            imgUrl: video.snippet.thumbnails.default.url,
            isLiked: false,
            duration: myDurs[index]
        }))

        termSongssMap[term] = mySongs
        utilService.saveToStorage(KEY, termSongssMap)
        return mySongs
    } catch (err) {
        console.dir(err)
        throw err
    }
}