<template>
    <VContainer fluid>
    <VSlideYTransition mode="out-in">
      <VLayout column align-center>
        <VDialog
          v-model="loading"
          hide-overlay
          width="300"
        >
          <VCard
            color="primary"
            dark
          >
            <VCardText>
              Loading...
              <VProgressLinear
                indeterminate
                color="white"
                class="mb-0"
              ></VProgressLinear>
            </VCardText>
          </VCard>
        </VDialog>

        <VForm class="form" @submit.prevent="save">
          <div class="field">
            <div class="field__label">Timeløn</div>

            <div class="field__value">
              <VTextField v-model.number="settings.salary" type="number" />
              <div class="suffix">kr</div>
            </div>
          </div>

          <div class="field">
            <div class="field__label">ATP-bidrag</div>

            <div class="field__value">
              <VTextField v-model.number="settings.atpcontribution" type="number" />
              <div class="suffix">kr</div>
            </div>
          </div>

          <div class="field">
            <div class="field__label">A-skat</div>

            <div class="field__value">
              <VTextField v-model.number="settings.tax" type="number" />
              <div class="suffix">%</div>
            </div>
          </div>

          <div class="field">
            <div class="field__label">A-skat</div>

            <div class="field__value">
              <VTextField v-model.number="settings.tax" type="number" />
              <div class="suffix">%</div>
            </div>
          </div>

          <div class="field">
            <div class="field__label">Fradrag</div>

            <div class="field__value">
              <VTextField v-model.number="settings.deduction" type="number" />
              <div class="suffix">kr</div>
            </div>
          </div>

          <div class="field">
            <div class="field__label">Afregningsdag</div>

            <div class="field__value">
              <VTextField v-model.number="settings.billingDay" type="number" />
              <div class="suffix" />
            </div>
          </div>

          <VBtn type="submit" color="primary">Gem</VBtn>
        </VForm>
      </VLayout>
    </VSlideYTransition>
  </VContainer>
</template>

<script>
import api from '@/api'

export default {
  data() {
    return {
      settings: {
        salary: 0,
        atpcontribution: 0,
        deduction: 0,
        tax: 0,
        billingDay: 0
      },
      loading: false
    }
  },

  methods: {
    async fetch() {
      this.loading = true
      this.settings = await api.settings.get()
      this.loading = false
    },

    async save() {
      this.loading = true
      await api.settings.update(this.settings)
      this.loading = false
    }
  },

  created() {
    this.fetch()
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
      min-width: 17px;
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
