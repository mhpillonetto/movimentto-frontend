import axios from "axios";
import Constants from '../data/constants'

const serviceURI = Constants.serviceURI

export default axios.create({
  baseURL: serviceURI,
  headers: {
    "Content-type": "application/json"
  }
});
