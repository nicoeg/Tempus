<template>
  <v-app>
    <v-navigation-drawer
      persistent
      v-model="drawer"
      enable-resize-watcher
      app
    >
      <v-list>
        <router-link tag="span" to="/">
          <v-list-tile :value="$route.name == 'register'">
            <v-list-tile-action>
              <v-icon>access_time</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>Timeregistrering</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </router-link>

        <router-link tag="span" to="/udregning">
          <v-list-tile :value="$route.name == 'calculate'">
            <v-list-tile-action>
              <v-icon>receipt</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>Lønseddel</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </router-link>

        <router-link tag="span" to="/indstillinger">
          <v-list-tile :value="$route.name == 'settings'">
            <v-list-tile-action>
              <v-icon>settings</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>Indstillinger</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </router-link>
      </v-list>
    </v-navigation-drawer>
    
    <v-toolbar app dark color="primary">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>

      <v-toolbar-title v-text="routeName" />

      <v-spacer />

      <v-toolbar-items>
        <v-btn flat icon @click="login">
          <v-icon>person</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import netlifyIdentity from 'netlify-identity-widget'

export default {
  data () {
    return {
      drawer: false
    }
  },

  computed: {
    routeName() {
      return this.$route.meta.name
    }
  },

  methods: {
    login() {
      netlifyIdentity.open("login")
    }
  },

  mounted() {
    netlifyIdentity.init({
      container: "#netlify",
      APIUrl: !process.env.production ? 'https://lucid-hamilton-cd5921.netlify.com/.netlify/identity' : null
    });
  }
}
</script>

<style>
  .v-toolbar__content .v-toolbar__title {
    margin-left: 0;
    text-transform: capitalize;
  }
</style>
