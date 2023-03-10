import User from '../model/User'
import axios from 'axios'

export const createNewUser = (newUser: User) => {
    const { username, password, email, userType } = newUser

    axios.post<JSON>("http://localhost:3500/register", {
        user: username,
        pwd: password,
        email,
        userType
    })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
            throw new Error(error)
        })
}