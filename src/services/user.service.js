import { storageService } from "./async-storage.service";
import { utilService } from "./util.service";
const STORAGE_KEY_USERS = 'user'
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    query,
    getById,
    login,
    logout,
    signup,
    save,
    addToLikedSongs,
    getLoggedinUser,
}
window.userService = userService

async function query() {
    let users = await storageService.query(STORAGE_KEY_USERS)
    if (!users || !users.length) {
        users = _createUsers()
        utilService.saveToStorage(STORAGE_KEY_USERS, users)
    }
    return users
}

async function getById(userId) {
    const user = await storageService.get(STORAGE_KEY_USERS, userId)
    // const user = await httpService.get(`user/${userId}`)
    return user
}
async function login(email, password) {
    const users = await storageService.query(STORAGE_KEY_USERS)
    const user = users.find(user => user.email === email && user.password === password)
    // const user = await httpService.post('auth/login', userCred)
    if (user) {
        console.log(user);
        return saveLocalUser(user)
    }
}
async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    // return await httpService.post('auth/logout')
}

async function signup(email, fullName, password) {
    const user = await storageService.post(STORAGE_KEY_USERS, _createUser(email, fullName, password, "./../../public/img/user.png"))
    // const user = await httpService.post('auth/signup', userCred)
    console.log(user);
    return saveLocalUser(user)
}

async function addToLikedSongs(clickedSong) {
    const user = getLoggedinUser()
    if (!user) throw new Error('Not loggedin')
    console.log(user);
    console.log(clickedSong);
    console.log(user.likedSongs.find((song) => song.id != clickedSong.id));
    if (!user.likedSongs.find((song) => song.id === clickedSong.id)) {
        user.likedSongs = [...user.likedSongs, clickedSong]
        console.log("if");
    } else {
        const songIdx = user.likedSongs.findIndex((song) => song.id === clickedSong.id)
        user.likedSongs.splice(songIdx, 1)
    }
    if (getLoggedinUser()._id === user._id) saveLocalUser(user)
    console.log(user.likedSongs)
    return user.likedSongs
}

async function save(user) {
    let saveduser
    if (user._id) {
        saveduser = await storageService.put(STORAGE_KEY_USERS, user)
        console.log(user);
        // saveduser = await httpService.put(`user/${user._id}`, user)
    } else {
        saveduser = await storageService.post(STORAGE_KEY_USERS, user)
        // saveduser = await httpService.post('user', user)
    }
    return saveduser
}

function saveLocalUser(user) {
    user = { _id: user._id, email: user.email, fullname: user.fullname, password: user.password, imgUrl: user.imgUrl, likedSongs: user.likedSongs }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}



function _createUsers() {
    return [
        _createUser("almogj1998@gmail.com", "Almog Jan", "123456", "./../../public/img/user.svg", true),
        _createUser("almogj1998@gmail.col", "Puki", "./../../public/img/user.svg", "123456"),
        _createUser("almogj1998@gmail.cov", "Moki", "./../../public/img/user.svg", "123456"),
        _createUser("almogj1998@gmail.coz", "Pitzy", "./../../public/img/user.svg", "123456")
    ]
}

function _createUser(email, fullName, password, imgUrl, isAdmin = false) {
    return {
        _id: utilService.makeId(),
        email,
        fullName,
        password,
        imgUrl,
        likedSongs: [],
        isAdmin
    }
}