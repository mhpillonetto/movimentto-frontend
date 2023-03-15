import axios from "axios";
import Constants from '../data/constants'

const serviceURI = Constants.serviceURI

export const http_auth = axios.create({
  baseURL: serviceURI,
  headers: {
    "Content-type": "application/json"
  }
});

export const http = axios.create({
  baseURL: serviceURI,
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("jwt")}`
  }
})