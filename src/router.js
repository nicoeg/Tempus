import Vue from 'vue'
import Router from 'vue-router'
import Register from './views/Register.vue'

Vue.use(Router)

const router =  new Router({
  mode: 'history',
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
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue'),
      beforeEnter: (to, from, next) => {
        if (true) { // TODO: Check auth
          return router.push('/')
        }

        next()
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && !true) { // TODO: Check auth
    return router.push('/login')
  }

  next()
})

export default router
