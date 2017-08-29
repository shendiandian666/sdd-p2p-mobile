<template>
  
  <div class="order-list">
      <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite">
        <div style="margin-bottom: -40px;">
        <group title="行车记录仪">
          <cell v-for="(item, index) in orderList" :key="index">
            <span slot="title">
              <flexbox :gutter="0">
                <flexbox-item><div class="flex-demo">{{item.investor_phone}}</div></flexbox-item>
                <flexbox-item><div class="flex-demo"><b>{{item.deposit|money(0,'¥')}}</b></div></flexbox-item>
                <flexbox-item><div class="flex-demo">{{item.invest_date}}</div></flexbox-item>
              </flexbox>
            </span>
            <div slot="value" :class="item.status === '1' ? 'status' : 'status-2'">
              <b>{{item.status === '1' ? '已完成' : '审核中'}}</b>
            </div>
          </cell>
        </group>
      <load-more v-show="loadmore" tip="正在加载"></load-more>
      <load-more v-show="loadbottom" :show-loading="false" tip="我是有底线的" background-color="#fbf9fe"></load-more>
      </div>
    </v-scroll>
  </div>

</template>

<script>
import { LoadMore, Cell, Group, Badge, Divider, Flexbox, FlexboxItem, Datetime } from 'vux'
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
    'v-scroll': Scroll
  },
  data () {
    return {
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
    this.fetchData(this.pageNum, this.pageSize)
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'fetchData'
  },
  methods: {
    fetchData: function (pageNum, pageSize) {
      this.loadmore = true
      var params = 'pageNum=' + pageNum + '&pageSize=' + pageSize + '&id=' + this.$route.params.id
      this.$http.post(this.domain + '/api/anon/car/getCarOrderList', params).then((response) => {
        this.orderList = response.data.data
        this.loadmore = false
      }).catch((response) => {
        this.$vux.loading.hide()
        this.$vux.toast.text('系统异常!', 'middle')
      })
    },
    onRefresh (done) {
      this.loadbottom = false
      this.orderList = []
      this.pageNum = 1
      this.fetchData(1, 10)
      done()
    },
    onInfinite (done) {
      if (this.loadbottom === true) {
        done()
        return
      } else {
        this.loadmore = true
        this.pageNum++
        let pageNum = this.pageNum
        var params = 'pageNum=' + pageNum + '&pageSize=' + this.pageSize + '&id=' + this.$route.params.id
        this.$http.post(this.domain + '/api/auth/car/getCarOrderList', params).then((response) => {
          this.downdata = response.data.data
          this.orderList = this.orderList.concat(this.downdata)
          if (this.downdata.length === 0) {
            this.loadbottom = true
          }
          this.loadmore = false
          done()
        }).catch((response) => {
          this.$vux.loading.hide()
          this.$vux.toast.text('系统异常!', 'middle')
        })
      }
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
</style>
