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
    user.likedSongs.find((song) => song === clickedSong) ?
        user.likedSongs = user.likedSongs.splice(clickedSong.idx, 1) : user.likedSongs = [...user.likedSongs, clickedSong]
    // await storageService.put(STORAGE_KEY_USERS, user)
    if (getLoggedinUser()._id === user._id) saveLocalUser(user)
    console.log(user.likedSongs)
    return user.likedSongs
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
        _createUser("almogj1998@gmail.com", "Almog Jan", "123456", "./../../public/img/user.png", true),
        _createUser("almogj1998@gmail.col", "Puki", "./../../public/img/user.png", "123456"),
        _createUser("almogj1998@gmail.cov", "Moki", "./../../public/img/user.png", "123456"),
        _createUser("almogj1998@gmail.coz", "Pitzy", "./../../public/img/user.png", "123456")
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