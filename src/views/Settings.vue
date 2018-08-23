<template>
    <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <v-dialog
          v-model="loading"
          hide-overlay
          width="300"
        >
          <v-card
            color="primary"
            dark
          >
            <v-card-text>
              Loading...
              <v-progress-linear
                indeterminate
                color="white"
                class="mb-0"
              ></v-progress-linear>
            </v-card-text>
          </v-card>
        </v-dialog>

        <v-form class="form" @submit.prevent="save">
          <div class="field">
            <div class="field__label">Timeløn</div>

            <div class="field__value">
              <v-text-field v-model="settings.salary" type="number" />
              <div class="suffix">kr</div>
            </div>
          </div>

          <div class="field">
            <div class="field__label">Fradrag</div>

            <div class="field__value">
              <v-text-field v-model="settings.deduction" type="number" />
              <div class="suffix">kr</div>
            </div>
          </div>

          <v-btn type="submit" color="primary">Gem</v-btn>
        </v-form>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      settings: {
        salary: 0,
        deduction: 0
      },
      loading: false
    }
  },

  methods: {
    async fetch() {
      this.loading = true
      this.settings = (await backend.get('settings')).data
      this.loading = false
    },

    async save() {
      this.loading = true
      
      await backend.put('settings', this.settings)

      this.loading = false
    }
  },

  mounted() {
    if (backend) {
      this.fetch()
    } else {
      document.addEventListener('backendready', this.fetch)
    }
  }
}
</script>

<style lang="scss" scoped>
  .form {
    width: 100%;
  }

  .field {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &__value {
      display: flex;
      align-items: center;
      max-width: 30%;

      .suffix {
        height: 32px;
        padding-top: 3px;
        padding-left: 5px;
      }
    }
  }
</style>

<style>
  .field__value input {
    text-align: right;
  }
</style>
