
<template>

<div>
	<form>
		<div>
			<group title="">
		      <x-input title="手机号码" v-model="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile" ref="mobile" required></x-input>
		      <x-input title="验证码" class="weui-cell_vcode" v-model="vrifyCode" ref="vrifyCode" required>
		        <span slot="right" @click="changeCode">
              <img slot="right" class="weui-vcode-img" :src="imgcode"/>
            </span>
          </x-input>
		    </group>
		    <div style="margin: 20px 10px;">
		      <x-button type="primary" action-type="button" @click.native="next">下一步</x-button>
		    </div>
		</div>
	</form>
</div>

</template>

<script>
import { XInput, Group, XButton, Cell, XSwitch } from 'vux'

export default {
  components: {
    XInput,
    XButton,
    Group,
    Cell,
    XSwitch
  },
  data () {
    return {
      mobile: '',
      vrifyCode: '',
      imgcode: this.domain + '/defaultKaptcha'
    }
  },
  created () {
    this.$store.commit('updateTitle', '注册')
  },
  methods: {
    changeCode () {
      this.imgcode = this.domain + '/defaultKaptcha?' + Math.random()
      var _hmt = _hmt || []
      var hm = document.createElement('script')
      hm.src = 'https://hm.baidu.com/hm.js?38936dfe3f9ea9ac38ef830e808f7321'
      var s = document.getElementsByTagName('script')[0]
      s.parentNode.insertBefore(hm, s)
      _hmt.push(['_trackEvent', '验证码', 'Kaptcha', '-'])
    },
    next () {
      if (!this.$refs.mobile.valid) {
        this.$vux.toast.text('请输入正确的手机号!', 'middle')
        return
      }
      if (!this.$refs.vrifyCode.valid) {
        this.$vux.toast.text('请输入验证码!', 'middle')
        return
      }
      this.$vux.loading.show({
        text: '验证中'
      })
      var params = 'mobile=' + this.mobile + '&vrifyCode=' + this.vrifyCode
      this.$http.post(this.domain + '/register_send_code', params).then((response) => {
        this.$vux.loading.hide()
        var data = response.data
        var _hmt = _hmt || []
        var hm = document.createElement('script')
        hm.src = 'https://hm.baidu.com/hm.js?38936dfe3f9ea9ac38ef830e808f7321'
        var s = document.getElementsByTagName('script')[0]
        s.parentNode.insertBefore(hm, s)
        _hmt.push(['_trackEvent', '用户注册', 'Register', '-'])
        if (data.status !== '200') {
          this.$vux.toast.text(data.message, 'middle')
        } else {
          this.$router.push('/home/RegisterPasswd/' + this.mobile + '/' + this.vrifyCode)
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
