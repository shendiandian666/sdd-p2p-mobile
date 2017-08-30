// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import { sync } from 'vuex-router-sync'
import VueCordova from 'vue-cordova'

Vue.use(VueRouter)
import App from './App'
import Vuex from 'vuex'
Vue.use(Vuex)
Vue.use(VueCordova)

require('es6-promise').polyfill()

const store = new Vuex.Store({})

store.registerModule('vux', { // 名字自己定义
  state: {
    isLoading: false,
    reqLoading: false,
    path: '/',
    userInfo: {
      username: null,
      balance: 0,
      rebate: 0,
      rebate_late: 0,
      nick_name: null,
      mail: null,
      alipay_account: null,
      qq: null
    }
  },
  mutations: {
    updateUserInfo (state, newUserInfo) {
      // alert(JSON.stringify(newUserInfo))
      state.userInfo = newUserInfo
    },
    updateNickName (state, nickName) {
      // alert(JSON.stringify(newUserInfo))
      state.userInfo.nick_name = nickName
    },
    updateQQ (state, qq) {
      // alert(JSON.stringify(newUserInfo))
      state.userInfo.qq = qq
    },
    updateMail (state, mail) {
      // alert(JSON.stringify(newUserInfo))
      state.userInfo.mail = mail
    },
    updateAlipay (state, account) {
      // alert(JSON.stringify(newUserInfo))
      state.userInfo.alipay_account = account
    },
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    },
    updateReqLoading (state, payload) {
      state.reqLoading = payload.reqLoading
    },
    updateTabItem (state, index) {
      state.tabItem = index
    },
    updatePath (state, path) {
      state.path = path
    }
  }
})

import { AjaxPlugin, LoadingPlugin, ToastPlugin } from 'vux'
Vue.use(AjaxPlugin)
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)

const FastClick = require('fastclick')
FastClick.attach(document.body)

const routes = [{
  path: '/',
  component: function (resolve) {
    require(['./components/HotList.vue'], resolve)
  }
},
{
  path: '/middle/ActivityList',
  component: function (resolve) {
    require(['./components/ActivityList.vue'], resolve)
  }
},
{
  path: '/middle/Activity/:activity_id',
  component: function (resolve) {
    require(['./components/Activity.vue'], resolve)
  }
},
{
  path: '/middle/ActivityJoin/:planId',
  component: function (resolve) {
    require(['./components/ActivityJoin.vue'], resolve)
  },
  meta: { requiresAuth: true }
},
{
  path: '/middle/Msg',
  component: function (resolve) {
    require(['./components/Msg.vue'], resolve)
  },
  meta: { requiresAuth: true }
},
{
  path: '/car/CarList',
  component: function (resolve) {
    require(['./components/CarList.vue'], resolve)
  },
  meta: { requiresAuth: false }
},
{
  path: '/car/CarDetail/:id',
  component: function (resolve) {
    require(['./components/CarDetail.vue'], resolve)
  },
  meta: { requiresAuth: false }
},
{
  path: '/car/CarOrderList/:id',
  component: function (resolve) {
    require(['./components/CarOrderList.vue'], resolve)
  },
  meta: { requiresAuth: false }
},
{
  path: '/home/Login',
  component: function (resolve) {
    require(['./components/Login.vue'], resolve)
  },
  meta: { requiresAuth: false }
},
{
  path: '/home/ForgetPasswd',
  component: function (resolve) {
    require(['./components/ForgetPasswd.vue'], resolve)
  },
  meta: { requiresAuth: false }
},
{
  path: '/home/Register',
  component: function (resolve) {
    require(['./components/Register.vue'], resolve)
  }
},
{
  path: '/home/RegisterPasswd/:mobile/:vrifyCode',
  component: function (resolve) {
    require(['./components/RegisterPasswd.vue'], resolve)
  }
},
{
  path: '/home/UserHome',
  component: function (resolve) {
    require(['./components/UserHome.vue'], resolve)
  },
  meta: { requiresAuth: true }
},
{
  path: '/home/Setting',
  component: function (resolve) {
    require(['./components/Setting.vue'], resolve)
  },
  meta: { requiresAuth: true }
},
{
  path: '/home/UpdateNickName/:value',
  component: function (resolve) {
    require(['./components/UpdateNickName.vue'], resolve)
  },
  meta: { requiresAuth: true }
},
{
  path: '/home/UpdateQQ',
  component: function (resolve) {
    require(['./components/UpdateQQ.vue'], resolve)
  },
  meta: { requiresAuth: true }
},
{
  path: '/home/UpdateQQ/:value',
  component: function (resolve) {
    require(['./components/UpdateQQ.vue'], resolve)
  },
  meta: { requiresAuth: true }
},
{
  path: '/home/UpdateMail',
  component: function (resolve) {
    require(['./components/UpdateMail.vue'], resolve)
  },
  meta: { requiresAuth: true }
},
{
  path: '/home/UpdateMail/:value',
  component: function (resolve) {
    require(['./components/UpdateMail.vue'], resolve)
  },
  meta: { requiresAuth: true }
},
{
  path: '/home/StepAlipayOne',
  component: function (resolve) {
    require(['./components/StepAlipayOne.vue'], resolve)
  },
  meta: { requiresAuth: true }
},
{
  path: '/home/StepAlipayTwo/:mobile_code',
  component: function (resolve) {
    require(['./components/StepAlipayTwo.vue'], resolve)
  },
  meta: { requiresAuth: true }
},
{
  path: '/home/UpdatePasswd',
  component: function (resolve) {
    require(['./components/UpdatePasswd.vue'], resolve)
  },
  meta: { requiresAuth: true }
},
{
  path: '/home/investorList',
  component: function (resolve) {
    require(['./components/investorList.vue'], resolve)
  },
  meta: { requiresAuth: true }
},
{
  path: '/home/WithDraw',
  component: function (resolve) {
    require(['./components/WithDraw.vue'], resolve)
  },
  meta: { requiresAuth: true }
},
{
  path: '/home/WithdrawMsg',
  component: function (resolve) {
    require(['./components/WithdrawMsg.vue'], resolve)
  },
  meta: { requiresAuth: true }
},
{
  path: '/home/OrderList',
  component: function (resolve) {
    require(['./components/OrderList.vue'], resolve)
  },
  meta: { requiresAuth: true }
},
{
  path: '/home/OrderDetail/:id',
  component: function (resolve) {
    require(['./components/OrderDetail.vue'], resolve)
  },
  meta: { requiresAuth: true }
}]

const router = new VueRouter({
  routes
})

sync(store, router)

// 设置cookie,增加到vue实例方便全局调用
// vue全局调用的理由是，有些组件所用到的接口可能需要session验证，session从cookie获取
// 当然，如果session保存到vuex的话除外, expires为分钟
Vue.prototype.setCookie = (key, value, expires) => {
  var exdate = new Date()
  exdate.setTime(exdate.getTime() + (expires * 60 * 1000))
  document.cookie = key + '=' + escape(value) + ((expires == null) ? '' : ';expires=' + exdate.toGMTString())
}

// 获取cookie、
function getCookie (key) {
  var arr = document.cookie.match(new RegExp('(^| )' + key + '=([^;]*)(;|$)'))
  if (arr != null) {
    return unescape(arr[2])
  } else {
    return null
  }
}
Vue.prototype.getCookie = getCookie

// 删除cookie
Vue.prototype.delCookie = (key) => {
  var exp = new Date()
  exp.setTime(exp.getTime() - 1)
  var cval = getCookie(key)
  if (cval != null) {
    document.cookie = key + '=' + cval + ';expires=' + exp.toGMTString()
  }
}

function checkLogin () {
  var token = localStorage.getItem('msd.com.token')
  if (token === null) {
    return false
  } else {
    return true
  }
}
Vue.prototype.checkLogin = checkLogin

function post (url, params, callback) {
  store.commit('updateReqLoading', {reqLoading: true})
  // 添加token参数
  var postParams
  if (params === '') {
    postParams = 'token=' + localStorage.getItem('msd.com.token')
  } else {
    postParams = params + '&token=' + localStorage.getItem('msd.com.token')
  }
  this.$http.post(this.domain + url, postParams).then((response) => {
    var data = response.data
    if (data.status === '-1') {
      // 验证不通过,重新获取token
      var username = localStorage.getItem('msd.username')
      var password = localStorage.getItem('msd.password')
      if (username !== null && password !== null) {
        var postParams = 'username=' + username + '&password=' + password
        this.$http.post(this.domain + '/login', postParams).then((response) => {
          var data = response.data
          if (data.status !== '200') {
            store.commit('updateReqLoading', {reqLoading: false})
            localStorage.removeItem('msd.com.token')
            router.push('/home/Login')
          } else {
            var token = data.data
            localStorage.setItem('msd.com.token', token)
            // 重新请求一次
            var postParams = params + '&token=' + token
            this.$http.post(this.domain + url, postParams).then((response) => {
              var data = response.data
              if (data.status === '-1') {
                localStorage.removeItem('msd.com.token')
                router.push('/home/Login')
              } else {
                store.commit('updateReqLoading', {reqLoading: false})
                callback(data)
              }
            }).catch((response) => {
              store.commit('updateReqLoading', {reqLoading: false})
              localStorage.removeItem('msd.com.token')
              // 系统异常
              router.push('/home/Login')
            })
          }
        }).catch((response) => {
          store.commit('updateReqLoading', {reqLoading: false})
          localStorage.removeItem('msd.com.token')
          router.push('/home/Login')
        })
      } else {
        store.commit('updateReqLoading', {reqLoading: false})
        localStorage.removeItem('msd.com.token')
        router.push('/home/Login')
      }
    } else {
      store.commit('updateReqLoading', {reqLoading: false})
      callback(data)
    }
  }).catch((response) => {
    store.commit('updateReqLoading', {reqLoading: false})
    // localStorage.removeItem('msd.com.token')
    // 系统异常
    // router.push('/home/Login')
    // alert(JSON.stringify(response))
    this.$vux.toast.text('系统异常!', 'middle')
  })
}
Vue.prototype.post = post

function noLoadPost (url, params, callback) {
  // 添加token参数
  var postParams
  if (params === '') {
    postParams = 'token=' + localStorage.getItem('msd.com.token')
  } else {
    postParams = params + '&token=' + localStorage.getItem('msd.com.token')
  }
  this.$http.post(this.domain + url, postParams).then((response) => {
    var data = response.data
    if (data.status === '-1') {
      // 验证不通过,重新获取token
      var username = localStorage.getItem('msd.username')
      var password = localStorage.getItem('msd.password')
      if (username !== null && password !== null) {
        var postParams = 'username=' + username + '&password=' + password
        this.$http.post(this.domain + '/login', postParams).then((response) => {
          var data = response.data
          if (data.status !== '200') {
            localStorage.removeItem('msd.com.token')
            router.push('/home/Login')
          } else {
            var token = data.data
            localStorage.setItem('msd.com.token', token)
            // 重新请求一次
            var postParams = params + '&token=' + token
            this.$http.post(this.domain + url, postParams).then((response) => {
              var data = response.data
              if (data.status === '-1') {
                localStorage.removeItem('msd.com.token')
                router.push('/home/Login')
              } else {
                callback(data)
              }
            }).catch((response) => {
              localStorage.removeItem('msd.com.token')
              // 系统异常
              router.push('/home/Login')
            })
          }
        }).catch((response) => {
          localStorage.removeItem('msd.com.token')
          router.push('/home/Login')
        })
      } else {
        localStorage.removeItem('msd.com.token')
        router.push('/home/Login')
      }
    } else {
      callback(data)
    }
  }).catch((response) => {
    localStorage.removeItem('msd.com.token')
    // 系统异常
    router.push('/home/Login')
  })
}
Vue.prototype.noLoadPost = noLoadPost

function getUserInfo () {
  // 获取登录用户信息
  this.post('/api/auth/account/getUserInfo', '', function (response) {
    if (response.status !== '200') {
      this.delCookie('msd.com.token')
      router.push('/home/Login')
    } else {
      var user = response.data
      var userInfo = {
        username: user.account,
        balance: user.balance,
        rebate: user.rebate,
        rebate_late: user.rebate_late,
        nick_name: user.nick_name,
        mail: user.mail,
        alipay_account: user.alipay_account,
        qq: user.qq
      }
      // 提交mutation到Store
      store.commit('updateUserInfo', userInfo)
    }
  })
}
Vue.prototype.getUserInfo = getUserInfo

function getShowPhone (phone) {
  if (phone === null) {
    return
  }
  var arr = phone.split('')
  arr.splice(3, 4, '****')
  return arr.join('')
}
Vue.prototype.getShowPhone = getShowPhone

function formatterCurrency (number, places, symbol) {
  number = number || 0
  places = !isNaN(places = Math.abs(places)) ? places : 2
  symbol = symbol !== undefined ? symbol : '$'
  var negative = number < 0 ? '-' : ''
  var i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + ''
  var j = (j = i.length) > 3 ? j % 3 : 0
  return symbol + negative + (j ? i.substr(0, j) + ',' : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + ',') + (places ? '.' + Math.abs(number - i).toFixed(places).slice(2) : '')
}
Vue.prototype.formatterCurrency = formatterCurrency

Vue.prototype.domain = 'http://m.msdfanli.com'

Vue.filter('money', function (number, places, symbol) {
  number = number || 0
  places = !isNaN(places = Math.abs(places)) ? places : 2
  symbol = symbol !== undefined ? symbol : '$'
  var negative = number < 0 ? '-' : ''
  var i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + ''
  var j = (j = i.length) > 3 ? j % 3 : 0
  return symbol + negative + (j ? i.substr(0, j) + ',' : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + ',') + (places ? '.' + Math.abs(number - i).toFixed(places).slice(2) : '')
})

router.beforeEach(function (to, from, next) {
  if (to.fullPath !== '/' && to.fullPath !== '/middle/ActivityList') {
    store.commit('updateLoadingStatus', {isLoading: true})
  }
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!checkLogin()) {
      // localStorage.removeItem('tabItem')
      store.commit('updatePath', to)
      store.commit('updateLoadingStatus', {isLoading: false})
      next({
        path: '/home/Login'
        // query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    if (to.fullPath === '/home/Login') {
      if (checkLogin()) {
        store.commit('updateLoadingStatus', {isLoading: false})
        next({
          path: '/home/UserHome'
        })
      } else {
        next()
      }
    } else {
      next() // 确保一定要调用 next()
    }
  }
})

router.afterEach(function (to) {
  store.commit('updateLoadingStatus', {isLoading: false})
  // 加入百度统计
  var _hmt = _hmt || []
  var hm = document.createElement('script')
  hm.src = 'https://hm.baidu.com/hm.js?38936dfe3f9ea9ac38ef830e808f7321'
  var s = document.getElementsByTagName('script')[0]
  s.parentNode.insertBefore(hm, s)
  _hmt.push(['_trackPageview', to.fullPath])
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  store,
  router,
  render: h => h(App),
  created () {
    // alert(checkLogin())
  }
}).$mount('#app-box')
