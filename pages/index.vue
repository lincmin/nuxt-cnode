<template>
  <div v-scroll="onScroll">
    <div class="loading">
      <v-progress-circular indeterminate
                           color="primary"
                           v-show="loading">
      </v-progress-circular>
    </div>
    <v-tabs icons-and-text
            centered
            dark
            color="cyan">
      <v-tabs-slider color="yellow"></v-tabs-slider>
      <v-tab href="#tab-1"
             @click="changeTab('all','1')">
        全部
        <v-icon>list_alt</v-icon>
      </v-tab>
      <v-tab href="#tab-2"
             @click="changeTab('good','2')">
        精华
        <v-icon>favorite</v-icon>
      </v-tab>
      <v-tab href="#tab-3"
             @click="changeTab('share','3')">
        分享
        <v-icon>share</v-icon>
      </v-tab>
      <v-tab href="#tab-4"
             @click="changeTab('ask','4')">
        问答
        <v-icon>question_answer</v-icon>
      </v-tab>
      <v-tab href="#tab-5"
             @click="changeTab('job','5')">
        招聘
        <v-icon>account_box</v-icon>
      </v-tab>
      <v-tab-item :id="`tab-${tabNum}`">
        <v-card flat>
          <v-list two-line>
            <template v-for="(item, index) in datas">
              <v-list-tile :key="item.title"
                           avatar
                           ripple
                           @click="">
                <v-list-tile-avatar>
                  <img :src="item.author.avatar_url">
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title v-html="item.title"></v-list-tile-title>
                  <v-list-tile-sub-title v-html="`${item.reply_count}/${item.visit_count}`">
                  </v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-list-tile-action-text>{{item.last_reply_at_human}}</v-list-tile-action-text>
                  <v-icon v-if="item.good"
                          color="red lighten-1">thumb_up_alt</v-icon>
                  <v-icon v-else-if="item.top"
                          color="yellow darken-2">vertical_align_top</v-icon>
                </v-list-tile-action>
              </v-list-tile>
              <v-divider inset
                         light
                         v-if="index + 1 < datas.length"
                         :key="index"></v-divider>
            </template>
          </v-list>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
moment.locale('zh-cn')

export default {
  layout: 'simple',
  data () {
    return {
      tabNum: '1',
      tabType: 'all',
      loading: false,
      page: 1
    }
  },
  async asyncData ({ app }) {
    let { data } = await axios.get(`https://cnodejs.org/api/v1/topics`, { params: { limit: 10 } })
    let lists = data.data
    lists.map((item, i) => {
      item.last_reply_at_human = moment(item.last_reply_at).fromNow()
    })
    return { datas: lists }
  },
  methods: {
    getTopicsData (params, isAppend) {
      this.loading = true
      return axios.get(`https://cnodejs.org/api/v1/topics`, { params: { ...params } }).then(res => {
        let oldDatas = this.datas
        let lists = res.data.data
        let newDatas = this.formatHumanDate(lists)
        if (isAppend) {
          this.datas = oldDatas.concat(newDatas)
        } else {
          this.datas = newDatas
        }
        this.loading = false
      })
        .catch(error => console.log(error))
    },
    formatHumanDate (datas) {
      datas.map((item, i) => {
        item.last_reply_at_human = moment(item.last_reply_at).fromNow()
      })
      return datas
    },
    changeTab (tabType, tabNum) {
      this.tabNum = tabNum
      this.tabType = tabType
      this.page = 1
      let params = {
        page: 1,
        tab: tabType, // all ask share job good
        limit: 10,
        mdrender: 'true'
      }
      this.getTopicsData(params, false)
    },
    onScroll (e) {
      this.scrollTop = window.pageYOffset || document.documentElement.scrollTop
      this.clientHeight = document.documentElement.clientHeight
      this.scrollHeight = document.body.scrollHeight
      if (this.scrollTop + this.clientHeight === this.scrollHeight) {
        let page = this.page + 1
        this.page = page
        let params = {
          page: page,
          tab: this.tabType, // all ask share job good
          limit: 10,
          mdrender: 'true'
        }
        this.getTopicsData(params, true)
      }
    }
  }
}
</script>
<style>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  position: fixed;
}
</style>
