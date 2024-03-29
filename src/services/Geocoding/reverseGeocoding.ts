import Constants from "../../data/constants"
import { geocode } from "../../providers"

export const reverseGeocoding = async (lat, long) => {
    const latLongConcat = `${lat},${long}`
    const result = await geocode.get('/reverse', { params: { access_key: Constants.geocoding_access_key, query: latLongConcat } })

    const retrievedAddress = {
        city: result.data.data[0].locality,
        state: result.data.data[0].region_code
    }
    return retrievedAddress
}