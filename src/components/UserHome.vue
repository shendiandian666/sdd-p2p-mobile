
<template>
  <div>
  	<div>
	    <group title="">
	      <cell :title="nick_name" inline-desc="点击设置账号" link="/home/Setting">
    		<img slot="icon" width="50" height="50" src="../assets/account.svg" class="pad-right"/>
  		  </cell>
	    </group>
  		<group title="">
	      <cell title="交单记录" link="/home/OrderList">
        <img slot="icon" width="18" height="18" src="../assets/order.svg" class="pad-right"/> 
  		  </cell>
        <!--
  		  <cell title="投资人" link="/home/investorList">
    		<img slot="icon" width="18" height="18" src="../assets/investor.svg" class="pad-right"/> 
  		  </cell>-->
  		  <cell title="余额" link="/home/WithDraw">
    		<img slot="icon" width="18" height="18" src="../assets/balance.svg" class="pad-right"/> 
        <div slot="default">
          <span style="color: red;font-weight: 700;">{{balance}}</span>
        </div>
  		  </cell>
	    </group>
  	</div>
  </div>
</template>

<script>
import { Group, Cell } from 'vux'
import { mapState } from 'vuex'

export default {
  components: {
    Group,
    Cell
  },
  created () {
    this.$store.commit('updateTitle', '个人中心')
    this.getUserInfo()
  },
  computed: {
    ...mapState({
      nick_name: state => state.vux.userInfo.nick_name
    }),
    balance () {
      return this.formatterCurrency(this.$store.state.vux.userInfo.balance, 2, '¥')
    }
  }
}
</script>

<style scoped>
.pad-right {
  padding-right:8px;
}
</style>
