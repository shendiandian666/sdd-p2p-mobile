<template>

  <div style="padding-top: 45px; padding-bottom: 50px;">

      <x-header :title="getTitle"
        style="width: 100%; position: fixed; left: 0px; top: 0px; z-index: 100;background-color:#2b2b2b;"
        :leftOptions="leftOptions">
        </x-header>
        <transition>
	    <router-view></router-view>
      </transition>

      <loading v-model="isLoading"></loading>
      <loading v-model="reqLoading"></loading>
      
      <tabbar class="vux-demo-tabbar" icon-class="vux-center" style="width: 100%; position: fixed; bottom: 0px;">
          <tabbar-item :link="{path:'/'}" :selected="route.path === '/'">
            <img slot="icon" src="./assets/index.svg"/>
            <img slot="icon-active" src="./assets/index_active.svg"/>
            <span class="demo-icon-22 vux-demo-tabbar-icon-home" slot="icon" style="position:relative;top: -2px;">&#xe637;</span>
            <span slot="label">首页</span>
          </tabbar-item>
          <tabbar-item :link="{path:'/middle/ActivityList'}" :selected="isMiddle">
            <img slot="icon" src="./assets/rebate.svg"/>
            <img slot="icon-active" src="./assets/rebate_active.svg"/>
            <span class="demo-icon-22" slot="icon">&#xe633;</span>
            <span slot="label">返利</span>
          </tabbar-item>
          <!--<tabbar-item :link="{path:'/loan/LoanList'}" :selected="isLoan">
            <img slot="icon" src="./assets/loan.svg"/>
            <img slot="icon-active" src="./assets/loan_active.svg"/>
            <span class="demo-icon-22" slot="icon">&#xe633;</span>
            <span slot="label">贷款</span>
          </tabbar-item>-->
          <tabbar-item :link="{path:'/ask/AskList'}" :selected="isAsk">
            <img slot="icon" src="./assets/ask.svg"/>
            <img slot="icon-active" src="./assets/ask_active.svg"/>
            <span class="demo-icon-22" slot="icon">&#xe633;</span>
            <span slot="label">公告</span>
          </tabbar-item>
          <tabbar-item :link="{path:'/home/Login'}" :selected="isHome">
            <img slot="icon" src="./assets/user.svg"/>
            <img slot="icon-active" src="./assets/user_active.svg"/>
            <span class="demo-icon-22" slot="icon">&#xe630;</span>
            <span slot="label">我</span>
          </tabbar-item>
        </tabbar>
        
   </div>
</template>

<script>
import { Loading, XHeader, Tabbar, TabbarItem } from 'vux'
import { mapState } from 'vuex'

export default {
  components: {
    Loading,
    XHeader,
    Tabbar,
    TabbarItem
  },
  computed: {
    ...mapState({
      route: state => state.route,
      path: state => state.route.path
    }),
    getTitle: {
      get: function () {
        return this.$store.state.vux.title
      },
      set: function (val) {
        this.$store.state.vux.title = val
      }
    },
    isLoading: {
      get: function () {
        return this.$store.state.vux.isLoading
      },
      set: function (val) {
        this.$store.state.vux.isLoading = val
      }
    },
    reqLoading: {
      get: function () {
        return this.$store.state.vux.reqLoading
      },
      set: function (val) {
        this.$store.state.vux.reqLoading = val
      }
    },
    isIndex () {
      return /index/.test(this.route.path)
    },
    isMiddle () {
      return /middle/.test(this.route.path)
    },
    isLoan () {
      return /loan/.test(this.route.path)
    },
    isAsk () {
      return /ask/.test(this.route.path)
    },
    isCar () {
      return /car/.test(this.route.path)
    },
    isHome () {
      return /home/.test(this.route.path)
    },
    leftOptions () {
      return {
        showBack: this.route.path !== '/' && this.route.path !== '/middle/ActivityList' && this.route.path !== '/loan/LoanList' && this.route.path !== '/ask/AskList' && this.route.path !== '/home/Login'
      }
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';

body {
  background-color: #fbf9fe;
}
html, body{
	height:100%;
}
</style>
