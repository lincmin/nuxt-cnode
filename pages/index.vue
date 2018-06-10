<template>
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
                <v-list-tile-action-text>{{ item.last_reply_at }}</v-list-tile-action-text>
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
</template>

<script>
import axios from 'axios'

export default {
  layout: 'simple',
  data () {
    return {
      tabNum: '1'
    }
  },
  async asyncData ({ app }) {
    let { data } = await axios.get(`https://cnodejs.org/api/v1/topics`)
    return { datas: data.data }
  },
  methods: {
    getTopicsData (params) {
      return axios.get(`https://cnodejs.org/api/v1/topics`, { params: { ...params } }).then(res => {
        this.datas = res.data.data
      })
        .catch(error => console.log(error))
    },
    changeTab (tabType, tabNum) {
      this.tabNum = tabNum
      let params = {
        page: 1,
        tab: tabType, // all ask share job good
        limit: 10,
        mdrender: 'true'
      }
      this.getTopicsData(params)
    }
  }
}
</script>