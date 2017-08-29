<template>
  <div>
    <msg :title="title" :description="description" :buttons="buttons" :icon="icon"></msg>
  </div>
</template>

<script>
import { Msg, Divider, XButton } from 'vux'

export default {
  components: {
    Msg,
    Divider,
    XButton
  },
  methods: {
    changeIcon () {
      if (!this.icon || this.icon === 'success') {
        this.icon = 'warn'
        return
      }
      if (this.icon === 'warn') {
        this.icon = 'info'
        return
      }
      if (this.icon === 'info') {
        this.icon = 'waiting'
        return
      }
      if (this.icon === 'waiting') {
        this.icon = 'success'
      }
    }
  },
  data () {
    return {
      title: '交单成功',
      description: '严禁交假单，违者封号处理',
      icon: '',
      buttons: [{
        type: 'primary',
        text: '交单记录',
        link: '/home/OrderList'
      }]
    }
  }
}
</script>
