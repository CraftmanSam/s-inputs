import Vue from 'vue'
import App from './App.vue'
import router from './router'
// dependencies
import InputFacade from 'vue-input-facade'
import TextareaAutosize from 'vue-textarea-autosize'
import VueCurrencyInput from 'vue-currency-input'
import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
// solution5520
import '@solution5520/s-visual-test/dist/s-visual-test.css'
// font awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.config.productionTip = false

library.add(faSearch)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(InputFacade)
Vue.use(TextareaAutosize)
Vue.use(VueCurrencyInput)
Vue.use(VueSidebarMenu)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
