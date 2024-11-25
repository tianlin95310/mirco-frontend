import request from './requestProxy.js'
// import request from './requestCall.js'
const token = '24.348c4ac9b6ece16a7e92d45a083c6ccc.2592000.1690953577.282335-35317198'
/**
 * @param {Object} 查询获取到的图片
 */
export function getImg(data) {
  return request.post(`rpc/2.0/ernievilg/v1/getImg?access_token=${token}`, data, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  })
}

// ERNIE-Bot
export function chartEB(data) {
  return request.post(`rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions?access_token=${token}`, data, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  })
}

// ERNIE-Bot-turbo
export function chartEBT(data) {
  return request.post(`rpc/2.0/ai_custom/v1/wenxinworkshop/chat/eb-instant?access_token=${token}`, data, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  })
}

// BLOOMZ-7B
export function chartB7B(data) {
  return request.post(`rpc/2.0/ai_custom/v1/wenxinworkshop/chat/bloomz_7b1?access_token=${token}`, data, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  })
}
