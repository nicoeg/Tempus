import Vue from 'vue'
import netlifyIdentity from 'netlify-identity-widget/build/netlify-identity'

import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'

import setupBackend from './lib/setup-backend'

Vue.config.productionTip = false

window.netlifyIdentity = netlifyIdentity
netlifyIdentity.init({
  container: '#netlify'
});

netlifyIdentity.on('login', user => {
  setupBackend()
  router.push('/')
})

netlifyIdentity.on('logout', user => {
  router.push('/login')
})

if (netlifyIdentity.currentUser()) {
  setupBackend()
}

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
