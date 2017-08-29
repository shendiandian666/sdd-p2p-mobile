<template>
<div>
	<form>
		<div>
			<group title="">
		    <x-input :title="title" label-width="6" v-model="value" placeholder=""></x-input>
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
      title: '昵称',
      value: this.$route.params.value
    }
  },
  methods: {
    update () {
      var that = this
      var params = 'nickname=' + this.value
      this.post('/api/auth/account/update_nickName', params, function (response) {
        that.$store.commit('updateNickName', that.value)
        that.$router.go(-1)
      })
    }
  }
}
</script>

<style scoped>

</style>
