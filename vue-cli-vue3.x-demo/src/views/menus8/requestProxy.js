import axios from 'axios'
var request = axios.create({
  baseURL: '/bpi',
  timeout: 60000
})
export default request
