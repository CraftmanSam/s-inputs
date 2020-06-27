import Vue from 'vue'
import Router from 'vue-router'

const HomePage = () => import(/* webpackChunkName: "Home" */'@/views/Home')

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/:id(.*)?',
            name: 'Home',
            component: HomePage
        }
    ]
})