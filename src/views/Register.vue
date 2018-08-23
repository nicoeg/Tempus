<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <v-dialog v-model="errorDialog">
          <v-card>
            <v-card-title class="headline">Ups!</v-card-title>

            <v-card-text v-text="errorMessage" />

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn color="primary" flat="flat" @click="errorDialog = false">Okay du!</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

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

        <div class="date-header">
          <v-btn flat icon color="primary" @click="previousDay">
            <v-icon>keyboard_arrow_left</v-icon>
          </v-btn>

          <v-dialog
            class="dialog"
            ref="dateDialog"
            v-model="dateModal"
            lazy
          >
            <div class="date" slot="activator" v-text="localeDateString" />

            <v-date-picker v-if="dateModal" v-model="nativeDate" :first-day-of-week="1" />
          </v-dialog>

          <v-btn flat icon color="primary" @click="nextDay">
            <v-icon>keyboard_arrow_right</v-icon>
          </v-btn>
        </div>

        <v-dialog
          class="dialog"
          ref="fromDialog"
          v-model="fromModal"
          :return-value.sync="from"
          lazy
        >
          <v-text-field
            slot="activator"
            v-model="from"
            label="Start tidspunkt"
            prepend-icon="access_time"
            solo
            readonly
          ></v-text-field>

          <v-time-picker
            v-if="fromModal"
            v-model="from"
            format="24hr"
          >
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="fromModal = false">Cancel</v-btn>
            <v-btn flat color="primary" @click="$refs.fromDialog.save(from)">OK</v-btn>
          </v-time-picker>
        </v-dialog>

        <v-dialog
          class="dialog"
          ref="toDialog"
          v-model="toModal"
          :return-value.sync="to"
          persistent
          lazy
        >
          <v-text-field
            slot="activator"
            v-model="to"
            label="Slut tidspunkt"
            prepend-icon="access_time"
            solo
            readonly
          ></v-text-field>

          <v-time-picker
            v-if="toModal"
            v-model="to"
            format="24hr"
          >
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="toModal = false">Cancel</v-btn>
            <v-btn flat color="primary" @click="$refs.toDialog.save(to)">OK</v-btn>
          </v-time-picker>
        </v-dialog>

        <v-btn
          :loading="saving"
          class="submit"
          color="primary"
          @click="saveDay"
        >
          Gem
        </v-btn>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import dayjs from 'dayjs'

export default {
  data() {
    return {
      dateModal: false,
      date: dayjs(),
      errorDialog: false,
      errorMessage: '',
      fromModal: false,
      toModal: false,
      from: null,
      to: null,
      saving: false,
      loading: false
    }
  },

  computed: {
    localeDateString() {
      var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

      return this.date.toDate().toLocaleDateString(undefined, options)
    },
    nativeDate: {
      get() {
        return this.date.format('YYYY-MM-DD')
      },
      set(value) {
        this.date = dayjs(value)
      }
    }
  },

  methods: {
    fetchDay() {
      this.loading = true

      backend.get('day/' + this.date.format('YYYY-MM-DD'))
        .then(response => {
          this.from = dayjs(response.data.start).format('HH:mm')
          this.to = dayjs(response.data.end).format('HH:mm')
        })
        .catch(error => {
          this.from = null
          this.to = null
        })
        .finally(() => { this.loading = false })
    },
    async saveDay() {
      if (this.from === null || this.to === null) {
        this.errorMessage = 'Start- og sluttidspunkt skal udfyldes.'
        this.errorDialog = true

        return
      }

      if (parseFloat(this.from.replace(':', '.')) >= parseFloat(this.to.replace(':', '.'))) {
        this.errorMessage = 'Starttidspunkt kan ikke være efter sluttidspunkt.. Bonghoved'
        this.errorDialog = true

        return
      }

      this.saving = true
      backend.put('day/' + this.date.format('YYYY-MM-DD'), {
        start: this.modifyDate(this.from.split(':')),
        end: this.modifyDate(this.to.split(':'))
      })
        .finally(() => { this.saving = false })
    },
    nextDay() {
      this.date = this.date.add(1, 'day')
    },
    previousDay() {
      this.date = this.date.subtract(1, 'day')
    },
    modifyDate([hour, minute]) {
      return this.date
        .set('hour', hour)
        .set('minute', minute)
        .valueOf()
    }
  },

  watch: {
    date() {
      this.dateModal = false

      this.fetchDay()
    }
  },

  mounted() {
    if (backend) {
      this.fetchDay()
    } else {
      document.addEventListener('backendready', this.fetchDay)
    }
  }
}
</script>

<style lang="scss">
  .date-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;

    .date {
      text-transform: capitalize;
      text-align: center;
    }

    .v-btn {
      width: 15px;
    }

    .v-btn:first-child {
      margin-left: 0;
    }

    .v-btn:last-child {
      margin-left: 0;
    }
  }
</style>

<style lang="scss" scoped>
  .dialog {
    width: 100%;
  }

  .submit {
    width: 100%;
  }
</style>

<style>
  .v-dialog {
    max-width: 290px;
  }
</style>
