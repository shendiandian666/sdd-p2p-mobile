<template>
<div>
	<form>
		<div>
			<group title="">
	      <x-input :title="title" label-width="6" v-model="value" is-type="email" ref="mail" required></x-input>
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
      title: '通知邮箱',
      value: this.$route.params.value
    }
  },
  created () {
    this.$store.commit('updateTitle', '修改通知邮箱')
  },
  methods: {
    update () {
      if (!this.$refs.mail.valid) {
        this.$vux.toast.text('邮箱格式错误!', 'middle')
        return
      }
      var that = this
      var params = 'email=' + this.value
      this.post('/api/auth/account/update_mail', params, function (response) {
        that.$store.commit('updateMail', that.value)
        that.$router.go(-1)
      })
    }
  }
}
</script>

<style scoped>

</style>
