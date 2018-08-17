<template>
    <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <v-form class="form">
          <div class="field">
            <div class="field__label">Timeløn</div>

            <div class="field__value">
              <v-text-field v-model="hourly" type="number" />
              <div class="suffix">kr</div>
            </div>
          </div>

          <div class="field">
            <div class="field__label">Bidrag</div>

            <div class="field__value">
              <v-text-field v-model="hourly" type="number" />
              <div class="suffix">kr</div>
            </div>
          </div>
        </v-form>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      hourly: ''
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
