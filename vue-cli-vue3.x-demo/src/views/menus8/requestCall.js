import axios from 'axios'
var request = axios.create({
  baseURL: 'https://aip.baidubce.com',
  timeout: 60000
})
request.interceptors.response.use(response => {
  console.log('response', response, response.data)
  const config = response.config
  const random = Math.random()
  console.log('random', random)
  if (random < 0.5) {
    return response
  } else {
    console.log('重试一次')
    return request(config)
  }
}, async(error) => {
  console.log('response error', error.message)
  const config = error.config
  function wait() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true)
      }, 10000)
    })
  }
  return wait().then((_) => {
    return request(config)
  })
})
export default request
