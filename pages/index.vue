<template>
  <v-tabs icons-and-text
          centered
          dark
          color="cyan">
    <v-tabs-slider color="yellow"></v-tabs-slider>
    <v-tab href="#tab-1">
      全部
      <v-icon>list_alt</v-icon>
    </v-tab>
    <v-tab href="#tab-2">
      精华
      <v-icon>favorite</v-icon>
    </v-tab>
    <v-tab href="#tab-3">
      分享
      <v-icon>share</v-icon>
    </v-tab>
    <v-tab href="#tab-4">
      问答
      <v-icon>question_answer</v-icon>
    </v-tab>
    <v-tab href="#tab-5">
      招聘
      <v-icon>account_box</v-icon>
    </v-tab>
    <v-tab-item v-for="i in 5"
                :key="i"
                :id="'tab-' + i">
      <v-card flat>
        <v-card-text>{{ text }}</v-card-text>
      </v-card>
    </v-tab-item>
  </v-tabs>
</template>

<script>

export default {
  layout: 'simple',
  data () {
    return {
      model: 'tab-2',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
  }
}
</script>