import axios from "axios";
export default axios.create({
  baseURL: "http://localhost:8080/manifest/route/",
  headers: {
    "Content-type": "application/json"
  }
});