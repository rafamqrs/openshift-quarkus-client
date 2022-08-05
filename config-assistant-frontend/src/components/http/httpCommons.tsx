import axios from "axios";
export default axios.create({
  baseURL: process.env.REACT_APP_API_KEY + "/manifest/route/",
  headers: {
    "Content-type": "application/json"
  }
});