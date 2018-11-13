import Vue from 'vue'
import netlifyIdentity from 'netlify-identity-widget/build/netlify-identity'

import '@/plugins/vuetify'
import App from '@/App.vue'
import router from '@/router'
import '@/registerServiceWorker'

Vue.config.productionTip = false

netlifyIdentity.init({
  container: '#netlify'
})

netlifyIdentity.on('login', () => {
  router.push('/')
  netlifyIdentity.close()
})

netlifyIdentity.on('logout', () => {
  router.push('/login')
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
