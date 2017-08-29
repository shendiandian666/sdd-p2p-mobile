<template>
  <div>
    <div style="margin: 20px 10px;">
      <step v-model="step2" background-color='#fbf9fe' gutter="20px">
        <step-item title="验证"></step-item>
        <step-item title="修改"></step-item>
        <step-item title="完成"></step-item>
      </step>
    </div>
    <div>
      <group title="">
      <x-input title="手机号码" label-width="6" v-model="showMobile" disabled></x-input>
        <x-input title="手机验证码" label-width="6" v-model="mobile_code" keyboard="number" ref="mobile_code" required>
          <x-button mini type="primary" action-type="button" slot="right" @click.native="send">发送验证码</x-button>
            </x-input>
      </group>
      <div style="margin: 20px 10px;">
        <x-button type="primary" action-type="button" @click.native="next">下一步</x-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Step, StepItem, XButton, XInput, Group, Cell } from 'vux'

export default {
  components: {
    Step,
    StepItem,
    XButton,
    XInput,
    Group,
    Cell
  },
  data () {
    return {
      step2: 0,
      mobile_code: ''
    }
  },
  computed: {
    mobile: {
      get: function () {
        return this.$store.state.vux.userInfo.username
      },
      set: function (val) {
        this.$store.state.vux.userInfo.username = val
      }
    },
    showMobile: {
      get: function () {
        return this.getShowPhone(this.$store.state.vux.userInfo.username)
      },
      set: function (val) {
        // this.$store.state.vux.userInfo.username = val
      }
    }
  },
  methods: {
    send () {
      var that = this
      var params = 'mobile=' + this.mobile
      this.post('/api/auth/sms/send_alipay_code', params, function (response) {
        var data = response
        var _hmt = _hmt || []
        var hm = document.createElement('script')
        hm.src = 'https://hm.baidu.com/hm.js?38936dfe3f9ea9ac38ef830e808f7321'
        var s = document.getElementsByTagName('script')[0]
        s.parentNode.insertBefore(hm, s)
        _hmt.push(['_trackEvent', '提现账号短信', 'UpdateAlipayMsg', '-'])
        if (data.status === '200') {
          that.$vux.toast.text('验证码已发送!', 'middle')
        } else {
          that.$vux.toast.text(data.message, 'middle')
        }
      })
    },
    next () {
      if (!this.$refs.mobile_code.valid) {
        this.$vux.toast.text('请输入验证码!', 'middle')
        return
      }
      var that = this
      var params = 'mobile=' + this.mobile + '&mobile_code=' + this.mobile_code
      this.post('/api/auth/sms/encrypt_code_valid', params, function (response) {
        var data = response
        if (data.status === '200') {
          that.$router.push('/home/StepAlipayTwo/' + that.mobile_code)
        } else {
          that.$vux.toast.text(data.message, 'middle')
        }
      })
    }
  }
}
</script>

<style lang="less">

</style>
