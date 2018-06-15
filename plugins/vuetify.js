import Vue from 'vue'
import {
  Vuetify,
  VApp,
  VCard,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VTabs,
  VDivider,
  VProgressCircular
} from 'vuetify'
import Scroll from 'vuetify/es5/directives/scroll'
Vue.use(Vuetify, {
  components: {
    VApp,
    VCard,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VTabs,
    VDivider,
    VProgressCircular
  },
  directives: {
    Scroll
  }
})
