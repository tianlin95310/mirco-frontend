export function getListData(params) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([{ key: 'getListData' }])
    }, 2000)
  })
}
