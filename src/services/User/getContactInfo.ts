import { http } from '../../providers'

export const getContactInfo = async (username: string) => {
    const { status, data } = await http.get('/user/info', { headers: { username } })

    if (status !== 200) {
        console.log("status error")
        throw new Error()
    }

    return data
}