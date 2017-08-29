<template>
  <div class="activity">

    <div class="panel">
      <div style="text-align: center;margin-bottom: 1em;">
        <h2 style="font-weight: 400;font-size: 20px;">{{teamActivity.title}}</h2> 
      </div>
      <h4>搭车活动说明：</h4> 
      <div class="content light">
        <p style="margin-bottom:1em">1. 本次搭车内的活动在活动有效期: <b>{{teamActivity.begin_date}}</b> 开始到 <b>{{teamActivity.end_date}}</b> 截止 (均包含当天)</p>
        <p style="margin-bottom:1em">2. 在下列活动中总的已完成投资额满 <b>{{teamActivity.target_account|money(0,'')}}</b></p>
        <p style="margin-bottom:1em">3. 奖励金: 搭车成功 +<b>{{teamActivity.add_rebate}}%</b>奖励，搭车失败 原价</p>
        <p>4. 搭车成功后的奖励金会在活动结束后3个工作日内单独发放到您的余额中</p>
      </div>

      <div style="text-align: center;margin-top:10px;">
      <div style='width:100px;height:100px;margin: 0 auto;'>
        <x-circle :percent="percent" :stroke-width="strokeWidth" :trail-width="trailWidth" stroke-color="#3FC7FA" trail-color="#ececec">
            <span style="color: #3FC7FA">{{percent}}%</span>
          </x-circle>
      </div>
    </div>

    </div>


    <group title="搭车活动">
      <cell :title="cellTitle" v-for="(item, index) in activityList" :key="index" :link="{path:'/middle/Activity/' + item.id}">
      <span slot="title">
        <span slot="icon" :class="item.isFirst === '1' ? 'title-l' : 'title-l-2'">
        <b>{{item.isFirst === '1' ? '首投' : '复投'}}</b>
        </span>
        {{item.name}}
        <span class="join-span">{{item.joins}}人参与</span>
      </span>
      <span slot="inline-desc">
        <span>投资{{ item.bestDeposit|money(0,'') }}元获得<font color="red"><b>{{ item.bestMoney }}</b></font>元</span>
        <span style="padding-left:5px;">年化<font color="red"><b>{{ item.bestInterest }}%</b></font></span>
      </span>
      <div slot="value" :class="item.status === '1' ? 'status' : 'status-2'">
        <b>{{item.status === '1' ? '进行中' : '已暂停'}}</b>
      </div>
      </cell>
    </group>


    <group title="行车记录仪" style="margin-bottom:20px;">
      <cell :title="cellTitle" v-for="(item, index) in orderList" :key="index" :link="{path:'/car/CarOrderList/' + id}">
      <span slot="title">
        <flexbox :gutter="0">
          <flexbox-item><div class="flex-demo">{{item.investor_phone}}</div></flexbox-item>
          <flexbox-item><div class="flex-demo"><b>{{item.deposit|money(0,'¥')}}</b></div></flexbox-item>
          <flexbox-item><div class="flex-demo">{{item.invest_date}}</div></flexbox-item>
        </flexbox>
      </span>
      <div slot="value" :class="item.status === '1' ? 'status' : (item.status === '0' ? 'status-2' : 'status-3')">
        <b>{{item.status_des}}</b>
      </div>
      </cell>
    </group>
        
  </div>
</template>

<script>
import { XCircle, Search, LoadMore, Cell, Group, Badge, Divider, Tab, TabItem, Flexbox, FlexboxItem } from 'vux'
import Scroll from './pulldown'

export default {
  components: {
    XCircle,
    Search,
    LoadMore,
    Cell,
    Group,
    Badge,
    Divider,
    Tab,
    TabItem,
    Flexbox,
    FlexboxItem,
    'v-scroll': Scroll
  },
  data () {
    return {
      id: this.$route.params.id,
      teamActivity: {},
      percent: 0,
      strokeWidth: 15,
      trailWidth: 15,
      activityList: [],
      orderList: [],
      index: 0,
      cellTitle: '',
      loadmore: false,
      loadbottom: false,
      carList: [],
      loadingText: '',
      pageNum: 1, // 当前页面
      pageSize: 30,  // 一次显示多少条
      downdata: []  // 上拉更多的数据存放数组
    }
  },
  created: function () {
    // this.fetchData(this.pageNum, this.pageSize)
    this.$vux.loading.show({
      text: '加载中'
    })
    var params = 'id=' + this.$route.params.id
    this.$http.post(this.domain + '/api/anon/car/getCarDetail', params).then((response) => {
      this.$vux.loading.hide()
      var data = response.data.data
      this.teamActivity = data.teamActivity
      var totalFinish = this.teamActivity.totalFinish
      var targetAccount = this.teamActivity.target_account
      this.percent = totalFinish / targetAccount * 100
      this.activityList = data.activityList
      this.orderList = data.orderList
    })
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'fetchData'
  },
  methods: {
    fetchData: function (pageNum, pageSize) {
      this.loadmore = true
      var params = 'pageNum=' + pageNum + '&pageSize=' + pageSize
      this.$http.post(this.domain + '/api/anon/car/getCarList', params).then((response) => {
        this.carList = response.data.data
        this.loadmore = false
      })
    },
    onRefresh (done) {
      // this.loadingText = ''
      this.loadbottom = false
      this.carList = []
      this.pageNum = 1
      this.fetchData(1, 30)
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
        var grade = this.getGrade(this.index)
        var params = 'pageNum=' + pageNum + '&pageSize=' + this.pageSize + '&grade=' + grade
        this.$http.post(this.domain + '/api/anon/activity/getActivityList', params).then((response) => {
          // this.loadingText = ''
          this.downdata = response.data.data
          this.carList = this.carList.concat(this.downdata)
          if (this.downdata.length === 0) {
            this.loadbottom = true
          }
          this.loadmore = false
          done()
        })
      }
    }
  }
}
</script>

<style scoped>
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
    border-left: 5px solid #FFBE00;
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
.activity .panel .light ul li b{
  border: 1px solid #bdc1c7;
  color: #bdc1c7;
  border-radius: 2em;
  float: left;
  margin-right: 10px;
  margin-top: 10px;
  padding: 2px 15px;
  font-size: 14px;
}

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
.flex-demo {
  text-align: center;
  color: #000;
  font-size: 14px;
  border-radius: 4px;
  background-clip: padding-box;
}
</style>
