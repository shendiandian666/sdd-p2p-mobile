<template>
  <div class="activity" style="padding-bottom: 20px;">
    <div class="header">
      <img :src="activity.platform_img"> 
      <span :class="activity.isFirstCss"><b>{{ activity.isFirst }}</b></span> 
      <div class="risk">
      <b>{{ activity.risk }}</b> <span>{{ activity.riskDisplay }}</span>
      </div>
    </div>

	<group title="选择的方案">
      <cell>
      <span slot="title">{{ plan.name }} / {{ plan.item }}</span>
      </cell>
      <cell-form-preview :list="plan.list"></cell-form-preview>
    </group>

    <div style="margin: 20px 10px;">
      <x-button type="warn" v-show="activity.mobileUrl !== ''" action-type="button" @click.native="openPlatform(activity.mobileUrl)">打开投资平台</x-button>
      <x-button type="warn" v-show="activity.mobileUrl === ''" action-type="button" disabled>此活动为电脑端活动,请使用电脑参与</x-button>
    </div>
    
    <group title="投资完成后交单">
      <x-input title="实投金额" keyboard="number" placeholder="填写数字,例如:10000" v-model="deposit" ref="deposit" required></x-input>
      <selector title="投资人" :options="investorList" @on-change="onChange" ref="investor" required></selector>
      <datetime v-model="TODAY" @on-change="dateChange" title="投资日期" ref="date" required></datetime>
    </group>

    <div style="margin: 20px 10px;">
    <x-button type="primary" action-type="button" @click.native="postOrder">交单</x-button>
    </div>
  </div>
</template>

<script>
import { XButton, Selector, XInput, CellFormPreview, Group, Cell, Datetime } from 'vux'

export default {
  components: {
    XButton,
    Selector,
    XInput,
    CellFormPreview,
    Group,
    Cell,
    Datetime
  },
  data () {
    return {
      activity: {},
      plan: {},
      TODAY: '2017-01-01',
      investorList: [],
      deposit: '',
      investorId: ''
    }
  },
  created () {
    var that = this
    let now = new Date()
    let cmonth = now.getMonth() + 1
    let day = now.getDate()
    if (cmonth < 10) cmonth = '0' + cmonth
    if (day < 10) day = '0' + day
    this.$data.TODAY = now.getFullYear() + '-' + cmonth + '-' + day
    var params = 'planId=' + this.$route.params.planId
    this.post('/api/auth/activity/join', params, function (response) {
      var data = response.data
      that.activity = data.activity
      that.activity.isFirstCss = that.activity.isFirst === '1' ? 'title-l' : 'title-l-2'
      that.activity.isFirst = that.activity.isFirst === '1' ? '首投' : '复投'
      that.plan = data.plan
      that.plan.list = []
      // that.plan.depositDisplay_s = that.formatterCurrency(that.plan.depositDisplay_s, 0, '')
      // that.plan.depositDisplay_e = (that.plan.depositDisplay_e !== 0 ? (that.plan.depositDisplay_e === 1 ? '无上限' : that.formatterCurrency(that.plan.depositDisplay_e, 0, '')) : '')
      that.plan.list.push({label: '投资金额', value: that.plan.depositDisplay_txt})
      that.plan.rebate = that.formatterCurrency(that.plan.rebate, 2, '')
      that.plan.list.push({label: '马上多返利', value: that.plan.rebate + '%'})
      that.plan.totalIncome = that.formatterCurrency(that.plan.totalIncome, 2, '')
      that.plan.rate = that.formatterCurrency(that.plan.rate, 2, '')
      that.plan.list.push({label: '年化利率', value: that.plan.rate + '%'})
      that.plan.redback = that.formatterCurrency(that.plan.redback, 2, '')
      that.plan.list.push({label: '红包', value: that.plan.redback})
      that.plan.list.push({label: '总收益', value: '≈ ' + that.plan.totalIncome_txt})
      that.plan.yearRate = that.formatterCurrency(that.plan.year_rate, 2, '') + '%'
      that.plan.list.push({label: '综合年化', value: '≈ ' + that.plan.yearRate})
      for (var i = 0; i < data.investorList.length; i++) {
        var investor = data.investorList[i]
        that.investorList.push({key: investor.id, value: investor.name})
      }
    })
  },
  methods: {
    onChange (val) {
      this.investorId = val
    },
    dateChange (val) {
      this.TODAY = val
    },
    openPlatform (url) {
      window.open(url, '_blank')
    },
    postOrder () {
      // 没有投资人跳转到添加页面
      if (this.investorList.length === 0) {
        this.$router.push('/home/investorList')
        return
      }
      if (!this.$refs.deposit.valid) {
        this.$vux.toast.text('请输入实投金额!', 'middle')
        return
      }
      if (!this.investorId) {
        this.$vux.toast.text('请选择投资人!', 'middle')
        return
      }
      if (!this.$refs.date.valid) {
        this.$vux.toast.text('请选择投资日期!', 'middle')
        return
      }
      var that = this
      var params = 'investorId=' + this.investorId + '&planId=' + this.$route.params.planId + '&deposit=' + this.deposit + '&date=' + this.TODAY
      this.post('/api/auth/order/add_order', params, function (response) {
        var _hmt = _hmt || []
        var hm = document.createElement('script')
        hm.src = 'https://hm.baidu.com/hm.js?38936dfe3f9ea9ac38ef830e808f7321'
        var s = document.getElementsByTagName('script')[0]
        s.parentNode.insertBefore(hm, s)
        _hmt.push(['_trackEvent', '交单', 'PostOrder', '-'])
        that.$router.push('/middle/Msg')
      })
    }
  }
}
</script>

<style scoped lang="less">
@import '~vux/src/styles/1px.less';

.activity .header {
  background-color: #fff;
  padding: 10px;
  height: 35px;
}

.activity .header img {
  line-height: 100%;
  float: left;
  height: 40px;
  width: 100px;
}

.activity .header .first, .activity .header .repetition {
	background-color: #56ce8b;
    color: #fff;
    border-radius: 3px;
    font-size: 13px;
    padding: 2px 5px;
    margin-top: 5px;
    margin-left: 10px;
    display: block;
    float: left;
}

.activity .header .repetition {
  background-color: #ffa975;
}

.activity .header .risk {
	border-radius: 2em;
    border: 1px solid #FFBE00;
    float: right;
    font-size: 13px;
    margin-top: 5px;
    color: #fff;
}

.activity .header .risk>b {
	background-color: #FFBE00;
    display: block;
    float: left;
    border-radius: 2em;
    padding: 2px 10px;
}

.activity .header .risk>span {
	padding-left: 5px;
    padding-right: 10px;
    padding-top: 2px;
    display: block;
    float: left;
    color: #000;
}

.activity .panel {
	background-color: #fff;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    padding: 15px;
    padding-left: 5px;
    margin-bottom: 20px;
}
.activity .panel>h4 {
	font-weight: 400;
    border-left: 5px solid #f2d651;
    padding-left: 7px;
    margin-left: 3px;
    line-height: 100%;
    margin-bottom: 10px;
}
.activity .panel .content {
	margin-left: 15px;
    word-wrap: break-word;
    overflow: hidden;
}
.activity .panel .light b {
	color: red;
}
.activity .panel .light ul {
	list-style: none;
}
.activity .panel .light ul li {
	border: 1px solid #fa882e;
    color: #fa882e;
    border-radius: 2em;
    float: left;
    margin-right: 10px;
    margin-top: 10px;
    padding: 2px 15px;
    font-size: 14px;
}
.activity .open-platform {
  margin: 20px 10px;
  display: block;
  text-align: center;
  padding: 8px;
  border: 1px solid #179ee0;
  background-color: #10aeff;
  color: #fff;
  border-radius: 5px;
  font-size: 14px;
}
.title-l {
  background-color:#09BB07;
  color:#fff;
  border-radius:3px;
  font-size:14px;
  margin-right:5px;
}
.title-l-2 {
  background-color:#FFBE00;
  color:#fff;
  border-radius:3px;
  font-size:14px;
  margin-right:5px;
}
</style>
