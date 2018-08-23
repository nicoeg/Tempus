const firebase = require('../lib/firebase')
const dayjs = require('dayjs')
require('../lib/object-assign')

export function handler(event, context, callback) {
    const { identity, user } = context.clientContext || {}

    if (!user && !process.env.AUTH_USER) {
        callback(null, {
            statusCode: 401,
            body: JSON.stringify({
                message: 'Access denied'
            })
        })
    }

    const userID = user ? user.sub : process.env.AUTH_USER
    const regex = new RegExp(/calculate\/([^\/]*)/)
    const day = dayjs(event.path.match(regex)[1])
    const params = {
        orderBy: '"start"',
        startAt: day.startOf('month').valueOf(),
        endAt: day.endOf('month').valueOf()
    }

    firebase.all([
        firebase.settings(userID),
        firebase.get('hours/' + userID, params)
    ]).then(responses => {
        const settings = responses[0].data
        const hours = Object.values(responses[1].data)
            .map(value => {
                return dayjs(value.end).diff(dayjs(value.start), 'hours', true)
            })
            .reduce((a, b) => a + b, 0)
        const body = {
            hours: hours,
            salary: settings.salary || 0,
            deduction: settings.deduction || 0
        }

        callback(null, {
            statusCode: body ? 200 : 404,
            body: JSON.stringify(body)
        })
    })
    .catch(error => {
        callback(null, {
            statusCode: 200,
            body: JSON.stringify({
                error: error.response.data
            })
        })
    })
}