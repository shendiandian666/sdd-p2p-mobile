<template>
  <div class="activity-list">


    <tab :line-width="2" v-model="index" style="position: fixed; top: 46px; width: 100%; z-index: 90;">
      <tab-item :selected="tag === item" v-for="(item, index) in taglist" :key="index" @on-item-click="onItemClick" @click="index = item">{{item}}</tab-item>
    </tab>

    <search style="position: static; margin-top: 45px;" @on-change="getSearch"></search>
      
        <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite" style="posistion:static; top:132px;">
<div style="margin-bottom: -40px;">
        <group title="全部活动">

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
        <load-more v-show="loadmore" tip="正在加载"></load-more>
        <load-more v-show="loadbottom" :show-loading="false" tip="我是有底线的" background-color="#fbf9fe"></load-more>
        </div>
      </v-scroll>
        
  </div>
</template>

<script>
import { Search, LoadMore, Cell, Group, Badge, Divider, Tab, TabItem } from 'vux'
import Scroll from './pulldown'

const imgList = [
  'https://static.vux.li/demo/1.jpg',
  'https://static.vux.li/demo/2.jpg',
  'https://static.vux.li/demo/3.jpg'
]

export default {
  components: {
    Search,
    LoadMore,
    Cell,
    Group,
    Badge,
    Divider,
    Tab,
    TabItem,
    'v-scroll': Scroll
  },
  data () {
    return {
      tag: '全部',
      taglist: ['全部', '保守', '稳健', '进取', '激进', '高返'],
      index: 0,
      cellTitle: '首投 xxx金融',
      demo04_list: imgList,
      loadmore: false,
      loadbottom: false,
      activityList: [],
      loadingText: '',
      pageNum: 1, // 当前页面
      pageSize: 30,  // 一次显示多少条
      listdata: [], // 下拉更新数据存放数组
      downdata: []  // 上拉更多的数据存放数组
    }
  },
  created: function () {
    this.$store.commit('updateTitle', '活动')
    this.fetchData(this.pageNum, this.pageSize)
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'fetchData'
  },
  methods: {
    getGrade (index) {
      var grade = ''
      if (index === 1) {
        grade = 'A'
      }
      if (index === 2) {
        grade = 'B'
      }
      if (index === 3) {
        grade = 'C'
      }
      if (index === 4) {
        grade = 'D'
      }
      if (index === 5) {
        grade = 'E'
      }
      return grade
    },
    onItemClick (index) {
      this.index = index
      var grade = this.getGrade(index)
      this.activityList = []
      this.loadmore = true
      var params = 'grade=' + grade
      this.$http.post(this.domain + '/api/anon/activity/getActivityList', params).then((response) => {
        this.activityList = response.data.data
        this.loadmore = false
      }).catch((response) => {
        this.loadmore = false
        this.$vux.toast.text('系统异常!', 'middle')
      })
    },
    fetchData: function (pageNum, pageSize) {
      this.loadmore = true
      var grade = this.getGrade(this.index)
      var params = 'pageNum=' + pageNum + '&pageSize=' + pageSize + '&grade=' + grade
      this.$http.post(this.domain + '/api/anon/activity/getActivityList', params).then((response) => {
        this.activityList = response.data.data
        this.loadmore = false
      }).catch((response) => {
        this.loadmore = false
        this.$vux.toast.text('系统异常!', 'middle')
      })
    },
    getSearch (val) {
      this.activityList = []
      this.loadmore = true
      // var grade = this.getGrade(this.index)
      this.index = 0
      var params = 'keywords=' + val
      this.$http.post(this.domain + '/api/anon/activity/getActivityList', params).then((response) => {
        this.activityList = response.data.data
        this.loadmore = false
      }).catch((response) => {
        this.loadmore = false
        this.$vux.toast.text('系统异常!', 'middle')
      })
    },
    onRefresh (done) {
      // this.loadingText = ''
      this.loadbottom = false
      this.activityList = []
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
          if (this.downdata.length === 0) {
            this.loadbottom = true
          } else {
            this.activityList = this.activityList.concat(this.downdata)
          }
          this.loadmore = false
          done()
        }).catch((response) => {
          this.loadmore = false
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
  background-color: #F76260;
  border-radius: 4px;
  padding: 0 4px;
  background-clip: padding-box;
}
</style>
