<template>
    <div class="login">
        <h1>You need to login to use the site</h1>

        <VBtn color="primary" @click="login">Login</VBtn>
    </div>
</template>

<script>
import netlifyIdentity from 'netlify-identity-widget/build/netlify-identity'

export default {
  methods: {
    login() {
      netlifyIdentity.open('login')
    }
  }
}
</script>

<style lang="scss">
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  color: #555;
  height: 100%;

  h1 {
    font-weight: 300;
    margin-bottom: 30px;
  }
}
</style>
