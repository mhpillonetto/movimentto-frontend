import { http } from '../../providers'

export const getUserByUsername = async (username: string) => {

    const { status, data } = await http.get(`/user`, { headers: { username } })

    if (status !== 200) {
        console.log("status error")
        throw new Error()
    }

    return data
}