<template>
  <div class="activity-list">

      <swiper auto dots-position="center">
        <swiper-item class="swiper-demo-img" v-for="(item, index) in imgList" :key="index">
          <router-link :to="item.url">
            <div class="vux-img" :style="'background-image: url('+item.img+');'"></div>
          </router-link>
        </swiper-item>
      </swiper>

<v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite" style="margin-top: 182px;">
<div style="margin-bottom: -40px;">
        <group title="搭车活动">
          <cell v-for="(item, index) in carList" :key="index" :link="{path:'/car/CarDetail/' + item.id}">
          <span slot="title">
            {{item.title}}
          </span>
          <span slot="inline-desc">
            <span>搭车投资满<b>{{item.target_account|money(0,'')}}</b>元</span>
            <span style="padding-left:5px;">即可加返<font color="red"><b>{{item.add_rebate}}%</b></font></span>
          </span>
          <div slot="value" style='width:50px;height:50px;'>
            <x-circle :percent="item.totalFinish / item.target_account * 100" :stroke-width="strokeWidth" :trail-width="trailWidth" stroke-color="#3FC7FA" trail-color="#ececec">
              <span style="color: #3FC7FA">{{item.totalFinish / item.target_account * 100}}%</span>
            </x-circle>
          </div>
          </cell>
          </cell>

        </group>
        <load-more v-show="loadmore" tip="正在加载"></load-more>
        <load-more v-show="loadbottom" :show-loading="false" tip="我是有底线的" background-color="#fbf9fe"></load-more>
        </div>
      </v-scroll>
        
  </div>
</template>

<script>
import { XCircle, Search, LoadMore, Swiper, SwiperItem, Cell, Group, Badge, Divider, Tab, TabItem } from 'vux'
import Scroll from './pulldown'

export default {
  components: {
    XCircle,
    Search,
    LoadMore,
    Swiper,
    SwiperItem,
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
      imgList: [],
      imgType: 4,
      strokeWidth: 15,
      trailWidth: 15,
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
    var params = 'type=' + this.imgType
    this.$http.post(this.domain + '/api/anon/index/getSwiper', params).then((response) => {
      this.imgList = response.data.data
    }).catch((response) => {
      this.$vux.toast.text('系统异常!', 'middle')
    })
    this.fetchData(this.pageNum, this.pageSize)
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
.swiper-demo-img img {
  width: 100%;
}
.vux-img {
  display: block;
  width: 100%;
  height: 100%;
  background: 50% no-repeat;
  background-size: cover
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
  background-color: #1AAD19;
  border-radius: 4px;
  padding: 0 4px;
  background-clip: padding-box;
}
.status-2 {
  text-align: center;
  font-size:14px;
  color: #000;
  background-color: #F8F8F8;
  border-radius: 4px;
  padding: 0 4px;
  background-clip: padding-box;
}
</style>
