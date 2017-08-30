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
        <group title="推荐活动" style="margin-bottom: 50px;">
          <spinner type="ios" v-show="spinner"></spinner>
          
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
          <div>
            <loading v-model="loading" text="loading"></loading>
          </div>
        </group>
        <load-more v-show="loadmore" tip="正在加载"></load-more>
        <load-more v-show="loadbottom" :show-loading="false" tip="我是有底线的" background-color="#fbf9fe"></load-more>
      </div>
    </v-scroll>

  </div>
  
</template>

<script>
import { Loading, Spinner, LoadMore, Swiper, SwiperItem, Scroller, Cell, Group, Badge, Divider, Flexbox, FlexboxItem } from 'vux'
import Scroll from './pulldown'

export default {
  components: {
    Loading,
    Spinner,
    LoadMore,
    Swiper,
    SwiperItem,
    Scroller,
    Cell,
    Group,
    Badge,
    Divider,
    Flexbox,
    FlexboxItem,
    'v-scroll': Scroll
  },
  data () {
    return {
      cellTitle: '首投 xxx金融',
      imgList: [],
      imgType: 2,
      loading: false,
      spinner: false,
      loadmore: false,
      loadbottom: false,
      activityList: []
    }
  },
  created: function () {
    var params = 'type=' + this.imgType
    this.$http.post(this.domain + '/api/anon/index/getSwiper', params).then((response) => {
      this.imgList = response.data.data
    }).catch((response) => {
      this.$vux.toast.text('系统异常!', 'middle')
    })
    this.fetchData()
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'fetchData'
  },
  methods: {
    fetchData: function () {
      this.loadmore = true
      this.$http.post(this.domain + '/api/anon/activity/getHotActivity', '').then((response) => {
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
      this.fetchData()
      done()
    },
    onInfinite (done) {
      // done()
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

.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translateY(-50%);
          transform: translateY(-50%);
  height: 25px;
  width: 10px;
  border-radius: 10%;
  background: #2c3e50;
  border-top-color: #2980b9;
  -webkit-animation: fade2 1s infinite;
          animation: fade2 1s infinite;
  -webkit-transition: background .2s;
  transition: background .2s;
}
.loading:after, .loading:before {
  content: '';
  position: absolute;
  display: block;
  height: 20px;
  width: 10px;
  background: #2c3e50;
  top: 50%;
  -webkit-transform: translateY(-50%);
          transform: translateY(-50%);
  left: -15px;
  border-radius: 10%;
  -webkit-animation: fade1 1s infinite;
          animation: fade1 1s infinite;
  -webkit-transition: background .2s;
  transition: background .2s;
}
.loading:before {
  left: 15px;
  -webkit-animation: fade3 1s infinite;
          animation: fade3 1s infinite;
}

@-webkit-keyframes fade1 {
  0% {
    background: #2980b9;
  }
}

@keyframes fade1 {
  0% {
    background: #2980b9;
  }
}
@-webkit-keyframes fade2 {
  33% {
    background: #2980b9;
  }
}
@keyframes fade2 {
  33% {
    background: #2980b9;
  }
}
@-webkit-keyframes fade3 {
  66% {
    background: #2980b9;
  }
}
@keyframes fade3 {
  66% {
    background: #2980b9;
  }
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
.flex-demo {
  text-align: center;
}
</style>
