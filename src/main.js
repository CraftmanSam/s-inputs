import Vue from 'vue'
import App from './App.vue'
import router from './router'
import TextareaAutosize from 'vue-textarea-autosize'
import VueCurrencyInput from 'vue-currency-input'
import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import '@solution5520/s-visual-test/dist/s-visual-test.css'

Vue.config.productionTip = false

library.add(faSearch)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(TextareaAutosize)
Vue.use(VueCurrencyInput)
Vue.use(VueSidebarMenu)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
