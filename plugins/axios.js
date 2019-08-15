export default function({ $axios, app, store }) {
  $axios.setHeader('Accept', 'application/json')
  $axios.setHeader('Content-Type', 'application/json')
  $axios.onRequest((config) => {
    if (store.getters['auth/token']) {
      config.headers.common.Authorization = store.getters['auth/token']
    }
  })
}
