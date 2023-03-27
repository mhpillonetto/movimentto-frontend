import Constants from "../../data/constants"
import { geocode } from "../../providers"


export const forwardGeocoding = async (city, state) => {
    const cityStateConcat = `${city},${state},Brazil`
    const result = await geocode.get('/forward', { params: { access_key: Constants.geocoding_access_key, query: cityStateConcat } })

    const retrievedPosition = {
        city: result.data.data[0].latitude,
        state: result.data.data[0].longitude
    }
    return retrievedPosition
}