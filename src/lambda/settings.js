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
                const settings = response.data || {}

                callback(null, {
                    statusCode: 200,
                    body: JSON.stringify({
                        salary: settings.salary || 0,
                        atpcontribution: settings.atpcontribution || 94.65,
                        deduction: settings.deduction || 0,
                        tax: settings.tax || 40,
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
            atpcontribution: body.atpcontribution,
            deduction: body.deduction,
            tax: body.tax
        })
            .then(() => {
                callback(null, {
                    statusCode: 200,
                    body: JSON.stringify({ success: true })
                })
            })
    }
}