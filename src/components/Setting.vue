<template>
<div>
	<form>
		<div>
			<group title="">
	      <cell title="昵称" is-link :value="nick_name" :link="{path:'/home/UpdateNickName/' + nick_name}"></cell>
	      <cell title="手机号" :value="mobile"></cell>
      </group>
      <group title="">
	      <cell title="联系QQ" is-link :value="qq" :link="{path:'/home/UpdateQQ/' + qq}"></cell>
	      <cell title="通知邮箱" is-link :value="mail" :link="{path:'/home/UpdateMail/' + mail}"></cell>
      </group>
      <group title="">
	      <cell title="提现账号" is-link :value="alipay_account" link="/home/StepAlipayOne"></cell>
	      <cell title="登录密码" is-link link="/home/UpdatePasswd"></cell>
	    </group>
      <div style="margin: 20px 10px;">
        <x-button type="warn" action-type="button" @click.native="logout">退出登录</x-button>
      </div>
		</div>
	</form>
</div>
</template>

<script>
import { Group, XButton, Cell } from 'vux'
import { mapState } from 'vuex'

export default {
  components: {
    XButton,
    Group,
    Cell
  },
  created () {
    this.$store.commit('updateTitle', '设置')
  },
  computed: {
    ...mapState({
      nick_name: state => state.vux.userInfo.nick_name,
      qq: state => state.vux.userInfo.qq,
      mail: state => state.vux.userInfo.mail,
      alipay_account: state => state.vux.userInfo.alipay_account
    }),
    mobile () {
      return this.getShowPhone(this.$store.state.vux.userInfo.username)
    }
  },
  methods: {
    logout () {
      localStorage.removeItem('msd.com.token')
      this.$router.push('/home/Login')
    }
  }
}
</script>

<style scoped>

</style>
