export function handler(event, context, callback) {
    console.log(process.env.FIREBASE_SECRET)
    const { identity, user } = context.clientContext || {}

    callback(null, {
        statusCode: 200,
        body: JSON.stringify({
            msg: {
                identity: identity,
                user: user,
                firebase: process.env.FIREBASE_SECRET
            }
        })
    })
}