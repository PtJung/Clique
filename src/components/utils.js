/**
 * This file exports utility helper functions used to clean up front-end code.
 * 
 * @author: PtJung (Patrick Jung)
 * @requires axios
 */

 import axios from 'axios';

/**
 * This function returns the response of getting users from the server
 * 
 * @return {Object} The reponse from GET (...)/api/users
 */
const getUsersResponse = () => {
    return axios.get(process.env.REACT_APP_API_URL + "/api/users")
        .then(res => {
            return res.data;
        })
        .catch(err => {
            // console.log("Failed (1): " + err);
        });
}

/**
 * This function returns the response of getting rooms from the server
 * 
 * @return {Object} The reponse from GET (...)/api/rooms
 */
const getRoomsResponse = () => {
    return axios.get(process.env.REACT_APP_API_URL + "/api/rooms")
        .then(res => {
            return res.data;
        })
        .catch(err => {
            // console.log("Failed (2): " + err);
        });
}

/**
 * This function creates a session and returns its data
 * 
 * @return {Object} The reponse from GET (...)/api/users/auth/verify
 */
const getSession = () => {
    return axios.get(process.env.REACT_APP_API_URL + "/api/users/auth/verify")
        .then(async (res) => {
            let retrieved = await axios.post(process.env.REACT_APP_API_URL + "/api/users/auth/retrieve", {id: res.data.id});
            if (retrieved.data && res) {
                retrieved.data.exp = res.data.exp;
            }
            return retrieved;
        })
        .catch(err => {
            // console.log("Failed (3): " + err);
        });
}

/**
 * This function creates a room session and returns the token
 * 
 * @param {String} paramCode - The room code
 * @param {String} paramId - The user's unique ID
 * @return {Object} The reponse from POST (...)/api/users/auth/obtain
 */
const createRoomSession = (paramCode, paramId) => {
    return axios.post(process.env.REACT_APP_API_URL + "/api/users/roomauth/obtain", {code: paramCode, id: paramId})
        .then(async () => {
            let payload = await axios.post(process.env.REACT_APP_API_URL + "/api/users/roomauth/verify");
            return payload;
        })
        .catch(err => {
            // console.log("Failed (4): " + err);
        });
}

/**
 * This function updates a room's users when adding a user
 * 
 * @param {String} guestNameReal - The guest's username, if possible
 * @param {String} guestNameDisp - The guest's display / initial name
 * @param {String} guestId - The guest's unique ID
 * @param {String} roomCode - The room code
 * @return {Object} The reponse from PATCH (...)/api/rooms/enter
 */
const addRoomUser = (guestNameReal, guestNameDisp, guestId, roomCode) => {
    return axios.patch(process.env.REACT_APP_API_URL + "/api/rooms/enter", {dispName: guestNameDisp, roomCode: roomCode, guestName: guestNameReal, guestId: guestId})
        .then((res) => {
            return res.data;
        })
        .catch(err => {
            // console.log("Failed (5): " + err);
        });
}

/**
 * This function updates a room's users when removing a user
 * 
 * @param {String} guestId - The guest's unique ID
 * @param {String} roomCode - The room code
 * @return {Object} The reponse from PATCH (...)/api/rooms/enter
 */
const removeRoomUser = (guestId, roomCode) => {
    return axios.patch(process.env.REACT_APP_API_URL + "/api/rooms/leave", {roomCode: roomCode, guestId: guestId})
        .then((res) => {
            return res.data;
        })
        .catch(err => {
            // console.log("Failed (6): " + err);
        });
}

/**
 * This function provides a time-unique serial code made up of only lowercase, alphanumeric characters. It is used for creating user IDs.
 * 
 * @return {String} The unique ID
 */
const genUniqueId = () => {
    return "?" + (new Date()).getTime().toString(36);
}

// Exports all of the functions as an object of functions
export default {getUsersResponse, getRoomsResponse, getSession, createRoomSession, addRoomUser, removeRoomUser, genUniqueId};