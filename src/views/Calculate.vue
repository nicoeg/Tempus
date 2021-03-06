<template>
  <VContainer fluid>
    <VLayout column align-center>
      <div class="date-header">
        <VBtn flat icon color="primary" @click="previousMonth">
          <VIcon>keyboard_arrow_left</VIcon>
        </VBtn>

        <VDialog
          ref="dateDialog"
          v-model="dateModal"
          class="dialog"
          lazy
        >
          <div slot="activator" class="date" v-text="localeDateString" />

          <VDatePicker v-if="dateModal" v-model="nativeDate" type="month" />
        </VDialog>

        <VBtn flat icon color="primary" @click="nextMonth">
          <VIcon>keyboard_arrow_right</VIcon>
        </VBtn>
      </div>

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

      <table class="sheet">
        <tbody>
          <tr class="field">
            <td class="field__label">Arbejdstimer</td>

            <td v-if="settings">{{ parseFloat(hours).toFixed(0) }}</td>
            <td v-else></td>

            <td v-if="settings">{{ format(settings.salary) }}</td>
            <td v-else></td>

            <td v-if="settings" class="field__total">{{ format(moneyEarned) }}</td>
            <td v-else></td>
          </tr>

          <tr class="field">
            <td class="field__label">ATP-bidrag</td>

            <td></td>

            <td v-if="settings">-{{ format(settings.atpcontribution) }}</td>
            <td v-else></td>

            <td v-if="settings" class="field__total">{{ format(afterATP) }}</td>
            <td v-else></td>
          </tr>

          <tr class="field">
            <td class="field__label">AM-bidrag</td>

            <td>8%</td>

            <td v-if="settings">-{{ format(amContribution) }}</td>
            <td v-else></td>

            <td v-if="settings" class="field__total">{{ format(afterAmContribution) }}</td>
            <td v-else></td>
          </tr>

          <tr class="field">
            <td v-if="settings" class="field__label">A-skat (Fradag: {{ format(settings.deduction) }})</td>
            <td v-else></td>

            <td v-if="settings">{{ settings.tax }}%</td>
            <td v-else></td>

            <td v-if="settings">-{{ format(tax) }}</td>
            <td v-else></td>

            <td class="field__total"></td>
          </tr>


          <tr class="field total">
            <td class="field__label">Løn</td>

            <td></td>

            <td></td>

            <td v-if="settings" class="field__total">{{ format(afterTax) }}</td>
            <td v-else></td>
          </tr>
        </tbody>
      </table>

    </VLayout>
  </VContainer>
</template>

<script>
import dayjs from 'dayjs'
import api from '@/api'

export default {
  data() {
    return {
      loading: false,
      dateModal: false,
      date: dayjs(),
      settings: null,
      hours: null
    }
  },

  computed: {
    localeDateString() {
      const billingDay = this.settings ? this.settings.billingDay : 1
      if (billingDay === 1) {
        const options = { year: 'numeric', month: 'long' }

        return this.date.toDate().toLocaleDateString(undefined, options)
      }

      const options = { year: '2-digit', month: 'short', day: 'numeric' }

      return [this.date, this.date.add(1, 'month')]
        .map(date => date.toDate().toLocaleDateString(undefined, options))
        .join(' - ')
    },
    nativeDate: {
      get() {
        return this.date.format('YYYY-MM-DD')
      },
      set(value) {
        this.date = dayjs(value)
      }
    },
    moneyEarned() {
      return this.settings.salary * this.hours
    },
    afterATP() {
      return Math.max(this.moneyEarned - this.settings.atpcontribution, 0)
    },
    amContribution() {
      return this.afterATP * 0.08
    },
    afterAmContribution() {
      return this.afterATP - this.amContribution
    },
    tax() {
      if (this.afterAmContribution <= this.settings.deduction) {
        return 0
      }

      return (
        (this.afterAmContribution - this.settings.deduction) / this.settings.tax
      )
    },
    afterTax() {
      return this.afterAmContribution - this.tax
    }
  },

  methods: {
    async fetch(initial = false) {
      this.loading = true
      const data = await api.calculate(
        initial ? null : this.date,
        this.settings
      )
      this.hours = data.hours
      this.date = dayjs(data.date)
      this.settings = data.settings
      this.loading = false
    },
    nextMonth() {
      this.date = this.date.add(1, 'month')
      this.fetch()
      this.dateModal = false
    },
    previousMonth() {
      this.date = this.date.subtract(1, 'month')
      this.fetch()
      this.dateModal = false
    },
    format(number, digits, style) {
      return parseFloat(number).toLocaleString(undefined, {
        maximumFractionDigits: digits || 2,
        style: style || 'currency',
        currency: 'DKK'
      })
    }
  },

  created() {
    this.fetch(true)
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
