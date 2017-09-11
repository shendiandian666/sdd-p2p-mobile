<template>
<div>
    <group title="重置登录密码">
      <x-input title="手机号码" label-width="6" v-model="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile" ref="mobile" required></x-input>
      <x-input title="验证码" label-width="6" keyboard="number" v-model="mobile_code" ref="mobile_code" required>
        <x-button mini slot="right" type="primary" action-type="button" @click.native="resendMsg">获取验证码</x-button>
      </x-input>
      <x-input title="重置密码" label-width="6" type="password" v-model="password" ref="password" required></x-input>
    </group>
    <div style="margin: 20px 10px;">
    <x-button type="primary" action-type="button" @click.native="update">确定</x-button>
    </div>
</div>
</template>

<script>
import { XInput, Group, XButton, Cell } from 'vux'

export default {
  components: {
    XInput,
    XButton,
    Group,
    Cell
  },
  data () {
    return {
      mobile: '',
      mobile_code: '',
      password: ''
    }
  },
  created () {
    this.$store.commit('updateTitle', '重置密码')
  },
  methods: {
    resendMsg () {
      if (!this.$refs.mobile.valid) {
        this.$vux.toast.text('请输入正确的手机号!', 'middle')
        return
      }
      this.$vux.loading.show({
        text: '发送中'
      })
      var params = 'mobile=' + this.mobile
      this.$http.post(this.domain + '/api/anon/sms/send_forget_passwd', params).then((response) => {
        this.$vux.loading.hide()
        var data = response.data
        if (data.status === '200') {
          this.$vux.toast.text('验证码已发送!', 'middle')
        } else {
          this.$vux.toast.text(data.message, 'middle')
        }
      }).catch((response) => {
        this.$vux.loading.hide()
        this.$vux.toast.text('系统异常!', 'middle')
      })
    },
    update () {
      if (!this.$refs.mobile.valid) {
        this.$vux.toast.text('请输入正确的手机号!', 'middle')
        return
      }
      if (!this.$refs.mobile_code.valid) {
        this.$vux.toast.text('请输入验证码!', 'middle')
        return
      }
      if (!this.$refs.password.valid) {
        this.$vux.toast.text('请输入密码!', 'middle')
        return
      }
      this.$vux.loading.show({
        text: '更新中'
      })
      var params = 'mobile=' + this.mobile + '&mobile_code=' + this.mobile_code + '&password=' + this.password
      this.$http.post(this.domain + '/api/anon/index/forgetPasswd', params).then((response) => {
        this.$vux.loading.hide()
        var data = response.data
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
