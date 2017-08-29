
<template>

<div>
	<div>
		<group title="">
      <x-input title="手机号码" label-width="6" disabled v-model="mobile"></x-input>
      <x-input title="手机验证码" label-width="6" v-model="mobile_code" keyboard="number" ref="mobile_code" required>
        <x-button mini slot="right" type="primary" action-type="button" @click.native="resendMsg">重新发送</x-button>
      </x-input>
      <x-input title="QQ号" label-width="6" v-model="qq" placeholder="方便客服与您联系" keyboard="number"></x-input>
      <x-input title="登录密码" label-width="6" type="password" v-model="password" placeholder="用于账户登录" ref="password" required></x-input>
      <x-switch title="同意《马上多服务协议》" v-model="agree" @on-change="agreeChange"></x-switch>
    </group>
    <div style="margin: 20px 10px;">
    <x-button type="primary" :disabled="registerBtn" action-type="button" @click.native="register">完成注册</x-button>
    </div>
	</div>
</div>

</template>

<script>
import { XInput, Group, XButton, XSwitch } from 'vux'

export default {
  components: {
    XInput,
    XButton,
    Group,
    XSwitch
  },
  data () {
    return {
      agree: false,
      registerBtn: true,
      mobile: this.$route.params.mobile,
      mobile_code: '',
      qq: '',
      password: ''
    }
  },
  created () {
    this.$vux.toast.text('验证码已发送!', 'middle')
  },
  methods: {
    agreeChange (newVal, oldVal) {
      if (newVal) {
        this.registerBtn = false
      } else {
        this.registerBtn = true
      }
    },
    resendMsg () {
      this.$vux.loading.show({
        text: '发送中'
      })
      var params = 'mobile=' + this.mobile
      this.$http.post(this.domain + '/api/anon/sms/resendMsg', params).then((response) => {
        this.$vux.loading.hide()
        var data = response.data
        var _hmt = _hmt || []
        var hm = document.createElement('script')
        hm.src = 'https://hm.baidu.com/hm.js?38936dfe3f9ea9ac38ef830e808f7321'
        var s = document.getElementsByTagName('script')[0]
        s.parentNode.insertBefore(hm, s)
        _hmt.push(['_trackEvent', '注册短信', 'RegisterMsg', '-'])
        if (data.status !== '200') {
          this.$vux.toast.text(data.message, 'middle')
        } else {
          this.$vux.toast.text('验证码已发送!', 'middle')
        }
      }).catch((response) => {
        this.$vux.loading.hide()
        this.$vux.toast.text('系统异常!', 'middle')
      })
    },
    register () {
      if (!this.$refs.mobile_code.valid) {
        this.$vux.toast.text('请输入验证码!', 'middle')
        return
      }
      if (!this.$refs.password.valid) {
        this.$vux.toast.text('请输入密码!', 'middle')
        return
      }
      this.$vux.loading.show({
        text: '注册中'
      })
      var params = 'mobile=' + this.mobile + '&mobile_code=' + this.mobile_code + '&password=' + this.password + '&qq=' + this.qq
      this.$http.post(this.domain + '/register', params).then((response) => {
        this.$vux.loading.hide()
        var data = response.data
        var _hmt = _hmt || []
        var hm = document.createElement('script')
        hm.src = 'https://hm.baidu.com/hm.js?38936dfe3f9ea9ac38ef830e808f7321'
        var s = document.getElementsByTagName('script')[0]
        s.parentNode.insertBefore(hm, s)
        _hmt.push(['_trackEvent', '用户注册', 'RegisterSuccess', '-'])
        if (data.status !== '200') {
          this.$vux.toast.text(data.message, 'middle')
        } else {
          this.$router.push('/home/Login')
        }
      }).catch((response) => {
        this.$vux.loading.hide()
        this.$vux.toast.text('系统异常!', 'middle')
      })
    }
  }
}
</script>

<style scoped>

</style>
