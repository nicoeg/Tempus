import Vue from 'vue'
import netlifyIdentity from 'netlify-identity-widget'

import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'

Vue.config.productionTip = false

window.netlifyIdentity = netlifyIdentity
netlifyIdentity.init({
  container: "#netlify"
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
