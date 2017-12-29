import axios from 'axios'
import store from '../../store'
// import router from '../../router'
import { Message } from 'element-ui'
import querystring from 'querystring'

const commit = store.commit || store.dispatch
const base = '/api/'

axios.defaults.withCredentials = true
axios.defaults.baseURL = ''
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers = {
  'Content-Type': 'application/x-www-form-urlencoded'
}
axios.defaults.transformRequest = [
  function(data) {
    return querystring.stringify(data)
  }
]
axios.defaults.paramsSerializer = function(params) {
  return querystring.stringify(params, {
    arrayFormat: 'brackets'
  })
}

axios.interceptors.request.use(function(config) {
  commit('UPDATE_LOADING', true)
  return config
}, function(error) {
  return Promise.reject(error)
})
axios.interceptors.response.use(function(response) {
  if (response.status === 200) {
    if (!response.data.success) {
      Message({
        title: '警告',
        message: response.data.message,
        type: 'error'
      })
    }
    // if (response.data.code === 401) {
    //   console.log('404')
    //   Alert('登录超时', '登录超时', {
    //     confirmButtonText: '确定',
    //     callback: () => {
    //       router.push(loginUrl)
    //     }
    //   });
    // } else if (response.data.code === 301) {
    //   console.log('301')
    //   if (response.data.url !== null && response.data.url !== '') {
    //     router.push(response.data.url)
    //   }
    // } else if (response.data.code === 302) {
    //   console.log('302', response)
    //   if (response.data.url.indexOf('http://') === 0 || response.data.url.indexOf('http://') === 0) {
    //     window.location.href = response.data.url
    //   } else {
    //     window.location.href = axios.defaults.baseURL + response.data.url
    //   }
    // } else if (response.data.code === 303) { //  api权限
    //   // Message({
    //   //   title: '警告',
    //   //   message: response.data.message,
    //   //   type: 'warning'
    //   // })
    // } else if (response.data.code === 500) {
    //   Message({
    //     title: '警告',
    //     message: response.data.message,
    //     type: 'error'
    //   })
    // }
  }
  // 不显示loading
  commit('UPDATE_LOADING', false)
  return response
}, function(error) {
  // 对响应错误做点什么
  Message({
    title: '警告',
    message: '服务端异常',
    type: 'error'
  })
  commit('UPDATE_LOADING', false)
  return Promise.reject(error)
})

var ajax = {
  get: function(path, params) {
    var config
    if (params === void 0) {
      config = `${base}` + path
    } else {
      // params = trimObject(params)
      config = `${base}` + path + '/' + params
    }
    return axios.get(config).then(res => res.data)
  },
  post: function(path, params, type) {
    if (params === void 0) {
      params = {}
    }
    params = trimObject(params, type)
    return axios.post(`${base}` + path, params).then(res => res.data)
  }
}

function trimObject(data, type) {
  var obj = JSON.parse(JSON.stringify(data));
  for (var k in obj) {
    if (Object.prototype.toString.call(obj[k]).slice(8, -1) === 'String') {
      obj[k] = obj[k].trim()
      if (obj[k] === '' && type === undefined) {
        delete obj[k];
      }
    } else if (Object.prototype.toString.call(obj[k]).slice(8, -1) === 'Object') {
      trimObject(obj[k])
    }
  }
  return obj
}

export default ajax
