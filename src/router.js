import Vue from 'vue'
import Router from 'vue-router'
import Register from './views/Register.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'register',
      component: Register,
      meta: {
        name: 'Timeregistrering'
      }
    },
    {
      path: '/udregning',
      name: 'calculate',
      component: () => import(/* webpackChunkName: "calculate" */ './views/Calculate.vue'),
      meta: {
        name: 'Lønseddel'
      }
    },
    {
      path: '/indstillinger',
      name: 'settings',
      component: () => import(/* webpackChunkName: "settings" */ './views/Settings.vue'),
      meta: {
        name: 'Indstillinger'
      }
    }
  ]
})
