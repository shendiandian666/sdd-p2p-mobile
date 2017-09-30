<template>
  <div class="activity-list">

    <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite" style="posistion:static;">
      <div style="margin-bottom: 30px;">
        <group :title="item.date" v-for="(item, index) in filterAskList" :key="index">
          <cell :title="index+1 + '、' + item.title"
          :link="{path:'/ask/AskDetail/' + item.id}"></cell>
        </group>
        <load-more v-show="loadmore" tip="正在加载"></load-more>
        <load-more v-show="loadbottom" :show-loading="false" tip="没有更多数据" background-color="#fbf9fe"></load-more>
      </div>
    </v-scroll>
        
  </div>
</template>

<script>
import { Search, LoadMore, Cell, Group, Badge, Divider, Tab, TabItem } from 'vux'
import Scroll from './pulldown'

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
      loadmore: false,
      loadbottom: false,
      askList: [],
      loadingText: '',
      pageNum: 1, // 当前页面
      pageSize: 30,  // 一次显示多少条
      listdata: [], // 下拉更新数据存放数组
      downdata: []  // 上拉更多的数据存放数组
    }
  },
  created: function () {
    this.$store.commit('updateTitle', '公告')
    this.fetchData(this.pageNum, this.pageSize)
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'fetchData'
  },
  computed: {
    filterAskList () {
      var askList = this.askList
      return askList.filter(function (item) {
        item.date = item.date.substr(0, 19)
        return true
      })
    }
  },
  methods: {
    fetchData: function (pageNum, pageSize) {
      this.loadmore = true
      var params = 'pageNum=' + pageNum + '&pageSize=' + pageSize
      this.$http.post(this.domain + '/api/anon/news/getNews', params).then((response) => {
        this.askList = response.data.data
        this.loadmore = false
      }).catch((response) => {
        this.loadmore = false
        this.$vux.toast.text('系统异常!', 'middle')
      })
    },
    onRefresh (done) {
      // this.loadingText = ''
      this.loadbottom = false
      this.askList = []
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
        var params = 'pageNum=' + pageNum + '&pageSize=' + this.pageSize
        this.$http.post(this.domain + '/api/anon/news/getNews', params).then((response) => {
          // this.loadingText = ''
          this.downdata = response.data.data
          if (this.downdata.length === 0) {
            this.loadbottom = true
          } else {
            this.askList = this.askList.concat(this.downdata)
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
.slide {
  padding: 0 20px;
  overflow: hidden;
  max-height: 0;
  transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
}
.animate {
  max-height: 9999px;
  transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
  transition-delay: 0s;
}
.weui-cells__title {
  margin-top: 0px;
}
</style>
