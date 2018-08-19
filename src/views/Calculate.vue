<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <div class="date-header">
          <v-btn flat icon color="primary">
            <v-icon>keyboard_arrow_left</v-icon>
          </v-btn>

          <div class="date">August</div>

          <v-btn flat icon color="primary">
            <v-icon>keyboard_arrow_right</v-icon>
          </v-btn>
        </div>

        <table class="sheet">
          <thead>
            <tr>
              <td>Tekst</td>
              <td>Sats</td>
              <td>Trukket</td>
              <td class="align-right">Total</td>
            </tr>
          </thead>

          <tbody>
            <tr class="field">
              <td class="field__label">Arbejdstimer</td>

              <td>23</td>

              <td>130,-</td>

              <td class="field__total">43,44,-</td>
            </tr>

            <tr class="field">
              <td class="field__label">ATP-bidrag</td>

              <td></td>

              <td>94,65</td>

              <td class="field__total">43,44,-</td>
            </tr>

            <tr class="field">
              <td class="field__label">AM-bidrag</td>

              <td>8%</td>

              <td>-94,65,-</td>

              <td class="field__total">43,44,-</td>
            </tr>

            <tr class="field">
              <td class="field__label">A-indkomst</td>

              <td>40%</td>

              <td>-114,65,-</td>

              <td class="field__total">43,44,-</td>
            </tr>

            <tr class="field">
              <td class="field__label">Skattefrarag</td>

              <td>40%</td>

              <td>-114,65,-</td>

              <td class="field__total">43,44,-</td>
            </tr>

            <tr class="field total">
              <td class="field__label">Løn</td>

              <td></td>

              <td></td>

              <td class="field__total">2243,44,-</td>
            </tr>
          </tbody>
        </table>

      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<style lang="scss" scoped>
.date-header {
  border-bottom: 1px solid #eee;
}

.sheet {
  width: 100%;
}

thead td {
  padding: 10px 5px;
  background-color: #eee;
}

.field {
  &:nth-child(even) {
    background-color: #eee;
  }

  &.total {
    background-color: #333;
    color: #fff;
  }

  td {
    padding: 10px 5px;
    min-width: 30px;
  }

  &__total {
    text-align: right;
  }
}

.align-right {
  text-align: right;
}
</style>
