<template>
<div>
	
     <card :header="{title:'我的钱包'}">
      <div slot="content" class="card-demo-flex card-demo-content01">
        <div class="vux-1px-l vux-1px-r">
          <span><b>{{balance}}</b></span>
          <br/>
          可提现
        </div>
        <div class="vux-1px-r">
          <span><b>{{rebate_late}}</b></span>
          <br/>
          待返现
        </div>
        <div>
          <span><b>{{rebate}}</b></span>
          <br/>
          已提现
        </div>
      </div>
    </card>

    <div class="panel">
      <h4>温馨提示：</h4> 
      <div class="content light">
        <ol class="num_ol">
          <li>推荐使用支付宝邮箱账号</li>
          <li>提现免手续费，秒到账，最低提现1元</li>
          <li>请再三核对您的支付宝收款账号，一经转出无法找回</li>
          <li>如果您无法收到验证码请与客服联系或稍后再试</li>
        </ol>
      </div>
    </div>

    <group title="支付宝提现">
      <x-input title="支付宝账号" disabled label-width="6" v-model="alipay_account" ref="alipay_account" required>
        <x-button mini slot="right" type="primary" action-type="button" @click.native="setting">设置</x-button>
      </x-input>
      <x-input title="提现金额" label-width="6" type="number" v-model="money" ref="money" keyboard="number" required></x-input>
      <x-input title="手机验证码" label-width="6" keyboard="number" v-model="mobile_code" ref="mobile_code" required>
        <x-button mini slot="right" type="primary" action-type="button" @click.native="resendMsg">获取验证码</x-button>
      </x-input>
    </group>
    <div style="margin: 20px 10px;">
    <x-button type="primary" action-type="button" @click.native="update">提现</x-button>
    </div>
</div>
</template>

<script>
import { XInput, Group, XButton, Cell, Card } from 'vux'
import { mapState } from 'vuex'

export default {
  components: {
    XInput,
    XButton,
    Group,
    Cell,
    Card
  },
  data () {
    return {
      money: '',
      mobile_code: ''
    }
  },
  created () {
    this.$store.commit('updateTitle', '提现')
    this.getUserInfo()
  },
  methods: {
    setting () {
      this.$store.commit('updatePath', this.$route.path)
      this.$router.push('/home/StepAlipayOne')
    },
    resendMsg () {
      var that = this
      var params = 'mobile=' + this.mobile
      this.post('/api/auth/sms/send_withdraw_code', params, function (response) {
        var data = response
        var _hmt = _hmt || []
        var hm = document.createElement('script')
        hm.src = 'https://hm.baidu.com/hm.js?38936dfe3f9ea9ac38ef830e808f7321'
        var s = document.getElementsByTagName('script')[0]
        s.parentNode.insertBefore(hm, s)
        _hmt.push(['_trackEvent', '提现短信', 'WithDrawMsg', '-'])
        if (data.status === '200') {
          that.$vux.toast.text('验证码已发送!', 'middle')
        } else {
          that.$vux.toast.text(data.message, 'middle')
        }
      })
    },
    update () {
      if (!this.$refs.alipay_account.valid) {
        this.$router.push('/home/StepAlipayOne')
        return
      }
      if (!this.$refs.money.valid) {
        this.$vux.toast.text('请输入正确金额!', 'middle')
        return
      }
      if (!this.$refs.mobile_code.valid) {
        this.$vux.toast.text('请输入验证码!', 'middle')
        return
      }
      if (this.money < 1) {
        this.$vux.toast.text('金额至少1元起!', 'middle')
        return
      }
      if (parseFloat(this.money) > parseFloat(this.balance)) {
        this.$vux.toast.text('余额不足!', 'middle')
        return
      }
      var that = this
      var params = 'mobile=' + this.mobile + '&mobile_code=' + this.mobile_code + '&alipay_account=' + this.alipay_account + '&money=' + this.money
      this.post('/api/auth/account/withdraw', params, function (response) {
        if (response.status !== '200') {
          that.$vux.toast.text(response.message, 'middle')
        } else {
          var data = response
          var _hmt = _hmt || []
          var hm = document.createElement('script')
          hm.src = 'https://hm.baidu.com/hm.js?38936dfe3f9ea9ac38ef830e808f7321'
          var s = document.getElementsByTagName('script')[0]
          s.parentNode.insertBefore(hm, s)
          _hmt.push(['_trackEvent', '提现', 'WithDraw', '-'])
          if (data.status !== '200') {
            that.$vux.toast.text(data.message, 'middle')
          } else {
            that.$router.push('/home/WithdrawMsg')
          }
        }
      })
    }
  },
  computed: {
    ...mapState({
      mobile: state => state.vux.userInfo.username
    }),
    balance () {
      return this.formatterCurrency(this.$store.state.vux.userInfo.balance, 2, '')
    },
    rebate () {
      return this.formatterCurrency(this.$store.state.vux.userInfo.rebate, 2, '')
    },
    rebate_late () {
      return this.formatterCurrency(this.$store.state.vux.userInfo.rebate_late, 2, '')
    },
    alipay_account: {
      get: function () {
        return this.$store.state.vux.userInfo.alipay_account
      },
      set: function (val) {
        this.$store.state.vux.userInfo.alipay_account = val
      }
    }
  }
}
</script>

<style scoped>
.card-demo-flex {
  display: flex;
}
.card-demo-content01 {
  padding: 10px 0;
}
.card-padding {
  padding: 15px;
}
.card-demo-flex > div {
  flex: 1;
  text-align: center;
  font-size: 12px;
}
.card-demo-flex span {
  color: #f74c31;
}
.panel {
  background-color: #fff;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    padding: 15px;
    padding-left: 5px;
}
.panel>h4 {
  font-weight: 400;
    border-left: 5px solid #f2d651;
    padding-left: 7px;
    margin-left: 3px;
    line-height: 100%;
    margin-bottom: 10px;
}
.panel .content {
  margin-left: 15px;
    word-wrap: break-word;
    overflow: hidden;
}
.panel .light b {
  color: red;
}
.num_ol {
    list-style: decimal;
    padding-left: 1.4em;
}
</style>
