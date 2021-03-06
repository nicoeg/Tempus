import netlifyIdentity from 'netlify-identity-widget/build/netlify-identity'
import axios from 'axios'
import dayjs from 'dayjs'

const firebase = axios.create({
  baseURL: 'https://webpush-test-a5073.firebaseio.com/'
})

const day = {
  get(day) {
    return new Promise(async (resolve, reject) => {
      const user = netlifyIdentity.currentUser().id
      const params = {
        orderBy: '"start"',
        startAt: day.startOf('day').valueOf(),
        endAt: day.endOf('day').valueOf()
      }

      try {
        const response = await firebase.get(`hours/${user}.json`, { params })
        const values = Object.values(response.data)

        if (values.length === 0) {
          return reject()
        }

        return resolve({
          start: values[0].start,
          end: values[0].end
        })
      } catch (resposne) {
        return reject(resposne)
      }
    })
  },
  update(day, start, end) {
    return new Promise(async (resolve, reject) => {
      const user = netlifyIdentity.currentUser().id

      try {
        const response = await firebase.put(`hours/${user}/${day}.json`, {
          start,
          end
        })

        return resolve(response.data)
      } catch (response) {
        return reject(response)
      }
    })
  }
}

const settings = {
  get() {
    return new Promise(async (resolve, reject) => {
      const user = netlifyIdentity.currentUser().id

      try {
        const response = await firebase.get(`settings/${user}.json`)
        const settings = response.data || {}

        return resolve({
          salary: settings.salary || 0,
          atpcontribution: settings.atpcontribution || 94.65,
          deduction: settings.deduction || 0,
          tax: settings.tax || 40,
          billingDay: settings.billingDay
        })
      } catch (response) {
        return reject(response)
      }
    })
  },
  update(data) {
    return new Promise(async (resolve, reject) => {
      const user = netlifyIdentity.currentUser().id

      try {
        await firebase.put(`settings/${user}.json`, data)

        return resolve()
      } catch (response) {
        return reject(response)
      }
    })
  }
}

const calculate = (date, allSettings) => {
  return new Promise(async (resolve, reject) => {
    const user = netlifyIdentity.currentUser().id
    if (allSettings === null) {
      allSettings = await settings.get()
    }

    if (date === null) {
      const pastDate = allSettings.billingDay >= dayjs().date()
      date = dayjs()
        .subtract(pastDate ? 1 : 0, 'month')
        .set('date', allSettings.billingDay)
    }

    try {
      const params = {
        orderBy: '"start"',
        startAt: date.startOf('day').valueOf(),
        endAt: date
          .add(1, 'month')
          .subtract(1, 'day')
          .endOf('day')
          .valueOf()
      }
      const response = await firebase.get(`hours/${user}.json`, { params })
      const hours = Object.values(response.data)
        .map(value => {
          return dayjs(value.end).diff(dayjs(value.start), 'hours', true)
        })
        .reduce((a, b) => a + b, 0)

      return resolve({ hours, settings: allSettings, date: params.startAt })
    } catch (response) {
      return reject(response)
    }
  })
}

export default {
  day,
  settings,
  calculate
}
