import User from '../model/User'
import http from '../providers'
import Constants from '../data/constants'

const serviceURI = Constants.serviceURI

export const createNewUser = (newUser: User) => {
    const { username, password, email, userType } = newUser

    http.post<JSON>(`${serviceURI}/register`, {
        user: username,
        pwd: password,
        email,
        userType
    })
        .then(function (response) {
            console.log(response)
            return response
        })
        .catch(function (error) {
            console.log(error)
            throw new Error(error)
        })
}