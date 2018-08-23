<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <div class="date-header">
          <v-btn flat icon color="primary" @click="previousMonth">
            <v-icon>keyboard_arrow_left</v-icon>
          </v-btn>

          <v-dialog
            class="dialog"
            ref="dateDialog"
            v-model="dateModal"
            lazy
          >
            <div class="date" slot="activator" v-text="localeDateString" />

            <v-date-picker v-if="dateModal" v-model="nativeDate" type="month" />
          </v-dialog>

          <v-btn flat icon color="primary" @click="nextMonth">
            <v-icon>keyboard_arrow_right</v-icon>
          </v-btn>
        </div>

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

              <td v-if="data">{{ format(data.hours, 2, 'decimal') }}</td>
              <td v-else></td>

              <td v-if="data">{{ format(data.salary) }}</td>
              <td v-else></td>

              <td v-if="data" class="field__total">{{ format(moneyEarned) }}</td>
              <td v-else></td>
            </tr>

            <tr class="field">
              <td class="field__label">ATP-bidrag</td>

              <td></td>

              <td v-if="data">-{{ format(data.atpcontribution) }}</td>
              <td v-else></td>

              <td v-if="data" class="field__total">{{ format(afterATP) }}</td>
              <td v-else></td>
            </tr>

            <tr class="field">
              <td class="field__label">AM-bidrag</td>

              <td>8%</td>

              <td v-if="data">-{{ format(amContribution) }}</td>
              <td v-else></td>

              <td v-if="data" class="field__total">{{ format(afterAmContribution) }}</td>
              <td v-else></td>
            </tr>

            <tr class="field">
              <td v-if="data" class="field__label">A-skat (Fradag: {{ format(data.deduction) }})</td>
              <td v-else></td>

              <td v-if="data">{{ data.tax }}%</td>
              <td v-else></td>

              <td v-if="data">-{{ format(tax) }}</td>
              <td v-else></td>

              <td class="field__total"></td>
            </tr>


            <tr class="field total">
              <td class="field__label">Løn</td>

              <td></td>

              <td></td>

              <td v-if="data" class="field__total">{{ format(afterTax) }}</td>
              <td v-else></td>
            </tr>
          </tbody>
        </table>

      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import dayjs from 'dayjs'

export default {
  data() {
    return {
      loading: false,
      dateModal: false,
      month: dayjs(),
      data: null
    }
  },

  computed: {
    localeDateString() {
      var options = { year: 'numeric', month: 'long' }

      return this.month.toDate().toLocaleDateString(undefined, options)
    },
    nativeDate: {
      get() {
        return this.month.format('YYYY-MM-DD')
      },
      set(value) {
        this.month = dayjs(value)
      }
    },
    moneyEarned() {
      return this.data.salary * this.data.hours
    },
    afterATP() {
      return Math.max(this.moneyEarned - this.data.atpcontribution, 0)
    },
    amContribution() {
      return this.afterATP * .08
    },
    afterAmContribution() {
      return this.afterATP - this.amContribution
    },
    tax() {
      if (this.afterAmContribution <= this.data.deduction) {
        return 0
      }

      return (this.afterAmContribution - this.data.deduction) / this.data.tax
    },
    afterTax() {
      return this.afterAmContribution - this.tax
    }
  },

  methods: {
    async fetch() {
      const date = this.month.format('YYYY-MM-DD')

      this.loading = true
      this.data = (await backend.get('calculate/' + date)).data
      this.loading = false
    },
    nextMonth() {
      this.month = this.month.add(1, 'month')
    },
    previousMonth() {
      this.month = this.month.subtract(1, 'month')
    },
    format(number, digits, style) {
      return parseFloat(number).toLocaleString(undefined, {
        maximumFractionDigits: digits || 3,
        style: style || 'currency',
        currency: 'DKK'
      })
    }
  },

  watch: {
    month() {
      this.fetch()
      this.dateModal = false
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
    background-color: #999;
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
