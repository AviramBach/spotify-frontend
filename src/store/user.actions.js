import { userService } from "../services/user.service.js";
import { socketService } from "../services/socket.service.js";
import { store } from '../store/store.js'
import { showErrorMsg } from '../services/event-bus.service.js'
import { LOADING_DONE, LOADING_START } from "./system.reducer.js";
import { SET_USER, SET_USERS, SET_WATCHED_USER, UPDATE_USER } from "./user.reducer.js";

export function getActionUpdateuser(user) {
    return {
        type: UPDATE_USER,
        user
    }
}

export async function loadUsers() {
    try {
        store.dispatch({ type: LOADING_START })
        const users = await userService.query()
        store.dispatch({ type: SET_USERS, users })
    } catch (err) {
        console.log('UserActions: err in loadUsers', err)
    } finally {
        store.dispatch({ type: LOADING_DONE })
    }
}


export async function login(email, password) {
    try {
        const user = await userService.login(email, password)
        console.log('user', user);
        store.dispatch({
            type: SET_USER,
            user
        })
        return user
    } catch (err) {
        console.log('Cannot login', err)
        throw err
    }
}

export async function signup(email, fullname, password) {
    try {
        const user = await userService.signup(email, fullname, password)
        store.dispatch({
            type: SET_USER,
            user
        })
        return user
    } catch (err) {
        console.log('Cannot signup', err)
        throw err
    }
}

export async function logout() {
    try {
        await userService.logout()
        store.dispatch({
            type: SET_USER,
            user: null
        })
        socketService.logout()
    } catch (err) {
        console.log('Cannot logout', err)
        throw err
    }
}

export async function loadUser(userId) {
    try {
        const user = await userService.getById(userId);
        store.dispatch({ type: SET_WATCHED_USER, user })
    } catch (err) {
        showErrorMsg('Cannot load user')
        console.log('Cannot load user', err)
    }
}

export async function updateUser(user) {
    try {
        const savedUser = await userService.save(user)
        store.dispatch(getActionUpdateuser(savedUser))
        return savedUser
    }
    catch (err) {
        console.log('Cannot save user', err)
        throw err
    }
}