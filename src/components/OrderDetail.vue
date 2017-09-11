<template>
  <div>
    <x-button style="margin-bottom:20px;" v-show="OrderDetail.status === '1'" type="primary" action-type="button">{{OrderDetail.status_des}}</x-button>
    <x-button style="margin-top:0px;" v-show="OrderDetail.status !== '1'" type="default" action-type="button">{{OrderDetail.status_des}}</x-button>
    <divider>下单方案</divider>
    <group :title="OrderDetail.post_date" style="margin-bottom:20px;">
      <cell title="平台名称" :value="OrderDetail.platform_name"></cell>
      <cell title="方案名称" :value="OrderDetail.plan_name"></cell>
      <cell title="投资项目" :value="OrderDetail.plan_item"></cell>
      <cell title="投资金额" :value="OrderDetail.deposit_range"></cell>
      <cell title="投资周期" :value="OrderDetail.days+'天'"></cell>
      <cell title="返现比例" :value="OrderDetail.rebate+'%'"></cell>
    </group>
    <divider>交单信息</divider>
    <group :title="OrderDetail.post_date" style="margin-bottom:20px;">
      <cell title="投资日期" :value="OrderDetail.invest_date"></cell>
      <cell title="投资人" :value="OrderDetail.investor_phone + ' ' + OrderDetail.investor_name"></cell>
      <cell title="实投金额" :value="OrderDetail.deposit"></cell>
      <cell title="返现金额" :value="OrderDetail.cash_back"></cell>
      <cell title="平台利息" :value="'≈ ' + OrderDetail.interest"></cell>
    </group>
    <divider>处理状态</divider>
    <group :title="OrderDetail.update_date" style="margin-bottom:20px;">
      <cell title="状态" :value="OrderDetail.status_des"></cell>
      <cell title="金额" :value="OrderDetail.cash_back"></cell>
      <cell :title="OrderDetail.remark"></cell>
    </group>
  </div>
</template>

<script>
import { Msg, Divider, XButton, Group, CellFormPreview, Cell } from 'vux'

export default {
  components: {
    Msg,
    Divider,
    XButton,
    Group,
    CellFormPreview,
    Cell
  },
  created: function () {
    this.$store.commit('updateTitle', '交单详情')
    var $this = this
    var params = 'id=' + this.$route.params.id
    this.post('/api/auth/order/order_detail', params, function (response) {
      var data = response.data
      $this.OrderDetail = data
      $this.OrderDetail.deposit = $this.formatterCurrency($this.OrderDetail.deposit, 2, '￥')
      $this.OrderDetail.cash_back = $this.formatterCurrency($this.OrderDetail.cash_back, 2, '￥')
      $this.OrderDetail.interest = $this.formatterCurrency($this.OrderDetail.interest, 2, '￥')
      $this.OrderDetail.post_date = $this.OrderDetail.post_date.substr(0, 19)
      $this.OrderDetail.update_date = $this.OrderDetail.update_date.substr(0, 19)
    })
  },
  data () {
    return {
      OrderDetail: {}
    }
  }
}
</script>
