import axios from 'axios'
import config from '../config'
import store from '../store'

export default {

  request (method, uri, data = null) {
    if (!method) {
      console.error('API function call requires method argument')
      return
    }

    if (!uri) {
      console.error('API function call requires uri argument')
      return
    }

    var url = config.serverURI + uri

    if (store.state.token) {
      axios.defaults.headers.common['Authorization'] = store.state.token
    }

    return axios({ method, url, data })
  }
}
