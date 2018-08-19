<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <div class="date-header">
          <v-btn flat icon color="primary">
            <v-icon>keyboard_arrow_left</v-icon>
          </v-btn>

          <div class="date">Fredag d. 8 August</div>

          <v-btn flat icon color="primary">
            <v-icon>keyboard_arrow_right</v-icon>
          </v-btn>
        </div>

        <v-dialog
          class="dialog"
          ref="fromDialog"
          v-model="fromModal"
          :return-value.sync="from"
          persistent
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

        <v-btn class="submit" color="primary">Gem</v-btn>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import dayjs from 'dayjs'

export default {
  data() {
    return {
      date: dayjs(),
      fromModal: false,
      toModal: false,
      from: null,
      to: null
    }
  },

  mounted() {
    document.addEventListener('backendready', () => {
      backend.get('day/' + this.date.format('YYYY-MM-DD'))
    })
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
