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
      <form>
        <group title="">
          <x-input title="支付宝账号" label-width="6" v-model="alipay_account" ref="account" required></x-input>
        </group>
        <div style="margin: 20px 10px;">
          <x-button type="primary" action-type="button" @click.native="update">确定</x-button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { Step, StepItem, XButton, XInput, Group, Cell } from 'vux'
import { mapState } from 'vuex'

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
      step2: 1,
      alipay_account: ''
    }
  },
  computed: {
    ...mapState({
      path: state => state.vux.path,
      mobile: state => state.vux.userInfo.username
    })
  },
  methods: {
    update () {
      if (!this.$refs.account.valid) {
        this.$vux.toast.text('请输入支付宝账号!', 'middle')
        return
      }
      var that = this
      var params = 'mobile=' + this.mobile + '&mobile_code=' + this.$route.params.mobile_code + '&alipay_account=' + this.alipay_account
      this.post('/api/auth/account/update_alipay', params, function (response) {
        var data = response
        if (data.status === '200') {
          that.$store.commit('updateAlipay', that.alipay_account)
          if (that.path !== '/') {
            // 跳转到提现页面
            var path = that.path
            that.$store.commit('updatePath', '/')
            that.$router.push(path)
          } else {
            that.$router.push('/home/Setting')
          }
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
