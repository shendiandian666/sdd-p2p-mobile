<template>
  <div class="activity">
    <div class="panel"><h4>{{newObj.title}}</h4>
      <div class="content light" v-html="newObj.content">
      </div>
    </div>
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
  created: function () {
    this.$store.commit('updateTitle', '公告')
    var params = 'id=' + this.$route.params.id
    this.$http.post(this.domain + '/api/anon/news/getContent', params).then((response) => {
      this.newObj = response.data.data
    }).catch((response) => {
      this.$vux.toast.text('系统异常!', 'middle')
    })
  },
  data () {
    return {
      title: '交单成功',
      description: '严禁交假单，违者封号处理',
      icon: '',
      newObj: []
    }
  }
}
</script>

<style scoped>
.activity .panel {
  background-color: #fff;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    padding: 15px;
    padding-left: 5px;
    margin-bottom: 20px;
}
.activity .panel>h4 {
  font-weight: 400;
    border-left: 5px solid #FFBE00;
    padding-left: 7px;
    margin-left: 3px;
    line-height: 100%;
    margin-bottom: 10px;
}
.activity .panel .content {
  margin-left: 15px;
    word-wrap: break-word;
    overflow: hidden;
}
.activity .panel .light b {
  color: red;
}
.activity .panel .light ul {
  list-style: none;
}
.activity .panel .light ul li b{
  border: 1px solid #bdc1c7;
  color: #bdc1c7;
  border-radius: 2em;
  float: left;
  margin-right: 10px;
  margin-top: 10px;
  padding: 2px 15px;
  font-size: 14px;
}
</style>
