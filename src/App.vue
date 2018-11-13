<template>
  <VApp>
    <VNavigationDrawer
      v-model="drawer"
      persistent
      enable-resize-watcher
      app
    >
      <VList>
        <!-- eslint-disable-next-line vue/component-name-in-template-casing -->
        <router-link tag="span" to="/">
          <VListTile :value="$route.name == 'register'">
            <VListTileAction>
              <VIcon>access_time</VIcon>
            </VListTileAction>

            <VListTileContent>
              <VListTileTitle>Timeregistrering</VListTileTitle>
            </VListTileContent>
          </VListTile>
        </router-link>

        <!-- eslint-disable-next-line vue/component-name-in-template-casing -->
        <router-link tag="span" to="/udregning">
          <VListTile :value="$route.name == 'calculate'">
            <VListTileAction>
              <VIcon>receipt</VIcon>
            </VListTileAction>

            <VListTileContent>
              <VListTileTitle>Lønseddel</VListTileTitle>
            </VListTileContent>
          </VListTile>
        </router-link>

        <!-- eslint-disable-next-line vue/component-name-in-template-casing -->
        <router-link tag="span" to="/indstillinger">
          <VListTile :value="$route.name == 'settings'">
            <VListTileAction>
              <VIcon>settings</VIcon>
            </VListTileAction>

            <VListTileContent>
              <VListTileTitle>Indstillinger</VListTileTitle>
            </VListTileContent>
          </VListTile>
        </router-link>
      </VList>
    </VNavigationDrawer>

    <VToolbar app dark color="primary">
      <VToolbarSideIcon @click.stop="drawer = !drawer"></VToolbarSideIcon>

      <VToolbarTitle v-text="routeName" />

      <VSpacer />

      <VBtn flat icon @click="login">
        <VIcon>person</VIcon>
      </VBtn>
    </VToolbar>

    <VContent>
      <VSlideYTransition mode="out-in">
        <!-- eslint-disable-next-line vue/component-name-in-template-casing -->
        <router-view/>
      </VSlideYTransition>
    </VContent>
  </VApp>
</template>

<script>
import netlifyIdentity from 'netlify-identity-widget/build/netlify-identity'

export default {
  data() {
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
      netlifyIdentity.open('login')
    }
  }
}
</script>

<style>
.v-toolbar__content .v-toolbar__title {
  margin-left: 0;
  text-transform: capitalize;
}
</style>

<style scoped>
.v-list > span {
  cursor: pointer;
}
</style>
