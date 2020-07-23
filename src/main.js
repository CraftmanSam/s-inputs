import Vue from 'vue'
import App from './App.vue'
import router from './router'
// Solution5520
import '@solution5520/s-visual-test/dist/s-visual-test.css'
import SInputs from './components'
// Dependencies
import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
// Fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.config.productionTip = false

library.add(faSearch)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(SInputs)

Vue.use(VueSidebarMenu)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
