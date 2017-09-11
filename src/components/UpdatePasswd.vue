<template>
<div>
	<form>
		<div>
			<group title="修改密码">
	      <x-input title="当前密码" label-width="6" v-model="password" type="password"></x-input>
        <x-input title="新密码" label-width="6" v-model="new_password" type="password"></x-input>
        <x-input title="新密码确认" label-width="6" v-model="new_password_confirm" type="password"></x-input>
	    </group>
	    <div style="margin: 20px 10px;">
	      <x-button type="primary" action-type="button" @click.native="update">确定</x-button>
	    </div>
		</div>
	</form>
</div>
</template>

<script>
import { XInput, Group, XButton } from 'vux'

export default {
  components: {
    XInput,
    XButton,
    Group
  },
  data () {
    return {
      password: '',
      new_password: '',
      new_password_confirm: ''
    }
  },
  created () {
    this.$store.commit('updateTitle', '修改密码')
  },
  methods: {
    update () {
      var that = this
      var params = 'password=' + this.password + '&new_password=' + this.new_password + '&new_password_confirm=' + this.new_password_confirm
      this.post('/api/auth/account/update_password', params, function (response) {
        var data = response
        if (data.status !== '200') {
          that.$vux.toast.text(data.message, 'middle')
        } else {
          localStorage.removeItem('msd.com.token')
          localStorage.removeItem('msd.password')
          that.$router.push('/home/Login')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
