<template>
<div>

  <cell title="向左滑动删除" disabled>
      <div slot="default">
        <x-button mini type="primary" slot="right" @click.native="add">添加</x-button>
      </div>
    </cell>

    <swipeout class="vux-1px-tb">

      <swipeout-item transition-mode="follow" v-for="(item, index) in investorList" :key="index">
        <div slot="right-menu">
          <swipeout-button @click.native="del(item.id)" type="warn">删除</swipeout-button>
        </div>
        <div slot="content" class="demo-content vux-1px-t">
        <img src="../assets/investor.svg" width="20" height="20"/><span class="pad-left">{{item.name}}</span> {{item.mobile}}
        </div>
      </swipeout-item>

   </swipeout>
    <load-more v-show="loadmore" tip="正在加载"></load-more>
    <load-more v-show="loadbottom" :show-loading="false" tip="我是有底线的" background-color="#fbf9fe"></load-more>


  <div>
    <popup v-model="show">
      <div class="popup0">
        <group title="">
          <x-input title="手机号码" label-width="6" v-model="mobile" keyboard="number" is-type="china-mobile" ref="mobile" required></x-input>
          <x-input title="姓名" label-width="6" v-model="name" ref="name" required></x-input>
        </group>
        <div style="margin: 20px 10px;">
          <x-button type="primary" action-type="button" @click.native="save">添加</x-button>
        </div>
      </div>
    </popup>
  </div>

</div>
</template>

<script>
import { Group, LoadMore, Cell, XButton, Swipeout, SwipeoutItem, SwipeoutButton, Popup, XInput } from 'vux'
import Scroll from './pulldown'

export default {
  components: {
    Group,
    LoadMore,
    Cell,
    XButton,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton,
    Popup,
    XInput,
    'v-scroll': Scroll
  },
  data () {
    return {
      show: false,
      pageNum: 1, // 当前页面
      pageSize: 15,  // 一次显示多少条
      loadmore: false,
      loadbottom: false,
      investorList: [],
      mobile: '',
      name: ''
    }
  },
  mounted () {
    // investorlist
    this.getInvestorList(this.pageNum, this.pageSize)
  },
  methods: {
    add () {
      this.show = true
    },
    save () {
      if (!this.$refs.mobile.valid) {
        this.$vux.toast.text('请输入正确手机号!', 'middle')
        return
      }
      if (!this.$refs.name.valid) {
        this.$vux.toast.text('请输入姓名!', 'middle')
        return
      }
      this.show = false
      var that = this
      var params = 'mobile=' + this.mobile + '&name=' + this.name
      this.post('/api/auth/investor/add_investor', params, function (response) {
        that.mobile = ''
        that.name = ''
        that.getInvestorList(that.pageNum, that.pageSize)
      })
    },
    del (val) {
      var that = this
      var params = 'id=' + val
      this.post('/api/auth/investor/delete_investor', params, function (response) {
        that.getInvestorList(that.pageNum, that.pageSize)
      })
    },
    getInvestorList (pageNum, pageSize) {
      var that = this
      var params = 'pageNum=' + pageNum + '&pageSize=' + pageSize
      this.post('/api/auth/investor/get_investor_list', params, function (response) {
        that.investorList = response.data
      })
    },
    onRefresh (done) {
      // this.loadingText = ''
      this.loadbottom = false
      this.pageNum = 1
      this.getInvestorList(1, 15)
      done()
    },
    onInfinite (done) {
      if (this.loadbottom === true) {
        done()
        return
      } else {
        var that = this
        this.loadmore = true
        this.pageNum++
        let pageNum = this.pageNum
        var params = 'pageNum=' + pageNum + '&pageSize=' + this.pageSize
        this.post('/api/auth/investor/get_investor_list', params, function (response) {
          // this.loadingText = ''
          that.downdata = response.data
          that.investorList = that.investorList.concat(that.downdata)
          if (that.downdata.length === 0) {
            that.loadbottom = true
          }
          that.loadmore = false
          done()
        })
      }
    }
  },
  computed: {
    // sss
  }
}
</script>

<style scoped lang="less">
.demo-content {
  padding: 10px 10px;
}
.popup0 {
}
.pad-right {
  padding-right:10px;
}
.pad-left {
  padding-left:10px;
  display:-moz-inline-box;
  display:inline-block;
  width:80px;
}

</style>
