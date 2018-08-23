const firebase = require('../lib/firebase')
const dayjs = require('dayjs')

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

    if (event.httpMethod == 'GET') {
        firebase.settings(userID)
            .then(response => {
                callback(null, {
                    statusCode: 200,
                    body: JSON.stringify({
                        salary: response.data.salary || 0,
                        deduction: response.data.deduction || 0
                    })
                })
            })
            .catch(error => {
                console.log(error)
            })
    } else if (event.httpMethod == 'PUT') {
        const body = JSON.parse(event.body)
        firebase.update('settings/' + userID, {
            salary: body.salary,
            deduction: body.deduction
        })
            .then(() => {
                callback(null, {
                    statusCode: 200,
                    body: JSON.stringify({ success: true })
                })
            })
    }
}