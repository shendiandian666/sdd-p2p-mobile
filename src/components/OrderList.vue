<template>
  
  <div class="order-list">
      <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite">
        <div style="margin-bottom: -40px;">
          <group title="日期条件">
            <flexbox :gutter="0">
                <flexbox-item>
                  <datetime v-model="invest_date" @on-change="dateChange" title="投资"></datetime>
                </flexbox-item>
                <flexbox-item>
                  <datetime v-model="received_date" @on-change="dateChange" title="回款"></datetime>
                </flexbox-item>
              </flexbox>
          </group>
          <group title="交单记录">
            <div v-for="(item, index) in filterOrderList" :key="index" class="vux-1px-t">
            <cell :link="{path:'/home/OrderDetail/' + item.id}">
            <span slot="title">{{item.platform_name}}/{{item.plan_name}}/{{item.plan_item}}</span>
            <div slot="default">
              <span :class="item.status === '1' ? 'status' : (item.status === '0' ? 'status-2' : 'status-3')">
                <b>{{item.status_des}}</b>
              </span>
            </div>
            </cell>
            <cell-form-preview :list="item.list"></cell-form-preview>
            </div>
          </group>

      <load-more v-show="loadmore" tip="正在加载"></load-more>
      <load-more v-show="loadbottom" :show-loading="false" tip="我是有底线的" background-color="#fbf9fe"></load-more>
      </div>
    </v-scroll>
  </div>

</template>

<script>
import { LoadMore, Cell, Group, Badge, Divider, Flexbox, FlexboxItem, Datetime, CellFormPreview } from 'vux'
import Scroll from './pulldown'

export default {
  components: {
    LoadMore,
    Cell,
    Group,
    Badge,
    Divider,
    Flexbox,
    FlexboxItem,
    Datetime,
    CellFormPreview,
    'v-scroll': Scroll
  },
  data () {
    return {
      invest_date: '',
      received_date: '',
      value1: '2015-11-12',
      index: 0,
      loadmore: false,
      loadbottom: false,
      orderList: [],
      loadingText: '',
      pageNum: 1, // 当前页面
      pageSize: 10,  // 一次显示多少条
      listdata: [], // 下拉更新数据存放数组
      downdata: []  // 上拉更多的数据存放数组
    }
  },
  created: function () {
    this.$store.commit('updateTitle', '交单记录')
    this.fetchData(this.pageNum, this.pageSize)
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'fetchData'
  },
  methods: {
    dateChange: function () {
      this.loadbottom = false
      this.orderList = []
      this.pageNum = 1
      this.fetchData(1, 10)
    },
    fetchData: function (pageNum, pageSize) {
      var that = this
      this.loadmore = true
      var params = 'pageNum=' + pageNum + '&pageSize=' + pageSize + '&invest_date=' + this.invest_date + '&received_date=' + this.received_date
      this.noLoadPost('/api/auth/order/order_list', params, function (response) {
        that.orderList = response.data
        that.loadmore = false
      })
    },
    onRefresh (done) {
      this.loadbottom = false
      this.orderList = []
      this.pageNum = 1
      this.invest_date = ''
      this.received_date = ''
      this.fetchData(1, 10)
      done()
    },
    onInfinite (done) {
      var that = this
      if (this.loadbottom === true) {
        done()
        return
      } else {
        this.loadmore = true
        this.pageNum++
        let pageNum = this.pageNum
        var params = 'pageNum=' + pageNum + '&pageSize=' + this.pageSize
        this.noLoadPost('/api/auth/order/order_list', params, function (response) {
          that.downdata = response.data
          if (that.downdata.length === 0) {
            that.loadbottom = true
          } else {
            that.orderList = that.orderList.concat(that.downdata)
          }
          that.loadmore = false
          done()
        })
      }
    }
  },
  computed: {
    filterOrderList () {
      var orderList = this.orderList
      var that = this
      return orderList.filter(function (item) {
        item.list = []
        item.list.push({label: '投资人手机', value: item.investor_phone})
        item.list.push({label: '投资日期', value: item.invest_date})
        item.list.push({label: '回款日期', value: item.received_date})
        item.cashBack = that.formatterCurrency(item.cash_back, 2, '￥')
        item.interest_m = that.formatterCurrency(item.interest, 2, '￥')
        item.list.push({label: '返现/利息', value: item.cashBack + '/≈' + item.interest_m})
        return true
      })
    }
  }
}
</script>

<style scoped>
.box1 {
  height: 100px;
  position: relative;
  width: 1490px;
}
.box1-item {
  width: 200px;
  height: 100px;
  background-color: #ccc;
  display:inline-block;
  margin-left: 15px;
  float: left;
  text-align: center;
  line-height: 100px;
}
.box1-item:first-child {
  margin-left: 0;
}
.box2-wrap {
  height: 300px;
  overflow: hidden;
}
.rotate {
  transform: rotate(180deg);
  -webkit-transform: rotate(180deg);
}
.pullup-arrow {
  display: block;
  transition: all linear 0.2s;
  -webkit-transition: all linear 0.2s;
  color: #666;
  font-size: 25px;
}
.join-span {
  font-size: 14px;
  padding-left: 5px;
  color: #666;
}
.flex-demo {
  text-align: center;
  color: #000;
  font-size: 14px;
  border-radius: 4px;
  background-clip: padding-box;
}
.title-l {
  background-color:#00cc66;
  color:#fff;
  border-radius:3px;
  font-size:14px;
  margin-right:5px;
}
.title-l-2 {
  background-color:#ff8c00;
  color:#fff;
  border-radius:3px;
  font-size:14px;
  margin-right:5px;
}
.status {
  text-align: center;
  font-size:14px;
  color: #fff;
  background-color: #09BB07;
  border-radius: 4px;
  padding: 0 4px;
  background-clip: padding-box;
}
.status-2 {
  text-align: center;
  font-size:14px;
  color: #fff;
  background-color: #FFBE00;
  border-radius: 4px;
  padding: 0 4px;
  background-clip: padding-box;
}
.status-3 {
  text-align: center;
  font-size:14px;
  color: #fff;
  background-color: #F76260;
  border-radius: 4px;
  padding: 0 4px;
  background-clip: padding-box;
}
</style>
