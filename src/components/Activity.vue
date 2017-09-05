<template>
  <div class="activity" style="padding-bottom: 20px;">
    
    <div class="header">
      <img :src="activity.platform_img"/> 
      <span :class="activity.isFirstCss"><b>{{ activity.isFirst }}</b></span> 
      <div class="risk">
      <b>{{ activity.risk }}</b> <span>{{ activity.riskDisplay }}</span>
      </div>
    </div>

    <div class="panel"><h4>最高返利方案：<b>{{ activity.bestName }}</b></h4> <div class="content light"><p>投资{{ activity.bestDeposit }}元获得<b>{{ activity.bestMoney }}</b>元，年化<b>{{ activity.bestInterest }}%</b></p> <p>已有<b>{{ activity.joins }}</b>人参与活动</p></div></div>

    <div class="panel">
    <h4>平台介绍：</h4> 
    <div class="content light">
    <p>{{ activity.platform_intro }}</p> 
	<ul>
	<li v-for="(item, index) in activity.platform_tags"><b>{{item}}</b></li>
	</ul> 
	<div style="clear: both;"></div>
	</div>
	</div>

	<div class="panel">
  <h4>参与说明：</h4> 
  <div id="activity-content" class="content" v-html="activity.content">
  </div></div>

    <div v-for="(item, index) in filterPlanList">
  	  <group>
        <cell v-show="activity.status === '1'" :link="{path:'/middle/ActivityJoin/' + item.id}">
        <span slot="title">{{ item.name }} / {{ item.item }}</span>
        <div slot="default">
          <span style="color: red;font-weight: 700;">立即参与</span>
        </div>
        </cell>
        <cell v-show="activity.status !== '1'">
        <span slot="title">{{ item.name }} / {{ item.item }}</span>
        <div slot="default">
          <span style="color: #999;font-weight: 700;">已暂停</span>
        </div>
        </cell>
        <cell-form-preview :list="item.list"></cell-form-preview>
        
      </group>
    </div>
  </div>
</template>

<script>
import { CellFormPreview, Group, Cell } from 'vux'

export default {
  components: {
    CellFormPreview,
    Group,
    Cell
  },
  data () {
    return {
      activity: {},
      planList: []
    }
  },
  created () {
    var that = this
    var params = 'activity_id=' + this.$route.params.activity_id
    this.post('/api/anon/activity/getActivity', params, function (response) {
      var data = response.data
      that.activity = data.activity
      // that.logo = that.activity.platform_img
      that.activity.platform_tags = that.activity.platform_tags.split(',')
      that.activity.isFirstCss = that.activity.isFirst === '1' ? 'title-l' : 'title-l-2'
      that.activity.isFirst = that.activity.isFirst === '1' ? '首投' : '复投'
      that.activity.bestDeposit = that.formatterCurrency(that.activity.bestDeposit, 0, '')
      that.planList = data.planList
    })
  },
  computed: {
    filterPlanList () {
      var planList = this.planList
      var that = this
      return planList.filter(function (item) {
        // item.depositDisplay_s = that.formatterCurrency(item.depositDisplay_s, 0, '')
        // item.depositDisplay_e = (item.depositDisplay_e !== 0 ? (item.depositDisplay_e === 1 ? '无上限' : that.formatterCurrency(item.depositDisplay_e, 0, '')) : '')
        item.list = []
        item.list.push({label: '投资金额', value: item.depositDisplay_txt})
        item.rebate = that.formatterCurrency(item.rebate, 2, '')
        item.list.push({label: '马上多返利', value: item.rebate + '%'})
        item.rate = that.formatterCurrency(item.rate, 2, '')
        item.list.push({label: '年化利率', value: item.rate + '%'})
        item.redback = that.formatterCurrency(item.redback, 2, '')
        item.list.push({label: '红包', value: item.redback})
        item.totalIncome = that.formatterCurrency(item.totalIncome, 2, '')
        item.list.push({label: '总收益', value: '≈ ' + item.totalIncome_txt})
        item.yearRate = that.formatterCurrency(item.year_rate, 2, '') + '%'
        item.list.push({label: '综合年化', value: '≈ ' + item.yearRate})
        return true
      })
    }
  }
}
</script>

<style scoped>
.activity .header {
  background-color: #fff;
  padding: 10px;
  height: 35px;
}

.activity .header img {
  line-height: 100%;
  float: left;
  height: 40px;
  width: 100px;
}

.activity .header .first, .activity .header .repetition {
	background-color: #56ce8b;
  color: #fff;
  border-radius: 3px;
  font-size: 13px;
  padding: 2px 5px;
  margin-top: 5px;
  margin-left: 10px;
  display: block;
  float: left;
}

.activity .header .repetition {
  background-color: #ffa975;
}

.risk {
	border-radius: 2em;
  border: 1px solid #FFBE00;
  color: #fff;
  float: right;
  font-size: 13px;
  margin-top: 5px;
}

.risk>b {
	background-color: #FFBE00;
  display: block;
  float: left;
  border-radius: 2em;
  padding: 2px 10px;
}

.risk>span {
	padding-left: 5px;
  padding-right: 10px;
  padding-top: 2px;
  display: block;
  float: left;
  color: #000;
}

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
.pad-right {
  padding-right:0px;
  color: red;
  font-weight: 600;
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
</style>
