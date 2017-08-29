
<template>

<div>
	<form>
		<div>
			<group title="">
		      <x-input title="手机号码" v-model="username" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile" ref="mobile" required></x-input>
		      <x-input title="登录密码" v-model="password" type="password" ref="password" required>
		        <router-link slot="right" to="/home/ForgetPasswd">忘记密码?</router-link>
		      </x-input>
		      <x-switch title="自动登录" v-model="rememeber"></x-switch>
		    </group>

        <toast v-model="showToast" :time="1000" type="text" width="15em">{{message}}</toast>

		    <div style="margin: 20px 10px;">
		    <x-button type="primary" action-type="button" @click.native="login">立即登录</x-button>
		    <x-button type="default" action-type="button" link="/home/Register">注册账号</x-button>
		    </div>
		</div>
	</form>
</div>

</template>

<script>
import { XInput, Group, XButton, Cell, XSwitch, Toast } from 'vux'
import { mapState } from 'vuex'

export default {
  components: {
    XInput,
    XButton,
    Group,
    Cell,
    XSwitch,
    Toast
  },
  data () {
    return {
      username: '',
      password: '',
      rememeber: true,
      userInfo: {
        username: null,
        balance: null,
        nick_name: null,
        mail: null,
        alipay_account: null,
        qq: null
      },
      showToast: false,
      message: ''
    }
  },
  created () {
    if (localStorage.getItem('msd.username') !== null) {
      this.username = localStorage.getItem('msd.username')
    }
    if (localStorage.getItem('msd.password') !== null) {
      this.password = localStorage.getItem('msd.password')
    }
  },
  methods: {
    login () {
      if (!this.$refs.mobile.valid) {
        this.$vux.toast.text('请输入正确的手机号!', 'middle')
        return
      }
      if (!this.$refs.password.valid) {
        this.$vux.toast.text('请输入密码!', 'middle')
        return
      }
      this.$vux.loading.show({
        text: '登录中'
      })
      var params = 'username=' + this.username + '&password=' + this.password
      this.$http.post(this.domain + '/login', params).then((response) => {
        this.$vux.loading.hide()
        var data = response.data
        if (data.status !== '200') {
          this.showToast = true
          this.message = data.message
        } else {
          var token = data.data
          if (this.rememeber === true) {
            localStorage.setItem('msd.username', this.username)
            localStorage.setItem('msd.password', this.password)
          } else {
            localStorage.removeItem('msd.username')
            localStorage.removeItem('msd.password')
          }
          localStorage.setItem('msd.com.token', token)
          if (this.path !== '/') {
            var path = this.path
            this.$store.commit('updatePath', '/')
            this.$router.push(path)
          } else {
            this.$router.push('/home/UserHome')
          }
        }
        var _hmt = _hmt || []
        var hm = document.createElement('script')
        hm.src = 'https://hm.baidu.com/hm.js?38936dfe3f9ea9ac38ef830e808f7321'
        var s = document.getElementsByTagName('script')[0]
        s.parentNode.insertBefore(hm, s)
        _hmt.push(['_trackEvent', '登录', 'Login', this.username])
      }).catch((response) => {
        this.$vux.loading.hide()
        this.$vux.toast.text('系统异常!', 'middle')
      })
    }
  },
  computed: {
    ...mapState({
      path: state => state.vux.path
    })
  }
}
</script>

<style scoped>

</style>
