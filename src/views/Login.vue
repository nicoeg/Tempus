<template>
    <div class="login">
        <h1>You need to login to use the site</h1>

        <v-btn color="primary" @click="login">Login</v-btn>
    </div>
</template>

<script>
export default {
    methods: {
        login() {
            window.netlifyIdentity.open("login")
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
