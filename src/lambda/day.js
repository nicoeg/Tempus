const firebase = require('./firebase')
const dayjs = require('dayjs')

const get_day = function(event, context, callback) {
    const day = dayjs(event.path.split('/')[2])
    const params = {
        orderBy: '"start"',
        startAt: day.startOf('day').valueOf(),
        endAt: day.endOf('day').valueOf()
    }

    firebase.get('hours/nico', params)
        .then(resp => {
            const values = Object.values(resp.data)
            let body = values[0] || null

            if (body) {
                body = {
                    id: Object.keys(resp.data)[0],
                    start: dayjs(body.start).format('YYYY-MM-DD HH:mm:ss'),
                    end: dayjs(body.end).format('YYYY-MM-DD HH:mm:ss')
                }
            }

            callback(null, {
                statusCode: body ? 200 : 404,
                body: JSON.stringify(body)
            })
        })
        .catch(resp => {
            callback(null, {
                statusCode: 200,
                body: JSON.stringify({
                    error: {}
                })
            })
        })
}

const add_day = function(event, context, callback) {
    const body = JSON.parse(event.body)
    const data = {
        start: body.start,
        end: body.end
    }

    firebase.add('hours/nico', data)
        .then(response => {
            callback(null, {
                statusCode: 200,
                body: JSON.stringify(response.data)
            })
        })
        .catch(err => {
            callback(null, {
                statusCode: 200,
                body: JSON.stringify({
                    error: {}
                })
            })
        })
}

const update_day = function(event, context, callback) {
    const id = event.path.split('/')[2]
    const body = JSON.parse(event.body)
    const data = {
        start: body.start,
        end: body.end
    }

    if (!id) {
        return callback(null, {
            statusCode: 500,
            body: JSON.stringify({fak: true})
        })
    }

    firebase.update('hours/nico/' + id, data)
        .then(response => {
            callback(null, {
                statusCode: 200,
                body: JSON.stringify(response.data)
            })
        })
        .catch(err => {
            callback(null, {
                statusCode: 200,
                body: JSON.stringify({
                    error: {}
                })
            })
        })
}

export function handler(event, context, callback) {
    const { identity, user } = context.clientContext || {}

    if (!user) {
        callback(null, {
            statusCode: 401,
            body: JSON.stringify({
                message: 'Access denied'
            })
        })
    }

    switch (event.httpMethod) {
        case 'GET':
            get_day(event, context, callback)

            break;
        case 'POST':
            add_day(event, context, callback)

            break;
        case 'PUT':
            update_day(event, context, callback)

            break;
        default:
            break;
    }
  }